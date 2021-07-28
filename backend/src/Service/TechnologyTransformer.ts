import Department from "@app/Model/Department";
import Technology from "@app/Model/Technology";

export interface TechnologyObject {
  id: string;
  name: string;
}

export default class TechnologyTransformer {
  toObject(technology: Technology): TechnologyObject {
    return {
      id: technology.getId(),
      name: technology.getName(),
    };
  }

  toEntity(object: TechnologyObject): Technology {
    return new Technology(object.id, object.name);
  }
}
