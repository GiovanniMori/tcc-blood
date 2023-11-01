"use client";

import { useTheme } from "next-themes";
import { TailSpin } from "react-loader-spinner";

export default function Loader() {
  const { theme } = useTheme();
  return (
    <TailSpin
      height={16}
      width={16}
      ariaLabel="tail-spin-loading"
      color={theme === "dark" ? "#FFF" : "#000"}
    />
  );
}
