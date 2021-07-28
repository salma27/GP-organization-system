import { Request, Response } from "express";
import JoiService from "@app/Service/JoiService";
import Joi from "joi";
import StudentRepository from "@app/Service/StudentRepository";
import PollRepository from "@app/Service/PollRepository";
import PollTransformer from "@app/Service/PollTransformer";
import { PollOptionType } from "@app/Model/PollOption";
import SupervisorRepository from "@app/Service/SupervisorRepository";
import NotificationFactory from "@app/Service/Factory/NotificationFactory";
import NotificationRepository from "@app/Service/NotificationRepository";
import { AcceptTeamMemberRequestData } from "@app/Service/Implementation/PollAction/AcceptTeamMemberRequest";
import { AcceptDoctorRequestData } from "@app/Service/Implementation/PollAction/AcceptDoctorRequest";
import ProjectRepository from "@app/Service/ProjectRepository";
import { AcceptDrProjectRequestData } from "@app/Service/Implementation/PollAction/AcceptDrProjectRequest";
import { AskTeamToAskDrToTakeProjectRequestData } from "@app/Service/Implementation/PollAction/AskTeamToAskDrToTakeProjectRequest";
import { AskTeamToAskTaToBeSupervisorRequestData } from "@app/Service/Implementation/PollAction/AskTeamToAskTaToBeSupervisorRequest";
import { AcceptTaRequestData } from "@app/Service/Implementation/PollAction/AcceptTaRequest";
import Student from "@app/Model/Student";
import Supervisor from "@app/Model/Supervisor";
import Project from "@app/Model/Project";
import { AcceptTeamProjectRequestData } from "@app/Service/Implementation/PollAction/AcceptTeamProjectRequest";
import { AcceptToBeTaRequestData } from "@app/Service/Implementation/PollAction/AcceptToBeTaRequest";

