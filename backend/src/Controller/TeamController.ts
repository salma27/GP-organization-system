import { Request, Response } from "express";
import JoiService from "@app/Service/JoiService";
import Joi from "joi";
import StudentRepository from "@app/Service/StudentRepository";
import PollRepository from "@app/Service/PollRepository";
import ProjectRepository from "@app/Service/ProjectRepository";
import SupervisorRepository from "@app/Service/SupervisorRepository";
import StudentTransformer from "@app/Service/StudentTransformer";
import SupervisorTransformer from "@app/Service/SupervisorTransformer";
import ProjectTransformer from "@app/Service/ProjectTransformer";
import PollFactory from "@app/Service/Factory/PollFactory";
import { AcceptTeamMemberRequestData } from "@app/Service/Implementation/PollAction/AcceptTeamMemberRequest";
import { PollOptionType } from "@app/Model/PollOption";
import Poll from "@app/Model/Poll";
import { AcceptDoctorRequestData } from "@app/Service/Implementation/PollAction/AcceptDoctorRequest";
import { SupervisorType } from "@app/Model/Supervisor";
import { AcceptDrProjectRequestData } from "@app/Service/Implementation/PollAction/AcceptDrProjectRequest";
import { AskTeamToAskDrToTakeProjectRequestData } from "@app/Service/Implementation/PollAction/AskTeamToAskDrToTakeProjectRequest";
import { AskTeamToAskTaToBeSupervisorRequestData } from "@app/Service/Implementation/PollAction/AskTeamToAskTaToBeSupervisorRequest";
import Technology from "@app/Model/Technology";
import { TechnologyObject } from "@app/Service/TechnologyTransformer";
import { AcceptTaRequestData } from "@app/Service/Implementation/PollAction/AcceptTaRequest";
import NotificationFactory from "@app/Service/Factory/NotificationFactory";
import NotificationRepository from "@app/Service/NotificationRepository";
import Team from "@app/Model/Team";
import { v4 } from "uuid";
import TeamRepository from "@app/Service/TeamRepository";

export default class TeamController {
  constructor(
    private studentRepo: StudentRepository,
    private pollRepo: PollRepository,
    private supervisorRepo: SupervisorRepository,
    private projectRepo: ProjectRepository,
    private studentTransformer: StudentTransformer,
    private projectTransformer: ProjectTransformer,
    private supervisorTransformer: SupervisorTransformer,
    private pollFactory: PollFactory, // private pollHistoryFactory: PollHistoryFactory, // private pollHistoryRepo: PollHistoryRepository,
    private notiFactory: NotificationFactory,
    private notiRepo: NotificationRepository,
    private teamRepository: TeamRepository,
  ) {}

  async requestToJoinTeam(request: Request, response: Response) {
    await JoiService.validateRequest(
      request,
      Joi.object({
        studentId: Joi.string().required(),
        teamId: Joi.string().required(),
      }),
    );

    const teamId = request.body.teamId;
    let student;
    try {
      student = await this.studentRepo.getById(request.body.studentId);
    } catch (error) {
      response.status(400).json({
        message: "Student not found",
      });
      return;
    }
    const existingPolls: Poll[] = await this.pollRepo.getByTeamId(teamId);
    for (let i = 0; i < existingPolls.length; ++i) {
      const poll = existingPolls[i];
      const options = poll.getOptions();
      if (options[0].getType() == PollOptionType.ACCEPT_TEAM_MEMBER) {
        const data = options[0].getData() as AcceptTeamMemberRequestData;
        if (
          data.teamId === teamId &&
          data.newMemberId === student.getEcomId() &&
          !poll.getCanRedo()
        ) {
          response.status(400).json({
            message: "Studnet already sent this request",
          });
          return;
        }
      }
    }

    const teamMembers = await this.studentRepo.getByTeamId(teamId);
    const teamSize = teamMembers.length;
    if (teamSize === 0) {
      response.status(400).json({
        message: "Team is empty",
      });
      return;
    }
    const teamDepartment = teamMembers[0].getDepartment();

    const senderTeamMembers = await this.studentRepo.getByTeamId(
      student.getTeamId(),
    );
    const senderTeamDrs = await this.supervisorRepo.getDrByTeamId(
      student.getTeamId(),
    );
    const senderTeamSize = senderTeamMembers.length;
    const senderTeamDepartment = senderTeamMembers[0].getDepartment();

    if (teamDepartment.getId() !== student.getDepartment().getId()) {
      response.status(400).json({
        message: "Student is in diffrent department than team department",
      });
      return;
    }

    if (teamSize >= teamDepartment.getMaxNumberOfStudents()) {
      response.status(400).json({
        message: "Team size has reached limit for this department",
      });
      return;
    }

    if (student.getTeamId() === teamId) {
      response.status(400).json({
        message: "Student already in team",
      });
      return;
    }

    // if has a dr and team size will be less than minimum then deny request
    if (
      senderTeamDrs.length &&
      senderTeamSize < senderTeamDepartment.getMinNumberOfStudents()
    ) {
      response.status(400).json({
        message: "Student Can't leave team after deciding on a project",
      });
      return;
    }

    const title = "A student requested to join team";
    const content = `${student.getName()} sent a request to join team`;
    for (let i = 0; i < teamMembers.length; i++) {
      const id = teamMembers[i].getEcomId();
      const noti = this.notiFactory.create(title, content, id);
      await this.notiRepo.save(noti);
    }
    // Create new poll
    const poll = this.pollFactory.createAcceptTeamMemberRequest(
      student,
      teamId,
      teamSize,
    );
    await this.pollRepo.save(poll);

    response.status(200).json({ message: "Request sent" });
  }

