export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-xs animate-pulse">
      <div className="flex items-start gap-3.5">
        <div className="h-13 w-13 shrink-0 rounded-2xl bg-gray-200" />
        <div className="flex-1 space-y-2 py-1">
          <div className="h-4 w-3/4 rounded-md bg-gray-200" />
          <div className="h-3 w-1/3 rounded-md bg-gray-100" />
        </div>
      </div>

      <div className="mt-5 flex items-end justify-between border-t border-gray-100 pt-3">
        <div className="space-y-1.5">
          <div className="h-2.5 w-14 rounded-md bg-gray-100" />
          <div className="h-6 w-24 rounded-md bg-gray-200" />
        </div>
        <div className="h-6 w-14 rounded-full bg-gray-100" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default function LoadingSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 space-y-8 animate-pulse">
      {/* Banner Skeleton */}
      <div className="h-56 w-full rounded-3xl bg-gray-200/80" />

      {/* Grid Skeleton */}
      <div className="space-y-4">
        <div className="h-8 w-48 rounded-lg bg-gray-200" />
        <ProductGridSkeleton count={6} />
      </div>
    </div>
  );
}
