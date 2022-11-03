import axios from "axios";
import React, { useState } from "react";
import styles from "./modal.module.css";

const AddBudget = ({ toggleBudget }) => {
  const [budgetDetails, setBudgetDetails] = useState({
    amount: 0,
    category: "All",
    timeFrame: "Monthly",
  });
  const expenseCategories = [
    "All",
    "Food",
    "Social Life",
    "Self-Development",
    "Transportation",
    "HouseHold",
    "Health",
    "Apparel",
    "Other",
  ];

  const onChange = (e) => {
    switch (e.target.name) {
      case "inputAmount":
        setBudgetDetails({ ...budgetDetails, amount: Number(e.target.value) });
        break;
      case "categories":
        setBudgetDetails({ ...budgetDetails, category: e.target.value });
        break;
      default:
        break;
    }
  };

  const handleAddButton = () => {
    budgetDetails.amount === 0
      ? alert("input an amount")
      : axios
          .post("https://expense-tracker-backend-mern.herokuapp.com/api/v1/budgets", budgetDetails)
          .then(response => response.status===200?toggleBudget():false);
  };

  const categoryOptions = expenseCategories.map((category) => (
    <option key={category} value={category}>
      {category}
    </option>
  ));
  return (
    <div className={styles.modal}>
      <div className={styles.modalcontent}>
        <h2>Add a monthly budget</h2>
        <label>Amount: </label>
        <input
          type="number"
          name="inputAmount"
          onChange={onChange}
          value={AddBudget.amount}
        ></input>
        <label>Choose a category: </label>
        <select name="categories" onChange={onChange}>
          {categoryOptions}
        </select>

        <div className={styles.modalbutton}>
          <button onClick={handleAddButton}>Add Budget</button>
          <button onClick={() => toggleBudget()}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddBudget;
