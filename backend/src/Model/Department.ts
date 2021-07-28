export default class Department {
  constructor(
    private id: string,
    private name: string,
    private maxNumberOfStudents: number,
    private maxNumberOfSupervisors: number,
    private minNumberOfStudents: number,
    private minNumberOfSupervisors: number,
  ) {}

  getId(): string {
    return this.id;
  }
  getName(): string {
    return this.name;
  }
  getMaxNumberOfStudents(): number {
    return this.maxNumberOfStudents;
  }
  getMaxNumberOfSupervisors(): number {
    return this.maxNumberOfSupervisors;
  }
  getMinNumberOfStudents(): number {
    return this.minNumberOfStudents;
  }
  getMinNumberOfSupervisors(): number {
    return this.minNumberOfSupervisors;
  }

  setId(id: string): void {
    this.id = id;
  }
  setName(name: string): void {
    this.name = name;
  }
  setMaxNumberOfStudents(maxNumberOfStudents: number): void {
    this.maxNumberOfStudents = maxNumberOfStudents;
  }
  setMaxNumberOfSupervisors(maxNumberOfSupervisors: number): void {
    this.maxNumberOfSupervisors = maxNumberOfSupervisors;
  }
  setMinNumberOfStudents(minNumberOfStudents: number): void {
    this.minNumberOfStudents = minNumberOfStudents;
  }
  setMinNumberOfSupervisors(minNumberOfSupervisors: number): void {
    this.minNumberOfSupervisors = minNumberOfSupervisors;
  }
}
