import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bp from "body-parser";
import fs from "fs";

dotenv.config();
const app: Express = express();
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());
const port = process.env.PORT;

app.get("/monitor", (req: Request, res: Response) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/start", (req: Request, res: Response) => {
  const keys = fs.readFileSync(__dirname + "/keys.txt", "utf-8").split("\n");
  if (!keys.includes(req.body.key)) {
    res.status(401).send("Invalid Key");
    return;
  }
  res.send("Started server");
});

app.post("/stop", (req: Request, res: Response) => {
  const keys = fs.readFileSync(__dirname + "/keys.txt", "utf-8").split("\n");
  if (!keys.includes(req.body.key)) {
    res.status(401).send("Invalid Key");
    return;
  }
  res.send("Stopped server");
});

app.get("/status", (req: Request, res: Response) => {
  res.send("Server status");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
