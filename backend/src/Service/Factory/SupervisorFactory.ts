import { v4 as uuidv4 } from "uuid";
import Supervisor, { SupervisorType } from "@app/Model/Supervisor";
import Department from "@app/Model/Department";
import Technology from "@app/Model/Technology";

export default class SupervisorFactory {
  createTA(
    name: string,
    bio: string,
    ecomId: string,
    passwordHash: string,
    teamsSlots: number,
    technologies: Technology[],
    department: Department,
  ): Supervisor {
    const id = uuidv4();
    const supervisor = new Supervisor(
      id,
      name,
      bio,
      ecomId,
      passwordHash,
      teamsSlots,
      technologies,
      department,
      SupervisorType.TA,
      []
    );
    return supervisor;
  }
  createDoctor(
    name: string,
    bio: string,
    ecomId: string,
    passwordHash: string,
    teamsSlots: number,
    technologies: Technology[],
    department: Department,
  ): Supervisor {
    const id = uuidv4();
    const supervisor = new Supervisor(
      id,
      name,
      bio,
      ecomId,
      passwordHash,
      teamsSlots,
      technologies,
      department,
      SupervisorType.DOCTOR,
      []
    );
    return supervisor;
  }
}