const messages = {
  ACCEPT_TEAM_MEMBER: (newMember: Student, accept: boolean) =>
    accept
      ? {
          title: "New member onboard!",
          content: `Student ${newMember.getName()} (${newMember.getEcomId()}) has been added to the team!`,
        }
      : {
          title: "Member was denied!:(",
          content: `Team members denied ${newMember.getName()} (${newMember.getEcomId()}) request to join team `,
        },
  ACCEPT_DOCTOR: (dr: Supervisor, project: Project, accept: boolean) =>
    accept
      ? {
          title: "Doctor onboard!",
          content: `Dr.${dr.getName()} has been assigned to supervise (${project.getTitle()})`,
        }
      : {
          title: "Doctor rejected",
          content: `Members rejected Dr.${dr.getName()} request to supervise (${project.getTitle()})`,
        },
  ACCEPT_TA: (ta: Supervisor, accept: boolean) =>
    accept
      ? {
          title: "Teaching Assistant onboard!!",
          content: `Teaching Assistant: ${ta.getName()} has been assigned to your team!`,
        }
      : {
          title: "Teaching Assistant rejected",
          content: `Members rejected  Teaching Assistant: ${ta.getName()} request to supervise team`,
        },
  ACCEPT_DOCTOR_PROJECT: (dr: Supervisor, project: Project, accept: boolean) =>
    accept
      ? {
          title: "Doctor onboard!",
          content: `Team majority agreed to take Dr.${dr.getName()}'s project (${project.getTitle()})`,
        }
      : {
          title: "Member proposal rejected",
          content: `Team majority refused to take Dr.${dr.getName()}'s project (${project.getTitle()})`,
        },
  ASK_DOCTOR_TO_BE_SUPERVISOR: (dr: Supervisor,project: Project,accept: boolean) =>
    accept
      ? {
          title: "Request sent to Dr!",
          content: `Team majority agreed to send request to Dr.${dr.getName()} to supervise: (${project.getTitle()})`,
        }
      : {
          title: "Member proposal rejected",
          content: `Team majority refused to send request to Dr.${dr.getName()} to supervise: (${project.getTitle()})`,
        },
  ASK_TA_TO_BE_SUPERVISOR: (ta: Supervisor, accept: boolean) =>
    accept
      ? {
          title: "Request sent to TA!",
          content: `Team majority agreed to send request to TA: ${ta.getName()} to be their supervising TA`,
        }
      : {
          title: "Member proposal rejected",
          content: `Team majority refused to send request to TA: ${ta.getName()} to be their supervising TA`,
        },
};
const responseMessage = {
  ACCEPT_TEAM_MEMBER: (student: Student, accept: boolean) =>
    accept
      ? {
          title: "Your request was accepted!",
          content: `you have been added to ${student.getName()}'s (${student.getEcomId()}) team!`,
        }
      : {
          title: "Your request was denied!:(",
          content: `Team members denied your request to join their team`,
        },
  ACCEPT_DOCTOR: (dr: Supervisor, project: Project, accept: boolean) =>
    accept
      ? {
          title: "Your request was accepted!",
          content: `Dr.${dr.getName()}, you have been assigned to supervise (${project.getTitle()})`,
        }
      : {
          title: "Your request was denied!:(",
          content: `Members rejected your supervision request to supervise (${project.getTitle()})`,
        },
  ACCEPT_TA: (ta: Supervisor, accept: boolean) =>
    accept
      ? {
          title: "Your request was accepted!",
          content: `Ta: ${ta.getName()}, you have been assigned to a team!`,
        }
      : {
          title: "Your request was denied!:(",
          content: `Members rejected your request to supervise their team`,
        },
  ACCEPT_TEAM_PROJECT: (dr: Supervisor, project: Project, accept: boolean) =>
    accept
      ? {
          title: "Doctor onboard!!",
          content: `Dr.${dr.getName()} has agreed to supervise your project (${project.getTitle()})`,
        }
      : {
          title: "Doctor rejected your team :(",
          content: `Dr.${dr.getName()} has refused to supervise your project (${project.getTitle()})`,
        },
  ACCEPT_TO_BE_TA: (ta: Supervisor, accept: boolean) =>
  accept
  ? {
      title: "Teaching Assistant onboard!!",
      content: `TA: ${ta.getName()} has agreed to supervise your team`,
    }
  : {
      title: "Teaching Assistant rejected your team :(",
      content: `TA: ${ta.getName()} has refused to supervise your team`,
    },
};
export default class PollController {
  constructor(
    private studentRepo: StudentRepository,
    private projectRepo: ProjectRepository,
    private supervisorRepo: SupervisorRepository,
    private pollRepo: PollRepository,
    private pollTransformer: PollTransformer,
    private notiFactory: NotificationFactory,
    private notiRepo: NotificationRepository,
  ) {}

