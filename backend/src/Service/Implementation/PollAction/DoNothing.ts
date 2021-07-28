import PollAction from "@app/Service/PollAction";

export default class DoNothing implements PollAction<{}>{
  async run() {
    // I will do nothing :)
  }
}
