"use client";

import { useEffect, useState, ReactNode } from "react";

export default function ScreenSizeCheck({ children }: { children: ReactNode }) {
  const [isTooSmall, setIsTooSmall] = useState(false);

  useEffect(() => {
    function checkWidth() {
      setIsTooSmall(window.innerWidth < 640);
    }

    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  if (isTooSmall) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4 text-center bg-white dark:bg-black text-black dark:text-white">
        <div className="max-w-md">
          <h1 className="text-3xl font-bold mb-4">🚫 Screen Too Small</h1>
          <p className="text-lg">
            This website is not available on small screens.
            <br />
            App coming soon!
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
