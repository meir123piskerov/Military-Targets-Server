import express from "express";
import getTargets from "./routes/getTarget.js";
import getHealth from "./routes/getHealth.js";
import getBriefing from "./routes/getBriefing.js";
import getLog from "./middleware/logMiddleWare.js";
import getHeader from "./middleware/MiddlewareHeader.js";
const app = express();
const port = 3003;

app.use(express.json());
app.use(getLog);
app.use(getHeader);
app.get("/briefing", getBriefing);
app.use("/health", getHealth);
app.use("/targets", getTargets);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
