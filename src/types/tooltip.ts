import type { ReactNode, RefObject } from "react";
import type { Tooltip as ChakraTooltip } from "@chakra-ui/react";

export interface TooltipProps extends ChakraTooltip.RootProps {
  showArrow?: boolean;
  portalled?: boolean;
  portalRef?: RefObject<HTMLElement>;
  content: ReactNode;
  contentProps?: any;
  disabled?: boolean;
} 