  async voteOnPoll(request: Request, response: Response) {
    await JoiService.validateRequest(
      request,
      Joi.object({
        pollId: Joi.string().required(),
        pollOptionId: Joi.string().required(),
        studentId: Joi.string().required(),
      }),
    );
    const student = await this.studentRepo.getById(request.body.studentId);
    const poll = await this.pollRepo.getById(request.body.pollId);
    if (student.getTeamId() !== poll.getOwnerId()) {
      response.status(403).json({
        message: "You don't have access to this poll",
      });
      return;
    }
    const actionTaken = poll.addStudentVote(student, request.body.pollOptionId);
    const executed = (typeof actionTaken) !== "object";
    const accept = (poll.getOption() as PollOptionType) == actionTaken;
    console.log("actionTaken: ", actionTaken);
    console.log("executed: ", executed);
    console.log("accept: ", accept);
    await this.pollRepo.update(poll);
   
    let message = "Waiting for other students to vote";
    if(executed){
      message = "Vote finished";
      let content = "";
      let title = "";
      switch (poll.getOption() as PollOptionType) {
        case PollOptionType.ACCEPT_TEAM_MEMBER: {
          const data = poll.getOptions()[0].getData() as AcceptTeamMemberRequestData;
          const newMember = await this.studentRepo.getById(data.newMemberId);
          const res = messages.ACCEPT_TEAM_MEMBER(newMember, accept);
          const other = responseMessage.ACCEPT_TEAM_MEMBER(newMember, accept);
          const otherNoti = this.notiFactory.create(other.title, other.content, newMember.getEcomId());
          await this.notiRepo.save(otherNoti);
          title = res.title;
          content = res.content;
          break;
        }
        case PollOptionType.ACCEPT_DOCTOR: {
          const data = poll.getOptions()[0].getData() as AcceptDoctorRequestData;
          const dr = await this.supervisorRepo.getById(data.superviosrId);
          const project = await this.projectRepo.getById(data.projectId);
          const res = messages.ACCEPT_DOCTOR(dr, project, accept);
          const other = responseMessage.ACCEPT_DOCTOR(dr, project, accept);
          const otherNoti = this.notiFactory.create(other.title, other.content, dr.getEcomId());
          await this.notiRepo.save(otherNoti);
          title = res.title;
          content = res.content;
          break;
        }
        case PollOptionType.ACCEPT_TA: {
          const data = poll.getOptions()[0].getData() as AcceptTaRequestData;
          const ta = await this.supervisorRepo.getById(data.superviosrId);
          const res = messages.ACCEPT_TA(ta, accept);
          const other = responseMessage.ACCEPT_TA(ta, accept);
          const otherNoti = this.notiFactory.create(other.title, other.content, ta.getEcomId());
          await this.notiRepo.save(otherNoti);
          title = res.title;
          content = res.content;
          break;
        }
        case PollOptionType.ACCEPT_DOCTOR_PROJECT: {
          const data = poll.getOptions()[0].getData() as AcceptDrProjectRequestData;
          const dr = await this.supervisorRepo.getById(data.superviosrId);
          const project = await this.projectRepo.getById(data.projectId);
          const res = messages.ACCEPT_DOCTOR_PROJECT(dr, project, accept);
          title = res.title;
          content = res.content;
          break;
        }
        case PollOptionType.ASK_DOCTOR_TO_BE_SUPERVISOR: {
          const data = poll.getOptions()[0].getData() as AskTeamToAskDrToTakeProjectRequestData;
          const dr = await this.supervisorRepo.getById(data.superviosrId);
          const project = await this.projectRepo.getById(data.projectId);
          const res = messages.ASK_DOCTOR_TO_BE_SUPERVISOR(dr, project, accept);
          title = res.title;
          content = res.content;
          break;
        }
        case PollOptionType.ASK_TA_TO_BE_SUPERVISOR: {
          const data = poll.getOptions()[0].getData() as AskTeamToAskTaToBeSupervisorRequestData;
          const ta = await this.supervisorRepo.getById(data.superviosrId);
          const res = messages.ASK_TA_TO_BE_SUPERVISOR(ta, accept);
          title = res.title;
          content = res.content;
          break;
        }
      }
      if (!accept) message = "Vote finished and was declined";
      const members = await this.studentRepo.getByTeamId(student.getTeamId())
      for (let i = 0; i < members.length; i++) {
        const id = members[i].getEcomId();
        const noti = this.notiFactory.create(title, content, id);
        await this.notiRepo.save(noti);
      }
      await this.pollRepo.removeById(poll.getId());
      response.status(200).json({ message });
      return;
    }else{
      const waitNoti = this.notiFactory.create("You voted!", message, student.getEcomId());
      await this.notiRepo.save(waitNoti);
    }
    response.status(200).json({ message });
  }

  async deletePoll(request: Request, response: Response) {
    await JoiService.validateRequest(
      request,
      Joi.object({
        pollId: Joi.string().required(),
        // studentId: Joi.string().required(),
      }),
    );
    try {
      await this.pollRepo.remove(request.body.pollId);
      response.status(400).json({ message: "Deleted successfully" });
    } catch (error) {
      response.status(200).json({ message: "Error occured" });
    }
  }

