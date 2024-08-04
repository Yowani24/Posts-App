import React from "react";

const LoadingComponent = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center gap-4">
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-800"></div>
      </div>
      <p className="animate-pulse">Carregando...</p>
    </div>
  );
};

export default LoadingComponent;
