import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  dbCredentials: {
    url: ".data/db.sqlite",
  },
  introspect: {
    casing: "camel",
  },
  out: "electron/db/migrations",
  schema: "electron/db/schema/*",
  verbose: true,
});
