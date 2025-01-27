import dotenv from "dotenv";

if (process.env.NODE_ENV === "production") {
    dotenv.config({ path: ".env.prod" });
} else {
    dotenv.config({ path: ".env.dev" });
}

import { startServer } from "./src/server";
startServer();
