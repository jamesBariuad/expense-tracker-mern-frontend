import axios from "axios";
import React, { useEffect } from "react";
import styles from "./Budgets.module.css";
import { useState } from "react";
import AddBudget from "./AddBudget";
import DeleteBudget from "./DeleteBudget";

const Budgets = () => {
  const [budgetData, setBudgetData] = useState([]);
  const [monthlyExpense, setMonthlyExpense] = useState([]);
  const [toggleAddBudget, setToggleAddBudget] = useState(false);

  useEffect(() => {
    axios
      .get(
        "https://expense-tracker-backend-mern.herokuapp.com/api/v1/expense/date/datenow"
      )
      .then((response) => setMonthlyExpense(response.data));
    axios
      .get("https://expense-tracker-backend-mern.herokuapp.com/api/v1/budgets")
      .then((response) => setBudgetData(response.data));
  }, []);

  const toggleBudget = () => {
    axios
      .get("https://expense-tracker-backend-mern.herokuapp.com/api/v1/budgets")
      .then(
        (response) =>
          (response.status = 200
            ? (setBudgetData(response.data),
              setToggleAddBudget(!toggleAddBudget))
            : false)
      );
  };

  const getPercentage = (category, budgetOfCategory) => {
    return ((getSumOfCategory(category) / budgetOfCategory) * 100).toFixed(2);
  };

  const getSumOfCategory = (category) => {
    let sum = 0;
    category === "All"
      ? monthlyExpense.map((expense) => {
          return (sum += expense.value);
        })
      : monthlyExpense.map((expense) => {
          if (expense.category === category) {
            sum += expense.value;
          }
          return sum;
        });
    return sum;
  };

  const [deleteBudget, setDeleteBudget] = useState(false);
  const [clickedId, setClickedId] = useState("");
  const toggleDelete = (e) => {
    setDeleteBudget(!deleteBudget);
  };
  const handleDelete = (e) => {
    setClickedId(e.target.name);
    toggleDelete();
  };
  const deleteConfirmed = (clickedId) => {
    axios
      .delete(
        `https://expense-tracker-backend-mern.herokuapp.com/api/v1/budgets/${clickedId}`
      )
      .then((response) =>
        response.status === 200
          ? axios
              .get(
                "https://expense-tracker-backend-mern.herokuapp.com/api/v1/budgets"
              )
              .then((response) => setBudgetData(response.data))
              .then(toggleDelete())
          : false
      );
  };

  const displayBudgets = budgetData.map((budget) => (
    <div key={budget._id} className={styles.budgetstats}>
      <button className={styles.deleteButton}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/2976/2976286.png"
          name={budget._id}
          onClick={(e) => handleDelete(e)}
          alt="xbutton"
        ></img>
      </button>

      <div className={styles.category}>
        <p>{budget.category}</p>
        <p>Total budget: ₱{budget.amount.toLocaleString()}</p>
      </div>

      <div className={styles.percentage}>
        {getPercentage(budget.category, budget.amount) >= 100 ? (
          <>
            <progress
              value={getPercentage(budget.category, budget.amount)}
              max="100"
              className={styles.progressred}
            >
              {getPercentage(budget.category, budget.amount)}
            </progress>
            100%
          </>
        ) : (
          <>
            <progress
              value={getPercentage(budget.category, budget.amount)}
              max="100"
              className={styles.progress}
            >
              {getPercentage(budget.category, budget.amount)}
            </progress>
            {getPercentage(budget.category, budget.amount)}%
          </>
        )}
      </div>

      <div className={styles.currspend}>
        current spend: ₱{getSumOfCategory(budget.category).toLocaleString()}
      </div>

      {budget.amount - getSumOfCategory(budget.category) < 0 ? (
        <div className={styles.remspend}>
          remaining spend:
          <div className={styles.exceed}>
            ₱
            {(
              budget.amount - getSumOfCategory(budget.category)
            ).toLocaleString()}
          </div>
        </div>
      ) : (
        <div className={styles.remspend}>
          remaining spend:
          <div className={styles.notexceed}>
            ₱
            {(
              budget.amount - getSumOfCategory(budget.category)
            ).toLocaleString()}
          </div>
        </div>
      )}
    </div>
  ));

  return (
    <div className={styles.container}>
      {deleteBudget && (
        <DeleteBudget
          toggleDelete={toggleDelete}
          handleDelete={handleDelete}
          clickedId={clickedId}
          deleteConfirmed={deleteConfirmed}
        />
      )}

      <div className={styles.head}>
        <h2 className={styles.center}>Budgets for this month</h2>
        <div></div>
        <div className={styles.button}>
          <button onClick={toggleBudget}>Create a budget</button>
        </div>
      </div>
      {toggleAddBudget ? (
        <AddBudget toggleBudget={toggleBudget} setBudgetData={setBudgetData} />
      ) : (
        false
      )}

      <div className={styles.data}>{displayBudgets}</div>
    </div>
  );
};

export default Budgets;
