import React from "react";

interface FloatingMessageProps {
  children: React.ReactNode;
}

const FloatingMessage: React.FC<FloatingMessageProps> = ({ children }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-[2000] pointer-events-none">
      <p className="bg-white px-4 py-2 rounded shadow text-black pointer-events-auto">
        {children}
      </p>
    </div>
  );
};

export default FloatingMessage;
