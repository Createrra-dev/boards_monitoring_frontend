import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBoards } from "../features/boardSlice";

function OrganizationBoards() {
  const { organizationSlug } = useParams();
  const dispatch = useDispatch();

  const { boards, loading, error } = useSelector(
    (state) => state.boards
  );

  useEffect(() => {
    dispatch(getBoards({ organizationSlug }));
  }, [dispatch, organizationSlug]);

  return (
    <div className="boards-wrapper">
      <div className="boards-container">
        <h1 className="boards-title">
          {organizationSlug.replace("-", " ").toUpperCase()}
        </h1>

        <Link to="/" className="back-button">
          ← К организациям
        </Link>

        {loading && (
          <div className="loading">
            Загрузка плат…
          </div>
        )}

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        {!loading && !boards.length && (
          <div className="empty">
            Платы не найдены
          </div>
        )}

        <div className="boards-grid">
          {boards.map((board) => (
            <Link
              key={board.id}
              to={`/${organizationSlug}/boards/${board.slug}`}
              className="board-button"
            >
              <span className="board-name">
                {board.name}
              </span>

              <span
                className={`board-status ${
                  board.status == "ONLINE" ? "ok" : "error"
                }`}
              >
                ● {board.status == "ONLINE" ? "Активна" : "Не активна"}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrganizationBoards;
