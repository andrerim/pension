import "./App.css";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  const [endDate, setEndDate] = useState(new Date());
  const [daysUntil, setDaysUntil] = useState(0);
  const [workingDaysUntil, setWorkingDaysUntil] = useState(0); // does not exclude holidays

  useEffect(() => {
    // Validate input
    const startDate = new Date();
    if (endDate <= startDate) {
      return;
    }
    const millisecondsPerDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const daysUntil = Math.round(
      Math.abs((startDate - endDate) / millisecondsPerDay)
    );
    setDaysUntil(daysUntil);

    // Calculate days between dates
    const diff = endDate - startDate; // Milliseconds between datetime objects
    let days = Math.ceil(diff / millisecondsPerDay);

    // Subtract two weekend days for every week in between
    const weeks = Math.floor(days / 7);
    days -= weeks * 2;

    // Handle special cases
    const startDay = startDate.getDay();
    const endDay = endDate.getDay();

    // Remove weekend not previously removed.
    if (startDay - endDay > 1) {
      days -= 2;
    }
    // Remove start day if span starts on Sunday but ends before Saturday
    if (startDay === 0 && endDay !== 6) {
      days--;
    }
    // Remove end day if span ends on Saturday but starts after Sunday
    if (endDay === 6 && startDay !== 0) {
      days--;
    }

    setWorkingDaysUntil(days);
  }, [endDate]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Dager igjen til pensjon</h1>
        <div>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
          />
        </div>
        <h1>{daysUntil} dager</h1>
        <h1>{workingDaysUntil} arbeidsdager</h1>
      </header>
    </div>
  );
}

export default App;
