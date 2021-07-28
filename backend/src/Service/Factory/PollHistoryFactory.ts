import PollHistory from "@app/Model/PollHistory";
import { v4 as uuidv4 } from "uuid";

export default class PollHistoryFactory {
  create(senderId: string, receiverId: string): PollHistory {
    const id = uuidv4();
    const history = new PollHistory(id, senderId, receiverId);
    return history;
  }
}
