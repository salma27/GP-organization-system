import PollAction from "@app/Service/PollAction";
import SupervisorRepository from "@app/Service/SupervisorRepository";

export interface AcceptTaRequestData {
  teamId: string;
  superviosrId: string;
}

export default class AcceptTaRequest
  implements PollAction<AcceptTaRequestData>
{
  constructor(private supervisorRepo: SupervisorRepository) {}

  async run(data: AcceptTaRequestData): Promise<void> {
    const supervisor = await this.supervisorRepo.getById(data.superviosrId);
    const teams = supervisor.getTeams();
    const slots = supervisor.getTeamsSlots();
    if (teams.length < slots) {
      supervisor.addTeam(data.teamId);
    } else throw new Error("TA's slots are already full");
    await this.supervisorRepo.update(supervisor);
  }
}
