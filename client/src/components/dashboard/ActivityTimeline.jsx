import { Card, EmptyState } from "../common";
import { useNotifications } from "../../hooks/useNotifications";
import { ActivityIcon } from "./icons";
import { formatDateTime } from "../../utils/formatDate";

const ActivityTimeline = () => {
  const { notifications } = useNotifications();
  const recent = notifications.slice(0, 6);

  return (
    <Card title="Recent Activity">
      {recent.length === 0 ? (
        <EmptyState
          title="No recent activity"
          message="Activity like maintenance alerts and trip updates will show up here."
          icon={
            <div className="h-11 w-11 mx-auto rounded-xl bg-primary/15 text-primary flex items-center justify-center">
              <ActivityIcon />
            </div>
          }
        />
      ) : (
        <ol className="relative border-l border-border/10 ml-2">
          {recent.map((item) => (
            <li key={item._id} className="mb-5 ml-4 last:mb-0">
              <span
                className={`absolute -left-1.5 h-3 w-3 rounded-full border-2 border-surface ${
                  item.isRead ? "bg-border/30" : "bg-primary"
                }`}
              />
              <p className="text-text text-sm">{item.message}</p>
              <span className="text-text/45 text-xs">{formatDateTime(item.createdAt)}</span>
            </li>
          ))}
        </ol>
      )}
    </Card>
  );
};

export default ActivityTimeline;
