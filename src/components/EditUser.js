import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ first_name: "", last_name: "", email: "" });

  useEffect(() => {
    axios.get(`https://reqres.in/api/users/${id}`)
      .then(response => setUser(response.data.data))
      .catch(error => console.error("Error fetching user:", error));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://reqres.in/api/users/${id}`, user);
      alert("User updated successfully!");
      navigate("/");
    } catch (error) {
      alert("Failed to update user.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Edit User</h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label>First Name</label>
          <input type="text" className="form-control" value={user.first_name} onChange={(e) => setUser({ ...user, first_name: e.target.value })} required />
        </div>
        <div className="mb-3">
          <label>Last Name</label>
          <input type="text" className="form-control" value={user.last_name} onChange={(e) => setUser({ ...user, last_name: e.target.value })} required />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} required />
        </div>
        <button type="submit" className="btn btn-success">Update</button>
      </form>
    </div>
  );
};

export default EditUser;
