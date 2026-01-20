import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBoardHistory } from "../features/boardHistorySlice";

function BoardStateHistory() {
  const { organizationSlug, boardSlug } = useParams();
  const dispatch = useDispatch();

  const { history, loading, error } = useSelector(
    (state) => state.history
  );

  useEffect(() => {
    dispatch(getBoardHistory({ organizationSlug, boardSlug }));
  }, [dispatch, boardSlug]);

  return (
    <div className="boards-wrapper">
      <div className="boards-container">
        <h1 className="boards-title">
          {boardSlug.replace("-", " ").toUpperCase()}
        </h1>

        <Link
          to={`/${organizationSlug}/boards`}
          className="back-button"
        >
          ← К платам
        </Link>

        {loading && (
          <div className="loading">
            Загрузка истории…
          </div>
        )}

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        {!loading && !history.length && (
          <div className="empty">
            История пуста
          </div>
        )}

        <div className="history-list">
          {history.map((item) => {
            const date = new Date(item.created_at);

            return (
              <div key={item.id} className="history-item">
                <span className="history-time">
                  {date.toLocaleString("ru-RU")}
                </span>

                <span className="history-event">
                  {item.event}
                </span>

                <span
                  className={`history-status ${
                    item.status === "ONLINE" ? "ok" : "error"
                  }`}
                >
                  {item.status === "ONLINE"
                    ? "Активна"
                    : "Не активна"}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default BoardStateHistory;
