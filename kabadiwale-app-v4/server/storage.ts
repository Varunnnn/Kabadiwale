// server/storage.ts

import { app_users, type AppUser, type InsertAppUser } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: number): Promise<AppUser | undefined>;
  getUserByMobile(mobile_number: string): Promise<AppUser | undefined>;
  createUser(user: InsertAppUser): Promise<AppUser>;
}

export class DatabaseStorage implements IStorage {
  // Get user by ID
  async getUser(id: number): Promise<AppUser | undefined> {
    const [user] = await db.select().from(app_users).where(eq(app_users.id, id));
    return user;
  }

  // Get user by mobile number
  async getUserByMobile(mobile_number: string): Promise<AppUser | undefined> {
    const [user] = await db.select().from(app_users).where(eq(app_users.mobile_number, mobile_number));
    return user;
  }

  // Create user
  async createUser(user: InsertAppUser): Promise<AppUser> {
    const [newUser] = await db.insert(app_users).values(user).returning();
    return newUser;
  }

  // Optional: initialize with a test user
  async initializeData() {
    try {
      const testMobile = "9999999999";
      const user = await this.getUserByMobile(testMobile);
      if (!user) {
        await this.createUser({
          mobile_number: testMobile,
          otp: "123456"
        });
        console.log("Created test user with mobile:", testMobile);
      }
    } catch (error) {
      console.error("Error initializing data:", error);
    }
  }
}

export const storage = new DatabaseStorage();

(async () => {
  await storage.initializeData();
})();
