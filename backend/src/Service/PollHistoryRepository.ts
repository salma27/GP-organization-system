import PollHistory from "@app/Model/PollHistory";

export default interface PollHistoryRepository {
  save(pollHistory: PollHistory): Promise<void>;
  remove(id: string): Promise<void>;
  getById(id: string): Promise<PollHistory>;
  getBySenderAndReceiver(senderId: string,receiverId: string,): Promise<PollHistory>;
}
