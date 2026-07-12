import { useNotifications } from "../../hooks/useNotifications";
import { EmptyState } from "../common";
import { formatDateTime } from "../../utils/formatDate";

const NotificationDrawer = ({ onClose }) => {
  const { notifications, markAsRead, markAllAsRead } = useNotifications();

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} aria-hidden="true" />

      <div className="absolute right-0 top-full mt-2 w-80 max-h-96 overflow-y-auto bg-surface border border-border/10 rounded-xl shadow-lg z-50 animate-scale-in">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/10">
          <span className="text-text font-semibold text-sm">Notifications</span>
          <button
            type="button"
            onClick={markAllAsRead}
            className="text-primary text-xs hover:underline"
          >
            Mark all as read
          </button>
        </div>

        {notifications.length === 0 ? (
          <EmptyState title="You're all caught up" message="No notifications yet." />
        ) : (
          <ul>
            {notifications.map((notification) => (
              <li
                key={notification._id}
                onClick={() => !notification.isRead && markAsRead(notification._id)}
                className={`px-4 py-3 border-b border-border/10 last:border-b-0 cursor-pointer transition-colors hover:bg-border/5 ${
                  notification.isRead ? "opacity-60" : ""
                }`}
              >
                <p className="text-text text-sm">{notification.message}</p>
                <span className="text-text/50 text-xs">{formatDateTime(notification.createdAt)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default NotificationDrawer;
