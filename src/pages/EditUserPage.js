import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateUser, getUsers } from "../services/api";

const EditUserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ first_name: "", last_name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await getUsers();
        const userData = response.data.data.find((u) => u.id === parseInt(id));
        if (userData) {
          setUser(userData);
        } else {
          setMessage("User not found.");
        }
      } catch (error) {
        setMessage("Error fetching user data.");
      }
      setLoading(false);
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res=await updateUser(id, user);
      setMessage("User updated successfully!");
      console.log(res.data);
      setTimeout(() => navigate("/users"), 1000);
    } catch (error) {
      setMessage("Failed to update user.");
    }
    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <h2>Edit User</h2>
      {message && <div className="alert alert-info">{message}</div>}
      {loading && <p>Loading...</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>First Name:</label>
          <input type="text" className="form-control" name="first_name" value={user.first_name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Last Name:</label>
          <input type="text" className="form-control" name="last_name" value={user.last_name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Email:</label>
          <input type="email" className="form-control" name="email" value={user.email} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>Update</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate("/users")}>Cancel</button>
      </form>
    </div>
  );
};

export default EditUserPage;
