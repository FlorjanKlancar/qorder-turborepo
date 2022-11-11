import React from "react";

function TopPicksSkeleton() {
  const dummyArray = [1, 2, 3, 4];
  return (
    <div className="relative m-auto flex w-full snap-x snap-mandatory snap-center gap-6 overflow-x-auto px-4 py-3 xl:justify-center">
      {dummyArray.map((i: number) => (
        <div className="shrink-0 snap-center snap-always items-center" key={i}>
          <div className="h-68 card w-60 bg-base-100 shadow-xl">
            <figure className="relative h-32 w-full animate-pulse bg-slate-300"></figure>
            <div className="card-body flex items-center">
              <h2 className="card-title -mt-4 h-4 w-3/4 animate-pulse rounded-lg bg-slate-300"></h2>

              <div className="flex w-full items-center justify-between">
                <div className="card-actions h-4 w-1/3 animate-pulse rounded-lg bg-slate-300 text-sm"></div>
                <div className="card-actions flex justify-end">
                  <div className="h-4 w-24 animate-pulse rounded-lg bg-slate-300"></div>
                </div>
              </div>
            </div>
            <div className="-mt-6 px-4 py-2">
              <button className="btn btn-sm w-full animate-pulse rounded-lg border-default/80 bg-default">
                Add to cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TopPicksSkeleton;
