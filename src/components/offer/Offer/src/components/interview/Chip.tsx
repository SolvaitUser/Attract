import React from "react";

interface ChipProps {
  color?: "success" | "warning" | "danger" | "primary" | "default";
  variant?: "solid" | "flat";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
  startContent?: React.ReactNode;
}

const Chip: React.FC<ChipProps> = ({
  color = "default",
  variant = "solid",
  size = "md",
  className = "",
  children,
  startContent
}) => {
  const getColorClasses = () => {
    if (variant === "flat") {
      switch (color) {
        case "success":
          return "bg-green-100 text-green-600";
        case "warning":
          return "bg-amber-100 text-amber-600";
        case "danger":
          return "bg-red-100 text-red-600";
        case "primary":
          return "bg-blue-100 text-blue-600";
        default:
          return "bg-gray-100 text-gray-600";
      }
    } else {
      switch (color) {
        case "success":
          return "bg-green-600 text-white";
        case "warning":
          return "bg-amber-500 text-white";
        case "danger":
          return "bg-red-500 text-white";
        case "primary":
          return "bg-blue-600 text-white";
        default:
          return "bg-gray-500 text-white";
      }
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "text-xs px-2 py-0.5";
      case "lg":
        return "text-sm px-3 py-1.5";
      default:
        return "text-xs px-2.5 py-1";
    }
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1 font-medium rounded-full 
        ${getColorClasses()} 
        ${getSizeClasses()} 
        ${className}
      `}
    >
      {startContent && startContent}
      {children}
    </span>
  );
};

export default Chip;