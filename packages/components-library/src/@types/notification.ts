export interface NotificationResponse {
  id: number;
  title?: string;
  description?: string;
  category?: string;
  data?: NotificationData;
  status?: NotificationStatus;
  notify_at?: number;
}

export type NotificationData = {
  DEEPLINK?: string;
};

export enum NotificationStatus {
  Read = 'READ',
  UnRead = 'UNREAD',
}
