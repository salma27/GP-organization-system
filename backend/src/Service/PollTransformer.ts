import Poll from "@app/Model/Poll";
import PollOption, { PollOptionType } from "@app/Model/PollOption";
import Container from "@app/Service/Container";
import PollAction from "@app/Service/PollAction";

interface PollOptionObject {
  id: string;
  title: string;
  type: PollOptionType;
  data: string;
}

type SerializedVoteMap = { studentId: string; pollOptionId: string }[];

export interface PollObject {
  id: string;
  canRedo: boolean;
  title: string;
  ownerId: string;
  teamSize: number;
  option: number;
  options: PollOptionObject[];
  voteMap: SerializedVoteMap;
}

export default class PollTransformer {
  toObject(poll: Poll): PollObject {
    const serializedVotes: SerializedVoteMap = [];
    poll.getVoteMap().forEach((value, key) =>
      serializedVotes.push({
        studentId: key,
        pollOptionId: value,
      }),
    );
    return {
      id: poll.getId(),
      canRedo: poll.getCanRedo(),
      title: poll.getTitle(),
      ownerId: poll.getOwnerId(),
      teamSize: poll.getTeamSize(),
      option: poll.getOption(),
      options: poll
        .getOptions()
        .map((option) => PollTransformer.pollOptionToObject(option)),
      voteMap: serializedVotes,
    };
  }

  toEntity(object: PollObject): Poll {
    const map = new Map<string, string>();
    object.voteMap.forEach((value) => {
      map.set(value.studentId, value.pollOptionId);
    });
    const poll = new Poll(
      object.id,
      object.title,
      object.ownerId,
      object.teamSize,
      object.options.map((option) =>
        PollTransformer.objectToPollOption(option),
      ),
      map,
    );
    poll.setCanRedo(object.canRedo);
    poll.setOption(object.option);
    return poll;
  }

  private static pollOptionToObject(
    pollOption: PollOption<object>,
  ): PollOptionObject {
    return {
      id: pollOption.getId(),
      title: pollOption.getTitle(),
      type: pollOption.getType(),
      data: JSON.stringify(pollOption.getData()),
    };
  }

  private static objectToPollOption(
    object: PollOptionObject,
  ): PollOption<object> {
    let action: PollAction<any>;
    // console.log(object.type);
    // TODO: Check how to compare enums strictly
    if (object.type == PollOptionType.ACCEPT_TEAM_MEMBER) {
      action = Container.resolve("AcceptTeamMemberRequest");
    } else if (object.type == PollOptionType.ACCEPT_DOCTOR_PROJECT) {
      action = Container.resolve("AcceptDrProjectRequest");
    } else if (object.type == PollOptionType.ACCEPT_DOCTOR) {
      action = Container.resolve("AcceptDoctorRequest");
    } else if (object.type == PollOptionType.ACCEPT_TA) {
      action = Container.resolve("AcceptTaRequest");
    } else if (object.type == PollOptionType.ACCEPT_TEAM_PROJECT) {
      action = Container.resolve("AcceptTeamProjectRequest");
    } else if (object.type == PollOptionType.ASK_DOCTOR_TO_BE_SUPERVISOR) {
      action = Container.resolve("AskTeamToAskDrToTakeProjectRequest");
    } else if (object.type == PollOptionType.ASK_TA_TO_BE_SUPERVISOR) {
      action = Container.resolve("AskTeamToAskTaToBeSupervisorRequest");
    } else if (object.type == PollOptionType.ACCEPT_TO_BE_TA) {
      action = Container.resolve("AcceptToBeTaRequest");
    } else if (object.type == PollOptionType.DO_NOTHING) {
      action = Container.resolve("DoNothing");
    } else {
      throw new Error("Cannot transform poll option: Unknown poll option type");
    }
    return new PollOption<object>(
      object.id,
      object.title,
      object.type,
      action,
      JSON.parse(object.data),
    );
  }
}
