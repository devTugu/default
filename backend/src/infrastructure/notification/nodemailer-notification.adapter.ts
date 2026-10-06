import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ContactNotificationPayload,
  INotificationPort,
} from '@application/ports/notification.port';

@Injectable()
export class NodemailerNotificationAdapter implements INotificationPort {
  private readonly logger = new Logger(NodemailerNotificationAdapter.name);

  constructor(private readonly config: ConfigService) {}

  async sendContactNotification(
    payload: ContactNotificationPayload,
  ): Promise<void> {
    const notifyEmail = this.config.get<string>('CONTACT_NOTIFY_EMAIL');
    const from = this.config.get<string>('SMTP_FROM', 'noreply@example.com');
    if (!notifyEmail) {
      this.logger.warn('CONTACT_NOTIFY_EMAIL not set; skipping email.');
      return;
    }

    try {
      const nodemailer = await import('nodemailer');
      const transporter = nodemailer.createTransport({
        host: this.config.getOrThrow<string>('SMTP_HOST'),
        port: this.config.get<number>('SMTP_PORT', 587),
        secure: this.config.get<number>('SMTP_PORT', 587) === 465,
        auth: {
          user: this.config.get<string>('SMTP_USER'),
          pass: this.config.get<string>('SMTP_PASS'),
        },
      });

      const displayName = this.config.get<string>(
        'APP_DISPLAY_NAME',
        'Website Template',
      );
      const subjectPrefix = `[${displayName}]`;
      await transporter.sendMail({
        from,
        to: notifyEmail,
        subject: payload.subject
          ? `${subjectPrefix} ${payload.subject}`
          : `${subjectPrefix} New message`,
        text: `From: ${payload.name} <${payload.email}>\n\n${payload.message}`,
      });
    } catch (error) {
      this.logger.warn(
        `Failed to send contact notification: ${error instanceof Error ? error.message : 'unknown'}`,
      );
    }
  }

  async sendContactAutoReply(
    payload: ContactNotificationPayload,
  ): Promise<void> {
    const from = this.config.get<string>('SMTP_FROM', 'noreply@example.com');
    const brandName = this.config.get<string>(
      'APP_DISPLAY_NAME',
      'Website Template',
    );

    try {
      const nodemailer = await import('nodemailer');
      const transporter = nodemailer.createTransport({
        host: this.config.getOrThrow<string>('SMTP_HOST'),
        port: this.config.get<number>('SMTP_PORT', 587),
        secure: this.config.get<number>('SMTP_PORT', 587) === 465,
        auth: {
          user: this.config.get<string>('SMTP_USER'),
          pass: this.config.get<string>('SMTP_PASS'),
        },
      });

      await transporter.sendMail({
        from: `"${brandName}" <${from}>`,
        to: payload.email,
        subject: 'We received your message',
        text: `Hi ${payload.name},\n\nThank you for contacting us. We have received your message and will get back to you soon.\n\n— ${brandName}`,
      });
    } catch (error) {
      this.logger.warn(
        `Failed to send contact auto-reply: ${error instanceof Error ? error.message : 'unknown'}`,
      );
    }
  }
}
