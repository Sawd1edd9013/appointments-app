const Appointment = require("../models/Appointment");
const mongoose = require("mongoose");

async function addAppointment(req, res) {
  try {
    const appointment = await Appointment.create({
      patientName: req.body.patientName,
      phoneNumber: req.body.phoneNumber,
      comment: req.body.comment,
    });

    res.json(appointment);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

async function getAppointment(req, res) {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function deleteAppointment(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Некорректный ID" });
    }

    const deleted = await Appointment.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Запись не найдена" });
    }

    res.json({ message: "Запись удалена" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function updateAppointment(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Некорректный ID" });
    }

    const updated = await Appointment.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Запись не найдена" });
    }

    res.json(updated);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

async function getOneAppointment(req, res) {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({ message: "Не найдено" });
    }

    res.json(appointment);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = {
  addAppointment,
  getAppointment,
  deleteAppointment,
  updateAppointment,
  getOneAppointment,
};
