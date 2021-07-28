import Student from "@app/Model/Student";
import DepartmentRepository from "@app/Service/DepartmentRepository";
import TechnologyRepository from "@app/Service/TechnologyRepository";

export interface StudentObject {
  ecomId: string;
  name: string;
  bio: string;
  departmentId: string;
  technologyIds: string[];
  passwordHash: string;
  teamId: string;
}

export default class StudentTransformer {
  constructor(
    private departmentRepository: DepartmentRepository,
    private technologyRepository: TechnologyRepository,
  ) {}

  toObject(student: Student): StudentObject {
    return {
      ecomId: student.getEcomId(),
      name: student.getName(),
      bio: student.getBio(),
      departmentId: student.getDepartment().getId(),
      technologyIds: student
        .getTechnologies()
        .map((technology) => technology.getId()),
      passwordHash: student.getPasswordHash(),
      teamId: student.getTeamId()
    };
  }

  async toEntity(object: StudentObject): Promise<Student> {
    return new Student(
      object.ecomId,
      object.name,
      object.bio,
      await this.departmentRepository.getById(object.departmentId),
      await Promise.all(
        object.technologyIds.map(async (id) =>
          this.technologyRepository.getById(id),
        ),
      ),
      object.passwordHash,
      object.teamId
    );
  }
}
