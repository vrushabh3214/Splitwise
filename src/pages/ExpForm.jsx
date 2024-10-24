import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function ExpForm() {
  const [amount, setAmount] = useState("");
  const [bileName, setBileName] = useState("");
  const [fromUser, setFromUser] = useState("");
  const [toUser, setToUser] = useState([]);
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [groupId, setGroupId] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const productToUpdate = location.state?.productToUpdate;

  useEffect(() => {
    // Fetch users and groups
    axios
      .get("http://localhost:3000/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));

    axios
      .get("http://localhost:3000/groups")
      .then((response) => setGroups(response.data))
      .catch((error) => console.error("Error fetching groups:", error));

    // If editing, populate fields
    if (productToUpdate) {
      setAmount(productToUpdate.amount);
      setBileName(productToUpdate.bileName);
      setFromUser(productToUpdate.fromUser[0]); // Assuming fromUser is an array
      setToUser(productToUpdate.toUser);
      setGroupId(productToUpdate.isGroupExp ? productToUpdate.groupId : ""); // Optional group
    }
  }, [productToUpdate]); // Add productToUpdate as a dependency

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const newExpense = {
  //     id: productToUpdate ? productToUpdate.id : Date.now(),
  //     amount: parseFloat(amount),
  //     bileName,
  //     fromUser: [Number(fromUser)],
  //     toUser: toUser.map(Number),
  //     timestamp: new Date().toISOString(),
  //     isGroupExp: Boolean(groupId),
  //     groupId: groupId || null, // Allow for no group
  //   };

  //   const request = productToUpdate
  //     ? axios.put(`http://localhost:3000/expenses/${productToUpdate.id}`, newExpense)
  //     : axios.post("http://localhost:3000/expenses", newExpense);

  //   request
  //     .then(() => {
  //       alert(`Expense ${productToUpdate ? "updated" : "added"} successfully!`);
  //       navigate("/");
  //     })
  //     .catch((error) => console.error(`Error ${productToUpdate ? "updating" : "adding"} expense:`, error));
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newExpense = {
      id: productToUpdate ? productToUpdate.id : Date.now().toString(),
      amount: parseFloat(amount),
      bileName,
      fromUser: [Number(fromUser)],
      toUser: toUser.map(Number),
      timestamp: new Date().toISOString(),
      isGroupExp: Boolean(groupId),
      groupId: groupId || null,
    };

    const request = productToUpdate
      ? axios.patch(
          `http://localhost:3000/expenses/${productToUpdate.id}`,
          newExpense
        )
      : axios.post("http://localhost:3000/expenses", newExpense);

    request
      .then(() => {
        alert(`Expense ${productToUpdate ? "updated" : "added"} successfully!`);
        navigate("/");
      })
      .catch((error) => {
        console.error(
          `Error ${productToUpdate ? "updating" : "adding"} expense:`,
          error
        );
        alert(
          "An error occurred while processing your request. Please try again."
        );
      });
  };

  return (
    <div className="Home-item">
      <div className="header">
        <Link to="/">Home</Link>
        <h2>{productToUpdate ? "Edit Expense" : "Add New Expense"}</h2>
      </div>

      <div className="border"></div>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="bileName">Bill Name</label>
          <input
            type="text"
            id="bileName"
            value={bileName}
            onChange={(e) => setBileName(e.target.value)}
            placeholder="Enter Bile Name"
            required
          />
        </div>

        <div>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            required
          />
        </div>

        <div>
          <label htmlFor="fromUser">From (Who paid)</label>
          <select
            id="fromUser"
            value={fromUser}
            onChange={(e) => setFromUser(e.target.value)}
            required
          >
            <option value="">Select payer</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="toUser">To (Split with)</label>
          <select
            id="toUser"
            multiple
            value={toUser}
            onChange={(e) =>
              setToUser(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
            required
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="group">Group (Optional)</label>
          <select
            id="group"
            value={groupId}
            onChange={(e) => setGroupId(e.target.value)}
          >
            <option value="">No group</option>
            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <button type="submit">
            {productToUpdate ? "Update Expense" : "Add Expense"}
          </button>
        </div>
      </form>
    </div>
  );
}
