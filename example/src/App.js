import React, { Component } from 'react'
import CarbonDatePicker from 'react-carbon-datepicker';

let currentDate = new Date();

const config = { 
  alwaysShow: true,
  reminders: [
    {timestamp: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4).getTime(), note: 'What a wonderfull way to add a note to a date, Add notes or reminders to a specific date with a specific color', color: '#eb4d4b'},
    {timestamp: new Date(currentDate.getFullYear(), currentDate.getMonth(), 13).getTime(), note: 'Wonderba! Das ist gut', color: '#6ab04c'},
    {timestamp: new Date(currentDate.getFullYear(), currentDate.getMonth(), 22).getTime(), note: 'Putting a reminder is always helpfull, These reminders can keep you puntual.', color: '#686de0'},
  ],
  // showCalendar: true,
  // themePreset: 'dark',
}

let dateRef = React.createRef();

const onChange =timestamp=> {
  console.log(timestamp);
}

export default class App extends Component {
  
  render () {
    return (
      <div className='app'>
        <div className='calendar-container'>
          <CarbonDatePicker ref={dateRef} config={config} onChange={onChange}/>
        </div>
      </div>
    )
  }
}
