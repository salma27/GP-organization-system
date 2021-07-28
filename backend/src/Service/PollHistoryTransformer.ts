import PollHistory from "@app/Model/PollHistory";

export interface PollHistoryObject {
  id: string;
  senderId: string;
  receiverId: string;
}

export default class PollHistoryTransformer {
  constructor() {}

  toObject(pollHistory: PollHistory): PollHistoryObject {
    return {
      id: pollHistory.getId(),
      senderId: pollHistory.getSenderId(),
      receiverId: pollHistory.getReceiverId(),
    };
  }

  toEntity(object: PollHistoryObject): PollHistory {
    const pollHistory = new PollHistory(
      object.id,
      object.senderId,
      object.receiverId,
    );
    return pollHistory;
  }
}
