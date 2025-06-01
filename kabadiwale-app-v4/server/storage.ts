import { 
  users, type User, type InsertUser,
  bookings, type Booking, type InsertBooking, type UpdateBooking
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Bookings
  getBookings(): Promise<Booking[]>;
  getBooking(id: number): Promise<Booking | undefined>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBooking(id: number, data: UpdateBooking): Promise<Booking | undefined>;
  deleteBooking(id: number): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Bookings
  async getBookings(): Promise<Booking[]> {
    return await db.select()
      .from(bookings)
      .orderBy(desc(bookings.createdAt));
  }

  async getBooking(id: number): Promise<Booking | undefined> {
    const [booking] = await db.select().from(bookings).where(eq(bookings.id, id));
    return booking;
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const now = new Date().toISOString();
    const bookingData = {
      ...insertBooking,
      status: insertBooking.status || "pending",
      createdAt: now
    };
    
    const [booking] = await db
      .insert(bookings)
      .values(bookingData)
      .returning();
    return booking;
  }

  async updateBooking(id: number, data: UpdateBooking): Promise<Booking | undefined> {
    const [updated] = await db
      .update(bookings)
      .set(data)
      .where(eq(bookings.id, id))
      .returning();
    
    return updated;
  }

  async deleteBooking(id: number): Promise<boolean> {
    await db.delete(bookings).where(eq(bookings.id, id));
    return true; // Postgres doesn't return affected rows in the same way
  }
  
  // Initialize with some demo data
  async initializeData() {
    try {
      // Check if admin user exists
      const adminExists = await this.getUserByUsername("admin");
      
      if (!adminExists) {
        // Create admin user with all required fields
        await this.createUser({
          username: "admin",
          password: "admin123", // In a real app, this would be hashed
          fullName: "Admin User",
          email: "admin@example.com",
          role: "admin",
          createdAt: new Date().toISOString(),
        });
        console.log("Created admin user");
      }
    } catch (error) {
      console.error("Error initializing data:", error);
    }
  }
}

// Create and export the database storage
export const storage = new DatabaseStorage();

// Initialize database with demo data
(async () => {
  await storage.initializeData();
})();
