"use client";
import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { ToggleTheme } from "../toggle-theme";
import { Toaster } from "react-hot-toast";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class">
      <div className="max-w-screen-lg mx-auto mt-4 flex justify-between items-center px-6">
        <h3 className="text-foreground font-semibold text-lg">PassGino</h3>
        <ToggleTheme />
      </div>
      <div className="max-w-screen-lg mx-auto p-4 flex justify-center items-center w-screen h-[90vh]">
        {children}
      </div>
      <Toaster position="top-center" reverseOrder={true} />
    </ThemeProvider>
  );
}
