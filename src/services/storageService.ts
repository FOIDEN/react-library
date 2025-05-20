/**
 * Интерфейс данных пользователя
 * Определяет структуру данных, которые хранятся для каждого пользователя
 */
interface UserData {
  id: string;    // Уникальный идентификатор пользователя
  name: string;  // Имя пользователя
  email: string; // Email пользователя
}

/**
 * Сервис для работы с локальным хранилищем (localStorage)
 * Отвечает за сохранение, получение и удаление данных пользователей
 */
class StorageService {
  // Ключ, под которым хранятся данные пользователей в localStorage
  private readonly USERS_KEY = 'users';

  /**
   * Сохраняет или обновляет данные пользователя в localStorage
   * @param userData - Данные пользователя для сохранения
   * @throws Error если не удалось сохранить данные
   */
  saveUser(userData: UserData): void {
    try {
      // Получаем существующих пользователей
      const existingUsers = this.getUsers();
      
      // Создаем новый объект с обновленными данными
      // Используем id пользователя как ключ
      const updatedUsers = {
        ...existingUsers,
        [userData.id]: userData
      };
      
      // Сохраняем обновленные данные в localStorage
      localStorage.setItem(this.USERS_KEY, JSON.stringify(updatedUsers));
    } catch (error) {
      console.error('Ошибка при сохранении пользователя:', error);
      throw new Error('Не удалось сохранить данные пользователя');
    }
  }

  /**
   * Получает список всех пользователей из localStorage
   * @returns Объект, где ключи - это id пользователей, а значения - их данные
   */
  getUsers(): Record<string, UserData> {
    try {
      // Получаем данные из localStorage
      const usersJson = localStorage.getItem(this.USERS_KEY);
      // Если данных нет, возвращаем пустой объект
      // Если есть - преобразуем JSON строку в объект
      return usersJson ? JSON.parse(usersJson) : {};
    } catch (error) {
      console.error('Ошибка при получении пользователей:', error);
      return {};
    }
  }

  /**
   * Получает данные конкретного пользователя по его id
   * @param id - ID пользователя
   * @returns Данные пользователя или null, если пользователь не найден
   */
  getUserById(id: string): UserData | null {
    const users = this.getUsers();
    return users[id] || null;
  }

  /**
   * Удаляет пользователя из localStorage по его id
   * @param id - ID пользователя для удаления
   * @throws Error если не удалось удалить пользователя
   */
  deleteUser(id: string): void {
    try {
      // Получаем текущий список пользователей
      const users = this.getUsers();
      // Удаляем пользователя по id
      delete users[id];
      // Сохраняем обновленный список в localStorage
      localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    } catch (error) {
      console.error('Ошибка при удалении пользователя:', error);
      throw new Error('Не удалось удалить пользователя');
    }
  }
}

// Создаем и экспортируем единственный экземпляр сервиса
// Это паттерн Singleton - гарантирует, что во всем приложении
// будет использоваться один и тот же экземпляр сервиса
export const storageService = new StorageService(); 