import PollFactory from "@app/Service/Factory/PollFactory";
import PollAction from "@app/Service/PollAction";
import PollRepository from "@app/Service/PollRepository";
import ProjectRepository from "@app/Service/ProjectRepository";
import StudentRepository from "@app/Service/StudentRepository";
import SupervisorRepository from "@app/Service/SupervisorRepository";

export interface AskTeamToAskDrToTakeProjectRequestData {
  superviosrId: string;
  studentId: string;
  projectId: string;
  teamId: string;
}

export default class AskTeamToAskDrToTakeProjectRequest
  implements PollAction<AskTeamToAskDrToTakeProjectRequestData>
{
  constructor(
    private supervisorRepo: SupervisorRepository,
    private studentRepo: StudentRepository,
    private projectRepo: ProjectRepository,
    private pollRepo: PollRepository,
    private pollFactory: PollFactory,
  ) {}

  async run(data: AskTeamToAskDrToTakeProjectRequestData): Promise<void> {
    // creat poll of type AcceptTeamProjectRequest for dr
    const supervisor = await this.supervisorRepo.getById(data.superviosrId);
    const student = await this.studentRepo.getById(data.studentId);
    const project = await this.projectRepo.getById(data.projectId);
    const teams = supervisor.getTeams();
    const slots = supervisor.getTeamsSlots();
    if (teams.length < slots) {
      const poll = this.pollFactory.createAcceptTeamProjectRequest(
        supervisor,
        student,
        project,
      );
      await this.pollRepo.save(poll);
    } else throw new Error("Dr's slots are already full");
  }
}
