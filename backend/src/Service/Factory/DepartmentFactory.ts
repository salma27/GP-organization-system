import Department from "@app/Model/Department";
import { v4 as uuidv4 } from "uuid";

export default class DepartmentFactory {
  private getInitials(name: string): string {
    let componentsArray: string[] = name.trim().split(" ");
    let initials = "";
    componentsArray.forEach(
      (word: string) => (initials += word.trim().charAt(0)),
    );
    return initials.toUpperCase();
  }
  create(
    name: string,
    maxNumberOfStudents: number,
    maxNumberOfSupervisors: number,
    minNumberOfStudents: number,
    minNumberOfSupervisors: number,
  ): Department {
    const id = this.getInitials(name);
    return new Department(
      id,
      name,
      maxNumberOfStudents,
      maxNumberOfSupervisors,
      minNumberOfStudents,
      minNumberOfSupervisors,
    );
  }
}
