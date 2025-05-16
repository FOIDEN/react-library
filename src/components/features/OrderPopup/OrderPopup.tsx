import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useReservation } from '../../../context/ReservationContext';
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';

interface OrderPopupProps {
  orderPopup: boolean;
  setOrderPopup: (show: boolean) => void;
}

const OrderPopup: React.FC<OrderPopupProps> = ({ orderPopup, setOrderPopup }) => {
  const { user } = useAuth();
  const { 
    getUserReservations, 
    cancelReservation, 
    updateReservationQuantity,
    getAvailableQuantity 
  } = useReservation();
  
  const reservedBooks = user ? getUserReservations(user.email || '') : [];

  const handleDelete = (bookId: number) => {
    if (user) {
      cancelReservation(bookId, user.email || '');
    }
  };

  const handleQuantityChange = (bookId: number, currentQuantity: number, change: number) => {
    if (user) {
      const newQuantity = currentQuantity + change;
      const availableQuantity = getAvailableQuantity(bookId);
      
      if (newQuantity > 0 && newQuantity <= availableQuantity + currentQuantity) {
        updateReservationQuantity(bookId, user.email || '', newQuantity);
      }
    }
  };

  return orderPopup ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold dark:text-white">Ваши бронирования</h2>
          <button
            onClick={() => setOrderPopup(false)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ✕
          </button>
        </div>

        {reservedBooks.length > 0 ? (
          <div className="space-y-4">
            {reservedBooks.map((book) => (
              <div
                key={book.id}
                className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <img
                  src={book.url}
                  alt={book.title}
                  className="w-20 h-28 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold dark:text-white">{book.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{book.author}</p>
                  
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleQuantityChange(book.id, book.reservedQuantity, -1)}
                        className="p-1 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 disabled:opacity-50"
                        disabled={book.reservedQuantity <= 1}
                      >
                        <FaMinus size={12} />
                      </button>
                      <span className="text-sm text-gray-700 dark:text-gray-300 min-w-[20px] text-center">
                        {book.reservedQuantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(book.id, book.reservedQuantity, 1)}
                        className="p-1 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 disabled:opacity-50"
                        disabled={book.reservedQuantity >= getAvailableQuantity(book.id) + book.reservedQuantity}
                      >
                        <FaPlus size={12} />
                      </button>
                    </div>
                    
                    <button
                      onClick={() => handleDelete(book.id)}
                      className="p-1 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200"
                      title="Удалить бронирование"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-400 py-4">
            У вас пока нет забронированных книг
          </p>
        )}
      </div>
    </div>
  ) : null;
};

export default OrderPopup;