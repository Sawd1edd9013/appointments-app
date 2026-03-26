const mongoose = require("mongoose");

const AppointmentSchema = mongoose.Schema(
  {
    patientName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    phoneNumber: {
      type: String,
      required: true,
      match: [/^\+?\d+$/, "Телефон должен содержать только цифры"],
    },
    comment: {
      type: String,
      maxlength: 200,
    },
  },
  { timestamps: true },
);

const Appointment = mongoose.model("Appointment", AppointmentSchema);

module.exports = Appointment;
