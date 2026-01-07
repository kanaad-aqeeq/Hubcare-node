import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import { SvgCalendarIcon } from '../assets/svg/Svg';

const DatePickerInput = ({ onChange}) => {
  const [startDate, setStartDate] = useState(null);

  const handleDateChange = (date) => {
    setStartDate(date); 
    if (onChange) {
      onChange(date); 
    }
  };

  return (
    <div className='datepicker-input'>
      <label className='datepicker-label'>
        <div className="inputwth-icon">
          <DatePicker
            selected={startDate}
            onChange={handleDateChange} 
            dateFormat="dd/MM/yy" 
            placeholderText="DD/MM/YY" 
            className="custom-input"
          />
          <div className="input-icon">
            {/* <span><SvgCalendarIcon /></span> */}
          </div>
        </div>
      </label>
    </div>
  );
};

export default DatePickerInput;