  async DrRequestToSuprviseProject(request: Request, response: Response) {
    await JoiService.validateRequest(
      request,
      Joi.object({
        supervisorId: Joi.string().required(),
        projectId: Joi.string().required(),
      }),
    );

    const { supervisorId, projectId } = request.body;
    let project;
    try {
      project = await this.projectRepo.getById(projectId);
    } catch (error) {
      response.status(404).json({
        message: "Ptoject not found",
      });
      return;
    }
    const supervisor = await this.supervisorRepo.getById(supervisorId);
    if (supervisor.getType() != SupervisorType.DOCTOR) {
      response.status(400).json({
        message: "Can't make this request for this supervisor",
      });
      return;
    }
    const teamId = project.getOwnerId();
    const teamSupervisors = await this.supervisorRepo.getDrByTeamId(teamId);
    const existingPolls: Poll[] = await this.pollRepo.getByTeamId(teamId);
    for (let i = 0; i < existingPolls.length; ++i) {
      const poll = existingPolls[i];
      const options = poll.getOptions();
      if (options[0].getType() == PollOptionType.ACCEPT_DOCTOR) {
        const data = options[0].getData() as AcceptDoctorRequestData;
        if (
          data.teamId === teamId &&
          data.superviosrId === supervisor.getEcomId() &&
          !poll.getCanRedo()
        ) {
          response.status(400).json({
            message: "Supervisor already sent this request",
          });
          return;
        }
      }
    }

    const teamMembers = await this.studentRepo.getByTeamId(teamId);
    const teamSize = teamMembers.length;
    const teamDepartment = teamMembers[0].getDepartment();

    if (teamSize < teamDepartment.getMinNumberOfStudents()) {
      response.status(400).json({
        message: "Team is not complete ",
      });
      return;
    }

    if (teamDepartment.getId() !== supervisor.getDepartment().getId()) {
      response.status(400).json({
        message: "Supervisor is in diffrent department than team department",
      });
      return;
    }

    if (teamSupervisors.length >= teamDepartment.getMaxNumberOfSupervisors()) {
      response.status(400).json({
        message: "Team reached limit for this department",
      });
      return;
    }

    if (supervisor.getTeams().includes(teamId)) {
      response.status(400).json({
        message: "Supervisor already has team",
      });
      return;
    }

    const teams = supervisor.getTeams().length;
    if (teams > supervisor.getTeamsSlots()) {
      response.status(400).json({
        message: "Max slots reached",
      });
      return;
    }

    const title = "A Doctor requested to supervise team project";
    const content = `Dr.${supervisor.getName()} sent a request to supervise team's project (${project.getTitle()})`;
    for (let i = 0; i < teamMembers.length; i++) {
      const id = teamMembers[i].getEcomId();
      const noti = this.notiFactory.create(title, content, id);
      await this.notiRepo.save(noti);
    }
    // Create new poll
    const poll = this.pollFactory.createAcceptDoctorRequest(
      supervisor,
      teamId,
      teamSize,
      project,
    );
    await this.pollRepo.save(poll);

    response.status(200).json({ message: "Request sent" });
  }

