// let performanceData = {
//   date: new Date().toISOString().split("T")[0],
//   totalRequests: 0,
//   successfulRequests: 0,
//   errorCount: 0,
//   totalTime: 0,
// };

// const performanceLogger = (req, res, next) => {
//   const start = Date.now();
//   performanceData.totalRequests++;

//   res.on("finish", () => {
//     const duration = (Date.now() - start) / 1000;
//     performanceData.totalTime += duration;

//     if (res.statusCode >= 200 && res.statusCode < 300) {
//       performanceData.successfulRequests++;
//     } else {
//       performanceData.errorCount++;
//     }
//   });

//   next();
// };

// const getPerformanceReport = () => {
//   const { date, totalRequests, successfulRequests, errorCount, totalTime } =
//     performanceData;

//   return {
//     date,
//     totalRequests,
//     successRate: totalRequests
//       ? ((successfulRequests / totalRequests) * 100).toFixed(2)
//       : "0.00",
//     errorsLogged: errorCount,
//     averageLoadTime: totalRequests
//       ? (totalTime / totalRequests).toFixed(3)
//       : "0.000",
//   };
// };

// module.exports = { performanceLogger, getPerformanceReport };

//** With Database  */
const db = require("../database/db");
const { app_performances } = db;

const performanceLogger = async (req, res, next) => {
  const start = Date.now();

  res.on("finish", async () => {
    const duration = (Date.now() - start) / 1000;
    const date = new Date().toISOString().split("T")[0];

    const [record, created] = await app_performances.findOrCreate({
      where: { date },
      defaults: {
        totalRequests: 1,
        successfulRequests: res.statusCode < 400 ? 1 : 0,
        errorCount: res.statusCode >= 400 ? 1 : 0,
        totalTime: duration,
      },
    });

    if (!created) {
      await record.increment({
        totalRequests: 1,
        successfulRequests: res.statusCode < 400 ? 1 : 0,
        errorCount: res.statusCode >= 400 ? 1 : 0,
        totalTime: duration,
      });
    }
  });

  next();
};

module.exports = { performanceLogger };
