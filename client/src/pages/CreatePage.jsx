import { useState } from "react";
import AppointmentForm from "../components/AppointmentForm";
import { createAppointment } from "../api/appointments";
import { Link } from "react-router-dom";

function CreatePage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleCreate = async (data, resetForm) => {
    try {
      setLoading(true);
      setSuccess(false);

      await createAppointment(data);

      setSuccess(true);
      resetForm();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Создать запись</h1>

      {success && <p>Заявка успешно создана</p>}

      <AppointmentForm onSubmit={handleCreate} loading={loading} />
      <Link to="/appointments">
        <button type="button">Перейти к списку заявок</button>
      </Link>
    </div>
  );
}

export default CreatePage;
