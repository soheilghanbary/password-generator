"use client";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

export function ToggleTheme() {
  const { theme, setTheme , systemTheme } = useTheme();
  const [initTheme, setInitTheme] = useState("");

  useEffect(() => {
    if (theme) {
      setInitTheme(theme);
    } else {
      setInitTheme(systemTheme?.toString() ?? '');
    }
  }, [theme, systemTheme]);

  if (!initTheme.length) return <Skeleton className="w-44 h-8" />

  return (
    <Tabs defaultValue={initTheme}>
      <TabsList className="grid grid-cols-2 h-auto w-44">
        <TabsTrigger value="dark" onClick={() => setTheme("dark")}>
          <MoonIcon className="w-4 h-4 mr-2" />
          Dark
        </TabsTrigger>
        <TabsTrigger value="light" onClick={() => setTheme("light")}>
          <SunIcon className="w-4 h-4 mr-2" />
          Light
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
