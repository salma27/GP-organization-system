import Notification from "@app/Model/Notification";

export default interface NotificationRepository {
  save(notification: Notification): Promise<void>;
  update(notification: Notification): Promise<void>;
  getById(id: string): Promise<Notification>;
  getByOwnerId(id: string): Promise<Notification[]>;
  deleteAllByOwnerId(id: string): Promise<void>;
  readAllByOwnerId(id: string): Promise<void>;
  deleteOneById(id: string): Promise<void>;
  readOneById(id: string): Promise<void>;
}