  async memberRequestToTakeSuprvisorProject(
    request: Request,
    response: Response,
  ) {
    await JoiService.validateRequest(
      request,
      Joi.object({
        studentId: Joi.string().required(),
        projectId: Joi.string().required(),
      }),
    );

    const { studentId, projectId } = request.body;
    let project;
    let student;
    let supervisorId;
    let supervisor;
    let teamId;
    let teamMembers;
    let teamSize;
    try {
      student = await this.studentRepo.getById(studentId);
      project = await this.projectRepo.getById(projectId);
      supervisorId = project.getOwnerId();
      supervisor = await this.supervisorRepo.getById(supervisorId);
      teamId = student.getTeamId();
      teamMembers = await this.studentRepo.getByTeamId(teamId);
      teamSize = teamMembers.length;
      const teamSupervisors = await this.supervisorRepo.getDrByTeamId(teamId);
      const teamDepartment = teamMembers[0].getDepartment();
      const teams = supervisor.getTeams();
      const supDepartment = supervisor.getDepartment();

      if (supervisor.getType() != SupervisorType.DOCTOR) {
        response.status(400).json({
          message: "Can't make this request for this supervisor",
        });
        return;
      } else if (teamSize < teamDepartment.getMinNumberOfStudents()) {
        response.status(400).json({
          message: "Team is not complete ",
        });
        return;
      } else if (teamDepartment.getId() !== supDepartment.getId()) {
        response.status(400).json({
          message: "Supervisor is in diffrent department than team department",
        });
        return;
      } else if (teamSupervisors.length) {
        response.status(400).json({
          message: "You already have a main supervisor",
        });
        return;
      } else if (teams.includes(teamId)) {
        response.status(400).json({
          message: "Supervisor already has team",
        });
        return;
      } else if (teams.length > supervisor.getTeamsSlots()) {
        response.status(400).json({
          message: "Max slots reached for supervisor",
        });
        return;
      }
    } catch (error) {
      response.status(404).json({
        message: "Ptoject/Supervisor not found",
      });
      return;
    }
    const existingPolls: Poll[] = await this.pollRepo.getByTeamId(teamId);
    for (let i = 0; i < existingPolls.length; ++i) {
      const poll = existingPolls[i];
      const options = poll.getOptions();
      if (options[0].getType() == PollOptionType.ACCEPT_DOCTOR_PROJECT) {
        const data = options[0].getData() as AcceptDrProjectRequestData;
        if (
          data.teamId === teamId &&
          data.superviosrId === supervisor.getEcomId() &&
          !poll.getCanRedo()
        ) {
          response.status(400).json({
            message: "You already sent this request to supervisor",
          });
          return;
        }
      }
    }

    const title = "A member requested to take supervisor project";
    const content = `${student.getName()} wants to take Dr.${supervisor.getName()}'s project: (${project.getTitle()})`;
    for (let i = 0; i < teamMembers.length; i++) {
      const id = teamMembers[i].getEcomId();
      const noti = this.notiFactory.create(title, content, id);
      await this.notiRepo.save(noti);
    }
    // Create new poll
    const poll = this.pollFactory.createAcceptDoctorProjectRequest(
      supervisor,
      student,
      teamSize,
      project,
    );
    await this.pollRepo.save(poll);

    response.status(200).json({ message: "Request sent" });
  }
  async memberAskTeamToTakeDr(request: Request, response: Response) {
    await JoiService.validateRequest(
      request,
      Joi.object({
        studentId: Joi.string().required(),
        projectId: Joi.string().required(),
        supervisorId: Joi.string().required(),
      }),
    );

    const { studentId, projectId, supervisorId } = request.body;
    let project;
    let student;
    let supervisor;
    let teamId;
    let teamSize;
    let teamMembers;
    try {
      student = await this.studentRepo.getById(studentId);
      project = await this.projectRepo.getById(projectId);
      supervisor = await this.supervisorRepo.getById(supervisorId);
      teamId = student.getTeamId();
      teamMembers = await this.studentRepo.getByTeamId(teamId);
      teamSize = teamMembers.length;
      const teamDepartment = teamMembers[0].getDepartment();
      const supervisorDepartment = supervisor.getDepartment();
      const teamSupervisors = await this.supervisorRepo.getDrByTeamId(teamId);
      const supervisorTeams = supervisor.getTeams();

      if (supervisor.getType() != SupervisorType.DOCTOR) {
        response.status(400).json({
          message: "Can't make this request for this supervisor",
        });
        return;
      } else if (project.getOwnerId() !== teamId) {
        response.status(401).json({
          message: "Unauthorized to make this request",
        });
        return;
      } else if (teamDepartment.getId() !== supervisorDepartment.getId()) {
        response.status(400).json({
          message: "Dr is from diffrent department",
        });
        return;
      } else if (teamSize < teamDepartment.getMinNumberOfStudents()) {
        response.status(400).json({
          message: "Team is not complete ",
        });
        return;
      } else if (teamSupervisors.length) {
        response.status(400).json({
          message: "You already have a main supervisor",
        });
        return;
      } else if (supervisorTeams.includes(teamId)) {
        response.status(400).json({
          message: "Supervisor already has team",
        });
        return;
      } else if (supervisorTeams.length > supervisor.getTeamsSlots()) {
        response.status(400).json({
          message: "Max slots reached for supervisor",
        });
        return;
      }
    } catch (error) {
      response.status(404).json({
        message: "Ptoject/Supervisor/Student not found",
      });
      return;
    }

    const existingPolls: Poll[] = await this.pollRepo.getByTeamId(teamId);
    for (let i = 0; i < existingPolls.length; ++i) {
      const poll = existingPolls[i];
      const options = poll.getOptions();
      if (options[0].getType() == PollOptionType.ASK_DOCTOR_TO_BE_SUPERVISOR) {
        const data =
          options[0].getData() as AskTeamToAskDrToTakeProjectRequestData;
        if (
          data.teamId === teamId &&
          data.superviosrId === supervisor.getEcomId() &&
          !poll.getCanRedo()
        ) {
          response.status(400).json({
            message: "You already sent this request to supervisor",
          });
          return;
        }
      }
    }

    const title = "A member requested to send Dr request to be supervisor";
    const content = `${student.getName()} wants to ask Dr.${supervisor.getName()} to supervise project: (${project.getTitle()})`;
    for (let i = 0; i < teamMembers.length; i++) {
      const id = teamMembers[i].getEcomId();
      const noti = this.notiFactory.create(title, content, id);
      await this.notiRepo.save(noti);
    }
    // Create new poll
    const poll = this.pollFactory.createAskTeamToAskDrToTakeProjectRequest(
      supervisor,
      student,
      teamSize,
      project,
    );
    await this.pollRepo.save(poll);

    response.status(200).json({ message: "Request sent" });
  }
  async memberAskTeamToTakeTa(request: Request, response: Response) {
    await JoiService.validateRequest(
      request,
      Joi.object({
        studentId: Joi.string().required(),
        supervisorId: Joi.string().required(),
      }),
    );

    const { studentId, supervisorId } = request.body;
    let student;
    let supervisor;
    let teamId;
    let teamSize;
    let teamMembers;
    try {
      student = await this.studentRepo.getById(studentId);
      supervisor = await this.supervisorRepo.getById(supervisorId);
      teamId = student.getTeamId();
      teamMembers = await this.studentRepo.getByTeamId(teamId);
      teamSize = teamMembers.length;
      const teamDepartment = teamMembers[0].getDepartment();
      const supervisorDepartment = supervisor.getDepartment();
      const teamSupervisors = await this.supervisorRepo.getTaByTeamId(teamId);
      const supervisorTeams = supervisor.getTeams();

      if (supervisor.getType() != SupervisorType.TA) {
        response.status(400).json({
          message: "Can't make this request for this supervisor",
        });
        return;
      } else if (teamDepartment.getId() !== supervisorDepartment.getId()) {
        response.status(400).json({
          message: "Dr is from diffrent department",
        });
        return;
      } else if (teamSize < teamDepartment.getMinNumberOfStudents()) {
        response.status(400).json({
          message: "Team is not complete ",
        });
        return;
      } else if (teamSupervisors.length) {
        response.status(400).json({
          message: "You already have a TA, only one is allowed",
        });
        return;
      } else if (supervisorTeams.includes(teamId)) {
        response.status(400).json({
          message: "Supervisor already has team",
        });
        return;
      } else if (supervisorTeams.length > supervisor.getTeamsSlots()) {
        response.status(400).json({
          message: "Max slots reached for supervisor",
        });
        return;
      }
    } catch (error) {
      response.status(404).json({
        message: "Ptoject/Supervisor/Student not found",
      });
      return;
    }

    const existingPolls: Poll[] = await this.pollRepo.getByTeamId(teamId);
    for (let i = 0; i < existingPolls.length; ++i) {
      const poll = existingPolls[i];
      const options = poll.getOptions();
      if (options[0].getType() == PollOptionType.ASK_TA_TO_BE_SUPERVISOR) {
        const data =
          options[0].getData() as AskTeamToAskTaToBeSupervisorRequestData;
        if (
          data.teamId === teamId &&
          data.superviosrId === supervisor.getEcomId() &&
          !poll.getCanRedo()
        ) {
          response.status(400).json({
            message: "You already sent this request to supervisor",
          });
          return;
        }
      }
    }

    const title = "A member requested to send TA request to be supervisor";
    const content = `${student.getName()} wants to ask TA: ${supervisor.getName()} to supervise team`;
    for (let i = 0; i < teamMembers.length; i++) {
      const id = teamMembers[i].getEcomId();
      const noti = this.notiFactory.create(title, content, id);
      await this.notiRepo.save(noti);
    }
    // Create new poll
    const poll = this.pollFactory.createAskTeamToAskTaRequest(
      supervisor,
      student,
      teamSize,
    );
    await this.pollRepo.save(poll);

    response.status(200).json({ message: "Request sent" });
  }
  async TaRequestToSuprviseProject(request: Request, response: Response) {
    await JoiService.validateRequest(
      request,
      Joi.object({
        supervisorId: Joi.string().required(),
        teamId: Joi.string().required(),
      }),
    );

    const { supervisorId, teamId } = request.body;
    const supervisor = await this.supervisorRepo.getById(supervisorId);
    if (supervisor.getType() != SupervisorType.TA) {
      response.status(400).json({
        message: "Can't make this request for this supervisor",
      });
      return;
    }
    const teamSupervisors = await this.supervisorRepo.getTaByTeamId(teamId);
    const existingPolls: Poll[] = await this.pollRepo.getByTeamId(teamId);
    for (let i = 0; i < existingPolls.length; ++i) {
      const poll = existingPolls[i];
      const options = poll.getOptions();
      if (options[0].getType() == PollOptionType.ACCEPT_TA) {
        const data = options[0].getData() as AcceptTaRequestData;
        if (
          data.teamId === teamId &&
          data.superviosrId === supervisor.getEcomId() &&
          !poll.getCanRedo()
        ) {
          response.status(400).json({
            message: "Supervisor already sent this request",
          });
          return;
        }
      }
    }

    const teamMembers = await this.studentRepo.getByTeamId(teamId);
    const teamSize = teamMembers.length;
    const teamDepartment = teamMembers[0].getDepartment();

    // if (teamSize < teamDepartment.getMinNumberOfStudents()) {
    //   response.status(400).json({
    //     message: "Team is not complete ",
    //   });
    //   return;
    // }

    if (teamDepartment.getId() !== supervisor.getDepartment().getId()) {
      response.status(400).json({
        message: "Supervisor is in diffrent department than team department",
      });
      return;
    }

    if (teamSupervisors.length >= 1) {
      response.status(400).json({
        message: "Team reached limit for this department",
      });
      return;
    }

    if (supervisor.getTeams().includes(teamId)) {
      response.status(400).json({
        message: "Supervisor already has team",
      });
      return;
    }

    const teams = supervisor.getTeams().length;
    if (teams > supervisor.getTeamsSlots()) {
      response.status(400).json({
        message: "Max slots reached",
      });
      return;
    }

    const title = "A TA requested to be supervisor";
    const content = `${supervisor.getName()} wants to supervise team`;
    for (let i = 0; i < teamMembers.length; i++) {
      const id = teamMembers[i].getEcomId();
      const noti = this.notiFactory.create(title, content, id);
      await this.notiRepo.save(noti);
    }
    // Create new poll
    const poll = this.pollFactory.createAcceptTaRequest(
      supervisor,
      teamId,
      teamSize,
    );
    await this.pollRepo.save(poll);

    response.status(200).json({ message: "Request sent" });
  }

