import Technology from "@app/Model/Technology";

export default interface TechnologyRepository {
  getById(id: string): Promise<Technology>;
  getAll(): Promise<Technology[]>;
  save(tech: Technology): Promise<void>;
  update(tech: Technology, id: string): Promise<void>;
  delete(id: string): Promise<void>;
}
