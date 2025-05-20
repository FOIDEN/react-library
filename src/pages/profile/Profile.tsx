import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { storageService } from '../../services/storageService';

const Profile = () => {
  const { user, login, logout, updateEmail } = useAuth();
  const navigate = useNavigate();
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [newName, setNewName] = useState(user?.name || '');
  const [newEmail, setNewEmail] = useState(user?.email || '');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');

  // Валидация имени
  const validateName = (name: string) => {
    if (!name.trim()) {
      return 'Имя не может быть пустым';
    }
    if (name.length < 2) {
      return 'Имя должно содержать минимум 2 символа';
    }
    if (!/^[а-яА-Яa-zA-Z\s-]+$/.test(name)) {
      return 'Имя может содержать только буквы, пробелы и дефис';
    }
    return '';
  };

  // Валидация email
  const validateEmail = (email: string) => {
    if (!email.trim()) {
      return 'Email не может быть пустым';
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return 'Введите корректный email адрес';
    }
    return '';
  };

  // Обновление состояний при изменении user
  useEffect(() => {
    if (user) {
      setNewName(user.name);
      setNewEmail(user.email);
    }
  }, [user]);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    // Сохраняем последние изменения перед выходом
    if (newName !== user.name) {
      handleUpdateName();
    }
    if (newEmail !== user.email) {
      handleUpdateEmail();
    }
    logout();
    navigate('/login');
  };

  const handleUpdateName = () => {
    const error = validateName(newName);
    if (error) {
      setNameError(error);
      return;
    }
    
    if (user && newName.trim()) {
      const updatedUser = {
        ...user,
        name: newName.trim()
      };
      storageService.saveUser(updatedUser);
      login(updatedUser);
      setIsEditingName(false);
      setNameError('');
    }
  };

  const handleUpdateEmail = () => {
    const error = validateEmail(newEmail);
    if (error) {
      setEmailError(error);
      return;
    }

    if (user && newEmail.trim()) {
      const updatedUser = {
        ...user,
        email: newEmail.trim()
      };
      storageService.saveUser(updatedUser);
      updateEmail(newEmail.trim());
      setIsEditingEmail(false);
      setEmailError('');
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
    setNameError(validateName(e.target.value));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmail(e.target.value);
    setEmailError(validateEmail(e.target.value));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">Личный кабинет</h1>
        
        <div className="space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <p className="text-gray-600 dark:text-gray-400">Email:</p>
            {isEditingEmail ? (
              <div className="flex flex-col gap-2 mt-1">
                <input
                  type="email"
                  value={newEmail}
                  onChange={handleEmailChange}
                  className={`flex-1 border ${emailError ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
                  placeholder="Введите новый email"
                />
                {emailError && (
                  <p className="text-red-500 text-sm">{emailError}</p>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={handleUpdateEmail}
                    disabled={!!emailError}
                    className={`bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 ${emailError ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Сохранить
                  </button>
                  <button
                    onClick={() => {
                      setIsEditingEmail(false);
                      setNewEmail(user.email);
                      setEmailError('');
                    }}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    Отмена
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <p className="font-medium text-gray-900 dark:text-gray-100">{user.email}</p>
                <button
                  onClick={() => setIsEditingEmail(true)}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                >
                  Изменить
                </button>
              </div>
            )}
          </div>

          <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <p className="text-gray-600 dark:text-gray-400">Имя:</p>
            {isEditingName ? (
              <div className="flex flex-col gap-2 mt-1">
                <input
                  type="text"
                  value={newName}
                  onChange={handleNameChange}
                  className={`flex-1 border ${nameError ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
                  placeholder="Введите новое имя"
                />
                {nameError && (
                  <p className="text-red-500 text-sm">{nameError}</p>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={handleUpdateName}
                    disabled={!!nameError}
                    className={`bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 ${nameError ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Сохранить
                  </button>
                  <button
                    onClick={() => {
                      setIsEditingName(false);
                      setNewName(user.name);
                      setNameError('');
                    }}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    Отмена
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <p className="font-medium text-gray-900 dark:text-gray-100">{user.name}</p>
                <button
                  onClick={() => setIsEditingName(true)}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                >
                  Изменить
                </button>
              </div>
            )}
          </div>

          <div className="pt-4">
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700"
            >
              Выйти из аккаунта
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 