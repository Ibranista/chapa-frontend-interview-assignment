import type * as ChakraDrawer from "@chakra-ui/react";

export interface DrawerContentProps extends ChakraDrawer.ContentProps {
  portalled?: boolean;
  portalRef?: React.RefObject<HTMLElement | null>;
  offset?: ChakraDrawer.ContentProps["padding"];
} 