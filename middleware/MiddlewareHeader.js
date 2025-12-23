export default function getHeader(req, res, next) {
  res.setHeader("X-Server-Start-Time", new Date().toLocaleTimeString());
  console.log(res.getHeader("X-Server-Start-Time"));

  next();
}
