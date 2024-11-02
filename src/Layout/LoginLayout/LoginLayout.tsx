import React from "react";

interface Props {
  children: React.ReactNode;
}
function LoginLayout({ children }: Props) {
  return (
    <div className="bg-background flex items-center justify-center min-h-screen">
      {children}
    </div>
  );
}

export default LoginLayout;
