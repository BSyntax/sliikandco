import { useEffect } from "react";

export default function useLockBodyScroll(open) {
  useEffect(() => {
    if (!open) return;

    const scrollY = window.scrollY;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";

      window.scrollTo({
        top: scrollY,
        left: 0,
        behavior: "auto",
      });
    };
  }, [open]);
}
