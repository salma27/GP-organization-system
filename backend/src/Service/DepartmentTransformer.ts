import Department from "@app/Model/Department";

export interface DepartmentObject {
  id: string;
  name: string;
  maxNumberOfStudents: number;
  maxNumberOfSupervisors: number;
  minNumberOfStudents: number;
  minNumberOfSupervisors: number;
}

export default class DepartmentTransformer {
  toObject(department: Department): DepartmentObject {
    return {
      id: department.getId(),
      name: department.getName(),
      maxNumberOfStudents: department.getMaxNumberOfStudents(),
      maxNumberOfSupervisors: department.getMaxNumberOfSupervisors(),
      minNumberOfStudents: department.getMinNumberOfStudents(),
      minNumberOfSupervisors: department.getMinNumberOfSupervisors(),
    };
  }

  toEntity(object: DepartmentObject): Department {
    return new Department(
      object.id,
      object.name,
      object.maxNumberOfStudents,
      object.maxNumberOfSupervisors,
      object.minNumberOfStudents,
      object.minNumberOfSupervisors,
    );
  }
}
