import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const scrapCategories = [
  "metal",
  "paper",
  "plastic",
  "milk_packets",
  "e_waste",
  "others",
] as const;

export const timeSlots = [
  "morning",
  "afternoon",
  "evening",
] as const;

export const paymentMethods = [
  "upi",
  "cash",
] as const;

export const bookingStatuses = [
  "pending",
  "confirmed",
  "completed",
  "cancelled",
] as const;

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  address: text("address").notNull(),
  pickupDate: text("pickup_date").notNull(),
  timeSlot: text("time_slot").notNull(),
  scrapCategories: text("scrap_categories").array().notNull(),
  paymentMethod: text("payment_method").notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: text("created_at").notNull(),
});

export const insertBookingSchema = createInsertSchema(bookings)
  .omit({ id: true, createdAt: true })
  .extend({
    scrapCategories: z.array(z.enum(scrapCategories)),
    timeSlot: z.enum(timeSlots),
    paymentMethod: z.enum(paymentMethods),
    status: z.enum(bookingStatuses).optional(),
  });

export const updateBookingSchema = z.object({
  status: z.enum(bookingStatuses),
});

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type UpdateBooking = z.infer<typeof updateBookingSchema>;
export type Booking = typeof bookings.$inferSelect;

// Users schema with all required fields
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  role: text("role").notNull(),
  createdAt: text("created_at").notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
