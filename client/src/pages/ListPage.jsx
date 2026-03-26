import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAppointments, deleteAppointment } from "../api/appointments";
import AppointmentList from "../components/AppointmentList";

function ListPage() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);

  const loadAppointments = () => {
    getAppointments()
      .then((res) => {
        setAppointments(res.data);
      })
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login");
      });
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const handleDelete = (id) => {
    deleteAppointment(id).then(() => {
      loadAppointments();
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="container">
      <h1>Заявки</h1>

      <Link to="/create">
        <button>Создать новую заявку</button>
      </Link>

      <button onClick={handleLogout}>Выйти</button>

      <AppointmentList appointments={appointments} onDelete={handleDelete} />
    </div>
  );
}

export default ListPage;
