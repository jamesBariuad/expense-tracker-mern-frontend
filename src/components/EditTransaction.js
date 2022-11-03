import React, { useState } from "react";
import styles from "./modal.module.css";

const EditTransaction = ({ id, dispatch, transactions, closeEdit }) => {
  // console.log(transactions)
  const selected = transactions?.filter(
    (transaction) => transaction._id === id
  );

  const [addItem, setAddItem] = useState({
    id: selected[0]?._id,
    description: selected[0]?.description,
    category: selected[0]?.category,
    value: selected[0]?.value,
  });

  const onChange = (e) => {
    const inputName = e.target.name;

    switch (inputName) {
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

  const incomeOptions = incomeCategories.map((category) =>
    category !== selected[0].category ? (
      <option value={category} key={category}>
        {category}
      </option>
    ) : (
      false
    )
  );

  const expenseOptions = expenseCategories.map((category) =>
    category !== selected[0].category ? (
      <option name="category" value={category} key={category}>
        {category}
      </option>
    ) : (
      false
    )
  );

  const handleCategoryChange = (e) => {
    setAddItem({
      ...addItem,
      category: e.target.value,
    });
  };

  const handleSubmit = () => {
    dispatch({
      type: `EDIT_${selected[0]?.type.toUpperCase()}`,
      payload: addItem,
    });
    closeEdit();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalcontent}>
        <h2>Edit Transaction</h2>
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
          {selected[0].type === "income" ? (
            <select onChange={handleCategoryChange}>
              <option name="category" value={selected[0].category}>
                {selected[0].category}
              </option>
              {incomeOptions}
            </select>
          ) : (
            <select onChange={handleCategoryChange}>
              <option name="category" value={selected[0].category}>
                {selected[0].category}
              </option>
              {expenseOptions}
            </select>
          )}
        </div>

        <div className={styles.modalbutton}>
          <button onClick={handleSubmit}>Submit </button>
          <button onClick={closeEdit}> cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditTransaction;
