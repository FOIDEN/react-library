import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { storageService } from "../../services/storageService";
import { useAuth } from "../../context/AuthContext";
import AuthLayout from "../../components/Auth/AuthLayout";

interface FormData {
  email: string;
  password: string;
}

interface Errors {
  email?: string;
  password?: string;
  general?: string;
}

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const users = storageService.getUsers();
      const user = Object.values(users).find(user => user.email === formData.email);

      if (!user) {
        setErrors({ general: 'Неверный email или пароль' });
        return;
      }

      login(user);
      navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        setErrors({ general: error.message });
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <AuthLayout>
      <div className="bg-white dark:bg-gray-800 p-6 shadow-md rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100">Вход</h2>
        {errors.general && (
          <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 p-2 mb-4 rounded">{errors.general}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-3" noValidate>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Электронная почта
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Пароль
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-3 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm"
              >
                {showPassword ? "Скрыть" : "Показать"}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 hover:bg-blue-700 rounded"
          >
            Войти
          </button>
        </form>
        <p className="mt-4 text-center">
          Нет аккаунта?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login; 