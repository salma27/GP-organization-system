import Poll from "@app/Model/Poll";

export default interface PollRepository {
  getById(id: string): Promise<Poll>;
  getByTeamId(id: string): Promise<Poll[]>;
  save(poll: Poll): Promise<void>;
  update(poll: Poll): Promise<void>;
  getAllPollsForOwner(ownerId: string): Promise<Poll[]>;
  removeById(id: string): Promise<void>;
  remove(id: string): Promise<void>;
}