  async getSupervisorTeams(request: Request, response: Response) {
    await JoiService.validateRequest(
      request,
      Joi.object({
        supervisorId: Joi.string().required(),
        userType: Joi.number().required(),
      }),
    );
    const { supervisorId } = request.body;
    const supervisor = await this.supervisorRepo.getById(supervisorId);
    const teamIds = supervisor.getTeams();
    const teams = [];
    for (let i = 0; i < teamIds.length; i++) {
      const id = teamIds[i];

      const students = await this.studentRepo.getByTeamId(id);
      const projects = await this.projectRepo.getMainByTeamId(id);
      // const projects = await this.projectRepo.getByTeamId(id);

      const studentsObject = students.map((student) => {
        const obj = this.studentTransformer.toObject(student);
        return { ...obj, passwordHash: undefined };
      });
      const projectsObject = projects.map((project) =>
        this.projectTransformer.toObject(project),
      );

      teams.push({
        students: studentsObject,
        mainProject: projectsObject.length
          ? projectsObject[0]
          : "No project is assigned",
      });
    }
    response.status(200).json(teams);
  }
  private transformTechs(technology: Technology[]): TechnologyObject[] {
    return technology.map((t) => {
      return {
        id: t.getId(),
        name: t.getName(),
      };
    });
  }
  async getStudentTeam(request: Request, response: Response) {
    await JoiService.validateRequest(
      request,
      Joi.object({
        studentId: Joi.string().required(),
      }),
    );

    const { studentId } = request.body;
    const student = await this.studentRepo.getById(studentId);
    const teamId = student.getTeamId();

    const students = await this.studentRepo.getByTeamId(teamId);
    const supervisors = await this.supervisorRepo.getByTeamId(teamId);
    const projects = await this.projectRepo.getMainByTeamId(teamId);
    let techsObject: { [key: string]: any } ={}
    const studentsObject = students.map((student) => {
      student.getTechnologies().map((t) => {techsObject[t.getId()] = t.getName()})
      const obj = this.studentTransformer.toObject(student);
      return { ...obj, passwordHash: undefined };
    });
    const supervisorsObject = supervisors.map((supervisor) => {
      const obj = this.supervisorTransformer.toObject(supervisor);
      return { ...obj, passwordHash: undefined };
    });
    const projectsObject = projects.map((project) =>
      this.projectTransformer.toObject(project),
    );

    let arr = Object.entries(techsObject).map(([k,v])=>{
      return {id: k, name: v}
    })

    response.status(200).json({
      students: studentsObject,
      supervisors: supervisorsObject,
      technologies: arr,
      mainProject: projectsObject.length
        ? projectsObject[0]
        : "No project is assigned",
    });
  }
  async getAllTeams(request: Request, response: Response) {
    await JoiService.validateRequest(
      request,
      Joi.object({
        adminId: Joi.string().required(),
      }),
    );

    const teamIds = await this.studentRepo.getTeams();
    const teams = [];
    for (let i = 0; i < teamIds.length; i++) {
      const id = teamIds[i];
      const students = await this.studentRepo.getByTeamId(id);
      const projects = await this.projectRepo.getMainByTeamId(id);
      const supervisors = await this.supervisorRepo.getByTeamId(id);

      const studentsObject = students.map((student) => {
        const obj = this.studentTransformer.toObject(student);
        return { ...obj, passwordHash: undefined };
      });
      const projectsObject = projects.map((project) =>
        this.projectTransformer.toObject(project),
      );
      const supervisorsObject = supervisors.map((supervisor) => {
        const obj = this.supervisorTransformer.toObject(supervisor);
        return { ...obj, passwordHash: undefined };
      });
      teams.push({
        students: studentsObject,
        supervisors: supervisorsObject,
        mainProject: projectsObject.length
          ? projectsObject[0]
          : "No project is assigned",
      });
    }
    response.status(200).json(teams);
  }

