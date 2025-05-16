import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useReservation } from '../../context/ReservationContext';
import books from '../../data/books';
import { FaStar, FaMinus, FaPlus } from 'react-icons/fa';
import OrderPopup from '../../components/features/OrderPopup/OrderPopup';

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { reserveBook, getUserReservations, getAvailableQuantity } = useReservation();
  const [showReservationPopup, setShowReservationPopup] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const book = books.find(b => b.id === Number(id));
  const reservedBooks = user ? getUserReservations(user.email || '') : [];
  const isReserved = reservedBooks.some(rb => rb.id === Number(id));
  const availableQuantity = book ? getAvailableQuantity(book.id) : 0;

  if (!book) {
    navigate('/404');
    return null;
  }

  const handleReserve = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (quantity > 0 && quantity <= book.quantity) {
      reserveBook(book, user.email || '', quantity);
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <FaStar key={i} className="text-yellow-400 w-6 h-6" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <FaStar className="text-gray-300 w-6 h-6" />
            <div className="absolute top-0 left-0 overflow-hidden w-1/2">
              <FaStar className="text-yellow-400 w-6 h-6" />
            </div>
          </div>
        );
      } else {
        stars.push(
          <FaStar key={i} className="text-gray-300 w-6 h-6" />
        );
      }
    }
    return stars;
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <img
              src={book.url}
              alt={book.title}
              className="w-full rounded-lg shadow-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://via.placeholder.com/400x600?text=Обложка+не+найдена';
              }}
            />
          </div>
          <div className="md:w-2/3">
            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">{book.title}</h1>
            <h2 className="text-xl text-gray-600 dark:text-gray-400 mb-4">{book.author}</h2>
            <div className="flex items-center gap-1 mb-4">
              {renderStars(book.rating)}
              <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">({book.rating})</span>
            </div>
            <div className="mb-4 flex gap-2">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                availableQuantity > 0 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                  : 'bg-red-500 text-white dark:bg-red-600 dark:text-white'
              }`}>
                {availableQuantity > 0 
                  ? `Доступно: ${availableQuantity} шт.` 
                  : 'Не доступно'
                }
              </span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-8">{book.description}</p>
            
            {book.isAvailable && !isReserved && (
              <div className="flex items-center gap-4 mb-4">
                <span className="text-gray-700 dark:text-gray-300">Количество:</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="p-1 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 disabled:opacity-50"
                    disabled={quantity <= 1}
                  >
                    <FaMinus size={14} />
                  </button>
                  <span className="text-gray-700 dark:text-gray-300 min-w-[40px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(prev => Math.min(book.quantity, prev + 1))}
                    className="p-1 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 disabled:opacity-50"
                    disabled={quantity >= book.quantity}
                  >
                    <FaPlus size={14} />
                  </button>
                </div>
              </div>
            )}
            
            <button
              onClick={handleReserve}
              disabled={!book.isAvailable && !isReserved}
              className={`px-8 py-3 rounded-full transition duration-300 ${
                !book.isAvailable && !isReserved
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
                  : isReserved
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-primary text-white hover:bg-opacity-90'
              }`}
            >
              {!user 
                ? 'Войдите для бронирования'
                : isReserved
                  ? 'Забронирована вами'
                  : book.isAvailable
                    ? 'Забронировать книгу'
                    : 'Книга недоступна'
              }
            </button>
          </div>
        </div>
      </div>

      <OrderPopup
        orderPopup={showReservationPopup}
        setOrderPopup={setShowReservationPopup}
      />
    </>
  );
};

export default BookDetail; 