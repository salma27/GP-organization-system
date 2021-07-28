import Container, { ContainerDefinitions } from "@app/Service/Container";
import mongoose from "mongoose";
import AcceptTeamMemberRequest from "@app/Service/Implementation/PollAction/AcceptTeamMemberRequest";
import MongooseStudentRepository from "@app/Service/Implementation/MongooseStudentRepository";
import StudentTransformer from "@app/Service/StudentTransformer";
import MongooseDepartmentRepository from "@app/Service/Implementation/MongooseDepartmentRepository";
import DepartmentTransformer from "@app/Service/DepartmentTransformer";
import MongooseTechnologyRepository from "@app/Service/Implementation/MongooseTechnologyRepository";
import TechnologyTransformer from "@app/Service/TechnologyTransformer";
import StudentController from "@app/Controller/StudentController";
import MongooseTeamRepository from "@app/Service/Implementation/MongooseTeamRepository";
import TeamTransformer from "@app/Service/TeamTransformer";
import DoNothing from "@app/Service/Implementation/PollAction/DoNothing";
import TeamController from "@app/Controller/TeamController";
import MongoosePollRepository from "@app/Service/Implementation/MongoosePollRepository";
import PollTransformer from "@app/Service/PollTransformer";
import PollController from "@app/Controller/PollController";
import ProjectController from "@app/Controller/ProjectController";
import AdminController from "@app/Controller/AdminController";
import MongooseProjectRepository from "@app/Service/Implementation/MongooseProjectRepository";
import ProjectFactory from "@app/Service/Factory/ProjectFactory";
import ProjectTransformer from "@app/Service/ProjectTransformer";
import MongooseAdminRepository from "@app/Service/Implementation/MongooseAdminRepository";
import AdminTransformer from "@app/Service/AdminTransformer";
import SupervisorController from "@app/Controller/SupervisorController";
import MongooseSupervisorRepository from "@app/Service/Implementation/MongooseSupervisorRepository";
import SupervisorFactory from "@app/Service/Factory/SupervisorFactory";
import SupervisorTransformer from "@app/Service/SupervisorTransformer";
import DepartmentController from "@app/Controller/DepartmentController";
import DepartmentFactory from "@app/Service/Factory/DepartmentFactory";
import TechnologyController from "@app/Controller/TechnologyController";
import AnnouncementController from "@app/Controller/AnnouncementController";
import MongooseAnnouncementRepository from "@app/Service/Implementation/MongooseAnnouncementRepository";
import AnnouncementTransformer from "@app/Service/AnnouncementTransformer";
import PollFactory from "@app/Service/Factory/PollFactory";
import PollHistoryFactory from "@app/Service/Factory/PollHistoryFactory";
import MongoosePollHistoryRepository from "@app/Service/Implementation/MongoosePollHistoryRepository";
import PollHistoryTransformer from "@app/Service/PollHistoryTransformer";
import AcceptDoctorRequest from "@app/Service/Implementation/PollAction/AcceptDoctorRequest";
import AcceptTaRequest from "@app/Service/Implementation/PollAction/AcceptTaRequest";
import AcceptDrProjectRequest from "./Service/Implementation/PollAction/AcceptDrProjectRequest";
import AcceptTeamProjectRequest from "./Service/Implementation/PollAction/AcceptTeamProjectRequest";
import AskTeamToAskDrToTakeProjectRequest from "./Service/Implementation/PollAction/AskTeamToAskDrToTakeProjectRequest";
import AskTeamToAskTaToBeSupervisorRequest from "./Service/Implementation/PollAction/AskTeamToAskTaToBeSupervisorRequest";
import AcceptToBeTaRequest from "./Service/Implementation/PollAction/AcceptToBeTaRequest";
import NotificationController from "./Controller/NotificationController";
import NotificationTransformer from "./Service/NotificationTransformer";
import MongooseNotificationRepository from "./Service/Implementation/MongooseNotificationRepository";
import NotificationFactory from "./Service/Factory/NotificationFactory";
import AdminStatController from "./Controller/AdminStatController";
import TechnologyFactory from "./Service/Factory/TechnologyFactory";