  async getAllTeamsPublic(request: Request, response: Response) {
    const teamIds = await this.studentRepo.getTeams();
    const teams = [];
    for (let i = 0; i < teamIds.length; i++) {
      const id = teamIds[i];
      const students = await this.studentRepo.getByTeamId(id);
      const supervisors = await this.supervisorRepo.getByTeamId(id);

      const studentsObject = students.map((student) => {
        const obj = this.studentTransformer.toObject(student);
        return { ...obj, passwordHash: undefined };
      });
      const supervisorsObject = supervisors.map((supervisor) => {
        const obj = this.supervisorTransformer.toObject(supervisor);
        return { ...obj, passwordHash: undefined };
      });
      teams.push({
        students: studentsObject,
        supervisors: supervisorsObject,
      });
    }
    response.status(200).json(teams);
  }

  async getOnePublicTeam(request: Request, response: Response) {
    const id = request.params.teamId;
    const students = await this.studentRepo.getByTeamId(id);
    const supervisors = await this.supervisorRepo.getByTeamId(id);

    const studentsObject = students.map((student) => {
      const obj = this.studentTransformer.toObject(student);
      return { ...obj, passwordHash: undefined };
    });
    const supervisorsObject = supervisors.map((supervisor) => {
      const obj = this.supervisorTransformer.toObject(supervisor);
      return { ...obj, passwordHash: undefined };
    });

    response.status(200).json({
      students: studentsObject,
      supervisors: supervisorsObject,
    });
  }

