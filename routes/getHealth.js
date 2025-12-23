import express from "express";

const getHealth = express();

getHealth.get("/", async (req, res) => {
  try {
    res.json({
      status: "ok",
      serverTime: new Date(),
    });
  } catch {
    res.send("something went wrong", error);
  }
});
export default getHealth;
