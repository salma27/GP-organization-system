import vest, {validate, test, enforce} from "vest";

export default vest.create("formName", (data, field) => {
    vest.only(field);
    ["id", "password"].forEach((elem) => {
        test(elem, "This field is required", () => {
            enforce(data[elem].toString()).isNotEmpty();
        });
    });
    test("password", "Password should be at least 8 characters long", () => {
        enforce(data.password.toString()).longerThanOrEquals(8);
    });
});
