import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { storageService } from "../../services/storageService";
import AuthLayout from "../../components/Auth/AuthLayout";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface Errors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = (): Errors => {
    const newErrors: Errors = {};
    if (!formData.name) newErrors.name = "Имя обязательно";
    else if (!/^[a-zA-Z\s]{2,50}$/.test(formData.name)) {
      newErrors.name = "Имя должно содержать 2–50 букв";
    }
    if (!formData.email) newErrors.email = "Электронная почта обязательна";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Неверный формат электронной почты";
    }
    if (!formData.password) newErrors.password = "Пароль обязателен";
    else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^\s]{8,}$/.test(formData.password)) {
      newErrors.password = "Пароль должен содержать 8+ символов, включая заглавные, строчные буквы и цифры";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Подтвердите пароль";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Пароли не совпадают";
    }
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const newUser = {
          id: Date.now().toString(),
          name: formData.name,
          email: formData.email
        };
        
        storageService.saveUser(newUser);
        setSuccess("Регистрация прошла успешно!");
        setErrors({});
        setFormData({ name: "", email: "", password: "", confirmPassword: "" });
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } catch (error) {
        if (error instanceof Error) {
          setErrors({ general: error.message });
        }
        setSuccess("");
      }
    } else {
      setErrors(validationErrors);
      setSuccess("");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <AuthLayout>
      <div className="bg-white dark:bg-gray-800 p-6 shadow-md rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100">Регистрация</h2>
        {errors.general && (
          <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 p-2 mb-4 rounded">{errors.general}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-3" noValidate>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Имя
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`mt-1 w-full p-2 border rounded dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Электронная почта
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 w-full p-2 border rounded dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.email}</p>
            )}
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
                className={`mt-1 w-full p-2 border rounded dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-3 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm"
              >
                {showPassword ? "Скрыть" : "Показать"}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Подтверждение пароля
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`mt-1 w-full p-2 border rounded dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-3 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm"
              >
                {showConfirmPassword ? "Скрыть" : "Показать"}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 hover:bg-blue-700 rounded"
          >
            Зарегистрироваться
          </button>
        </form>
        <p className="mt-4 text-center">
          Уже есть аккаунт?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Войти
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Register; 