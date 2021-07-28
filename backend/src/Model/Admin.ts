export default class Admin {
  constructor(
    private id: string,
    private username: string,
    private passwordHash: string,
  ) {}

  getId(): string {
    return this.id;
  }

  getUsername(): string {
    return this.username;
  }

  getPasswordHash(): string {
    return this.passwordHash;
  }

  setetId(id: string): void {
    this.id = id;
  }

  setetUsername(username: string): void {
    this.username = username;
  }

  setPasswordHash(passwordHash: string): void {
    this.passwordHash = passwordHash;
  }
}
