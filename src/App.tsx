import React, { useCallback, useMemo, useState } from "react";
// import { generateItems } from "./utils";
import { AppContext } from "./context/AppContext";
import { AppContextType, Notification, User } from "./types/types";

import { ThemeProvider } from "./context/ThemeContext";
import Main from "./components/Main";

const App: React.FC = () => {
  // const [items, setItems] = useState(generateItems(1000));
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // const addItems = () => {
  //   setItems((prevItems) => [
  //     ...prevItems,
  //     ...generateItems(1000, prevItems.length),
  //   ]);
  // };
  const addNotification = useCallback(
    (message: string, type: Notification["type"]) => {
      const newNotification: Notification = {
        id: Date.now(),
        message,
        type,
      };
      setNotifications((prev) => [...prev, newNotification]);
    },
    [],
  );

  const removeNotification = useCallback((id: number) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id),
    );
  }, []);

  const login = useCallback(
    (email: string) => {
      setUser({ id: 1, name: "홍길동", email });
      addNotification("성공적으로 로그인되었습니다", "success");
    },
    [addNotification],
  );

  const logout = useCallback(() => {
    setUser(null);
    addNotification("로그아웃되었습니다", "info");
  }, [addNotification]);

  const contextValue = useMemo<AppContextType>(
    () => ({
      user,
      login,
      logout,
      notifications,
      addNotification,
      removeNotification,
    }),
    [user, login, logout, notifications, addNotification, removeNotification],
  );

  return (
    <AppContext.Provider value={contextValue}>
      <ThemeProvider>
        <Main />
      </ThemeProvider>
    </AppContext.Provider>
  );
};

export default App;
