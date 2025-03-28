const UserCard = ({ user, onDelete }) => (
    <div className="card shadow-sm text-center">
      <img className="card-img-top rounded-circle mx-auto mt-3" src={user.avatar} alt={user.first_name} style={{ width: "80px", height: "80px" }} />
      <div className="card-body">
        <h5 className="card-title">{user.first_name} {user.last_name}</h5>
        <button className="btn btn-danger" onClick={() => onDelete(user.id)}>Delete</button>
      </div>
    </div>
  );
  
  export default UserCard;
  