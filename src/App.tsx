import "./App.css";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { calculateWorkingDays } from "./workingdays";

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

    const daysUntil = (startDate: Date, endDate: Date): number => {
      return Math.round(
        Math.abs((startDate.valueOf() - endDate.valueOf()) / millisecondsPerDay)
      );
    }
    setDaysUntil(daysUntil(startDate, endDate));
    setWorkingDaysUntil(calculateWorkingDays(endDate));

  }, [endDate]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Dager igjen til pensjon</h1>
        <div>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date as any)}
          />
        </div>
        <h1>{daysUntil} dager</h1>
        <h1>{workingDaysUntil} arbeidsdager</h1>
      </header>
    </div>
  );
}

export default App;