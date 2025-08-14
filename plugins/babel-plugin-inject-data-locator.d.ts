import type { NodePath } from "@babel/traverse";
import type * as BabelTypes from "@babel/types";
import type { RawSourceMap } from "source-map-js";
interface BabelFile {
    opts: {
        filename?: string;
        [key: string]: unknown;
    };
}
interface BabelState {
    file: BabelFile;
    [key: string]: unknown;
}
interface CustomPluginOptions {
    inputSourceMap?: RawSourceMap | string;
    types: typeof BabelTypes;
}
export default function (babelAPI: {
    types: typeof BabelTypes;
    assertVersion: (version: number) => void;
}, options: CustomPluginOptions): {
    name: string;
    post(): void;
    pre(file: BabelFile): void;
    visitor: {
        JSXElement: {
            enter(path: NodePath<BabelTypes.JSXElement>, state: BabelState): void;
            exit(): void;
        };
    };
};
export {};