  async getOneTeamProjects(request: Request, response: Response) {
    await JoiService.validateRequest(
      request,
      Joi.object({
        supervisorId: Joi.string().required(),
      }),
    );

    const { teamId } = request.body;

    const projects = await this.projectRepo.getByTeamId(teamId);

    const projectsObject = projects.map((project) =>
      this.projectTransformer.toObject(project),
    );

    response.status(200).json({
      projects: projectsObject,
    });
  }
  async studentLeaveTeam(request: Request, response: Response) {
    await JoiService.validateRequest(
      request,
      Joi.object({
        studentId: Joi.string().required(),
      }),
    );
    const { studentId } = request.body;
    const student = await this.studentRepo.getById(studentId);
    const teamId = student.getTeamId();
    const members = await this.studentRepo.getByTeamId(teamId);
    const supervisors = await this.supervisorRepo.getDrByTeamId(teamId);
    const department = student.getDepartment();
    if (
      members.length - 1 < department.getMinNumberOfStudents() &&
      supervisors.length
    ) {
      response.status(400).json({
        message:
          "Can't leave team when supervisor is decided and team size is minimum limit",
      });
      return;
    }
    const team = new Team(
      v4(),
      `${student.getName}'s (${student.getEcomId()}) team`,
      department.getId(),
    );
    await this.teamRepository.save(team);
    student.setTeamId(team.getId());
    await this.studentRepo.update(student);
    const title = "Student left team";
    const content = `${student.getName()} left your team`;
    for (let i = 0; i < members.length; i++) {
      const id = members[i].getEcomId();
      if (id !== student.getEcomId()) {
        const noti = this.notiFactory.create(title, content, id);
        await this.notiRepo.save(noti);
      }
    }
    response.status(200).json({ message: "Left team successfully" });
  }
  async supervisorLeaveTeam(request: Request, response: Response) {
    await JoiService.validateRequest(
      request,
      Joi.object({
        supervisorId: Joi.string().required(),
        userType: Joi.number().required(),
        projectId: Joi.string().required(),
      }),
    );
    const { supervisorId, projectId, userType } = request.body;
    const isDr = userType == SupervisorType.DOCTOR;
    const supervisor = await this.supervisorRepo.getById(supervisorId);
    const teams = supervisor.getTeams();
    const project = await this.projectRepo.getById(projectId);
    const teamId = project.getOwnerId();
    const students = await this.studentRepo.getByTeamId(teamId);
    const newTeams = [];
    for (let i = 0; i < teams.length; i++) {
      const team = teams[i];
      if(team !== teamId) newTeams.push(team);
    }
    supervisor.setTeams(newTeams);
    await this.supervisorRepo.update(supervisor);
    const title = isDr ? "Doctor left team" : "TA left team";
    const content = `${
      isDr ? "Dr." : "TA: "
    }${supervisor.getName()} left your team`;
    for (let i = 0; i < students.length; i++) {
      const id = students[i].getEcomId();
      const noti = this.notiFactory.create(title, content, id);
      await this.notiRepo.save(noti);
    }
    response.status(200).json({ message: "Left team successfully" });
  }
}
