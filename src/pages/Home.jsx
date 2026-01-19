import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrganizations } from "../features/organizationSlice";

function Home() {
  const dispatch = useDispatch();

  const { organizations, loading, error } = useSelector(
    (state) => state.organizations
  );

  console.log(organizations, loading, error);

  useEffect(() => {
    dispatch(getOrganizations());
  }, [dispatch]);

  return (
    <div className="home-wrapper">
      <div className="organization-container">
        <h1 className="organization-title">
          МОНИТОРИНГ СОСТОЯНИЯ ПЛАТ
        </h1>

        {loading && (
          <div className="loading">Загрузка организаций…</div>
        )}

        {!loading && error ? (
          <div className="error">
            Ошибка: {error}
          </div>
        ) : (
          !loading && organizations.length === 0 && (
            <div className="empty">Организации не найдены</div>
          )
        )}

        <div className="organization-buttons">
          {organizations.map((org) => {
            const hasOffline = org.count_offline_boards > 0;

            return (
              <Link
                key={org.id}
                to={`/${org.slug}/boards`}
                className="org-button"
              >
                <span className="org-name">{org.name}</span>

                <span
                  className={`org-status ${
                    hasOffline ? "error" : "ok"
                  }`}
                >
                  ●{" "}
                  {hasOffline
                    ? `${org.count_offline_boards} плат(ы) не активны`
                    : "Все платы активны"}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
