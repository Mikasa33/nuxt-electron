import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  dbCredentials: {
    url: ".data/db.sqlite",
  },
  introspect: {
    casing: "camel",
  },
  out: "src/main/db/migrations",
  schema: "src/main/db/schema/*",
  verbose: true,
});
