import React from "react";

interface Props {
  children: React.ReactNode;
}
function LoginLayout({ children }: Props) {
  return (
    <div className="bg-background h-lvh flex items-center justify-center">
      {children}
    </div>
  );
}

export default LoginLayout;
