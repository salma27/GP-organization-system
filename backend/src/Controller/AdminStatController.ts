import Joi from "joi";
import { Request, Response } from "express";
import JoiService from "@app/Service/JoiService";
import DepartmentRepository from "@app/Service/DepartmentRepository";
import StudentRepository from "@app/Service/StudentRepository";
import SupervisorRepository from "@app/Service/SupervisorRepository";
import { SupervisorType } from "@app/Model/Supervisor";

export default class AdminStatController {
  constructor(
    private departmentRepository: DepartmentRepository,
    private superRepo: SupervisorRepository,
    private studentRepo: StudentRepository,
  ) {}
  async getStats(request: Request, response: Response) {
    await JoiService.validateRequest(
      request,
      Joi.object({
        adminId: Joi.string().required(),
      }),
    );
    const departments = await this.departmentRepository.getAll();
    const depArr: { id: string; name: string }[] = departments.map((dep) => {
      return { id: dep.getId(), name: dep.getName() };
    });
    var depObject: { [key: string]: any } = depArr.reduce(
      (obj, item) => Object.assign(obj, { [item.id]: item.name }),
      {},
    );
    let dr = SupervisorType.DOCTOR;
    let ta = SupervisorType.TA;
    let drStat = await this.superRepo.getCountByDepartment(dr);
    let drTotal = await this.superRepo.getCountByType(dr);
    let taStat = await this.superRepo.getCountByDepartment(ta);
    let taTotal = await this.superRepo.getCountByType(ta);
    let studStat = await this.studentRepo.getCountByDepartment();
    let studTotal = await this.studentRepo.getCount();
    let teamStat = await this.studentRepo.getTeamsByDepartment();
    let teamTotal = await this.studentRepo.getTeamsCount();
    let singleStat = await this.studentRepo.getSingleStudentsByDepartment();
    let singleTotal = await this.studentRepo.getSingleStudentsCount();
    let availableDrStat = await this.superRepo.getAvailableByDepartment(dr);
    let availableDrTotal = await this.superRepo.getAvailableCount(dr);
    let availableTaStat = await this.superRepo.getAvailableByDepartment(ta);
    let availableTaTotal = await this.superRepo.getAvailableCount(ta);

    drStat = drStat.map((obj) => {
      return { name: depObject[obj._id], ...obj };
    });
    taStat = taStat.map((obj) => {
      return { name: depObject[obj._id], ...obj };
    });
    studStat = studStat.map((obj) => {
      return { name: depObject[obj._id], ...obj };
    });
    teamStat = teamStat.map((obj) => {
      return { name: depObject[obj._id], ...obj };
    });
    singleStat = singleStat.map((obj) => {
      return { name: depObject[obj._id], ...obj };
    });
    availableDrStat = availableDrStat.map((obj) => {
      return { name: depObject[obj._id], ...obj };
    });
    availableTaStat = availableTaStat.map((obj) => {
      return { name: depObject[obj._id], ...obj };
    });
    
    response.status(200).json({
      departments: depObject,
      drStat: { total: drTotal, stat: drStat },
      taStat: { total: taTotal, stat: taStat },
      studStat: { total: studTotal, stat: studStat },
      teamStat: { total: teamTotal, stat: teamStat },
      singleStat: { total: singleTotal, stat: singleStat },
      availableDrStat: { total: availableDrTotal, stat: availableDrStat },
      availableTaStat: { total: availableTaTotal, stat: availableTaStat },
    });
  }
}
