import React, { useEffect, useRef, useState } from "react";
import { useThrottle } from "@uidotdev/usehooks";

export function useOutsideClick<T extends HTMLElement>(callback: VoidFunction) {
  const ref = React.useRef<T>(null);
  React.useEffect(() => {
    const handleClick: EventListener = (event) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };
    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [ref, callback]);
  return ref;
}

export function useThrottledScroll(interval: number) {
  const [scrollY, setScrollY] = useState<number>(0);
  const [isScrollDown, setIsScrollDown] = useState<boolean>(false);

  const throttledScrollY = useThrottle(scrollY, interval);
  const throttledIsScrollDown = useThrottle(isScrollDown, interval);

  const handleScroll = () => {
    setScrollY((oldScrollY) => {
      if (window.scrollY > oldScrollY) {
        setIsScrollDown(true);
      } else {
        setIsScrollDown(false);
      }

      return window.scrollY;
    });
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  return { scrollY: throttledScrollY, isScrollDown: throttledIsScrollDown };
}
