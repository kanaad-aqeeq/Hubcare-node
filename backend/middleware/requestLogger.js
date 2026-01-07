const requestLogger = (req, res, next) => {
  const start = process.hrtime();
  const startTime = new Date();
  const timeString = startTime.toLocaleTimeString();
  const { method, originalUrl } = req;
  console.info(`→ [${timeString}] ${method} ${originalUrl}`);

  res.on("finish", () => {
    const [seconds, nanoseconds] = process.hrtime(start);
    const durationMs = (seconds * 1e3 + nanoseconds / 1e6).toFixed(2);
    console.info(`← [${timeString}] ${method} ${originalUrl} ${res.statusCode} ${durationMs}ms`);
  });

  next();
};

module.exports = requestLogger;
