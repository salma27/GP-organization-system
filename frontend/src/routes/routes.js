import { StaffDashboardPage } from "components/pages";

export const root = "/";
export const loginRoute = "/login";

export const studentBase = "/stud";
export const studentDashboardRoute = `${studentBase}/dashboard`;
export const studentProfileRoute = `${studentDashboardRoute}/student-profile`;
export const studentTeamRoute = `${studentDashboardRoute}/student-team`;
export const studentProjectsRoute = `${studentDashboardRoute}/student-projects`;
export const studentRequestsRoute = `${studentDashboardRoute}/student-requests`;

export const newsFeedRoute = "/news-feed";
export const oldProjectsRoute = "/old-projects";
export const SearchResult = "/search";
export const search = "/search/:id/:type";
export const userInfo = "/user/:id";
// export const teamInfo = "/team/:id";
// export const projects = "/team/:id/projects";

export const adminRoute = "/admin";
export const adminLoginRoute = "/admin/login";
export const adminDashboard = "/admin/dashboard";

export const studentsDataTable = `${adminDashboard}/students-data-table`;
export const doctorsDataTable = `${adminDashboard}/doctors-data-table`;
export const taDataTable = `${adminDashboard}/ta-data-table`;
export const teamsDataTable = `${adminDashboard}/teams-data-table`;

export const staffBase = "/staff";
export const staffDashboradRoute = `${staffBase}/dashboard`;
export const staffProfileRoute = `${staffDashboradRoute}/profile`;
export const staffProjects = `${staffDashboradRoute}/projects`;
export const staffAllProjects = `${staffDashboradRoute}/all-projects`;
export const staffSupervisedProjectsRoute = `${staffDashboradRoute}/supervised-projects`;
export const staffRequests = `${staffDashboradRoute}/requests`;
