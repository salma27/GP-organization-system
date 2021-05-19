import vest, { validate, test, enforce } from "vest";

export default vest.create("formName", (data, field) => {
    vest.only(field);
    ["ptitle", "description"].forEach((elem) => {
        test(elem, "This field is required", () => {
            enforce(data[elem].toString()).isNotEmpty();
        });
    });
    test("ptitle", "Title should be at least 3 characters long", () => {
        enforce(data.ptitle.toString()).longerThanOrEquals(3);
    });
    test("description", "Description should be at least 250 words", () => {
        enforce(data.description.toString().split(" ")).longerThanOrEquals(3);
    });
});
