import React from 'react';
import '../styles/BreakInput.css';

const BreakInput = ({ breakTime, onBreakChange, onRemove, is24HourFormat }) => {
  return (
    <div className="break-input">
      <label>Break Start Time:</label>
      <input
        type={is24HourFormat ? "text" : "time"}
        placeholder={is24HourFormat ? "HH:MM" : ""}
        value={breakTime.start}
        onChange={(e) => onBreakChange({ ...breakTime, start: e.target.value })}
      />

      <label>Break End Time:</label>
      <input
        type={is24HourFormat ? "text" : "time"}
        placeholder={is24HourFormat ? "HH:MM" : ""}
        value={breakTime.end}
        onChange={(e) => onBreakChange({ ...breakTime, end: e.target.value })}
      />

      <button className="remove-break" onClick={onRemove}>Remove Break</button>
    </div>
  );
};

export default BreakInput;
