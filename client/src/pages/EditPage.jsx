import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOneAppointment, updateAppointment } from "../api/appointments";
import AppointmentForm from "../components/AppointmentForm";
import { useNavigate } from "react-router-dom";

function EditPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    getOneAppointment(id).then((res) => {
      setData(res.data);
    });
  }, [id]);

  const handleUpdate = (formData) => {
    updateAppointment(id, formData).then(() => {
      console.log("Обновлено");
      navigate("/appointments");
    });
  };

  if (!data) return <p>Загрузка...</p>;

  return (
    <div className="container">
      <h1>Редактирование</h1>

      <AppointmentForm initialData={data} onSubmit={handleUpdate} />
    </div>
  );
}

export default EditPage;
