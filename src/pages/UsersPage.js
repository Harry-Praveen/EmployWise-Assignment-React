import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers, deleteUser } from "../services/api";
// import { logout } from "../utils/auth";
import { removeToken } from "../utils/auth";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
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
    };
    fetchUsers();
  }, [page]);

  useEffect(() => {
    // Filter users based on search input
    setFilteredUsers(
      users.filter(
        (user) =>
          user.first_name.toLowerCase().includes(search.toLowerCase()) ||
          user.last_name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, users]);



  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      alert("Failed to delete user.");
    }
  };
  const handleLogout = () => {
    removeToken();
    navigate("/"); // Redirect to login page after logout
  };

  return (
    <div className="container mt-4">
      <h2>User List</h2>
      <button className="btn btn-danger mb-3" onClick={handleLogout}>
        Logout
      </button>

      {/*Search Bar */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      {/* User List */}
      <div className="row">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div key={user.id} className="col-md-4">
              <div className="card p-3 mb-3">
                <img
                  src={user.avatar}
                  alt={user.first_name}
                  className="rounded-circle w-25"
                />
                <h5>
                  {user.first_name} {user.last_name}
                </h5>
                <p>{user.email}</p>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => navigate(`/edit-user/${user.id}`)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted">No users found.</p>
        )}
      </div>

      {/* Pagination Buttons */}
      <div className="mt-3">
        <button
          onClick={() => setPage(page - 1)}
          className="btn btn-secondary me-2"
          disabled={page === 1}
        >
          Previous Page
        </button>
        <button onClick={() => setPage(page + 1)} className="btn btn-primary">
          Next Page
        </button>
      </div>
    </div>
  );
};

export default UsersPage;
