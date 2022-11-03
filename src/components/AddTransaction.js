import React from "react";
import { useState } from "react";
import styles from "./modal.module.css";

const AddTransaction = ({ dispatch, toggleAdd }) => {
  const [addItem, setAddItem] = useState({
    type: "expense",
    description: "",
    category: "Other",
    value: "",
    date: new Date().toISOString(),
  });

  //2 way binding of input fields
  const onChange = (e) => {
    const inputName = e.target.name;

    switch (inputName) {
      case "type":
        setAddItem({
          ...addItem,
          type: e.target.value,
        });
        break;
      case "description":
        setAddItem({
          ...addItem,
          description: e.target.value,
        });
        break;
      case "category":
        setAddItem({
          ...addItem,
          category: e.target.value,
        });
        break;
      case "value":
        setAddItem({
          ...addItem,
          value: Number(e.target.value),
        });
        break;
      case "date":
        setAddItem({
          ...addItem,
          date: e.target.value,
        });
        break;
      default:
        break;
    }
  };

  const incomeCategories = ["Allowance", "Salary", "Cash", "Bonus", "Other"];
  const expenseCategories = [
    "Food",
    "Social Life",
    "Self-Development",
    "Transportation",
    "HouseHold",
    "Health",
    "Apparel",
    "Other",
  ];

  const incomeOptions = incomeCategories.map((category) => (
    <option value={category} key={category}>
      {category}
    </option>
  ));

  const expenseOptions = expenseCategories.map((category) => (
    <option name="category" value={category} key={category}>
      {category}
    </option>
  ));

  const handletypeChange = (e) => {
    setAddItem({
      ...addItem,
      type: e.target.value,
    });
  };

  let displayByType = expenseOptions;
  if (addItem.type === "expense") {
    displayByType = expenseOptions;
  } else {
    displayByType = incomeOptions;
  }

  const handleCategoryChange = (e) => {
    setAddItem({
      ...addItem,
      category: e.target.value,
    });
  };
  const handleSubmit = () => {
    dispatch({
      type: `ADD_TRANSACTION_${addItem.type.toUpperCase()}`,
      payload: addItem,
    });
    toggleAdd();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalcontent}>
        <h2>Add Transaction</h2>

        <div>
          <label>Type: </label>
          <select onChange={handletypeChange}>
            <option value="expense">expense</option>
            <option value="income">income</option>
          </select>
        </div>

        <div>
          <label>Description: </label>
          <input
            type="text"
            value={addItem.description}
            name="description"
            onChange={onChange}
          ></input>
        </div>

        <div>
          <label>Value: </label>
          <input
            type="number"
            value={addItem.value}
            name="value"
            onChange={onChange}
          ></input>
        </div>

        <div>
          <label>Category: </label>
          <select onChange={handleCategoryChange}>{displayByType}</select>
        </div>

        <div className={styles.modalbutton}>
          <button onClick={handleSubmit}>Submit </button>
          <button onClick={() => toggleAdd()}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddTransaction;
