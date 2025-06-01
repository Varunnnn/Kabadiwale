import { Booking } from "@shared/schema";
import fs from 'fs';
import path from 'path';
import http from 'http';
import https from 'https';

// Directory to store notification logs
const NOTIFICATION_DIR = path.join(process.cwd(), 'notifications');

// Ensure notification directory exists
try {
  if (!fs.existsSync(NOTIFICATION_DIR)) {
    fs.mkdirSync(NOTIFICATION_DIR, { recursive: true });
  }
} catch (error) {
  console.error('Error creating notification directory:', error);
}

/**
 * Notification preferences type
 */
export type NotificationPreference = 'email' | 'whatsapp' | 'sms' | 'all';

/**
 * Custom notification system that logs messages to files and can send via multiple channels
 */
export class NotificationService {
  /**
   * Send booking confirmation notification through selected channels
   */
  static async sendBookingConfirmation(
    booking: Booking, 
    channels: NotificationPreference = 'all',
    phone?: string,
    email?: string
  ): Promise<boolean> {
    try {
      // Create notification content
      const emailContent = this.createBookingConfirmationEmailContent(booking);
      const whatsappContent = this.createBookingConfirmationWhatsappContent(booking);
      
      // Log notification for debugging/audit
      this.logNotification('booking-confirmation', booking.id, emailContent);
      
      // Send via specified channels
      if (channels === 'all' || channels === 'email') {
        await this.sendEmail(
          email || 'customer@example.com', 
          `Booking Confirmation #${booking.id}`, 
          emailContent
        );
      }
      
      if (channels === 'all' || channels === 'whatsapp') {
        await this.sendWhatsAppMessage(
          phone || '+919876543210',
          whatsappContent
        );
      }
      
      console.log(`Notification sent for booking #${booking.id} via ${channels}`);
      return true;
    } catch (error) {
      console.error('Error sending notification:', error);
      return false;
    }
  }

  /**
   * Send booking status update notification
   */
  static async sendStatusUpdateNotification(
    booking: Booking,
    channels: NotificationPreference = 'all',
    phone?: string,
    email?: string
  ): Promise<boolean> {
    try {
      // Create notification content
      const emailContent = this.createStatusUpdateEmailContent(booking);
      const whatsappContent = this.createStatusUpdateWhatsappContent(booking);
      
      // Log notification for debugging/audit
      this.logNotification('status-update', booking.id, emailContent);
      
      // Send via specified channels
      if (channels === 'all' || channels === 'email') {
        await this.sendEmail(
          email || 'customer@example.com', 
          `Booking Status Update #${booking.id}`, 
          emailContent
        );
      }
      
      if (channels === 'all' || channels === 'whatsapp') {
        await this.sendWhatsAppMessage(
          phone || '+919876543210',
          whatsappContent
        );
      }
      
      console.log(`Status update notification sent for booking #${booking.id} via ${channels}`);
      return true;
    } catch (error) {
      console.error('Error sending status update notification:', error);
      return false;
    }
  }

  /**
   * Log notification to file system
   */
  private static logNotification(type: string, bookingId: number, content: string): void {
    try {
      const timestamp = new Date().toISOString();
      const fileName = `${type}-${bookingId}-${timestamp.replace(/:/g, '-')}.txt`;
      const filePath = path.join(NOTIFICATION_DIR, fileName);
      
      // Write notification content to file
      fs.writeFileSync(filePath, content);
    } catch (error) {
      console.error('Error logging notification:', error);
    }
  }

  /**
   * Send email notification
   * This is a mock implementation - in production, use a real email service
   */
  private static async sendEmail(to: string, subject: string, content: string): Promise<boolean> {
    // Mock implementation - in production, integrate with a real email service
    console.log(`Sending email to: ${to}`);
    console.log(`Subject: ${subject}`);
    
    // Log this as if it were sent
    const emailLog = `
TO: ${to}
SUBJECT: ${subject}
CONTENT:
${content}
    `;
    
    const timestamp = new Date().toISOString();
    const fileName = `email-${timestamp.replace(/:/g, '-')}.txt`;
    const filePath = path.join(NOTIFICATION_DIR, fileName);
    
    fs.writeFileSync(filePath, emailLog);
    
    // In a real implementation, this would call an email service API
    return true;
  }

  /**
   * Send WhatsApp message
   * This is a mock implementation - in production, use WhatsApp Business API
   */
  private static async sendWhatsAppMessage(to: string, content: string): Promise<boolean> {
    // Mock implementation - in production, integrate with WhatsApp Business API
    console.log(`Sending WhatsApp message to: ${to}`);
    
    // Log this as if it were sent
    const whatsappLog = `
TO: ${to}
CONTENT:
${content}
    `;
    
    const timestamp = new Date().toISOString();
    const fileName = `whatsapp-${timestamp.replace(/:/g, '-')}.txt`;
    const filePath = path.join(NOTIFICATION_DIR, fileName);
    
    fs.writeFileSync(filePath, whatsappLog);
    
    // In a real implementation, this would call the WhatsApp API
    return true;
  }

