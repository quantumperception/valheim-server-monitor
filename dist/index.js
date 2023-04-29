"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const fs_1 = __importDefault(require("fs"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
const port = process.env.PORT;
app.get("/monitor", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
app.post("/start", (req, res) => {
    const keys = fs_1.default.readFileSync(__dirname + "/keys.txt", "utf-8").split("\n");
    if (!keys.includes(req.body.key)) {
        res.status(401).send("Invalid Key");
        return;
    }
    res.send("Started server");
});
app.post("/stop", (req, res) => {
    const keys = fs_1.default.readFileSync(__dirname + "/keys.txt", "utf-8").split("\n");
    if (!keys.includes(req.body.key)) {
        res.status(401).send("Invalid Key");
        return;
    }
    res.send("Stopped server");
});
app.get("/status", (req, res) => {
    res.send("Server status");
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
