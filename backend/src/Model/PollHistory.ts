export default class PollHistory {
  constructor(
    private id: string,
    private senderId: string,
    private receiverId: string,
  ) {}

  getId(): string {
    return this.id;
  }

  getSenderId(): string {
    return this.senderId;
  }

  getReceiverId(): string {
    return this.receiverId;
  }
  setId(id: string): void {
    this.id = id;
  }

  setSenderId(senderId: string): void {
    this.senderId = senderId;
  }

  setReceiverId(receiverId: string): void {
    this.receiverId = receiverId;
  }
}
