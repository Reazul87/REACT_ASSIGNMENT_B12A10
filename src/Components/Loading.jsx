import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-3.5">
        <div className="relative">
          <span className="loading loading-ring loading-lg text-[#FF6F00] w-20 h-20"></span>
          <span className="loading loading-ring loading-lg text-[#FF974D] w-16 h-16 absolute top-2 left-2"></span>
          <span className="loading loading-ring loading-lg text-[#173A75] w-12 h-12 absolute top-4 left-4"></span>
        </div>

        <p className="text-lg font-bold text-[#173A75] animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loading;
