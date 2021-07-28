import Announcement from "@app/Model/Announcement";

export interface AnnouncementObject {
  id: string;
  title: string;
  content: string;
  date: Date;
}

export default class AnnouncementTransformer {
  toObject(announcement: Announcement): AnnouncementObject {
    return {
      id: announcement.getId(),
      title: announcement.getTitle(),
      content: announcement.getContent(),
      date: announcement.getDate(),
    };
  }

  toEntity(object: AnnouncementObject): Announcement {
    return new Announcement(object.id,object.title, object.content, object.date);
  }
}
