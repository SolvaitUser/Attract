import React from "react";
import { Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: string;
  color: "primary" | "success" | "warning" | "danger" | "default";
  valueIsText?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color, valueIsText = false }) => {
  const colorMap = {
    primary: {
      bg: "bg-primary-50",
      iconBg: "bg-primary-100",
      text: "text-primary",
    },
    success: {
      bg: "bg-success-50",
      iconBg: "bg-success-100",
      text: "text-success",
    },
    warning: {
      bg: "bg-warning-50",
      iconBg: "bg-warning-100",
      text: "text-warning",
    },
    danger: {
      bg: "bg-danger-50",
      iconBg: "bg-danger-100",
      text: "text-danger",
    },
    default: {
      bg: "bg-default-50",
      iconBg: "bg-default-100",
      text: "text-default-700",
    },
  };

  const { bg, iconBg, text } = colorMap[color];

  return (
    <Card className={`${bg} border-none shadow-sm hover:shadow transition-shadow duration-200`}>
      <CardBody className="p-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-default-600 mb-1">{title}</p>
            <p className={`text-xl font-semibold ${text}`}>
              {!valueIsText && typeof value === 'number' ? value.toLocaleString() : value}
            </p>
          </div>
          <div className={`w-10 h-10 ${iconBg} rounded-full flex items-center justify-center ${text}`}>
            <Icon icon={icon} width={20} />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};