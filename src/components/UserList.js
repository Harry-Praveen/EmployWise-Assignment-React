import { useState, useEffect, useCallback } from "react";
import { getUsers } from "../services/api";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Use useCallback to prevent unnecessary re-renders
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getUsers(page);
      setUsers(response.data.data);
    } catch (err) {
      setError("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]); // Use fetchUsers inside dependency array

  return (
    <div className="container mt-4">
      <h2>User List</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      <ul className="list-group">
        {users.map((user) => (
          <li key={user.id} className="list-group-item">
            {user.first_name} {user.last_name}
          </li>
        ))}
      </ul>
      <button onClick={() => setPage(page + 1)} className="btn btn-primary mt-3">
        Next Page
      </button>
    </div>
  );
};

export default UsersPage;
