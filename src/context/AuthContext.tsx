/**
 * Контекст аутентификации
 * Управляет состоянием авторизации пользователя в приложении
 */

import { createContext, useContext, useState, ReactNode } from 'react';
import { storageService } from '../services/storageService';

/**
 * Интерфейс пользователя
 * @property {string} id - Уникальный идентификатор пользователя
 * @property {string} name - Имя пользователя
 * @property {string} email - Email пользователя
 */
interface User {
  id: string;
  name: string;
  email: string;
}

/**
 * Тип контекста аутентификации
 * @property {User | null} user - Текущий пользователь или null если не авторизован
 * @property {function} login - Функция для входа пользователя
 * @property {function} logout - Функция для выхода пользователя
 * @property {function} updateEmail - Функция для обновления email пользователя
 */
interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  updateEmail: (newEmail: string) => void;
}

// Создание контекста с начальным значением undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Провайдер аутентификации
 * Предоставляет доступ к состоянию аутентификации во всем приложении
 * @param {ReactNode} children - Дочерние компоненты
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Инициализация состояния пользователя из localStorage
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  /**
   * Функция входа пользователя
   * Сохраняет данные пользователя в состоянии и localStorage
   */
  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  /**
   * Функция выхода пользователя
   * Очищает данные пользователя из состояния и localStorage
   */
  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  /**
   * Функция обновления email пользователя
   * Обновляет email в состоянии и localStorage
   * @param {string} newEmail - Новый email пользователя
   */
  const updateEmail = (newEmail: string) => {
    if (user) {
      const updatedUser = { ...user, email: newEmail };
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      // Обновляем данные в storage
      storageService.saveUser(updatedUser);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Хук для использования контекста аутентификации
 * @throws {Error} Если используется вне AuthProvider
 * @returns {AuthContextType} Контекст аутентификации
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 