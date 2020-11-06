import chai from "chai";
import config from "config";
import {app} from "../src/index.js";
import "should";

console.log("app port: ", app.port);
const {expect} = chai;

describe("Server", () => {
    it("tests that server is running current port with chai", async () => {
        expect(app.port).to.equal(config.get("port"));
    });
    it("tests that server is running current port with should", async () => {
        config.get("port").should.equal(app.port);
        // should(config.get("port") === app.port).be.true;
    });
});
