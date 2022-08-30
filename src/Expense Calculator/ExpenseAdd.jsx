import React, { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';

// import component ExpenseList
import ExpenseList from './ExpenseList';

/**
 * get Expense in localstorage
 * @returns array
 */
const getItems = () => {
  const data = localStorage.getItem('items');
  if (data) {
    return JSON.parse(data);
  }
  return [];
};

export default function ExpenseAdd() {
  // Declare a new state variable, which we'll call 'getData';
  const [getData, setGetData] = useState(getItems());
  // Declare a new state variable, which we'll call 'name';
  const [inputName, setInputName] = useState('');
  // Declare a new state variable, which we'll call 'cost';
  const [inputCost, setInputCost] = useState('');
  // Declare a new state variable, which we'll call 'date';
  const [date, setDate] = useState('');
  // set the error in empty input box from onClick sumbit
  // Declare a new state variable, which we'll call 'ErrorName';
  const [errorName, setErrorName] = useState('');
  // Declare a new state variable, which we'll call 'ErrorCost';
  const [errorCost, setErrorCost] = useState('');
  // Declare a new state variable, which we'll call 'ErrorDate';
  const [errorDate, setErrorDate] = useState('');
  const ref = useRef();

  /**
   *OnChange input Name
   * @param {event} event
   */
  const handleOnChangeName = (event) => {
    setInputName(event.target.value);
  };

  /**
   *onChange input Cost
   * @param {event} event
   */
  const handleOnChangeCost = (event) => {
    setInputCost(event.target.value);
  };

  /**
   * onChange input Date
   * @param {event} event
   */
  const handleOnChangedate = (event) => {
    setDate(event.target.value);
  };

  /**
  *Submit Expense in LocalStorage;
  */
  const handleSubmissionExpense = () => {
    if (inputCost && inputName) {
      let array = [];
      let item = null;
      // create a object
      const items = {
        // id: uuidv4(),
        name: inputName,
        cost: parseInt(inputCost, 10),
        date,
      };
      item = [...getData];
      if (array !== null) {
        array = item;
        array.push(items);
      } else {
        array.push(items);
      }
      setGetData(array);
      setInputName('');
      setInputCost('');
      setDate('');
      setErrorName('');
      setErrorCost('');
      setErrorDate('');
      ref.current.value = '';
      Swal.fire({
        icon: 'success',
        title: 'Add..',
        text: 'You have successfully Add Expense!',
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      setErrorName('Enter Valid Name');
      setErrorCost('Enter Vaild Cost');
      setErrorDate('Enter Vaild Date');
    }
    return 0;
  };

  /**
   *set Expense in LocalStorage
   */
  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(getData));
  }, [getData]);

  /**
   *Remove Expense by index
   * @param {index} id
   */
  const handleOnRemove = (id) => {
    const inde = getData.indexOf(id);
    if (inde !== -1) {
      getData.splice(inde, 1);
      setGetData([...getData]);
      Swal.fire({
        icon: 'success',
        title: 'Delete...',
        text: 'You have successfully Delete Expense!',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  const handleReset = () => {
    setInputName('');
    setInputCost('');
    setDate('');
    setErrorName('');
    setErrorCost('');
    setErrorDate('');
  };
  return (
    <div className="container-fluid">
      <div className="row" id="eta_app">
        <div className="main-contniner">
          <section className="col-12" id="eta_body">
            <div className="eta_body_template">
              <div className="row eta_body_graph" />
              <h4 className="text-black text-center">Add Expense</h4>
              <hr />
              <div className="form-row">
                <form onSubmit={(event) => event.preventDefault()}>
                  <div className="form-group">
                    <span style={{ color: 'black' }} htmlFor="name">Name:</span>
                    <input
                      type="text"
                      name="Name"
                      onChange={handleOnChangeName}
                      value={inputName}
                      ref={ref}
                      className="form-control"
                      placeholder="Enter name"
                      id="name"
                    />
                    <div className="text-danger">{errorName}</div>
                  </div>
                  <br />
                  <div className="form-group">
                    <span style={{ color: 'black' }} htmlFor="email">Cost:</span>
                    <input
                      type="number"
                      name="Cost"
                      value={inputCost}
                      onChange={handleOnChangeCost}
                      ref={ref}
                      className="form-control"
                      placeholder="₹0.00"
                      id="email"
                    />
                    <div className="text-danger">{errorCost}</div>
                  </div>
                  <br />
                  <div className="form-group">
                    <span style={{ color: 'black' }} htmlFor="email">Date:</span>
                    <input
                      type="date"
                      name="Cost"
                      value={date}
                      onChange={handleOnChangedate}
                      ref={ref}
                      className="form-control"
                      placeholder="Enter Cost"
                      id="email"
                    />
                    <div className="text-danger">{errorDate}</div>
                  </div>
                  <br />
                  <input
                    type="submit"
                    value="Add"
                    className="btn btn-success"
                    onClick={handleSubmissionExpense}
                  />
                  {' '}
                  <input
                    type="submit"
                    value="Reset"
                    className="btn btn-success"
                    onClick={handleReset}
                  />
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
      {/* passing props in ExpenseList component */}
      <ExpenseList
        data={getData}
        onRemove={handleOnRemove}
      />
    </div>
  );
}
