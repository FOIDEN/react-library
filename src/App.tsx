/**
 * Главный компонент приложения, отвечающий за маршрутизацию и общую структуру
 * Включает в себя все основные провайдеры контекста и компоненты макета
 */

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ReservationProvider } from './context/ReservationContext';

// Компоненты макета - основная структура страницы
import Navbar from './components/layout/Navbar/Navbar';
import Footer from './components/layout/Footer/Footer';

// Компоненты функционала - основные блоки главной страницы
import Hero from './components/features/Hero/Hero';
import Services from './components/features/Services/Services';
import Banner from './components/features/Banner/Banner';
import AppStore from './components/features/AppStore/AppStore';

// Компоненты страниц - отдельные маршруты приложения
import BooksList from './pages/books/BooksList';
import BookDetail from './pages/books/BookDetail';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Profile from './pages/profile/Profile';
import NotFound from './pages/NotFound';

/**
 * Основной компонент приложения
 * @returns {JSX.Element} Корневой элемент приложения
 */
const App: React.FC = () => {
  return (
    <AuthProvider>
      <ReservationProvider>
        {/* Основной контейнер с поддержкой темной темы */}
        <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 min-h-screen">
          <Navbar />
          <Routes>
            {/* Главная страница с составными компонентами */}
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <Services />
                  <AppStore />
                  <Banner />
                </>
              }
            />
            {/* Маршруты для работы с книгами */}
            <Route path="/books" element={<BooksList />} />
            <Route path="/book/:id" element={<BookDetail />} />
            
            {/* Маршруты аутентификации */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Маршруты пользователя */}
            <Route path="/profile" element={<Profile />} />
            
            {/* Страница 404 */}
            <Route path="/404" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </ReservationProvider>
    </AuthProvider>
  );
};

export default App;