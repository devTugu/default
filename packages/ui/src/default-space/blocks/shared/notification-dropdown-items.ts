export type NotificationInboxItem = {
  id: string;
  name: string;
  avatarUrl: string;
  time: string;
  meta: string;
  unread?: boolean;
  body?: string;
  attachmentLabel?: string;
  showActions?: boolean;
};

export const DEMO_INBOX_NOTIFICATIONS: NotificationInboxItem[] = [
  {
    id: "mark",
    name: "Mark Bush",
    avatarUrl: "https://images.shadcnspace.com/assets/profiles/user-2.jpg",
    time: "12 Minutes ago",
    meta: "New post",
    unread: true,
  },
  {
    id: "aaron",
    name: "Aaron Black",
    avatarUrl: "https://images.shadcnspace.com/assets/profiles/user-3.jpg",
    time: "27 Minutes ago",
    meta: "New comment",
    unread: true,
  },
  {
    id: "anna",
    name: "Anna",
    avatarUrl: "https://images.shadcnspace.com/assets/profiles/user-4.jpg",
    time: "2 hours ago",
    meta: "Campaign",
    body: "Anna has applied to create an ad for your campaign.",
    showActions: true,
    unread: true,
  },
  {
    id: "jason",
    name: "Jason",
    avatarUrl: "https://images.shadcnspace.com/assets/profiles/user-5.jpg",
    time: "3 hours ago",
    meta: "Attachment",
    body: "Jason attached the file",
    attachmentLabel: "Work examples.com",
    unread: true,
  },
];

export const DEMO_GENERAL_NOTIFICATIONS: NotificationInboxItem[] = [
  {
    id: "system",
    name: "System",
    avatarUrl: "https://images.shadcnspace.com/assets/profiles/user-6.jpg",
    time: "Yesterday",
    meta: "Maintenance",
    body: "Scheduled maintenance completed successfully.",
  },
];
