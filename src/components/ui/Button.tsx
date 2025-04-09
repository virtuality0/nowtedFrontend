import { ReactNode } from "react";

export interface ButtonProps {
  variant: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  text?: string;
  frontIcon?: ReactNode;
  endIcon?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "reset" | "button" | "submit" | undefined;
  grow?: boolean;
}

const variantStyles = {
  primary: "bg-gray-700 text-white-700",
  secondary: "bg-blue-700 text-white-700",
};

const sizeStyles = {
  sm: "py-1 px-2",
  md: "py-2 px-4",
  lg: "py-3 px-6",
};

const defaultStyles = `rounded-md flex justify-center items-center`;

export const Button = ({
  variant,
  onClick,
  text,
  endIcon,
  frontIcon,
  size,
  type,
  grow,
}: ButtonProps) => {
  return (
    <>
      <button
        type={type ?? "button"}
        onClick={onClick}
        className={`${variantStyles[variant]} ${
          sizeStyles[size ?? "md"]
        } ${defaultStyles} font-light cursor-pointer
        } ${grow ? "grow" : ""}`}
      >
        {frontIcon ?? null}
        <span className={`${text && "px-2"}`}>{text}</span>
        <img src={endIcon} alt="" />
      </button>
    </>
  );
};
