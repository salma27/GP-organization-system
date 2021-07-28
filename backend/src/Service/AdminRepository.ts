import Admin from "@app/Model/Admin";

export default interface AdminRepository {
  getByUsername(username: string): Promise<Admin>;
  getById(id: string): Promise<Admin>;
}
