import React, { ButtonHTMLAttributes, ReactNode } from "react";

function button({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
}) {
  return (
    <button
      className="px-4 py-2 text-lg rounded-full bg-blue-600 text-white disabled:opacity-30"
      {...props}
    >
      {children}
    </button>
  );
}

export default button;
