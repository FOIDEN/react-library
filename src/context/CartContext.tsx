/**
 * Контекст корзины покупок
 * Управляет состоянием корзины и операциями с товарами
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

/**
 * Интерфейс элемента корзины
 * @property {number} id - Уникальный идентификатор товара
 * @property {string} title - Название товара
 * @property {number} price - Цена товара
 * @property {number} quantity - Количество товара в корзине
 */
interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

/**
 * Тип контекста корзины
 * @property {CartItem[]} items - Массив товаров в корзине
 * @property {function} addToCart - Добавить товар в корзину
 * @property {function} removeFromCart - Удалить товар из корзины
 * @property {function} updateQuantity - Обновить количество товара
 * @property {function} clearCart - Очистить корзину
 * @property {number} totalItems - Общее количество товаров в корзине
 */
interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
}

// Создание контекста с начальным значением undefined
const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * Провайдер корзины
 * Предоставляет функционал корзины покупок во всем приложении
 * @param {React.ReactNode} children - Дочерние компоненты
 */
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Состояние корзины
  const [items, setItems] = useState<CartItem[]>([]);
  const { user } = useAuth();

  // Загрузка корзины из localStorage при авторизации
  useEffect(() => {
    if (user) {
      const savedCart = localStorage.getItem(`cart_${user.id}`);
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
    } else {
      setItems([]);
    }
  }, [user]);

  // Сохранение корзины в localStorage при изменениях
  useEffect(() => {
    if (user) {
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(items));
    }
  }, [items, user]);

  /**
   * Добавление товара в корзину
   * Если товар уже есть, увеличивает его количество
   * @param {CartItem} newItem - Новый товар для добавления
   */
  const addToCart = (newItem: CartItem) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === newItem.id);
      if (existingItem) {
        return currentItems.map(item =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentItems, { ...newItem, quantity: 1 }];
    });
  };

  /**
   * Удаление товара из корзины
   * @param {number} itemId - ID товара для удаления
   */
  const removeFromCart = (itemId: number) => {
    setItems(currentItems => currentItems.filter(item => item.id !== itemId));
  };

  /**
   * Обновление количества товара
   * Если количество становится 0, товар удаляется из корзины
   * @param {number} itemId - ID товара
   * @param {number} quantity - Новое количество
   */
  const updateQuantity = (itemId: number, quantity: number) => {
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === itemId
          ? { ...item, quantity: Math.max(0, quantity) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  /**
   * Очистка корзины
   * Удаляет все товары из корзины
   */
  const clearCart = () => {
    setItems([]);
  };

  // Подсчет общего количества товаров в корзине
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

/**
 * Хук для использования корзины
 * @throws {Error} Если используется вне CartProvider
 * @returns {CartContextType} Контекст корзины
 */
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 