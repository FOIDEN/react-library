import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useReservation } from '../../context/ReservationContext';
import { useAuth } from '../../context/AuthContext';
import books from '../../data/books';

const BooksList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const { user } = useAuth();
  const { getUserReservations, getAvailableQuantity } = useReservation();

  const reservedBooks = user ? getUserReservations(user.email || '') : [];

  // Get unique authors
  const authors = Array.from(new Set(books.map(book => book.author))).filter(Boolean) as string[];

  // Filter books based on search query and selected author
  const filteredBooks = books.filter(book => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      book.title.toLowerCase().includes(searchLower) ||
      (book.author && book.author.toLowerCase().includes(searchLower)) ||
      (book.description && book.description.toLowerCase().includes(searchLower));
    const matchesAuthor = !selectedAuthor || book.author === selectedAuthor;
    return matchesSearch && matchesAuthor;
  });

  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          {/* Search input */}
          <input
            type="text"
            placeholder="Поиск..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-[calc(75%-1rem)] lg:w-[calc(76%-1rem)] px-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          
          {/* Author filter */}
          <select
            value={selectedAuthor}
            onChange={(e) => setSelectedAuthor(e.target.value)}
            className="w-full md:w-64 px-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          >
            <option value="">Все авторы</option>
            {authors.map((author) => (
              <option key={author} value={author}>
                {author}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredBooks.map((book) => {
            const isReserved = reservedBooks.some(rb => rb.id === book.id);
            return (
              <Link to={`/book/${book.id}`} key={book.id} className="group">
                <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={book.url}
                      alt={book.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/400x600?text=Обложка+не+найдена';
                      }}
                    />
                    <div className="absolute top-2 right-2">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
                        ★ {book.rating}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-lg font-semibold mb-2 line-clamp-2 dark:text-white group-hover:text-primary dark:group-hover:text-primary-light transition-colors duration-300">
                      {book.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{book.author}</p>
                    <div className="mt-auto space-y-2">
                      <div className="flex gap-2 flex-wrap">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          getAvailableQuantity(book.id) > 0
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                            : 'bg-red-500 text-white dark:bg-red-600 dark:text-white'
                        }`}>
                          {getAvailableQuantity(book.id) > 0
                            ? `Доступно: ${getAvailableQuantity(book.id)} шт.`
                            : 'Не доступно'
                          }
                        </span>
                        {isReserved && getAvailableQuantity(book.id) > 0 && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                            Забронирована вами
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BooksList; 