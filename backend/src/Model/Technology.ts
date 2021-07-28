export default class Technology {
  constructor(private id: string, private name: string) {}

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }
}
