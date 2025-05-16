import React from 'react';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
  return (
    <div className="py-10">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Наши услуги</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Откройте для себя мир литературы в нашей библиотеке
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <div className="text-4xl mb-4">🔖</div>
            <h3 className="text-xl font-semibold mb-2">Онлайн бронирование</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Забронируйте книгу не выходя из дома
            </p>
          </div>
          
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-semibold mb-2">Широкий выбор книг</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Тысячи книг разных жанров и авторов
            </p>
            <Link
              to="/books"
              className="mt-4 inline-block text-primary hover:text-primary-dark"
            >
              Смотреть каталог
            </Link>
          </div>


          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <div className="text-4xl mb-4">📖</div>
            <h3 className="text-xl font-semibold mb-2">Читальный зал</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Уютное пространство для чтения и работы
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Services;