/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable indent */
/* eslint-disable no-tabs */
/* eslint-disable arrow-body-style */
import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
// import component ExpenseGraph;
import moment from 'moment';
import ExpenseGraph from './ExpenseGraph';

export default function ExpenseList({
  // props
  data,
  onRemove,
}) {
  // Declare a new state variable, which we'll call 'Search';
  const [searchExpense, setSearchExpense] = useState([]);
  // Declare a new state variable, which we'll call 'salary';
  const [salary] = useState(5000);

  /**
   *  get the totalExpenses
   */
  const totalExpenses = data.reduce((totals, item) => {
    return (totals += item.cost);
  }, 0);
  const alertType = totalExpenses > salary ? 'alert-danger' : 'alert-success';
  const Balance = salary - totalExpenses;

  /**
   * set data in search new state variable
   */
  useEffect(() => {
    setSearchExpense(data);
  }, [data]);

  /**
   * search Expense (name)
   * @param {event} event
   */
  const handleChangeSearch = (event) => {
    const searchResults = data.filter((filteredExpense) =>
      filteredExpense.name.toLowerCase().includes(event.target.value));
    setSearchExpense(searchResults);
  };

  /**
   * display Expense All
   */
  const displayAllExpense = () => {
    const filterExpenseAll = data.filter((i) => {
      return i.date;
    });
    setSearchExpense(filterExpenseAll);
  };

  /**
   * display Expense Today
   */
  const displayExpenseToday = () => {
    const currentToday = new Date();
    const today = moment(currentToday).format('YYYY-MM-DD');
    const filterTodayExpense = data.filter((i) => {
      return today === i.date;
    });
    setSearchExpense(filterTodayExpense);
  };

  /**
   * display Expense Yesterday
   */
  const displayExpenseYesterday = () => {
    const currentToday = new Date();
    // it returns a timestamp
    const date = new Date().setDate(currentToday.getDate() - 1);
    const yesterday = new Date(date);
    const yesterdayDate = moment(yesterday).format('YYYY-MM-DD');
    const filterExpenseYesterday = data.filter((i) => {
      return yesterdayDate === i.date;
    });
    setSearchExpense(filterExpenseYesterday);
  };

  /**
   * display Expense 7 days ago
   */
  const displayExpenseLastSevenDays = () => {
    const date = new Date();
    const finalDate = date.setDate(date.getDate() - 7);
    const sevenDayAgo = moment(finalDate).format('YYYY-MM-DD');
    // console.log(sevenDayAgo);
    const filterExpenseSevenDaysAgo = data.filter((i) => {
      const days = moment(i.date).format('YYYY-MM-DD');
      return days <= sevenDayAgo;
    });
    setSearchExpense(filterExpenseSevenDaysAgo);
  };

  /**
 * display Expense one Month ago
 */
  const displayExpenseLastOneMonthly = () => {
    const currentToday = new Date();
    const currentMonth = currentToday.setMonth(currentToday.getMonth() - 1);
    const month = moment(currentMonth).format('MM');
    const filterExpenseMonthly = data.filter((i) => {
      const months = moment(i.date).format('MM');
      return month === months;
    });
    setSearchExpense(filterExpenseMonthly);
  };

  return (
    <div className="container-fluid">
      <div className="row" id="eta_app">
        <div className="main-contniner">
          <section className="col-12" id="eta_body">
            <div className="eta_body_template">
              <h4 className="text-black text-center">Expense List</h4>
              <hr />
              <Dropdown className="dropdown">
                <Dropdown.Toggle variant="success" style={{ height: '50px' }}>
                  Show Expense
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={displayAllExpense}
                  >
                    All
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={displayExpenseToday}
                  >
                    Today
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={displayExpenseYesterday}
                  >
                    Yesterday
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={displayExpenseLastSevenDays}
                  >
                    Seven days ago
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={displayExpenseLastOneMonthly}
                  >
                    One Month ago
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <div className="row eta_body_graph">
                <div className="col-12">
                  <div className="input-group input">
                    <div className="form-outline ">
                      <input
                        type="search"
                        placeholder="Search..."
                        onChange={handleChangeSearch}
                        id="form1"
                        className="form-control i"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <table className="table mb-0">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Date</th>
                    <th scope="col">Expense</th>
                    <th scope="col">Remove</th>
                  </tr>
                </thead>
                {/* display all items using map array metholastWeekDate */}
                {searchExpense.length > 0 ? (searchExpense.map((items) => (
                  <tbody>
                    <tr className="fw-normal  p-1">
                      <td className="align-middle">{items.name}</td>
                      <td className="align-middle">{moment(items.date).format('DD-MM-YYYY')}</td>
                      <td className="align-middle">
                        <span className="text-success">
                          ₹
                        </span>
                        {items.cost}
                      </td>
                      <td>
                        <button
                          type="button"
                          aria-label="Save"
                          className="fa fa-remove text-danger outline-none"
                          onClick={() => onRemove(items)}
                        />
                      </td>
                    </tr>
                  </tbody>
                ))) : (<th className="not">Expense Not Avaliable</th>)}
              </table>
              <br />
              <div className="alert p-4 alert-success">
                <span>
                  Salary:- ₹
                  {salary}
                </span>
              </div>
              <div className={`alert p-4 ${alertType}`}>
                <span>
                  Remaining:- ₹
                  {Balance}
                </span>
              </div>
              <div className="alert p-4 alert-success">
                <span>
                  Total Expense:- ₹
                  {totalExpenses}
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
      {/* passing props in ExpenseGraph component */}
      <ExpenseGraph Expense={data} />
    </div>
  );
}
