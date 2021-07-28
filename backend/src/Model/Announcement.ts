export default class Announcement {
  constructor(
    private id: string,
    private title: string,
    private content: string,
    private date: Date,
  ) {}

  getId(): string {
    return this.id;
  }
  getTitle(): string {
    return this.title;
  }
  getContent(): string {
    return this.content;
  }
  getDate(): Date {
    return this.date;
  }
  setTitle(title: string): void {
    this.title = title;
  }
  setContent(content: string): void {
    this.content = content;
  }
  setDate(date: Date): void {
    this.date = date;
  }
}
