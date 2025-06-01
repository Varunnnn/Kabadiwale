# Kabadiwale App - v4

## Overview
Kabadiwale is a web platform for scheduling scrap collection services with category selection and pickup scheduling. This version includes enhanced UI features, database integration, and an improved day/night theme system.

## Features
- **Responsive design** for both mobile and desktop
- **Interactive booking form** for scheduling pickups
- **PostgreSQL database** integration for persistent data storage
- **Enhanced day/night theme** with auto-detection based on system preferences and time of day
- **Interactive "How It Works" section** with step visualization
- **Custom notification system** for booking confirmations and updates
- **Admin dashboard** for managing bookings
- **Smooth animations and transitions** for better user experience

## Technical Stack
- **Frontend**: React, TypeScript, TailwindCSS, Shadcn UI components
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL
- **State Management**: React Query
- **Form Management**: React Hook Form with Zod validation

## Installation and Setup

### Prerequisites
- Node.js (v18+)
- PostgreSQL database

### Environment Variables
Create a `.env` file in the root directory with the following variables:
```
DATABASE_URL=postgresql://username:password@hostname:port/database
```

### Setup Steps

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create database tables**
   ```bash
   npm run db:push
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Start production server**
   ```bash
   npm start
   ```

## Theme System

The app features an enhanced theme system with three modes:
- **Light Mode**: Classic bright interface
- **Dark Mode**: Eye-friendly dark interface
- **System Mode**: Automatically switches between light and dark based on:
  - User's system preference
  - Time of day (switches to dark mode between 7PM and 6AM)

## Notification System

The app includes a custom notification system that can:
- Send booking confirmations via email/WhatsApp (mock implementation)
- Send status updates for bookings
- Log all notifications for auditing and debugging

## Admin Access

Default admin credentials:
- Username: admin
- Password: admin123

(Note: In a production environment, you should change these credentials and use proper password hashing)

## Project Structure
- `/client` - Frontend React application
- `/server` - Backend Express server
- `/shared` - Shared types and schemas
- `/notifications` - Notification logs

## License
This project is proprietary and confidential. Unauthorized copying or distribution is prohibited.

## Version
4.0.0 - May 2024