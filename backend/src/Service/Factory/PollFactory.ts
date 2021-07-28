import { AcceptTeamMemberRequestData } from "@app/Service/Implementation/PollAction/AcceptTeamMemberRequest";
import PollOption, { PollOptionType } from "@app/Model/PollOption";
import Container from "@app/Service/Container";
import Poll from "@app/Model/Poll";
import { v4 as uuidv4 } from "uuid";
import Student from "@app/Model/Student";
import Supervisor from "@app/Model/Supervisor";
import Project from "@app/Model/Project";
import { AcceptDoctorRequestData } from "@app/Service/Implementation/PollAction/AcceptDoctorRequest";
import { AcceptTaRequestData } from "@app/Service/Implementation/PollAction/AcceptTaRequest";
import { AcceptDrProjectRequestData } from "@app/Service/Implementation/PollAction/AcceptDrProjectRequest";
import { AcceptTeamProjectRequestData } from "@app/Service/Implementation/PollAction/AcceptTeamProjectRequest";
import { AcceptToBeTaRequestData } from "../Implementation/PollAction/AcceptToBeTaRequest";
import { AskTeamToAskTaToBeSupervisorRequestData } from "../Implementation/PollAction/AskTeamToAskTaToBeSupervisorRequest";
import { AskTeamToAskDrToTakeProjectRequestData } from "../Implementation/PollAction/AskTeamToAskDrToTakeProjectRequest";

