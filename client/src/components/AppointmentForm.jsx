import { useState, useEffect } from "react";

function AppointmentForm({ initialData, onSubmit, loading }) {
  const [form, setForm] = useState({
    patientName: "",
    phoneNumber: "",
    comment: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setForm({
        patientName: initialData.patientName || "",
        phoneNumber: initialData.phoneNumber || "",
        comment: initialData.comment || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!form.patientName.trim()) {
      newErrors.patientName = "Введите ФИО";
    }

    if (!form.phoneNumber.trim()) {
      newErrors.phoneNumber = "Введите номер телефона";
    } else if (!/^\+?\d+$/.test(form.phoneNumber.trim())) {
      newErrors.phoneNumber = "Телефон должен содержать только цифры";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    onSubmit(form, () =>
      setForm({
        patientName: "",
        phoneNumber: "",
        comment: "",
      }),
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="patientName"
        placeholder="ФИО"
        value={form.patientName}
        onChange={handleChange}
      />
      {errors.patientName && (
        <p style={{ color: "red" }}>{errors.patientName}</p>
      )}

      <input
        name="phoneNumber"
        placeholder="Телефон"
        value={form.phoneNumber}
        onChange={handleChange}
      />
      {errors.phoneNumber && (
        <p style={{ color: "red" }}>{errors.phoneNumber}</p>
      )}

      <textarea
        name="comment"
        placeholder="Комментарий"
        value={form.comment}
        onChange={handleChange}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Отправка..." : "Отправить"}
      </button>
    </form>
  );
}

export default AppointmentForm;
