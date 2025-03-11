type ChainListskeletonProps = {
  count?: number;
};
export default function ChainListskeleton({
  count = 2,
}: ChainListskeletonProps) {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-transparent min-w-[300px] rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gray-700 rounded-full animate-pulse"></div>
              <div>
                <div className="w-16 h-4 bg-gray-700 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="w-12 h-4 bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
