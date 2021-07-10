import {Schema, model} from "mongoose";

const StudentSchema = new Schema({
    id: {
        type: String,
        required: [true, "No ID provided"],
        unique: [true, "ID already exists"],
    },
    password: {
        type: String,
        required: [true, "No password provided"],
    },
    name: {
        type: String,
        required: true,
    },
    bio: {type: String},
    technologies: [{type: Schema.Types.ObjectId, ref: "technology"}],
    profile_picture: {type: String},
});

const addTechnology = () => {};

StudentSchema.methods = {
    addTechnology: addTechnology,
};

const Student = model("student", StudentSchema);

export default Student;