  /**
   * Create the content for a booking confirmation email
   */
  private static createBookingConfirmationEmailContent(booking: Booking): string {
    const itemsList = booking.scrapCategories
      .map(item => item.replace('_', ' '))
      .map(item => item.charAt(0).toUpperCase() + item.slice(1))
      .join(', ');

    const timeSlotMap: Record<string, string> = {
      'morning': 'Morning (8:00 AM - 12:00 PM)',
      'afternoon': 'Afternoon (12:00 PM - 4:00 PM)',
      'evening': 'Evening (4:00 PM - 8:00 PM)'
    };
    
    const timeSlot = timeSlotMap[booking.timeSlot] || booking.timeSlot;
    
    return `
=== KABADIWALE BOOKING CONFIRMATION ===

Dear ${booking.name},

Thank you for booking a scrap pickup with Kabadiwale! Your booking has been confirmed.

Booking Details:
-----------------
Booking ID: ${booking.id}
Items: ${itemsList}
Address: ${booking.address}
Date: ${booking.pickupDate}
Time Slot: ${timeSlot}
Payment Method: ${booking.paymentMethod.toUpperCase()}

Our team will arrive at your location during the selected time slot. 
Please ensure someone is available to provide access to the scrap materials.

If you need to make any changes to your booking, please contact us at:
Phone: +91 98765 43210
Email: support@kabadiwale.com

Thank you for choosing Kabadiwale!

Regards,
The Kabadiwale Team
`;
  }

  /**
   * Create the content for a booking confirmation WhatsApp message
   */
  private static createBookingConfirmationWhatsappContent(booking: Booking): string {
    const itemsList = booking.scrapCategories
      .map((item: string) => item.replace('_', ' '))
      .map((item: string) => item.charAt(0).toUpperCase() + item.slice(1))
      .join(', ');

    const timeSlotMap: Record<string, string> = {
      'morning': 'Morning (8:00 AM - 12:00 PM)',
      'afternoon': 'Afternoon (12:00 PM - 4:00 PM)',
      'evening': 'Evening (4:00 PM - 8:00 PM)'
    };
    
    const timeSlot = timeSlotMap[booking.timeSlot] || booking.timeSlot;
    
    // WhatsApp messages should be more concise
    return `🎉 *KABADIWALE BOOKING CONFIRMED* 🎉

Thank you for your booking with Kabadiwale, ${booking.name}!

*Booking ID:* #${booking.id}
*Items:* ${itemsList}
*Address:* ${booking.address}
*Date:* ${booking.pickupDate}
*Time Slot:* ${timeSlot}
*Payment:* ${booking.paymentMethod.toUpperCase()}

Our team will arrive at the scheduled time. For any changes, please call us at +91 98765 43210.

Thank you for choosing Kabadiwale! ♻️`;
  }

  /**
   * Create the content for a status update email
   */
  private static createStatusUpdateEmailContent(booking: Booking): string {
    const statusMessages: Record<string, string> = {
      'pending': 'is currently pending. Our team will process it shortly.',
      'confirmed': 'has been confirmed. Our team will arrive as scheduled.',
      'completed': 'has been completed. Thank you for using our service!',
      'cancelled': 'has been cancelled. If this was not expected, please contact us.'
    };
    
    const statusMessage = statusMessages[booking.status] || 'has been updated.';
    
    return `
=== KABADIWALE STATUS UPDATE ===

Dear ${booking.name},

Your booking #${booking.id} ${statusMessage}

Booking Details:
-----------------
Booking ID: ${booking.id}
Status: ${booking.status.toUpperCase()}
Date: ${booking.pickupDate}
Address: ${booking.address}

If you have any questions, please contact us at:
Phone: +91 98765 43210
Email: support@kabadiwale.com

Thank you for choosing Kabadiwale!

Regards,
The Kabadiwale Team
`;
  }

  /**
   * Create the content for a status update WhatsApp message
   */
  private static createStatusUpdateWhatsappContent(booking: Booking): string {
    const statusEmojis: Record<string, string> = {
      'pending': '⏳',
      'confirmed': '✅',
      'completed': '🎉',
      'cancelled': '❌'
    };
    
    const emoji = statusEmojis[booking.status] || '📝';
    
    const statusMessages: Record<string, string> = {
      'pending': 'is currently pending. Our team will process it shortly.',
      'confirmed': 'has been confirmed. Our team will arrive as scheduled.',
      'completed': 'has been completed. Thank you for using our service!',
      'cancelled': 'has been cancelled. If this was not expected, please contact us.'
    };
    
    const statusMessage = statusMessages[booking.status] || 'has been updated.';
    
    // WhatsApp messages should be more concise
    return `${emoji} *KABADIWALE STATUS UPDATE* ${emoji}

Hello ${booking.name},

Your booking #${booking.id} ${statusMessage}

*Status:* ${booking.status.toUpperCase()}
*Date:* ${booking.pickupDate}

For any questions, please call +91 98765 43210.

Thank you for choosing Kabadiwale! ♻️`;
  }
}