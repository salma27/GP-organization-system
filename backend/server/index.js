import _debug from "debug";
import config from "config";
import express from "express";

const debug = _debug("server:debug");
const app = express();

const listen = app.listen(config.get("port"), () => {
    debug(`server is running on port ${config.port} and in ${config.name} mode`);
    console.log(`server is running on port ${config.port} and in ${config.name} mode`);
});

export {app};
