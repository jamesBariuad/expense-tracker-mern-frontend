import { useEffect, useReducer, useState } from "react";
import axios from "axios";
// import DisplayAccounts from "./components/DisplayAccounts";
// import DisplayIncome from "./components/DisplayIncome";
import AddTransaction from "./components/AddTransaction";
// import DisplayExpense from "./components/DisplayExpense";
import DisplayAllTransactions from "./components/DisplayAllTransactions";
import "./App.css";
import Stats from "./components/Stats";
import Budgets from "./components/Budgets";

function App() {
  const initialState = {
    accounts: [],
    budgets: [],
    income: [],
    expense: [],
    trigger: [],
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "LOAD_ACCOUNTS":
        return {
          ...state,
          accounts: action.payload,
        };

      case "LOAD_BUDGETS":
        return {
          ...state,
          budgets: action.payload,
        };

      case "LOAD_ALL_INCOME":
        return {
          ...state,
          income: action.payload,
        };

      case "LOAD_ALL_EXPENSE":
        return {
          ...state,
          expense: action.payload,
        };

      case "ADD_TRANSACTION_INCOME":
        axios
          .post("https://expense-tracker-backend-mern.herokuapp.com/api/v1/income", action.payload)
          .then((response) =>
            axios
              .get("https://expense-tracker-backend-mern.herokuapp.com/api/v1/income")
              .then((response) => {
                dispatch({
                  type: "LOAD_ALL_INCOME",
                  payload: response.data,
                });
              })
          );

        return { ...state, income: [...state.income, action.payload] };

      case "ADD_TRANSACTION_EXPENSE":
        axios
          .post("https://expense-tracker-backend-mern.herokuapp.com/api/v1/expense", action.payload)
          .then((response) =>
            axios
              .get("https://expense-tracker-backend-mern.herokuapp.com/api/v1/expense")
              .then((response) => {
                dispatch({
                  type: "LOAD_ALL_EXPENSE",
                  payload: response.data,
                });
              })
              .then(reloadBudgets())
          );

        return { ...state, expense: [...state.expense, action.payload] };

      case "DELETE_INCOME":
        axios
          .delete(`https://expense-tracker-backend-mern.herokuapp.com/api/v1/income/${action.payload.id}`)
          .then((response) => {});
        return {
          ...state,
          income: state.income.filter(
            (transaction) => transaction._id !== action.payload.id
          ),
        };

      case "DELETE_EXPENSE":
        axios
          .delete(`https://expense-tracker-backend-mern.herokuapp.com/api/v1/expense/${action.payload.id}`)
          .then((response) => {});
        return {
          ...state,
          expense: state.expense.filter(
            (transaction) => transaction._id !== action.payload.id
          ),
        };

      case "EDIT_EXPENSE":
        axios
          .put(
            `https://expense-tracker-backend-mern.herokuapp.com/api/v1/expense/${action.payload.id}`,
            action.payload
          )
          .then((response) => {});
        return {
          ...state,
          expense: state.expense.map((expense) => {
            if (expense._id === action.payload.id) {
              expense.description = action.payload.description;
              expense.category = action.payload.category;
              expense.value = action.payload.value;
            }
            return expense;
          }),
        };

      case "EDIT_INCOME":
        axios
          .put(
            `https://expense-tracker-backend-mern.herokuapp.com/api/v1/income/${action.payload.id}`,
            action.payload
          )
          .then((response) => {});
        return {
          ...state,
          income: state.income.map((income) => {
            if (income._id === action.payload.id) {
              income.description = action.payload.description;
              income.category = action.payload.category;
              income.value = action.payload.value;
            }
            return income;
          }),
        };

      default: {
        return alert("sumting wong");
      }
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios.get("https://expense-tracker-backend-mern.herokuapp.com/api/v1/accounts").then((response) => {
      dispatch({
        type: "LOAD_ACCOUNTS",
        payload: response.data,
      });
    });
    axios.get("https://expense-tracker-backend-mern.herokuapp.com/api/v1/budgets").then((response) => {
      dispatch({
        type: "LOAD_BUDGETS",
        payload: response.data,
      });
    });
    axios.get("https://expense-tracker-backend-mern.herokuapp.com/api/v1/income").then((response) => {
      dispatch({
        type: "LOAD_ALL_INCOME",
        payload: response.data,
      });
    });
    axios.get("https://expense-tracker-backend-mern.herokuapp.com/api/v1/expense").then((response) => {
      dispatch({
        type: "LOAD_ALL_EXPENSE",
        payload: response.data,
      });
    });
  }, []);

  const [addTransaction, setAddTransaction] = useState(false);
  const toggleAdd = () => {
    setAddTransaction(!addTransaction);
  };

  const handleNavClick = (e) => {
    setCurrentTab(e.target.value);
  };

  const [currentTab, setCurrentTab] = useState("transactions");

  const reloadBudgets = () => {
    axios.get("https://expense-tracker-backend-mern.herokuapp.com/api/v1/budgets").then((response) => {
      dispatch({
        type: "LOAD_BUDGETS",
        payload: response.data,
      });
    });
  };

  // const [clicked, setClicked] = useState(true)

  return (
    <div className="grid-container">
      <div className="topbar">
        <h2>Kalupì</h2>
      </div>
      <div className="addtransaction">
        <button onClick={toggleAdd}>Add a Transaction</button>
      </div>
      {addTransaction ? (
        <AddTransaction dispatch={dispatch} toggleAdd={toggleAdd} />
      ) : (
        false
      )}
      <nav className="navbar">
        {currentTab === "transactions" ? (
          <button
            style={{ backgroundColor: "#B5B5B5" }}
            value="transactions"
            onClick={handleNavClick}
          >
            Transactions
          </button>
        ) : (
          <button value="transactions" onClick={handleNavClick}>
            Transactions
          </button>
        )}
        {currentTab==="stats"?<button style={{ backgroundColor: "#B5B5B5" }} value="stats" onClick={handleNavClick}>
          Stats
        </button>:<button value="stats" onClick={handleNavClick}>
          Stats
        </button>}
        {currentTab==="budget"?<button style={{ backgroundColor: "#B5B5B5" }} value="budget" onClick={handleNavClick}>
          Budget
        </button>:<button value="budget" onClick={handleNavClick}>
          Budget
        </button>}
      </nav>
      <div className="displayarea">
        {currentTab === "transactions" ? (
          <DisplayAllTransactions
            income={state?.income}
            expense={state?.expense}
            dispatch={dispatch}
          />
        ) : (
          false
        )}
        {currentTab === "stats" && (
          <Stats income={state.income} expense={state.expense} />
        )}
        {currentTab === "budget" && (
          <Budgets expense={state.expense} budgets={state.budgets} />
        )}
      </div>
    </div>
  );
}

export default App;
