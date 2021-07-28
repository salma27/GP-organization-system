import { SupervisorObject } from "@app/Service/SupervisorTransformer";

const supervisors: SupervisorObject[] = [
  {
    id: "1",
    ecomId: "h.hesham",
    name: "Hesham Hassan",
    bio: "",
    teams: [],
    passwordHash:
      "$2a$12$Kfmiaqy2lnHwW8iaeXosn.GNxaI6qd1K/lC50mJpI2U.pzb9DqiB.",
    teamsSlots: 7,
    type: 0,
    technologies: ["TYPESCRIPT", "JAVA"],
    department: "CS",
  },
  {
    id: "2",
    ecomId: "s.elnady",
    name: "Sarah Elnady",
    bio: "",
    teams: [],
    passwordHash:
      "$2a$12$Kfmiaqy2lnHwW8iaeXosn.GNxaI6qd1K/lC50mJpI2U.pzb9DqiB.",
    teamsSlots: 3,
    type: 1,
    technologies: ["REACT", "CPP"],
    department: "CS",
  },
];

// id: "", ecomId: "", name: "", bio: "", teams:[], passwordHash: "", teamsSlots: "", type: "", technologies: "", department:""
export default supervisors;
