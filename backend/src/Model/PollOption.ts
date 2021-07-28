import PollAction from "@app/Service/PollAction";

export enum PollOptionType {
  ACCEPT_TEAM_MEMBER,
  ACCEPT_DOCTOR,
  ACCEPT_DOCTOR_PROJECT,
  ASK_DOCTOR_TO_BE_SUPERVISOR,
  ASK_TA_TO_BE_SUPERVISOR,
  ACCEPT_TEAM_PROJECT,
  ACCEPT_TO_BE_TA,
  ACCEPT_TA,
  DO_NOTHING,
  WAIT
}

export default class PollOption<T extends object> {
  constructor(
    protected id: string,
    protected title: string,
    protected type: PollOptionType,
    protected action: PollAction<T>,
    protected data: T,
  ) {}

  getId() {
    return this.id;
  }

  getTitle() {
    return this.title;
  }

  getData() {
    return this.data;
  }

  runAction(): void {
    this.action.run(this.data);
  }

  getType() {
    return this.type;
  }
}
