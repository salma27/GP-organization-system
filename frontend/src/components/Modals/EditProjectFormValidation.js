import vest, { test, enforce } from "vest";

export default vest.create("formName", (data, field) => {
    vest.only(field);
    ["title", "brief_description"].forEach((elem) => {
        test(elem, "This field is required", () => {
            enforce(data[elem].toString()).isNotEmpty();
        });
    });
    test(
        "brief_description",
        "Description should be at least 250 words",
        () => {
            enforce(data.brief_description.toString()).matches(
                "/W* (?=.*[a-zA-Z])([a-zA-Z0-9]+){249, 1000}/"
            );
        }
    );
});
