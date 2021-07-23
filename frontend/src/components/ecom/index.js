import Register from "./Register";

const StudentRegister = () => <Register student />;
const SupervisorRegister = () => <Register supervisor />;


export { default as EcomMock } from "./EcomMock";
// export { default as Register } from "./Register";


export { StudentRegister as StudentRegister };
export { SupervisorRegister as SupervisorRegister };
export { Register as Register };
