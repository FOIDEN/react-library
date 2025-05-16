import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { storageService } from '../../services/storageService';

const Profile = () => {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(user?.name || '');

  if (!user) {
      navigate('/login');
    return null;
    }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleUpdateName = () => {
    if (user && newName.trim()) {
      const updatedUser = {
        ...user,
        name: newName.trim()
      };
      storageService.saveUser(updatedUser);
      login(updatedUser);
    setIsEditing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">Личный кабинет</h1>
        
        <div className="space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <p className="text-gray-600 dark:text-gray-400">Email:</p>
            <p className="font-medium text-gray-900 dark:text-gray-100">{user.email}</p>
          </div>

          <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <p className="text-gray-600 dark:text-gray-400">Имя:</p>
            {isEditing ? (
              <div className="flex gap-2 mt-1">
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="flex-1 border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  placeholder="Введите новое имя"
                />
                <button
                  onClick={handleUpdateName}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Сохранить
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setNewName(user.name);
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Отмена
                </button>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <p className="font-medium text-gray-900 dark:text-gray-100">{user.name}</p>
                <button
                  onClick={() => setIsEditing(true)}
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