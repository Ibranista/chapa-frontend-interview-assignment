import { setupServer } from "msw/node";

import { handlers } from "./handlers";

// requests interception using the given handlers
export const server = setupServer(...handlers);