export default class PollFactory {
  createAcceptTeamMemberRequest(
    student: Student,
    teamId: string,
    teamSize: number,
  ): Poll {
    const id = uuidv4();
    const acceptOption = new PollOption<AcceptTeamMemberRequestData>(
      uuidv4(),
      "Accept request",
      PollOptionType.ACCEPT_TEAM_MEMBER,
      Container.resolve("AcceptTeamMemberRequest"),
      {
        teamId: teamId,
        newMemberId: student.getEcomId(),
      },
    );
    const declineOption = new PollOption<{}>(
      uuidv4(),
      "Decline request",
      PollOptionType.DO_NOTHING,
      Container.resolve("DoNothing"),
      {},
    );
    let options = [acceptOption, declineOption];
    const poll = new Poll(
      id,
      `Request for student ${student.getName()} (${student.getEcomId()}) to join team`,
      teamId,
      teamSize,
      options,
      new Map<string, string>(),
    );
    poll.setOption(PollOptionType.ACCEPT_TEAM_MEMBER)
    return poll;
  }
  createAcceptDoctorRequest(
    supervisor: Supervisor,
    teamId: string,
    teamSize: number,
    project: Project,
  ): Poll {
    const id = uuidv4();
    const acceptOption = new PollOption<AcceptDoctorRequestData>(
      uuidv4(),
      "Accept request",
      PollOptionType.ACCEPT_DOCTOR,
      Container.resolve("AcceptDoctorRequest"),
      {
        teamId: teamId,
        superviosrId: supervisor.getEcomId(),
        projectId: project.getId(),
      },
    );
    const declineOption = new PollOption<{}>(
      uuidv4(),
      "Decline request",
      PollOptionType.DO_NOTHING,
      Container.resolve("DoNothing"),
      {},
    );
    let options = [acceptOption, declineOption];
    const poll = new Poll(
      id,
      `Request for Dr. ${supervisor.getName()} (${supervisor.getEcomId()}) to supervise project (${project.getTitle()}) team`,
      teamId,
      teamSize,
      options,
      new Map<string, string>(),
    );
    poll.setOption(PollOptionType.ACCEPT_DOCTOR)
    return poll;
  }
  createAcceptDoctorProjectRequest(
    supervisor: Supervisor,
    student: Student,
    teamSize: number,
    project: Project,
  ): Poll {
    const id = uuidv4();
    const acceptOption = new PollOption<AcceptDrProjectRequestData>(
      uuidv4(),
      "Accept request",
      PollOptionType.ACCEPT_DOCTOR_PROJECT,
      Container.resolve("AcceptDrProjectRequest"),
      {
        teamId: student.getTeamId(),
        superviosrId: supervisor.getEcomId(),
        projectId: project.getId(),
      },
    );
    const declineOption = new PollOption<{}>(
      uuidv4(),
      "Decline request",
      PollOptionType.DO_NOTHING,
      Container.resolve("DoNothing"),
      {},
    );
    let options = [acceptOption, declineOption];
    const poll = new Poll(
      id,
      `Request from member ${student.getName()} to take on supervisor (${supervisor.getName()})'s project (${project.getTitle()})`,
      // `Request from member ${student.getName()} (${student.getEcomId()}) to take on supervisor (${supervisor.getName()})'s project (${project.getTitle()})`,
      student.getTeamId(),
      teamSize,
      options,
      new Map<string, string>(),
    );
    poll.setOption(PollOptionType.ACCEPT_DOCTOR_PROJECT)
    return poll;
  }
  createAcceptTaRequest(
    supervisor: Supervisor,
    teamId: string,
    teamSize: number,
  ): Poll {
    const id = uuidv4();
    const acceptOption = new PollOption<AcceptTaRequestData>(
      uuidv4(),
      "Accept request",
      PollOptionType.ACCEPT_TA,
      Container.resolve("AcceptTaRequest"),
      {
        teamId: teamId,
        superviosrId: supervisor.getEcomId(),
      },
    );
    const declineOption = new PollOption<{}>(
      uuidv4(),
      "Decline request",
      PollOptionType.DO_NOTHING,
      Container.resolve("DoNothing"),
      {},
    );
    let options = [acceptOption, declineOption];
    const poll = new Poll(
      id,
      `Request for TA ${supervisor.getName()} (${supervisor.getEcomId()}) to supervise your team`,
      teamId,
      teamSize,
      options,
      new Map<string, string>(),
    );
    poll.setOption(PollOptionType.ACCEPT_TA)
    return poll;
  }
  // for Dr to respond to
  createAcceptTeamProjectRequest(
    supervisor: Supervisor,
    student: Student,
    project: Project,
  ): Poll {
    const id = uuidv4();
    const acceptOption = new PollOption<AcceptTeamProjectRequestData>(
      uuidv4(),
      "Accept request",
      PollOptionType.ACCEPT_TEAM_PROJECT,
      Container.resolve("AcceptTeamProjectRequest"),
      {
        teamId: student.getTeamId(),
        superviosrId: supervisor.getEcomId(),
        projectId: project.getId(),
      },
    );
    const declineOption = new PollOption<{}>(
      uuidv4(),
      "Decline request",
      PollOptionType.DO_NOTHING,
      Container.resolve("DoNothing"),
      {},
    );
    let options = [acceptOption, declineOption];
    const poll = new Poll(
      id,
      `Request from student ${student.getName()} (${student.getEcomId()}) to supervise their project (${project.getTitle()})`,
      supervisor.getEcomId(),
      1,
      options,
      new Map<string, string>(),
    );
    poll.setOption(PollOptionType.ACCEPT_TEAM_PROJECT)
    return poll;
  }
  // for Ta to respond to
  createAcceptToBeTaRequest(supervisor: Supervisor, student: Student): Poll {
    const id = uuidv4();
    const acceptOption = new PollOption<AcceptToBeTaRequestData>(
      uuidv4(),
      "Accept request",
      PollOptionType.ACCEPT_TO_BE_TA,
      Container.resolve("AcceptToBeTaRequest"),
      {
        teamId: student.getTeamId(),
        superviosrId: supervisor.getEcomId(),
      },
    );
    const declineOption = new PollOption<{}>(
      uuidv4(),
      "Decline request",
      PollOptionType.DO_NOTHING,
      Container.resolve("DoNothing"),
      {},
    );
    let options = [acceptOption, declineOption];
    const poll = new Poll(
      id,
      `Request from student ${student.getName()} (${student.getEcomId()}) to be their team TA`,
      supervisor.getEcomId(),
      1,
      options,
      new Map<string, string>(),
    );
    poll.setOption(PollOptionType.ACCEPT_TO_BE_TA)
    return poll;
  }
  createAskTeamToAskDrToTakeProjectRequest(
    supervisor: Supervisor,
    student: Student,
    teamSize: number,
    project: Project,
  ): Poll {
    const id = uuidv4();
    const acceptOption = new PollOption<AskTeamToAskDrToTakeProjectRequestData>(
      uuidv4(),
      "Accept request",
      PollOptionType.ASK_DOCTOR_TO_BE_SUPERVISOR,
      Container.resolve("AskTeamToAskDrToTakeProjectRequest"),
      {
        teamId: student.getTeamId(),
        studentId: student.getEcomId(),
        superviosrId: supervisor.getEcomId(),
        projectId: project.getId(),
      },
    );
    const declineOption = new PollOption<{}>(
      uuidv4(),
      "Decline request",
      PollOptionType.DO_NOTHING,
      Container.resolve("DoNothing"),
      {},
    );
    let options = [acceptOption, declineOption];
    const poll = new Poll(
      id,
      `Request to send Dr.${supervisor.getName()} to supervise project (${project.getTitle()})`,
      // `Request from member ${student.getName()} (${student.getEcomId()}) to take on supervisor (${supervisor.getName()})'s project (${project.getTitle()})`,
      student.getTeamId(),
      teamSize,
      options,
      new Map<string, string>(),
    );
    poll.setOption(PollOptionType.ASK_DOCTOR_TO_BE_SUPERVISOR)
    return poll;
  }
  createAskTeamToAskTaRequest(
    supervisor: Supervisor,
    student: Student,
    teamSize: number,
  ): Poll {
    const id = uuidv4();
    const acceptOption =
      new PollOption<AskTeamToAskTaToBeSupervisorRequestData>(
        uuidv4(),
        "Accept request",
        PollOptionType.ASK_TA_TO_BE_SUPERVISOR,
        Container.resolve("AskTeamToAskTaToBeSupervisorRequest"),
        {
          studentId: student.getEcomId(),
          superviosrId: supervisor.getEcomId(),
          teamId: student.getTeamId(),
        },
      );
    const declineOption = new PollOption<{}>(
      uuidv4(),
      "Decline request",
      PollOptionType.DO_NOTHING,
      Container.resolve("DoNothing"),
      {},
    );
    let options = [acceptOption, declineOption];
    const poll = new Poll(
      id,
      `Request to send TA: ${supervisor.getName()} to supervise our team`,
      // `Request from member ${student.getName()} (${student.getEcomId()}) to take on supervisor (${supervisor.getName()})'s project (${project.getTitle()})`,
      student.getTeamId(),
      teamSize,
      options,
      new Map<string, string>(),
    );
    poll.setOption(PollOptionType.ASK_TA_TO_BE_SUPERVISOR)
    return poll;
  }
}
