// context/userContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface UserContextType {
  user: any; // Thay bằng kiểu người dùng cụ thể của bạn
  setUser: React.Dispatch<React.SetStateAction<any>>; // Hàm để cập nhật user
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser)); // Đặt lại người dùng nếu có trong localStorage
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
