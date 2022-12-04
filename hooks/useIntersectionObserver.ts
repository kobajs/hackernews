import { useEffect, useRef } from "react";

export const useIntersectionObserver = ({ cb }: { cb: () => void }) => {
  const observedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries?.[0]?.isIntersecting) {
          cb();
        }
      },
      {
        threshold: 0,
      }
    );

    if (observedRef.current) {
      observer.observe(observedRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return {
    observedRef,
  };
};
