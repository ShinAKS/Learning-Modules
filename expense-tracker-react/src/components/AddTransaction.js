import React, { useState, useContext } from "react";
import "./AddTransaction.css";
import { GlobalContext } from "../context/GlobalState";

export const AddTransaction = () => {
  const { addTransaction } = useContext(GlobalContext);
  const [income, setIncome] = useState("");
  const [expense, setExpense] = useState("");
  const [incomeText, setIncomeText] = useState("");
  const [expenseText, setExpenseText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    let amount = "";
    let text = "";
    if (!e.target.className.includes("income")) {
      amount = "-" + expense;
      text = expenseText;
    } else {
      amount = income;
      text = incomeText;
    }
    console.log(expense);
    const newTransaction = {
      id: Math.floor(Math.random() * 10000000),
      text,
      amount: +amount,
    };

    addTransaction(newTransaction);

    if (e.target.className.includes("income")) {
      setIncome("");
      setIncomeText("");
    } else {
      setExpense("");
      setExpenseText("");
    }
  };

  return (
    <div>
      <h3>Add new transaction</h3>
      <div className="add-transaction">
        <form className="income-add" onSubmit={onSubmit}>
          <div className="form-control">
            <label htmlFor="text-income">Text</label>
            <input
              type="text"
              value={incomeText}
              onChange={(e) => setIncomeText(e.target.value)}
              placeholder="Enter text"
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount-income">Amount</label>
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="Enter income"
            />
          </div>
          <button className="btn btn-success">Add Income</button>
        </form>

        <form className="expense-add" onSubmit={onSubmit}>
          <div className="form-control">
            <label htmlFor="text-expense">Text</label>
            <input
              type="text"
              value={expenseText}
              onChange={(e) => setExpenseText(e.target.value)}
              placeholder="Enter text"
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount-expense">Amount</label>
            <input
              type="number"
              value={expense}
              onChange={(e) => setExpense(e.target.value)}
              placeholder="Enter expense"
            />
          </div>
          <button className="btn btn-danger">Add Expense</button>
        </form>
      </div>
    </div>
  );
};
