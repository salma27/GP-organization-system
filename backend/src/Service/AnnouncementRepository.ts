import Announcement from "@app/Model/Announcement";

export default interface AnnouncementRepository {
  save(announcement: Announcement): Promise<void>;
  getById(id: string): Promise<Announcement>;
  getAll(): Promise<Announcement[]>;
}