  async getAllPollsForTeam(request: Request, response: Response) {
    await JoiService.validateRequest(
      request,
      Joi.object({
        studentId: Joi.string().required(),
      }),
    );
    const student = await this.studentRepo.getById(request.body.studentId);
    // console.log("print here");
    try {
      const polls = await this.pollRepo.getAllPollsForOwner(
        student.getTeamId(),
      );
      response.json({
        polls: polls.map((poll) => this.pollTransformer.toObject(poll)),
      });
    } catch (error) {
      console.log(error);
      response.json({
        error: error,
      });
    }
  }

  async getAllPollsForSupervisor(request: Request, response: Response) {
    await JoiService.validateRequest(
      request,
      Joi.object({
        supervisorId: Joi.string().required(),
      }),
    );
    const supervisor = await this.supervisorRepo.getById(
      request.body.supervisorId,
    );
    // console.log("print here");
    try {
      const polls = await this.pollRepo.getAllPollsForOwner(
        supervisor.getEcomId(),
      );
      response.json({
        polls: polls.map((poll) => this.pollTransformer.toObject(poll)),
      });
    } catch (error) {
      console.log(error);
      response.json({
        error: error,
      });
    }
  }

  async supervisorVoteOnPoll(request: Request, response: Response) {
    await JoiService.validateRequest(
      request,
      Joi.object({
        pollId: Joi.string().required(),
        pollOptionId: Joi.string().required(),
        supervisorId: Joi.string().required(),
      }),
    );
    const supervisor = await this.supervisorRepo.getById(
      request.body.supervisorId,
    );
    const poll = await this.pollRepo.getById(request.body.pollId);
    if (supervisor.getEcomId() !== poll.getOwnerId()) {
      response.status(403).json({
        message: "You don't have access to this poll",
      });
      return;
    }
    const pollOptionId = request.body.pollOptionId;
    const actionTaken = poll.addSupervisorVote(supervisor, pollOptionId);
    const executed = (typeof actionTaken) !== "object";
    const accept = (poll.getOption() as PollOptionType) == actionTaken;
    console.log("actionTaken: ", actionTaken);
    console.log("executed: ", executed);
    console.log("accept: ", accept);
    await this.pollRepo.update(poll);
    if(!executed) throw new Error("OneManPoll not executed");
    let message = "Request Done";
    let content = "";
    let title = "";
    let teamId = "";
    switch (poll.getOption() as PollOptionType) {
      case PollOptionType.ACCEPT_TEAM_PROJECT: {
        const data = poll.getOptions()[0].getData() as AcceptTeamProjectRequestData;
        teamId = data.teamId;
        const dr = await this.supervisorRepo.getById(data.superviosrId);
        const project = await this.projectRepo.getById(data.projectId);
        const res = responseMessage.ACCEPT_TEAM_PROJECT(dr, project, accept);
        title = res.title;
        content = res.content;
        break;
      }
      case PollOptionType.ACCEPT_TO_BE_TA: {
        const data = poll.getOptions()[0].getData() as AcceptToBeTaRequestData;
        teamId = data.teamId;
        const ta = await this.supervisorRepo.getById(data.superviosrId);
        const res = responseMessage.ACCEPT_TO_BE_TA(ta, accept);
        title = res.title;
        content = res.content;
        break;
      }
    }
    if (!accept) message = "Request was declined";
    else message = "Team has been added to your teams List";
    
    const members = await this.studentRepo.getByTeamId(teamId)
    for (let i = 0; i < members.length; i++) {
      const id = members[i].getEcomId();
      const noti = this.notiFactory.create(title, content, id);
      await this.notiRepo.save(noti);
    }
    
    await this.pollRepo.removeById(poll.getId());
    response.status(200).json({ message });
    return;
  }
}
