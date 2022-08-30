import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

export default function Chartgraph({ Expense }) {
  // Declare a new state variable, which we'll call 'Chart';
  const [chart, setChart] = useState({
    datasets: [{
      backgroundColor: [
        'red',
        'green',
        'blue',
        'Yellow',
        'pink',
        'SlateBlue',
        'Gray',
        'Tomato',
        'DodgerBlue',
      ],
    }],
    labels: [
      'gray',
      'violet',
      'orange',
      'DodgerBlue',
    ],
  });

  /**
 * set the name and Cost Expense Date per user
 */
  const expenseData = () => {
    const label = [];
    const data = [];
    for (let i = 0; i < Expense.length; i += 1) {
      label.push(Expense[i].name);
      data.push(Expense[i].cost);
    }
    setChart({
      datasets: [{
        data,
        backgroundColor: [
          'red',
          'green',
          'blue',
          'Yellow',
          'pink',
          'SlateBlue',
          'Gray',
          'Tomato',
          'DodgerBlue',
        ],
      }],
      labels: label,
    });
  };

  /**
   *call the function in useEffec;
   */
  useEffect(() => {
    expenseData();
  }, [Expense]);
  return (
    <div>
      <div className="container-fluid">
        <div className="row" id="eta_app">
          <div className="main-contniner">
            <section className="col-12" id="eta_body">
              <div className="eta_body_template">
                <h4 className="text-black text-center ">Show Expense Chart</h4>
                <hr />
                <section className="chart mb-4 mt-lg-5">
                  <div className="container-lg">
                    <div className="row justify-content-center align-items-center mt-3 g-4">
                      <div className="col-md-8">
                        <Bar
                          data={chart}
                          options={{
                            plugins: {
                              title: {
                                display: true,
                                text: 'Cryptocurrency prices',
                              },
                              legend: {
                                display: true,
                                position: 'bottom',
                              },
                            },
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
