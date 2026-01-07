// DEEPAK ----

const express = require("express");
const authenticateToken = require("../middleware/auth");
const {
  addWorker,
  updateWorker,
  deleteWorker,
  allWorkers,
  workerDetail,
} = require("../controllers/worker.controller");
const upload = require("../utils/fileUpload");
const router = express.Router();

//// ** Provider ----

router.post(
  "/add-worker",
  authenticateToken,
  upload.single("profile_image"),
  addWorker
);

router.put(
  "/update-worker/:id",
  authenticateToken,
  upload.single("profile_image"),
  updateWorker
);

router.delete("/delete-worker/:id", authenticateToken, deleteWorker);

router.get("/all-workers", authenticateToken, allWorkers);

router.get("/worker-detail/:id", authenticateToken, workerDetail);

module.exports = router;
