import { useEffect } from "react";

const useComponentWillUnmount = (callback) => {
  useEffect(() => {
    return () => {
      callback();
    };
  }, []);
};

export default useComponentWillUnmount;
