export default function getAction(req, res, next) {
  try {
    let getHeader = req.get("Client-Unit");
    if (getHeader === "Golani") {
      next();
    } else {
      res.status(404);
    }
  } catch (error) {
    res.send(error.massage);
  }
}
