import  { useEffect } from "react";

export default function useClickOutside(ref, handleClickOutside) {
  useEffect(() => {
    const clickListener = (event) => {
      if (ref.current.contains(event.target)) {
        return;
      }
      handleClickOutside(event);
    };

    document.addEventListener("mousedown", clickListener);
    return () => {
      document.removeEventListener("mousedown", clickListener);
    };
  }, [ref, handleClickOutside]);
}
