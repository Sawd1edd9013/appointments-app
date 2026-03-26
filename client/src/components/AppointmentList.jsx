import { Link } from "react-router-dom";

function AppointmentList({ appointments, onDelete }) {
  return (
    <table className="appointments-table">
      <thead>
        <tr>
          <th>Дата отправки</th>
          <th>ФИО</th>
          <th>Телефон</th>
          <th>Проблема</th>
          <th>Действия</th>
        </tr>
      </thead>

      <tbody>
        {appointments.length > 0 ? (
          appointments.map((item) => (
            <tr key={item._id}>
              <td>
                {item.createdAt
                  ? new Date(item.createdAt).toLocaleString("ru-RU")
                  : "Нет даты"}
              </td>
              <td>{item.patientName}</td>
              <td>{item.phoneNumber}</td>
              <td>{item.comment || "-"}</td>
              <td>
                <div className="table-actions">
                  <button onClick={() => onDelete(item._id)}>Удалить</button>

                  <Link to={`/edit/${item._id}`}>
                    <button>Редактировать</button>
                  </Link>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5">Заявок пока нет</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default AppointmentList;
