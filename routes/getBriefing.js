import express from "express";
import getAction from "../middleware/getHeader.js";

const getBriefing = express();

getBriefing.get("/", getAction, (req, res) => {
  res.json({ unit: "Golani", message: "briefing delivered" });
});

export default getBriefing;
