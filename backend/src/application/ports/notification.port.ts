export interface ContactNotificationPayload {
  name: string;
  email: string;
  subject?: string | null;
  message: string;
}

export interface INotificationPort {
  sendContactNotification(payload: ContactNotificationPayload): Promise<void>;
  sendContactAutoReply(payload: ContactNotificationPayload): Promise<void>;
}
