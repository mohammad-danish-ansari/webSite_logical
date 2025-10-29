import React, { useEffect, useRef } from "react";

/**
 * InfiniteScroll
 * Props:
 *  - children: content to render
 *  - onLoadMore: callback to load next page
 */
const InfiniteScroll = ({ children, loading, pagination, onLoadMore, root = null, rootMargin = "200px" }) => {
  const sentinelRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    if (!sentinelRef.current) return;

    // If no more pages, don't observe
    if (!pagination || (pagination.page >= pagination.totalPages)) {
      return;
    }

    // create observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // when sentinel is visible and not loading -> load next
          if (entry.isIntersecting && !loading) {
            if (pagination?.page < pagination?.totalPages) {
              onLoadMore?.();
            }
          }
        });
      },
      {
        root, 
        rootMargin, 
        threshold: 0.1,
      }
    );

    observerRef.current.observe(sentinelRef.current);

    return () => {
      if (observerRef.current && sentinelRef.current) {
        observerRef.current.unobserve(sentinelRef.current);
        observerRef.current.disconnect();
      }
    };
  }, [loading, pagination, onLoadMore, root, rootMargin]);

  return (
    <div>
      {children}

      {/* loader */}
      {loading && (
        <div className="text-center py-4 text-gray-500 text-sm">Loading...</div>
      )}

      <div ref={sentinelRef} style={{ height: 1, width: "100%" }} />

      {!loading && pagination?.page >= pagination?.totalPages && (
        <div className="text-center py-4 text-gray-400 text-xs">You have reached the end.</div>
      )}
    </div>
  );
};

export default InfiniteScroll;
