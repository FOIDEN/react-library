import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../../context/AuthContext';
import { useReservation } from '../../../context/ReservationContext';
import OrderPopup from '../../features/OrderPopup/OrderPopup';
import DarkMode from "./DarkMode";
import FaBook from "../../../assets/website/bookicon.png";
import footerLogo from "../../../assets/website/logo.png";

const Menu = [
  {
    id: 1,
    name: "Главная",
    link: "/",
  },
  {
    id: 2,
    name: "Книги",
    link: "/books",
  }
];

const Navbar: React.FC = () => {
  const { user } = useAuth();
  const { getUserReservations } = useReservation();
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const reservedBooks = user ? getUserReservations(user.email || '') : [];

  const handleReservationClick = () => {
    if (!user) {
      navigate('/login');
    } else {
      setIsReservationOpen(true);
    }
  };

  return (
    <>
      <nav className="bg-white shadow-lg dark:bg-gray-900 dark:text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Левая часть навигации */}
            <div className="flex">
              {/* Логотип */}
              <div className="flex-shrink-0 flex items-center">
                <img src={footerLogo} alt="Logo" className="max-w-[40px] sm:max-w-[50px]" />
                <Link to="/" className="text-2xl font-extrabold">
                  Bookwave
                </Link>
              </div>
              {/* Основное меню */}
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  to="/"
                  className="text-gray-900 dark:text-white inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-primary"
                >
                  Главная
                </Link>
                <Link
                  to="/books"
                  className="text-gray-900 dark:text-white inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-primary"
                >
                  Книги
                </Link>
                {user && (
                  <Link
                    to="/profile"
                    className="text-gray-900 dark:text-white inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-primary"
                  >
                    Личный кабинет
                  </Link>
                )}
              </div>
            </div>
            {/* Правая часть навигации */}
            <div className="flex items-center mr-8">
              {!user && (
                <Link
                  to="/login"
                  className="bg-primary text-white px-4 py-2 rounded-md mr-4 hover:bg-opacity-90 transition duration-300 hover:scale-105"
                >
                  Войти
                </Link>
              )}
              {/* Кнопка бронирования */}
              <button
                onClick={handleReservationClick}
                className="relative p-2 text-gray-900 dark:text-white hover:text-primary group transition-transform duration-300"
              >
                <img 
                  src={FaBook} 
                  alt="Book" 
                  className="w-7 h-7 transform transition-transform duration-300 group-hover:scale-125" 
                />
                {reservedBooks.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {reservedBooks.length}
                  </span>
                )}
              </button>
              {/* Переключатель темы */}
              <div className="ml-4">
                <DarkMode />
              </div>
              {/* Мобильное меню */}
              <div className="ml-3 relative sm:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
                >
                  <svg
                    className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  <svg
                    className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Мобильное меню */}
        <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
          <div className="pt-2 pb-3 space-y-1">
            {Menu.map((item) => (
              <Link
                key={item.id}
                to={item.link}
                className="text-gray-900 dark:text-white block px-3 py-2 text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {user && (
              <Link
                to="/profile"
                className="text-gray-900 dark:text-white block px-3 py-2 text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Личный кабинет
              </Link>
            )}
            {!user && (
              <Link
                to="/login"
                className="text-gray-900 dark:text-white block px-3 py-2 text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Войти
              </Link>
            )}
          </div>
        </div>
      </nav>

      <OrderPopup
        orderPopup={isReservationOpen}
        setOrderPopup={setIsReservationOpen}
      />
    </>
  );
};

export default Navbar;