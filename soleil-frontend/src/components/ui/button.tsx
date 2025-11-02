import React from "react";

type ButtonVariant = "default" | "soleilPrimary" | "soleilSecondary";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: "sm" | "md" | "lg";
  variant?: ButtonVariant;
};

const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

const variantClasses: Record<ButtonVariant, string> = {
  default:
    "rounded-md bg-soleil-accent text-soleil-dark shadow hover:opacity-90",
  soleilPrimary: "btn-soleil btn-soleil-primary",
  soleilSecondary: "btn-soleil btn-soleil-secondary",
};

export const Button: React.FC<ButtonProps> = ({
  className = "",
  size = "md",
  variant = "default",
  ...props
}) => {
  const baseClass =
    "inline-flex items-center justify-center font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-soleil-accent";
  const sizeClass = variant === "default" ? sizeClasses[size] : "";
  const variantClass = variantClasses[variant] ?? variantClasses.default;
  return (
    <button
      className={[baseClass, variantClass, sizeClass, className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
};

export default Button;


