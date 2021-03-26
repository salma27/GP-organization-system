import {
    createServer,
    Model,
    hasMany,
    belongsTo,
    Response,
    RestSerializer,
    Factory,
} from "miragejs";

let paragraph = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac nisl rhoncus, dapibus felis vel, aliquet mi. Praesent non turpis nec sapien faucibus ornare eu efficitur eros. In finibus ultrices porttitor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi vitae mattis nisl.`;

export default function server() {
    createServer({
        serializers: {
            //     reminder: RestSerializer.extend({
            //         include: ["list"],
            //         embed: true,
            //     }),
            student: RestSerializer.extend({
                include: ["technology", "department"],
                embed: true,
            }),
        },
        models: {
            student: Model.extend({
                technology: hasMany("technology"),
                project: hasMany(),
                invitation: hasMany(),
                department: belongsTo("department"),
            }),

            project: Model.extend({
                author: belongsTo("student"),
                technology: hasMany("technology"),
            }),

            invitation: Model.extend({
                student: hasMany(),
            }),
            technology: Model.extend({
                // student: hasMany(),
            }),
            department: Model.extend({
                // student: hasMany(),
            }),
        },
        factories: {
            // student: Factory.extend({
            //     name(i) {
            //         return `Reminder ${i + 1}`;
            //     },
            // }),
            // project: Factory.extend({
            //     name(i) {
            //         return `List ${i + 1}`;
            //     },
            //     afterCreate(list, server) {
            //         server.createList("reminder", 5, {list});
            //     },
            // }),
        },
        seeds(server) {
            let AI = server.create("technology", {
                key: "AI",
                value: "Artificial Intelligence",
            });
            let DS = server.create("technology", {
                key: "DS",
                value: "Data Science",
            });
            let IoT = server.create("technology", {
                key: "IoT",
                value: "Internet of Things",
            });
            let BC = server.create("technology", {
                key: "BC",
                value: "Blockchain",
            });
            let RPA = server.create("technology", {
                key: "RPA",
                value: "Robotic Process Automation (RPA",
            });
            let VR = server.create("technology", {
                key: "VR",
                value: "Virtual Reality",
            });
            let EC = server.create("technology", {
                key: "EC",
                value: "Edge Computing",
            });
            let IA = server.create("technology", {
                key: "IA",
                value: "Intelligent apps",
            });

            let ds = server.create("department", {
                key: "DS",
                value: "Decision support",
            });
            let cs = server.create("department", {
                key: "CS",
                value: "Computer science",
            });
            let it = server.create("department", {
                key: "IT",
                value: "Information technology",
            });
            let is = server.create("department", {
                key: "IS",
                value: "Information system",
            });

            // server.create("reminder", {text: "Work out"});
            // server.createList("reminder", 10);

            // let homeList = server.create("list", {name: "Home"});
            // server.create("reminder", {list: homeList, text: "Do taxes"});
            let sara_samer = server.create("student", {
                name: "Sara Samer",
                stud_id: "20170110",
                password: "12341234",
                department: cs,
                technology: [IoT, VR, RPA],
            });
            let salma_essam = server.create("student", {
                name: "Salma Essam",
                stud_id: "20170115",
                password: "12341234",
                department: it,
                technology: [RPA, EC, IA],
            });
            let sara_saeed = server.create("student", {
                name: "Sara Saeed",
                stud_id: "20170111",
                password: "12341234",
                department: ds,
                technology: [AI, VR, BC],
            });
            let ameer = server.create("student", {
                name: "Amir Mohamed",
                stud_id: "20160066",
                password: "12341234",
                department: is,
                technology: [DS, VR, IA],
            });

            // let workList = server.create("list", {name: "Work"});
            // server.create("reminder", {list: workList, text: "Visit bank"});
            // server.create("list", {
            //     reminders: server.createList("reminder", 5),
            // });
            server.create("project", {
                title: "Tbdel",
                technology: [AI, VR, IA],
                author: sara_samer,
                description: paragraph,
            });
            server.create("project", {
                title: "Gamefy",
                technology: [AI, DS, EC],
                author: sara_saeed,
                description: paragraph,
            });
            server.create("project", {
                title: "Goldy",
                technology: [RPA, EC, BC],
                author: sara_samer,
                description: paragraph,
            });
            server.create("project", {
                title: "Amana",
                technology: [IoT, VR],
                author: salma_essam,
                description: paragraph,
            });
            server.create("project", {
                title: "Disney-",
                technology: [AI, BC],
                author: salma_essam,
                description: paragraph,
            });

            server.create("project", {
                title: "Made by Me",
                technology: [AI, VR, IA],
                author: null,
                description: paragraph,
            });
            server.create("project", {
                title: "The Coding Awards",
                technology: [AI, DS, EC],
                author: null,
                description: paragraph,
            });
            server.create("project", {
                title: "Casanova",
                technology: [RPA, EC, BC],
                author: null,
                description: paragraph,
            });
            server.create("project", {
                title: "Husky Cat",
                technology: [IoT, VR],
                author: null,
                description: paragraph,
            });
            server.create("project", {
                title: "Cascade",
                technology: [AI, BC],
                author: null,
                description: paragraph,
            });

            // server.create("list");
        },
        routes() {
            this.post("/api/user/auth", (schema, request) => {
                let attrs = JSON.parse(request.requestBody);
                console.log(attrs);
                let student = schema.students.where(
                    (s) =>
                        s.stud_id === attrs.id && s.password === attrs.password
                ).models[0];
                console.log(student);
                if (student) return student;
                return new Response(
                    404,
                    {some: "header"},
                    {errors: ["undefined user"]}
                );
            });
            this.post("/api/user/me", (schema, request) => {
                let attrs = JSON.parse(request.requestBody);
            });
            this.get("/api/technologies", (schema)=>{
                return schema.technology.all();
            })
            // this.get("/api/lists", (schema, request) => {
            //     return schema.lists.all();
            // });

            // this.get("/api/reminders", (schema) => {
            //     return schema.reminders.all();
            // });

            // this.delete("/api/reminders/:id", (schema, request) => {
            //     let id = request.params.id;

            //     return schema.reminders.find(id).destroy();
            // });
            // this.get("/api/lists/:id/reminders", (schema, request) => {
            //     let listId = request.params.id;
            //     let list = schema.lists.find(listId);

            //     return list.reminders;
            // });
        },
    });
}
