import vest, { validate, test, enforce } from "vest";

export default vest.create("formName", (data, field) => {
    vest.only(field);
    ["id", "name", "mail", "email", "team", "gpa"].forEach((elem) => {
        test(elem, "This field is required", () => {
            enforce(data[elem].toString()).isNotEmpty();
        });
    });
    test("id", "ID should be 8 numbers", () => {
        enforce(data.id.toString()).matches(/20[0-9]{6}/);
    });

    test("name", "Name should not contain numbers", () => {
        enforce(data.name.toString()).matches(/[\s[A-Za-z]]*/);
    });
    test("name", "Name should at least contain first and last names", () => {
        enforce(data.name.toString().split(" ")).longerThanOrEquals(3);
    });
    test("mail", "Mail shoud be in the form of: ex@ex.com", () => {
        enforce(data.mail.toString()).matches(/.*@.*\.com/);
    });
    test("email", "Mail shoud be in the form of: ex@ex.com", () => {
        enforce(data.email.toString()).matches(/.*@.*\.com/);
    });
    test("gpa", "GPA should be in the form of: 4.00", () => {
        enforce(data.gpa.toString()).matches(/[0-9]\.[0-9]{2}/);
    });
    test("team", "Team should be a number", () => {
        enforce(data.team.toString()).matches(/[0-9]*/);
    });
});
