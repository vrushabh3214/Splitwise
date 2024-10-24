import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function GroupExp() {
  const { id } = useParams();
  const [expenses, setExpenses] = useState([]);
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3000/expenses")
      .then((response) => {
        setExpenses(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching expenses:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/groups/${id}`)
      .then((response) => setGroup(response.data))
      .catch((error) => console.error("Error fetching group data:", error));
  }, [id]);

  const handleUpdate = (exp) => {
    navigate("/ExpForm", { state: { productToUpdate: exp } });
  };

  return (
    <div className="Home-item">
      <div className="header">
        <Link to="/">Home</Link>
        <h2>{group ? group.name : "Loading..."}</h2>
      </div>

      <div className="border"></div>

      {loading ? (
        <p>Loading expenses...</p>
      ) : expenses.length > 0 ? (
        expenses.map((exp, index) => (
          <div className="Groups-item" key={index}>
            <div onClick={() => handleUpdate(exp)} className="GroupBot">
              <div className="d-flex BName">
                <h4>{exp.bileName}</h4>
                <p>₹ {exp.amount}</p>
              </div>
              <div className="d-flex BDate">
                <p>From User IDs: {exp.fromUser.join(", ")}</p>
                <span>{new Date(exp.timestamp).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No expenses for this group.</p>
      )}

      {/* Add Expense Button */}
      <div className="AddExp">
        <Link to="/ExpForm">+</Link>
      </div>
    </div>
  );
}
