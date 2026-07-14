import { useState, useEffect } from "react";

const useWindowSize = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = size.width < 640;
  const isTablet = size.width >= 640 && size.width < 1024;
  const isDesktop = size.width >= 1024;

  return {
    width: size.width,
    height: size.height,
    isMobile,
    isTablet,
    isDesktop,
  };
};

export default useWindowSize;
