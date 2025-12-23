import express from "express";
import fs from "fs";

const getTargets = express();

getTargets.get("/:id", async (req, res) => {
  const { id } = req.params;
  const data = JSON.parse(
    await fs.promises.readFile("./data/target.json", "utf-8")
  );
  for (let i = 0; i < data.targets.length; i++) {
    if (data.targets[i].id == id) {
      return res.send(data.targets[i]);
    }
  }
  res.status(404).send("target not found");
});

getTargets.get("/", async (req, res) => {
  const { region, status, minPriority } = req.query;
  const data = JSON.parse(
    await fs.promises.readFile("./data/target.json", "utf-8")
  );
  for (let i = 0; i < data.targets.length; i++) {
    if (
      data.targets[i].region == region ||
      data.targets[i].status == status ||
      data.targets[i].priority == minPriority
    ) {
      return res.send(data.targets[i]);
    }
  }
  res.status(404).send("not found");
});
export default getTargets;

getTargets.post("/", async (req, res) => {
  const target = req.body;
  if (
    req.body.id &&
    req.body.codeName &&
    req.body.region &&
    req.body.priority &&
    req.body.status &&
    req.body.createdAt
  ) {
    console.log("1");

    const data = JSON.parse(
      await fs.promises.readFile("./data/target.json", "utf-8")
    );
    data["targets"].push(target);
    await fs.promises.writeFile(
      "./data/target.json",
      JSON.stringify(data, null, 2),
      "utf-8"
    );
    return res.send("added success");
  } else {
    return res.status(404).send("type error");
  }
});

getTargets.put("/:id", async (req, res) => {
  const { id } = req.params;
  const targetUpdate = req.body;
  const data = JSON.parse(
    await fs.promises.readFile("./data/target.json", "utf-8")
  );
  for (let i = 0; i < data["targets"].length; i++) {
    if (data.targets[i].id == id) {
      data.targets[i] = Object.assign(data.targets[i], targetUpdate);
      await fs.promises.writeFile(
        "./data/target.json",
        JSON.stringify(data, null, 2),
        "utf-8"
      );
      return res.send("change success");
    }
  }
  res.status(404).send("id not found");
});

getTargets.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const data = JSON.parse(
    await fs.promises.readFile("./data/target.json", "utf-8")
  );
  for (let i = 0; i < data["targets"].length; i++) {
    if (data.targets[i].id == id) {
      data.targets.splice(i, 1);
      await fs.promises.writeFile(
        "./data/target.json",
        JSON.stringify(data, null, 2),
        "utf-8"
      );
      return res.send("delete success");
    }
  }
  res.status(404).send("not found");
});
