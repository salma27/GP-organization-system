import Team from "@app/Model/Team";

export default interface TeamRepository {
  getById(id: string): Promise<Team>;
  save(team: Team): Promise<void>;
  update(team: Team): Promise<void>;
  remove(id: string): Promise<void>;
  getAll(): Promise<Team[]>;
}
