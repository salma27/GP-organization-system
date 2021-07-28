import Department from "@app/Model/Department";

export default interface DepartmentRepository {
  save(dep: Department): Promise<void>;
  update(dep: Department): Promise<void>;
  delete(id: string): Promise<void>;
  getAll(): Promise<Department[]>;
  getById(id: string): Promise<Department>;
}
