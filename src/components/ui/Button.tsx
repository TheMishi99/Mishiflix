import { ReactNode } from "react";

export default function Button({
  children,
  type = "button",
  variant = "primary",
  onClick = () => {},
}: Readonly<{
  children: ReactNode;
  type: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "outline";
  onClick?: () => void;
}>) {
  return (
    <button
      className={`w-full flex justify-center items-center p-2 gap-2 rounded-xl ${
        variant === "primary"
          ? "bg-red-600"
          : variant === "secondary"
          ? "bg-zinc-800"
          : "border border-zinc-700"
      }`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
