import React from "react";

function CardSkeleton() {
  return (
    <div className="space-y-3">
      <div className="h-9 w-full animate-pulse rounded bg-slate-300"></div>
      <div className="flex space-x-2">
        <div className="h-9 w-full animate-pulse rounded bg-slate-300"></div>
        <div className="h-9 w-full animate-pulse rounded bg-slate-300"></div>
      </div>
      <div className="h-9 w-full animate-pulse rounded bg-slate-300"></div>
    </div>
  );
}

export default CardSkeleton;
