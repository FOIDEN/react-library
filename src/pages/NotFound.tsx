/**
 * Компонент страницы 404 (Страница не найдена)
 * Отображается, когда пользователь переходит по несуществующему URL
 */

import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Компонент NotFound
 * @returns {JSX.Element} Страница с сообщением об ошибке 404 и кнопкой возврата на главную
 */
const NotFound: React.FC = () => {
  return (
    // Контейнер на всю высоту экрана с центрированным содержимым
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        {/* Большой номер ошибки */}
        <h1 className="text-9xl font-bold text-gray-800 dark:text-gray-100">404</h1>
        {/* Заголовок с объяснением */}
        <h2 className="text-4xl font-semibold text-gray-600 dark:text-gray-300 mt-4">Страница не найдена</h2>
        {/* Дополнительное описание ошибки */}
        <p className="text-gray-500 dark:text-gray-400 mt-4 mb-8">
          Извините, страница, которую вы ищете, не существует или была перемещена.
        </p>
        {/* Кнопка возврата на главную страницу с эффектом при наведении */}
        <Link 
          to="/" 
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-300"
        >
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
};

export default NotFound; 