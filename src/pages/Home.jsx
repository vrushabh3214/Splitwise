import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import Navbar from "../Navbar/Navbar";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [isOpenF, setIsOpenF] = useState(true);
  const [isOpenG, setIsOpenG] = useState(true);

  // Fetch users
  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // Fetch groups
  useEffect(() => {
    axios
      .get("http://localhost:3000/groups")
      .then((response) => setGroups(response.data))
      .catch((error) => console.error("Error fetching groups:", error));
  }, []);

  // Toggle friends dropdown
  const FriendsDropdown = () => {
    setIsOpenF(!isOpenF);
  };

  // Toggle groups dropdown
  const GroupsDropdown = () => {
    setIsOpenG(!isOpenG);
  };

  return (
    <div className="Home-item">
      {/* <Navbar/> */}
      <h1>Hello</h1>

      {/* Friends Section */}
      <div className="Friends">
        <h2 onClick={FriendsDropdown} style={{ cursor: "pointer" }}>
          Friends
        </h2>
        <div className="border"></div>
        {isOpenF && (
          <div>
            {users.map((user) => (
              <div className="Friends-item" key={user.id}>
                <p>{user.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Groups Section */}
      <div className="Groups">
        <h2 onClick={GroupsDropdown} style={{ cursor: "pointer" }}>
          Groups
        </h2>
        <div className="border"></div>
        {isOpenG && (
          <div className="Groups-item">
            {groups.map((group) => (
              <div className="Friends-item" key={group.id}>
                <Link to={`/GroupExp/${group.id}`} className="GroupBot">
                  {group.name}
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="AddExp">
        <Link to="/ExpForm">+</Link>
      </div>
    </div>
  );
}
