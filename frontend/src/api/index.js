import {
    createServer,
    Model,
    hasMany,
    belongsTo,
    RestSerializer,
    Factory,
} from "miragejs";
export default function server() {
    createServer({
        serializers: {
            reminder: RestSerializer.extend({
                include: ["list"],
                embed: true,
            }),
        },
        models: {
            list: Model.extend({
                reminders: hasMany(),
            }),

            reminder: Model.extend({
                list: belongsTo(),
            }),
        },
        factories: {
            reminder: Factory.extend({
                text(i) {
                    return `Reminder ${i + 1}`;
                },
            }),
            list: Factory.extend({
                name(i) {
                    return `List ${i + 1}`;
                },
                afterCreate(list, server) {
                    server.createList("reminder", 5, {list});
                },
            }),
        },
        seeds(server) {
            // server.create("reminder", {text: "Walk the dog"});
            // server.create("reminder", {text: "Take out the trash"});
            // server.create("reminder", {text: "Work out"});
            // server.createList("reminder", 10);

            // let homeList = server.create("list", {name: "Home"});
            // server.create("reminder", {list: homeList, text: "Do taxes"});

            // let workList = server.create("list", {name: "Work"});
            // server.create("reminder", {list: workList, text: "Visit bank"});
            // server.create("list", {
            //     reminders: server.createList("reminder", 5),
            // });
            server.create("list", {
                name: "Home",
                reminders: [server.create("reminder", {text: "Do taxes"})],
            });

            server.create("list");
        },
        routes() {
            this.get("/api/lists", (schema, request) => {
                return schema.lists.all();
            });

            this.get("/api/reminders", (schema) => {
                return schema.reminders.all();
            });

            this.post("/api/reminders", (schema, request) => {
                let attrs = JSON.parse(request.requestBody);
                console.log(attrs);

                return schema.reminders.create(attrs);
            });

            this.delete("/api/reminders/:id", (schema, request) => {
                let id = request.params.id;

                return schema.reminders.find(id).destroy();
            });
            this.get("/api/lists/:id/reminders", (schema, request) => {
                let listId = request.params.id;
                let list = schema.lists.find(listId);

                return list.reminders;
            });
        },
    });
}
