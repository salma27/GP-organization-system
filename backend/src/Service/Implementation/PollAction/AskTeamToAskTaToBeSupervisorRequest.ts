import PollFactory from "@app/Service/Factory/PollFactory";
import PollAction from "@app/Service/PollAction";
import PollRepository from "@app/Service/PollRepository";
import ProjectRepository from "@app/Service/ProjectRepository";
import StudentRepository from "@app/Service/StudentRepository";
import SupervisorRepository from "@app/Service/SupervisorRepository";

export interface AskTeamToAskTaToBeSupervisorRequestData {
  studentId: string;
  superviosrId: string;
  teamId: string;
}

export default class AskTeamToAskTaToBeSupervisorRequest
  implements PollAction<AskTeamToAskTaToBeSupervisorRequestData>
{
  constructor(
    private supervisorRepo: SupervisorRepository,
    private studentRepo: StudentRepository,
    private pollRepo: PollRepository,
    private pollFactory: PollFactory,
  ) {}

  async run(data: AskTeamToAskTaToBeSupervisorRequestData): Promise<void> {
    // creat poll of type AcceptTeamProjectRequest for dr
    const supervisor = await this.supervisorRepo.getById(data.superviosrId);
    const student = await this.studentRepo.getById(data.studentId);
    const teams = supervisor.getTeams();
    const slots = supervisor.getTeamsSlots();
    if (teams.length < slots) {
      const poll = this.pollFactory.createAcceptToBeTaRequest(
        supervisor,
        student,
      );
      await this.pollRepo.save(poll);
    } else throw new Error("TA's slots are already full");
  }
}
