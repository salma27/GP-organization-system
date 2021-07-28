import Student from "@app/Model/Student";
import Technology from "@app/Model/Technology";
import Department from "@app/Model/Department";

export default interface StudentRepository {
  update(student: Student): Promise<void>;
  updateId(student: Student, id: string): Promise<void>;
  save(student: Student): Promise<string>;
  getById(ecomId: string): Promise<Student>;
  getTeams(): Promise<string[]>;
  removeById(id: string): Promise<void>;
  getCount():Promise<number>;
  getTeamsCount():Promise<number>;
  getSingleStudentsCount():Promise<number>;
  getCountByDepartment():Promise<any[]>;
  getSingleStudentsByDepartment(): Promise<any[]>;
  getTeamsByDepartment(): Promise<any[]>
  getByTeamId(teamId: string): Promise<Student[]>;
  getByFilter(
    name: string | null,
    ecomId: string | null,
    technologies: string[] | null,
    department: string | null,
  ): Promise<Student[]>;
}
