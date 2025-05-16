import React, { createContext, useContext, useState } from 'react';
import booksData, { Book } from '../data/books';

interface ReservedBook extends Book {
  reservedQuantity: number;
  totalReserved: number; // Общее количество забронированных книг всеми пользователями
}

interface ReservationContextType {
  reservedBooks: ReservedBook[];
  reserveBook: (book: Book, userId: string, quantity: number) => void;
  cancelReservation: (bookId: number, userId: string) => void;
  updateReservationQuantity: (bookId: number, userId: string, quantity: number) => void;
  isBookReservedByUser: (bookId: number, userId: string) => boolean;
  getUserReservations: (userId: string) => ReservedBook[];
  getAvailableQuantity: (bookId: number) => number;
  getTotalReserved: (bookId: number) => number;
}

const ReservationContext = createContext<ReservationContextType | undefined>(undefined);

export const useReservation = () => {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error('useReservation must be used within a ReservationProvider');
  }
  return context;
};

export const ReservationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reservedBooks, setReservedBooks] = useState<ReservedBook[]>([]);

  const getTotalReserved = (bookId: number): number => {
    const book = reservedBooks.find(b => b.id === bookId);
    return book?.totalReserved || 0;
  };

  const getAvailableQuantity = (bookId: number): number => {
    const book = reservedBooks.find(b => b.id === bookId);
    if (!book) {
      const originalBook = booksData.find((b: Book) => b.id === bookId);
      return originalBook?.quantity || 0;
    }
    return book.quantity - book.totalReserved;
  };

  const reserveBook = (book: Book, userId: string, quantity: number = 1) => {
    // Проверка количества
    const currentTotalReserved = getTotalReserved(book.id);
    const availableQuantity = book.quantity - currentTotalReserved;

    if (quantity < 1 || quantity > availableQuantity) {
      alert(`Количество должно быть от 1 до ${availableQuantity}`);
      return;
    }

    // Проверка, забронирована ли уже книга этим пользователем
    const existingReservation = reservedBooks.find(b => b.id === book.id && b.reservedBy?.includes(userId));
    if (existingReservation) {
      alert('Вы уже забронировали эту книгу');
      return;
    }

    // Обновление статуса бронирования книги
    const updatedBook: ReservedBook = {
      ...book,
      isAvailable: (book.quantity - (currentTotalReserved + quantity)) > 0,
      reservedBy: [...(book.reservedBy || []), userId],
      reservedQuantity: quantity,
      totalReserved: currentTotalReserved + quantity
    };

    // Обновление списка забронированных книг
    setReservedBooks(prev => {
      const bookIndex = prev.findIndex(b => b.id === book.id);
      if (bookIndex >= 0) {
        // Обновление существующей книги
        const newBooks = [...prev];
        newBooks[bookIndex] = updatedBook;
        return newBooks;
      }
      // Добавление новой книги
      return [...prev, updatedBook];
    });
  };

  const updateReservationQuantity = (bookId: number, userId: string, quantity: number) => {
    setReservedBooks(prev => {
      const bookIndex = prev.findIndex(b => b.id === bookId && b.reservedBy?.includes(userId));
      if (bookIndex >= 0) {
        const book = prev[bookIndex];
        const currentTotalReserved = getTotalReserved(bookId);
        const oldQuantity = book.reservedQuantity;
        const availableForChange = book.quantity - (currentTotalReserved - oldQuantity);
        
        // Проверка количества
        if (quantity < 1 || quantity > availableForChange) {
          alert(`Количество должно быть от 1 до ${availableForChange}`);
          return prev;
        }

        // Обновление количества книг
        const updatedBook = {
          ...book,
          reservedQuantity: quantity,
          totalReserved: currentTotalReserved - oldQuantity + quantity,
          isAvailable: (book.quantity - (currentTotalReserved - oldQuantity + quantity)) > 0
        };

        const newBooks = [...prev];
        newBooks[bookIndex] = updatedBook;
        return newBooks;
      }
      return prev;
    });
  };

  const cancelReservation = (bookId: number, userId: string) => {
    setReservedBooks(prev => {
      const bookIndex = prev.findIndex(b => b.id === bookId);
      if (bookIndex >= 0) {
        const book = prev[bookIndex];
        const updatedReservedBy = book.reservedBy?.filter(id => id !== userId) || [];
        const currentTotalReserved = getTotalReserved(bookId);
        
        // If no more reservations, remove the book from reservedBooks
        if (updatedReservedBy.length === 0) {
          return prev.filter(b => b.id !== bookId);
        }

        // Update the book's reservation status
        const updatedBook = {
          ...book,
          isAvailable: true,
          reservedBy: updatedReservedBy,
          reservedQuantity: 0,
          totalReserved: currentTotalReserved - book.reservedQuantity
        };

        const newBooks = [...prev];
        newBooks[bookIndex] = updatedBook;
        return newBooks;
      }
      return prev;
    });
  };

  const isBookReservedByUser = (bookId: number, userId: string): boolean => {
    const book = reservedBooks.find(b => b.id === bookId);
    return book?.reservedBy?.includes(userId) || false;
  };

  const getUserReservations = (userId: string): ReservedBook[] => {
    return reservedBooks.filter(book => book.reservedBy?.includes(userId));
  };

  return (
    <ReservationContext.Provider
      value={{
        reservedBooks,
        reserveBook,
        cancelReservation,
        updateReservationQuantity,
        isBookReservedByUser,
        getUserReservations,
        getAvailableQuantity,
        getTotalReserved,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
};

export default ReservationContext; 