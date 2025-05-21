interface UserData {
  id: string;
  name: string;
  email: string;
}

class StorageService {
  private readonly USERS_KEY = 'users';

  saveUser(userData: UserData): void {
    try {
      const existingUsers = this.getUsers();
      
      const updatedUsers = {
        ...existingUsers,
        [userData.id]: userData
      };
      
      localStorage.setItem(this.USERS_KEY, JSON.stringify(updatedUsers));
    } catch (error) {
      console.error('Ошибка при сохранении пользователя:', error);
      throw new Error('Не удалось сохранить данные пользователя');
    }
  }

  getUsers(): Record<string, UserData> {
    try {
      const usersJson = localStorage.getItem(this.USERS_KEY);
      return usersJson ? JSON.parse(usersJson) : {};
    } catch (error) {
      console.error('Ошибка при получении пользователей:', error);
      return {};
    }
  }

  getUserById(id: string): UserData | null {
    const users = this.getUsers();
    return users[id] || null;
  }

  deleteUser(id: string): void {
    try {
      const users = this.getUsers();
      delete users[id];
      localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    } catch (error) {
      console.error('Ошибка при удалении пользователя:', error);
      throw new Error('Не удалось удалить пользователя');
    }
  }
}

export const storageService = new StorageService(); 