import { createContext, useCallback, useEffect, useState } from "react";
import notificationService from "../services/notificationService";
import { useAuth } from "../hooks/useAuth";

export const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const refresh = useCallback(async () => {
    try {
      const { data } = await notificationService.getNotifications();
      setNotifications(data.data);
      setUnreadCount(data.unreadCount);
    } catch {
      // Notifications are non-critical - a failed fetch shouldn't disrupt the app
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      refresh();
    } else {
      setNotifications([]);
      setUnreadCount(0);
    }
  }, [isAuthenticated, refresh]);

  const markAsRead = async (id) => {
    await notificationService.markAsRead(id);
    setNotifications((prev) => prev.map((n) => (n._id === id ? { ...n, isRead: true } : n)));
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  const markAllAsRead = async () => {
    await notificationService.markAllAsRead();
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    setUnreadCount(0);
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, refresh, markAsRead, markAllAsRead }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
