import { SourceMapConsumer } from "source-map-js";
import { threeJsComponents } from "./threejs-components";
// Helper to create the plugin object, allows cleaner passing of `t` and options
var createPluginLogic = function (babel, options) {
    var t = babel.types;
    var consumerHolder = {};
    // Context stack to track Three.js contexts
    var contextStack = [];
    // Helper functions for context management
    var isThreeJsComponent = function (elementName) {
        return threeJsComponents.has(elementName);
    };
    var isCurrentlyInThreeJsContext = function () {
        var _a;
        return (contextStack.length > 0 && ((_a = contextStack[contextStack.length - 1]) === null || _a === void 0 ? void 0 : _a.isThreeJsContext) === true);
    };
    var pushContext = function (isThreeJs) {
        contextStack.push({
            depth: contextStack.length,
            isThreeJsContext: isThreeJs,
        });
    };
    var popContext = function () {
        contextStack.pop();
    };
    return {
        name: "inject-data-locator-original-source",
        post: function () {
            // Removed `file` as it's not used here
            // SourceMapConsumer from `source-map-js` does not have a destroy method.
            // Clearing the reference is enough for GC if needed.
            consumerHolder.consumer = undefined;
        },
        pre: function (file) {
            // `file` is Babel's File object, has `opts` like `filename`
            if (options.inputSourceMap) {
                try {
                    var rawMap = void 0;
                    if (typeof options.inputSourceMap === "string") {
                        rawMap = JSON.parse(options.inputSourceMap);
                    }
                    else {
                        rawMap = options.inputSourceMap;
                    }
                    consumerHolder.consumer = new SourceMapConsumer(rawMap);
                }
                catch (errCaught) {
                    var error = errCaught;
                    console.warn("[inject-data-locator-original-source] Failed to initialize SourceMapConsumer for ".concat(file.opts.filename, ":"), error.message);
                    consumerHolder.consumer = undefined;
                }
            }
            else {
                consumerHolder.consumer = undefined;
            }
        },
        visitor: {
            JSXElement: {
                enter: function (path, state) {
                    var openingElement = path.node.openingElement;
                    // Determine the element name
                    var elementName = "Unknown";
                    if (t.isJSXIdentifier(openingElement.name)) {
                        elementName = openingElement.name.name;
                    }
                    else if (t.isJSXMemberExpression(openingElement.name)) {
                        elementName = openingElement.name.property.name;
                    }
                    // Skip React Fragments
                    if (elementName === "Fragment") {
                        return;
                    }
                    // Check if this is a Three.js component
                    var isThreeJsComp = isThreeJsComponent(elementName);
                    // Push context when entering any element
                    // If current element is Three.js OR we're already in Three.js context, mark as Three.js context
                    pushContext(isThreeJsComp || isCurrentlyInThreeJsContext());
                    // If we're in a Three.js context, skip data-locator injection entirely
                    if (isCurrentlyInThreeJsContext()) {
                        console.log("[inject-data-locator-original-source] Skipping data-locator injection for ".concat(elementName, " (inside Three.js context, ").concat(threeJsComponents.size, " components loaded)"));
                        return;
                    }
                    // Continue with normal data-locator injection for non-Three.js elements
                    var currentConsumer = consumerHolder.consumer;
                    var attributes = openingElement.attributes;
                    var filename = state.file.opts.filename || "unknown";
                    var filePath = filename;
                    var srcIndex = filename.lastIndexOf("/src/");
                    if (srcIndex !== -1) {
                        filePath = filename.substring(srcIndex + 1);
                    }
                    else {
                        filePath = filename.split("/").pop() || filename;
                    }
                    var hasDataLocator = attributes.some(function (attr) {
                        return t.isJSXAttribute(attr) && attr.name.name === "data-locator";
                    });
                    if (!hasDataLocator && path.node.loc) {
                        var start = path.node.loc.start;
                        var finalLine = start.line; // 1-indexed
                        var finalColumn = start.column; // 0-indexed
                        var mapped = false;
                        if (currentConsumer) {
                            try {
                                var originalPosition = currentConsumer.originalPositionFor({
                                    // 1-indexed for lookup
                                    column: start.column,
                                    line: start.line, // 0-indexed for lookup
                                });
                                if (originalPosition &&
                                    originalPosition.line != null &&
                                    originalPosition.column != null) {
                                    finalLine = originalPosition.line; // 1-indexed from sourcemap
                                    finalColumn = originalPosition.column; // 0-indexed from sourcemap
                                    mapped = true;
                                }
                            }
                            catch (errCaught) {
                                var error = errCaught;
                                console.warn("[inject-data-locator-original-source] Error during source map lookup for ".concat(elementName, " in ").concat(filename, ":L").concat(start.line, ":C").concat(start.column), error.message);
                            }
                        }
                        var locatorValue = "".concat(filePath, ":").concat(elementName, ":").concat(finalLine, ":").concat(finalColumn);
                        var dataLocatorAttr = t.jsxAttribute(t.jsxIdentifier("data-locator"), t.stringLiteral(locatorValue));
                        openingElement.attributes.push(dataLocatorAttr);
                        console.log("[inject-data-locator-original-source] Added data-locator (".concat(mapped ? "original" : "generated", "): ").concat(locatorValue, " to ").concat(elementName, " in ").concat(filename).concat(mapped ? " (gen L".concat(start.line, ":C").concat(start.column, ")") : "(L".concat(start.line, ":C").concat(start.column, ")")));
                    }
                },
                exit: function () {
                    // Pop context when exiting any JSX element
                    popContext();
                },
            },
        },
    };
};
// Babel plugin signature: a function that returns the plugin object.
// Receives babel object (with types, etc.) as first argument, and plugin options as second.
export default function (babelAPI, options) {
    babelAPI.assertVersion(7); // Ensure compatibility with Babel 7+
    return createPluginLogic(babelAPI, options);
}
