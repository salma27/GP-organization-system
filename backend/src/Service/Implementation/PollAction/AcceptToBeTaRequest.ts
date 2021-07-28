import PollAction from "@app/Service/PollAction";
import ProjectRepository from "@app/Service/ProjectRepository";
import SupervisorRepository from "@app/Service/SupervisorRepository";

export interface AcceptToBeTaRequestData {
  teamId: string;
  superviosrId: string;
}

export default class AcceptToBeTaRequest
  implements PollAction<AcceptToBeTaRequestData>
{
  constructor(private supervisorRepo: SupervisorRepository) {}

  async run(data: AcceptToBeTaRequestData): Promise<void> {
    // set main project
    // add team to supervisor
    // notify about event
    const supervisor = await this.supervisorRepo.getById(data.superviosrId);
    const teams = supervisor.getTeams();
    const slots = supervisor.getTeamsSlots();
    if (teams.length < slots) {
      supervisor.addTeam(data.teamId);
    } else throw new Error("TA's slots are already full");
    await this.supervisorRepo.update(supervisor);
  }
}
