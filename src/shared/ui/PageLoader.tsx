export const PageLoader = () => (
  <div className="flex justify-center items-center h-[calc(100vh-60px)]">
    <div
      className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-400 border-r-transparent"
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  </div>
)
