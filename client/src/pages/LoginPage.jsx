import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";

function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!form.email) {
      newErrors.email = "Введите email";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Некорректный email";
    }

    if (!form.password) {
      newErrors.password = "Введите пароль";
    } else if (form.password.length < 6) {
      newErrors.password = "Минимум 6 символов";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setServerError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length !== 0) return;

    try {
      setLoading(true);
      setServerError("");

      const response = await login(form);

      localStorage.setItem("token", response.data.token);

      navigate("/appointments");
    } catch (error) {
      setServerError(error.response?.data?.message || "Ошибка входа");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={form.password}
          onChange={handleChange}
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}

        {serverError && <p style={{ color: "red" }}>{serverError}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Вход..." : "Войти"}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
