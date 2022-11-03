import React, {  useState } from "react";
import DeleteTransaction from "./DeleteTransaction";
import EditTransaction from "./EditTransaction";
import styles from "./DisplayAllTransactions.module.css";

const DisplayAllTransactions = ({ income, expense, dispatch }) => {
  const addTypeToIncome = income?.map((incomeObject) => ({
    ...incomeObject,
    type: "income",
  }));
  const addTypeToExpense = expense?.map((expenseObject) => ({
    ...expenseObject,
    type: "expense",
  }));
  const allTransactions = addTypeToIncome?.concat(addTypeToExpense);

  const sortedNewestFirst = allTransactions?.sort(
    (a, b) => -a.date?.localeCompare(b.date)
  );

  const [toggleEdit, setToggleEdit] = useState(false);
  const [toggleDelete, setToggleDelete] = useState(false);
  const [clickedId, setClickedId] = useState("");

  const handleEdit = (e) => {
    setToggleEdit(true);
    setClickedId(e.target.id);
  };
  const closeEdit = () => {
    setToggleEdit(false);
  };

  const handleDelete = (e) => {
    setToggleDelete(true);
    setClickedId(e.target.id);
  };

  const closeDelete = () => {
    setToggleDelete(false);
  };

  const deleteConfirmed = (transaction) => {
    dispatch({
      type: `DELETE_${transaction[0].type.toUpperCase()}`,
      payload: {
        id: clickedId,
      },
    });
  };

  const display = sortedNewestFirst?.map((item) => {
    return (
      <div key={item?._id} className={styles.displayitem}>
        {/* {item?.type} */}
        {new Date(item?.date).toDateString()}
        <p>{item?.category}</p>
        <p>{item?.description}</p>

        {item?.type === "income" ? (
          <p className={styles.income}>+₱ {item?.value?.toLocaleString()}</p>
        ) : (
          <p className={styles.expense}>-₱ {item?.value?.toLocaleString()}</p>
        )}

        <div className={styles.buttons}>
          <button onClick={handleEdit} id={item?._id}>
            edit
          </button>
          <button onClick={handleDelete} id={item?._id}>
            delete
          </button>
        </div>
      </div>
    );
  });

  const totalIncome = () => {
    let sumIncome = 0;
    income?.map((income) => (sumIncome += income.value));
    return sumIncome;
  };

  const totalExpense = () => {
    let sumExpense = 0;
    let arr = [];
    expense?.map((expense) => arr.push(expense.value));
    sumExpense = arr.reduce((prev, curr) => prev + curr, 0);
    return sumExpense;
  };

  return (
    <div className={styles.transactions}>
      <div className={styles.calccontainer}>
        <div className={styles.calculations}>
          <div className={styles.toppart}>
            <h3>All Transactions</h3>
            <hr></hr>
          </div>
          <br></br>
          <div className={styles.lowpart}>
            <b className={styles.income}>
              income {`: +₱${totalIncome().toLocaleString()}`}
            </b>
            <br></br>
            <br />
            <b className={styles.expense}>
              expense {`: -₱${totalExpense().toLocaleString()}`}
            </b>
            <br></br>
            ----------------------
            <br />
            <h4>
              total:
              {totalIncome() - totalExpense() > 0 ? (
                <i className={styles.income}>
                  +₱{(totalIncome() - totalExpense()).toLocaleString()}
                </i>
              ) : (
                <i className={styles.expense}>
                  -₱{(totalExpense() - totalIncome()).toLocaleString()}
                </i>
              )}
            </h4>
          </div>
        </div>
      </div>
      <div className={styles.display}>
        <h3 className={styles.head}>Transaction History</h3>

        <div className={styles.data}>{display}</div>
      </div>
      <div>
        <div>
          {toggleEdit ? (
            <EditTransaction
              id={clickedId}
              transactions={sortedNewestFirst}
              closeEdit={closeEdit}
              dispatch={dispatch}
            />
          ) : (
            false
          )}
        </div>
        <div>
          {toggleDelete ? (
            <DeleteTransaction
              id={clickedId}
              closeDelete={closeDelete}
              deleteConfirmed={deleteConfirmed}
              transactions={sortedNewestFirst}
            />
          ) : (
            false
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayAllTransactions;
