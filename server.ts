import express, { Express } from "express";
import * as http from "http";
import next, { NextApiHandler } from "next";
import * as Sentry from "@sentry/node";
import * as socketio from "socket.io";

const port: number = parseInt(process.env.PORT || "3000", 10);
const dev: boolean = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler: NextApiHandler = nextApp.getRequestHandler();

const SENTRY_DSN: string =
  process.env.SENTRY_DSN ||
  "https://b5931d156d544fe0ac8bd8795b30d4e2@o943541.ingest.sentry.io/5892414";

Sentry.init({
  dsn: SENTRY_DSN,
});

type SlideType = {
  course: string;
  chapter: string;
  slide: number | string;
};

nextApp.prepare().then(async () => {
  const app: Express = express();
  const server: http.Server = http.createServer(app);
  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.errorHandler());

  // Optional fallthrough error handler
  // @ts-ignore
  app.use(function onError(err, req, res, next) {
    // The error id is attached to `res.sentry` to be returned
    // and optionally displayed to the user for support.
    res.statusCode = 500;
    res.end(res.sentry + "\n");
  });

  const io: socketio.Server = new socketio.Server();
  io.attach(server);
  io.on("connection", (socket: socketio.Socket) => {
    socket.on("slideChange", (slide: SlideType) => {
      socket.broadcast.emit("slideChange", slide);
    });
    socket.on("getCurrentSlide", () => {
      socket.broadcast.emit("getCurrentSlide");
    });
  });

  // @ts-ignore
  app.all("*", (req, res) => nextHandler(req, res));
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
