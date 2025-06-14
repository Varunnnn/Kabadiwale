// shared/schema.ts

import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";

// Define app_users table
export const app_users = pgTable("app_users", {
  id: serial("id").primaryKey(),
  mobile_number: varchar("mobile_number", { length: 15 }).notNull(),
  otp: varchar("otp", { length: 6 }),
  created_at: timestamp("created_at").defaultNow(),
});

// Export types for app_users
export type AppUser = typeof app_users.$inferSelect;
export type InsertAppUser = typeof app_users.$inferInsert;
export type UpdateAppUser = Partial<InsertAppUser>;
