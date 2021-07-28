import Notification from "@app/Model/Notification";

export interface NotificationObject {
  date: Date;
  isRead: boolean;
  id: string;
  title: string;
  content: string;
  ownerId: string;
}

export default class NotificationTransformer {
  constructor() {}

  toObject(noti: Notification): NotificationObject {
    return {
      date: noti.getDate(),
      isRead: noti.getIsRead(),
      id: noti.getId(),
      title: noti.getTitle(),
      content: noti.getContent(),
      ownerId: noti.getOwnerId(),
    };
  }

  toEntity(object: NotificationObject): Notification {
    const noti = new Notification(
      object.id,
      object.title,
      object.content,
      object.ownerId,
    );
    noti.setIsRead(object.isRead);
    noti.setDate(object.date);
    return noti;
  }
}
