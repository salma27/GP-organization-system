export default class Team {
  constructor(
    private id: string,
    private name: string,
    private departmentId: string,
  ) {}

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }
  getDepartmentId() {
    return this.departmentId;
  }
}
