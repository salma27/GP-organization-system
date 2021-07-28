import Notification from "@app/Model/Notification";
import { v4 as uuidv4 } from "uuid";

export default class NotificationFactory {
  create(title: string, content: string, ownerId: string): Notification {
    const id = uuidv4();
    const noti = new Notification(id, title, content, ownerId);
    return noti;
  }
  createEmpty(): Notification {
    const id = uuidv4();
    const noti = new Notification(id, "", "", "");
    return noti;
  }
}
