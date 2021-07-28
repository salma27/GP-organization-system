import PollAction from "@app/Service/PollAction";
import ProjectRepository from "@app/Service/ProjectRepository";
import SupervisorRepository from "@app/Service/SupervisorRepository";

export interface AcceptTeamProjectRequestData {
  teamId: string;
  superviosrId: string;
  projectId: string;
}

export default class AcceptTeamProjectRequest
  implements PollAction<AcceptTeamProjectRequestData>
{
  constructor(
    private supervisorRepo: SupervisorRepository,
    private projectRepo: ProjectRepository,
  ) {}

  async run(data: AcceptTeamProjectRequestData): Promise<void> {
    // set main project
    // add team to supervisor
    // notify about event
    const supervisor = await this.supervisorRepo.getById(data.superviosrId);
    const project = await this.projectRepo.getById(data.projectId);
    const teams = supervisor.getTeams();
    const slots = supervisor.getTeamsSlots();
    if (teams.length < slots) {
      project.setIsMainProject(true);
      await this.projectRepo.update(project);
      await this.projectRepo.removeAllExceptMain(data.teamId);
      supervisor.addTeam(data.teamId);
    } else throw new Error("Dr's slots are already full");
    await this.supervisorRepo.update(supervisor);
  }
}
