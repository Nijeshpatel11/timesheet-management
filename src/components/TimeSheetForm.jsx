import React, { useState } from 'react';
import '../styles/TimeSheetForm.css';

const TimeSheetForm = () => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [breakStartTime, setBreakStartTime] = useState('');
  const [breakEndTime, setBreakEndTime] = useState('');
  const [breaks, setBreaks] = useState([]);
  const [totalTime, setTotalTime] = useState(null);
  const [is24HourFormat, setIs24HourFormat] = useState(false);

  const calculateBreakDuration = (start, end) => {
    const breakStart = new Date(`1970-01-01T${start}`);
    const breakEnd = new Date(`1970-01-01T${end}`);
    const breakDurationInMinutes = (breakEnd - breakStart) / (1000 * 60);
    
    const hours = Math.floor(breakDurationInMinutes / 60);
    const minutes = Math.round(breakDurationInMinutes % 60);

    if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ${minutes} minute${minutes > 1 ? 's' : ''}`;
    }
    return `${minutes} minute${minutes > 1 ? 's' : ''}`;
  };

  const addBreakToList = () => {
    if (!breakStartTime || !breakEndTime) {
      alert('Please enter both start and end times for the break.');
      return;
    }

    const breakDuration = calculateBreakDuration(breakStartTime, breakEndTime);
    setBreaks([...breaks, { start: breakStartTime, end: breakEndTime, duration: breakDuration }]);

    setBreakStartTime('');
    setBreakEndTime('');
  };

  const removeBreak = (index) => {
    const updatedBreaks = breaks.filter((_, i) => i !== index);
    setBreaks(updatedBreaks);
  };

  const calculateJobTime = () => {
    if (!startTime || !endTime) {
      alert('Please enter start and end time!');
      return;
    }

    const jobStart = new Date(`1970-01-01T${startTime}`);
    const jobEnd = new Date(`1970-01-01T${endTime}`);
    let totalJobTime = (jobEnd - jobStart) / (1000 * 60 * 60);

    breaks.forEach((breakTime) => {
      const breakStart = new Date(`1970-01-01T${breakTime.start}`);
      const breakEnd = new Date(`1970-01-01T${breakTime.end}`);
      const breakDuration = (breakEnd - breakStart) / (1000 * 60 * 60);
      totalJobTime -= breakDuration;
    });

    const hours = Math.floor(totalJobTime);
    const minutes = Math.round((totalJobTime - hours) * 60);

    setTotalTime(`${hours} hours ${minutes} minutes`);
  };

  const toggleFormat = () => {
    setIs24HourFormat(!is24HourFormat);
  };

  return (
    <div className="timesheet-form">
      <h2>Timesheet Management</h2>

      <div className="time-format-toggle">
        <button onClick={toggleFormat}>
          {is24HourFormat ? 'Switch to 12 Hours (AM/PM)' : 'Switch to 24 Hours'}
        </button>
      </div>

      <div className="form-row">
        <label>Job Start Time:</label>
        <input
          type={is24HourFormat ? 'text' : 'time'}
          placeholder={is24HourFormat ? 'HH:MM' : ''}
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />

        <label>Job End Time:</label>
        <input
          type={is24HourFormat ? 'text' : 'time'}
          placeholder={is24HourFormat ? 'HH:MM' : ''}
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </div>

      <div className="break-section">
        <h3>Break Times</h3>
        <div className="break-input-container">
          <label>Break Start Time:</label>
          <input
            type={is24HourFormat ? 'text' : 'time'}
            placeholder={is24HourFormat ? 'HH:MM' : ''}
            value={breakStartTime}
            onChange={(e) => setBreakStartTime(e.target.value)}
          />

          <label>Break End Time:</label>
          <input
            type={is24HourFormat ? 'text' : 'time'}
            placeholder={is24HourFormat ? 'HH:MM' : ''}
            value={breakEndTime}
            onChange={(e) => setBreakEndTime(e.target.value)}
          />

          <button id="add-break-btn" onClick={addBreakToList}>Add Break</button>
        </div>

        <div className="break-list-container">
          <ul className="break-list">
            {breaks.map((breakTime, index) => (
              <li key={index}>
                Break from {breakTime.start} to {breakTime.end} - {breakTime.duration}
                <button onClick={() => removeBreak(index)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="calculate-btn">
        <button onClick={calculateJobTime}>Calculate Job Time</button>
      </div>

      {totalTime !== null && (
        <div className="total-time-section">
          <h3>Total Time Worked: {totalTime}</h3>
        </div>
      )}
    </div>
  );
};

export default TimeSheetForm;
