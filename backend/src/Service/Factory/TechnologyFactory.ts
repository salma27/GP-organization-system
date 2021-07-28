import Technology from "@app/Model/Technology";

export default class TechnologyFactory {
  private getId(name: string): string {
    return name.replace(/[^\w]/gi, '').toUpperCase();
  }
  create(name: string): Technology {
    const id = this.getId(name);
    return new Technology(id, name);
  }
}
