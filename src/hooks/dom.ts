import React from "react";

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
