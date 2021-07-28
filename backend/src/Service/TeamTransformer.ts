import Team from "@app/Model/Team";

export interface TeamObject {
  id: string;
  name: string;
  departmentId: string;
}

export default class TeamTransformer {
  toObject(team: Team): TeamObject {
    return {
      id: team.getId(),
      name: team.getName(),
      departmentId: team.getDepartmentId(),
    };
  }

  toEntity(object: TeamObject): Team {
    return new Team(object.id, object.name, object.departmentId);
  }
}
