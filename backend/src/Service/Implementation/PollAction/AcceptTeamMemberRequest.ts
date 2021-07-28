import PollAction from "@app/Service/PollAction";
import StudentRepository from "@app/Service/StudentRepository";
import TeamRepository from "@app/Service/TeamRepository";

export interface AcceptTeamMemberRequestData {
  teamId: string;
  newMemberId: string;
}

export default class AcceptTeamMemberRequest
  implements PollAction<AcceptTeamMemberRequestData>
{
  constructor(
    private studentRepo: StudentRepository,
    private teamRepo: TeamRepository,
  ) {}

  async run(data: AcceptTeamMemberRequestData): Promise<void> {
    const student = await this.studentRepo.getById(data.newMemberId);
    const remaining = await this.studentRepo.getByTeamId(student.getTeamId());
    if (!remaining.length) await this.teamRepo.remove(student.getTeamId());
    student.setTeamId(data.teamId);
    await this.studentRepo.update(student);
  }
}
