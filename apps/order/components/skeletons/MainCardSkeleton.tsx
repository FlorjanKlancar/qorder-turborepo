import { XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";

type Props = {
  numberOfSkeletonCards: number;
};

function MainCardSkeleton({ numberOfSkeletonCards }: Props) {
  return (
    <>
      {[...Array(numberOfSkeletonCards)].map((e, i: number) => (
        <div
          key={i}
          className="w-full rounded-2xl bg-gradient-to-b from-default/50 via-default/10 to-slate-200 px-0.5 pt-0.5"
        >
          <div className="card w-full rounded-2xl bg-base-100 shadow-xl shadow-slate-400">
            <div>
              <figure
                className={`relative h-40 w-full animate-pulse bg-slate-300 sm:h-44`}
              >
                <div className="absolute top-5 right-5 z-50 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-slate-500 border-opacity-50">
                  <XMarkIcon className="h-5 w-5" />
                </div>
              </figure>
              <div className="flex flex-col items-stretch px-4 py-2">
                <div className="h-8 w-1/2 animate-pulse rounded-xl bg-slate-300"></div>

                <div className="mt-2 h-8 animate-pulse rounded-xl bg-slate-300"></div>

                <div className="mt-2 items-end">
                  <div className="card-actions flex items-center justify-between">
                    <div className="h-8 w-24 animate-pulse rounded-xl bg-slate-300 font-semibold text-default"></div>
                    <div className="flex space-x-1">
                      <div className="h-5 w-20 animate-pulse rounded-xl bg-slate-300"></div>
                      <div className="h-5 w-20 animate-pulse rounded-xl bg-slate-300"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default MainCardSkeleton;
