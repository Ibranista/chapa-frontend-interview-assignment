import type { ThemeProviderProps } from "next-themes";
import type { IconButtonProps } from "@chakra-ui/react";

export interface ColorModeProviderProps extends ThemeProviderProps {}

export type ColorMode = "light" | "dark";

export interface UseColorModeReturn {
  colorMode: ColorMode;
  setColorMode: (colorMode: ColorMode) => void;
  toggleColorMode: () => void;
}

export interface ColorModeButtonProps extends Omit<IconButtonProps, "aria-label"> {} 