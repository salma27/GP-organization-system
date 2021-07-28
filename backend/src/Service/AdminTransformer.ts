import Admin from "@app/Model/Admin";

export interface AdminObject {
  id: string;
  username: string;
  passwordHash: string;
}

export default class AdminTransformer {
  constructor() {}

  toObject(supervisor: Admin): AdminObject {
    return {
      id: supervisor.getId(),
      username: supervisor.getUsername(),
      passwordHash: supervisor.getPasswordHash(),
    };
  }

  toEntity(object: AdminObject): Admin {
    return new Admin(object.id, object.username, object.passwordHash);
  }
}
