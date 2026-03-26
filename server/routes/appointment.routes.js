const express = require("express");
const router = express.Router();

const {
  addAppointment,
  getAppointment,
  deleteAppointment,
  updateAppointment,
  getOneAppointment,
} = require("../controllers/appointment.controller");

const auth = require("../middlewares/auth.middleware");

router.post("/", addAppointment);

router.get("/", auth, getAppointment);
router.get("/:id", auth, getOneAppointment);
router.delete("/:id", auth, deleteAppointment);
router.put("/:id", auth, updateAppointment);

module.exports = router;
