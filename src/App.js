import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  const [endDate, setEndDate] = useState(new Date());
  const [daysUntil, setDaysUntil] = useState(0);

  useEffect(() => {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const days = Math.round(Math.abs((Date.now() - endDate) / oneDay));
    setDaysUntil(days);
  }, [endDate]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
          />
        </div>
      </header>

      <p>Days til date: {daysUntil}</p>
    </div>
  );
}

export default App;