const ObjectDefinitions: ContainerDefinitions = {
  MONGOOSE_CONNECTION: async () => {
    const { DB_HOST, DB_PORT, DB_NAME } = process.env;
    return mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
      useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true,
    });
  },
  AcceptTeamMemberRequest: () =>
    new AcceptTeamMemberRequest(
      Container.resolve("StudentRepository"),
      Container.resolve("TeamRepository"),
    ),
  AcceptDoctorRequest: () =>
    new AcceptDoctorRequest(
      Container.resolve("SupervisorRepository"),
      Container.resolve("ProjectRepository"),
    ),
  AcceptDrProjectRequest: () =>
    new AcceptDrProjectRequest(
      Container.resolve("SupervisorRepository"),
      Container.resolve("ProjectRepository"),
    ),
  AcceptTeamProjectRequest: () =>
    new AcceptTeamProjectRequest(
      Container.resolve("SupervisorRepository"),
      Container.resolve("ProjectRepository"),
    ),
  AcceptToBeTaRequest: () =>
    new AcceptToBeTaRequest(Container.resolve("SupervisorRepository")),
  AskTeamToAskTaToBeSupervisorRequest: () =>
    new AskTeamToAskTaToBeSupervisorRequest(
      Container.resolve("SupervisorRepository"),
      Container.resolve("StudentRepository"),
      Container.resolve("PollRepository"),
      Container.resolve("PollFactory"),
    ),
  AskTeamToAskDrToTakeProjectRequest: () =>
    new AskTeamToAskDrToTakeProjectRequest(
      Container.resolve("SupervisorRepository"),
      Container.resolve("StudentRepository"),
      Container.resolve("ProjectRepository"),
      Container.resolve("PollRepository"),
      Container.resolve("PollFactory"),
    ),
  AcceptTaRequest: () =>
    new AcceptTaRequest(Container.resolve("SupervisorRepository")),
  StudentRepository: () =>
    new MongooseStudentRepository(Container.resolve("StudentTransformer")),
  StudentTransformer: () =>
    new StudentTransformer(
      Container.resolve("DepartmentRepository"),
      Container.resolve("TechnologyRepository"),
    ),
  DepartmentRepository: () =>
    new MongooseDepartmentRepository(
      Container.resolve("DepartmentTransformer"),
    ),
  DepartmentTransformer: () => new DepartmentTransformer(),
  TechnologyRepository: () =>
    new MongooseTechnologyRepository(
      Container.resolve("TechnologyTransformer"),
    ),
  TechnologyTransformer: () => new TechnologyTransformer(),
  StudentController: () =>
    new StudentController(
      Container.resolve("DepartmentRepository"),
      Container.resolve("TechnologyRepository"),
      Container.resolve("StudentRepository"),
      Container.resolve("StudentTransformer"),
      Container.resolve("TeamRepository"),
    ),
  TeamRepository: () =>
    new MongooseTeamRepository(Container.resolve("TeamTransformer")),
  TeamTransformer: () => new TeamTransformer(),
  DoNothing: () => new DoNothing(),
  TeamController: () =>
    new TeamController(
      Container.resolve("StudentRepository"),
      Container.resolve("PollRepository"),
      Container.resolve("SupervisorRepository"),
      Container.resolve("ProjectRepository"),
      Container.resolve("StudentTransformer"),
      Container.resolve("ProjectTransformer"),
      Container.resolve("SupervisorTransformer"),
      Container.resolve("PollFactory"),
      Container.resolve("NotificationFactory"),
      Container.resolve("NotificationRepository"),
      Container.resolve("TeamRepository"),
      // Container.resolve("PollHistoryFactory"),
      // Container.resolve("PollHistoryRepository"),
    ),
  PollRepository: () =>
    new MongoosePollRepository(Container.resolve("PollTransformer")),
  PollTransformer: () => new PollTransformer(),
  PollController: () =>
    new PollController(
      Container.resolve("StudentRepository"),
      Container.resolve("ProjectRepository"),
      Container.resolve("SupervisorRepository"),
      Container.resolve("PollRepository"),
      Container.resolve("PollTransformer"),
      Container.resolve("NotificationFactory"),
      Container.resolve("NotificationRepository"),
    ),
  ProjectController: () =>
    new ProjectController(
      Container.resolve("ProjectRepository"),
      Container.resolve("TechnologyRepository"),
      Container.resolve("DepartmentRepository"),
      Container.resolve("StudentRepository"),
      Container.resolve("SupervisorRepository"),
      Container.resolve("ProjectFactory"),
      Container.resolve("ProjectTransformer"),
    ),
  ProjectRepository: () =>
    new MongooseProjectRepository(Container.resolve("ProjectTransformer")),
  ProjectFactory: () => new ProjectFactory(),
  ProjectTransformer: () =>
    new ProjectTransformer(
      Container.resolve("DepartmentRepository"),
      Container.resolve("TechnologyRepository"),
    ),
  AdminController: () =>
    new AdminController(Container.resolve("AdminRepository")),
  AdminRepository: () =>
    new MongooseAdminRepository(Container.resolve("AdminTransformer")),
  AdminTransformer: () => new AdminTransformer(),
  SupervisorController: () =>
    new SupervisorController(
      Container.resolve("DepartmentRepository"),
      Container.resolve("TechnologyRepository"),
      Container.resolve("SupervisorRepository"),
      Container.resolve("SupervisorFactory"),
      Container.resolve("SupervisorTransformer"),
      Container.resolve("StudentRepository"),
      Container.resolve("ProjectRepository"),
      Container.resolve("StudentTransformer"),
      Container.resolve("ProjectTransformer"),
    ),
  SupervisorRepository: () =>
    new MongooseSupervisorRepository(
      Container.resolve("SupervisorTransformer"),
    ),
  SupervisorFactory: () => new SupervisorFactory(),
  SupervisorTransformer: () =>
    new SupervisorTransformer(
      Container.resolve("DepartmentRepository"),
      Container.resolve("TechnologyRepository"),
    ),
  DepartmentController: () =>
    new DepartmentController(
      Container.resolve("DepartmentRepository"),
      Container.resolve("DepartmentFactory"),
      Container.resolve("DepartmentTransformer"),
    ),
  DepartmentFactory: () => new DepartmentFactory(),
  TechnologyController: () =>
    new TechnologyController(
      Container.resolve("TechnologyRepository"),
      Container.resolve("TechnologyTransformer"),
      Container.resolve("TechnologyFactory"),
    ),
  TechnologyFactory: () => new TechnologyFactory(),
  AnnouncementController: () =>
    new AnnouncementController(
      Container.resolve("AnnouncementRepository"),
      Container.resolve("AnnouncementTransformer"),
    ),
  AnnouncementRepository: () =>
    new MongooseAnnouncementRepository(
      Container.resolve("AnnouncementTransformer"),
    ),
  AnnouncementTransformer: () => new AnnouncementTransformer(),
  PollFactory: () => new PollFactory(),
  PollHistoryFactory: () => new PollHistoryFactory(),
  PollHistoryRepository: () =>
    new MongoosePollHistoryRepository(
      Container.resolve("PollHistoryTransformer"),
    ),
  PollHistoryTransformer: () => new PollHistoryTransformer(),
  NotificationController: () =>
    new NotificationController(
      Container.resolve("NotificationRepository"),
      Container.resolve("NotificationTransformer"),
    ),
  NotificationRepository: () =>
    new MongooseNotificationRepository(
      Container.resolve("NotificationTransformer"),
    ),
  AdminStatController: () =>
    new AdminStatController(
      Container.resolve("DepartmentRepository"),
      Container.resolve("SupervisorRepository"),
      Container.resolve("StudentRepository"),
    ),
  NotificationTransformer: () => new NotificationTransformer(),
  NotificationFactory: () => new NotificationFactory(),
};

export default ObjectDefinitions;
