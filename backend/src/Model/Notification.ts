export default class Notification {
  private date: Date;
  private isRead: boolean;
  constructor(
    private id: string,
    private title: string,
    private content: string,
    private ownerId: string,
  ) {
    this.date = new Date();
    this.isRead = false;
  }

  getId(): string {
    return this.id;
  }
  getDate(): Date {
    return this.date;
  }
  getIsRead(): boolean {
    return this.isRead;
  }
  getTitle(): string {
    return this.title;
  }
  getContent(): string {
    return this.content;
  }
  getOwnerId(): string {
    return this.ownerId;
  }
  setId(id: string): void {
    this.id = id;
  }
  setDate(date: Date): void {
    this.date = date;
  }
  setIsRead(isRead: boolean): void {
    this.isRead = isRead;
  }
  setTitle(title: string): void {
    this.title = title;
  }
  setContent(content: string): void {
    this.content = content;
  }
  setOwnerId(ownerId: string): void {
    this.ownerId = ownerId;
  }
}
