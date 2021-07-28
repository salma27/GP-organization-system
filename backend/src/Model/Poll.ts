import PollOption, { PollOptionType } from "@app/Model/PollOption";
import Student from "@app/Model/Student";
import Supervisor from "./Supervisor";

export default class Poll {
  private canRedo: boolean;
  private option: PollOptionType;

  constructor(
    private id: string,
    private title: string,
    private ownerId: string,
    private teamSize: number,
    private options: PollOption<object>[],
    private voteMap: Map<string, string>,
  ) {
    this.canRedo = false;
    this.option = PollOptionType.WAIT;
  }

  getCanRedo() {
    return this.canRedo;
  }
  getOption() {
    return this.option;
  }
  setOption(option: PollOptionType) {
    this.option = option;
  }
  getTeamSize() {
    return this.teamSize;
  }
  setCanRedo(canRedo: boolean) {
    this.canRedo = canRedo;
  }
  getId() {
    return this.id;
  }

  getTitle() {
    return this.title;
  }

  getOptions() {
    return this.options;
  }

  getOwnerId() {
    return this.ownerId;
  }
  setTeamId(ownerId: string) {
    this.ownerId = ownerId;
  }

  hasStudentVoted(studentId: string) {
    return this.voteMap.has(studentId);
  }

  addStudentVote(student: Student, optionId: string) {
    if (this.hasStudentVoted(student.getEcomId())) {
      throw new Error("Student has already voted");
    }
    if (student.getTeamId() !== this.getOwnerId()) {
      throw new Error("Student doesn't have access to vote on this poll");
    }
    const hasId = this.options.reduce(
      (acc, current) => acc || current.getId() === optionId,
      false,
    );
    if (!hasId) {
      throw new Error("Option doesn't exist");
    }
    this.voteMap.set(student.getEcomId(), optionId);

    // TODO: Calculate each vote score and run winning option if possible
    const counter: any = {};
    const result = { maxVotes: 0, winningId: "" };
    this.voteMap.forEach((value, k) => {
      if (counter[value] !== undefined) counter[value] += 1;
      else counter[value] = 1;
      if (result.maxVotes < counter[value]) {
        result.maxVotes = counter[value];
        result.winningId = value;
      }
    });
    console.log("counter: ", counter);
    console.log("result: ", result);

    const tie = this.checkTie(Object.values(counter));
    if (tie && result.maxVotes >= Math.ceil(this.teamSize / 2.0)) {
      console.log("In tie");

      this.setCanRedo(true);
      const option = this.options[this.options.length - 1]; // do nothing option
      option.runAction();
      return option.getType();
    } else if (result.maxVotes >= Math.ceil(this.teamSize / 2.0)) {
      console.log("In Option");
      // Get each option count from voteMap (student id to options id)
      // Say winning option is option
      // then option.runAction(); <- just call this on winning option
      for (let i = 0; i < this.options.length; i++) {
        const option = this.options[i];
        if (result.winningId === option.getId()) {
          option.runAction();
          return option.getType();
        }
      }
    }
    return null;
  }
  addSupervisorVote(supervisor: Supervisor, optionId: string) {
    if (this.hasStudentVoted(supervisor.getEcomId())) {
      throw new Error("Supervisor has already voted");
    }
    if (supervisor.getEcomId() !== this.getOwnerId()) {
      throw new Error("Supervisor doesn't have access to vote on this poll");
    }
    const hasId = this.options.reduce(
      (acc, current) => acc || current.getId() === optionId,
      false,
    );
    if (!hasId) {
      throw new Error("Option doesn't exist");
    }
    const result = { maxVotes: 1, winningId: optionId };
    console.log("result: ", result);
    if (result.maxVotes >= Math.ceil(this.teamSize / 2.0)) {
      console.log("In Sup Option");
      for (let i = 0; i < this.options.length; i++) {
        const option = this.options[i];
        if (result.winningId === option.getId()) {
          option.runAction();
          return option.getType();
        }
      }
    }
    return null;
  }
  private checkTie(votes: number[]): boolean {
    return votes.every((v) => v === votes[0]) && votes.length > 1;
  }
  getVoteMap() {
    return this.voteMap;
  }
}
