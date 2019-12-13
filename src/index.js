import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.css';
import defaultTheme from './defautTheme';
import ThemeHandler from './ThemeHandler';
import {getMonthDetails, validateDate} from './core';

const inputRef = React.createRef();
const yearContainerRef = React.createRef();
const yearBodyRef = React.createRef();
let oneHour = 60 * 60 * 1000
let oneDay = oneHour * 24;
let todayTimestamp = null;
function calculateTodayTimestamp() {
    todayTimestamp = Date.now() - (Date.now() % oneDay) - (oneHour*5.5);
    setTimeout(calculateTodayTimestamp, todayTimestamp + oneDay - Date.now() + 1000);
}
calculateTodayTimestamp();

let maxYear = 2050;
let minYear = 1970;
function generateAvailableYear() { 
    let years = [];
    for(let startYear = minYear; startYear <= maxYear; startYear++) {
        years.push(startYear);
    }
    return years;
}
let availableYears = generateAvailableYear();

function h2r(hex, alpha){
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+','+alpha+')';
    }
    throw new Error('Bad Hex');
}

export default class CarbonDate extends Component {

    constructor(props) {
        super(props);
        let dateData = this.props.date ? this.getDateFromDateString(this.props.date) : null;
        let dateObject = dateData ? validateDate(dateData.year, dateData.month, dateData.date) : validateDate();
        let dateTimestamp = new Date(dateObject.year, dateObject.month-1, dateObject.date).getTime();
        this.themeHandler = new ThemeHandler({
            getThemeConfig: ()=> this.theme
        });
        this.state = {
            ...dateObject,
            dateTimestamp,
            monthDetails: getMonthDetails(dateObject.year, dateObject.month-1, this.getReminders()),
            showCalendar: this.getConfig('showCalendar'),
            alwaysShow: this.getConfig('alwaysShow'),
        }

        this.theme = {
            ...defaultTheme[this.getConfig('themePreset') || 'default']
        }
        if(props.config && props.config.theme) {
            this.updateTheme(props.config.theme);
        }
        this.theme.yearGradient = this.theme.yearGradient || this.getYearGradient();
        
            
    }


    componentDidMount() {
        window.addEventListener('click', this.addBackDrop);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.addBackDrop);
    }

    addBackDrop =e=> {
        if(this.state.showCalendar && !ReactDOM.findDOMNode(this).contains(e.target)) {
            this.setCalendarVisibility(false);
        }
    }

    monthMap = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


    /**
     * Getters
     */

    getReminders =()=> (this.props.config && this.props.config.reminders) || []

    getYearGradient =()=> {
        let c = this.getTheme('year.selector.background')
        return 'linear-gradient(90deg, '+[[0.8, 0], [0.8, 25], [1, 40], [1, 60], [0.8, 75], [0.8, 100]].map(d=>h2r(c, d[0]) +' '+ d[1]+'%').join(', ')+')';
    }

    getConfig =key=> {
        return this.props.config && this.props.config[key];
    }

    getDateString =()=> {
        return this.state.year + '-' + 
            (this.state.month < 10 ? '0':'') + this.state.month + '-' + 
            (this.state.date < 10 ? '0': '') + this.state.date;
    }

    getDateFromDateString =dateValue=> {
        let dateData = dateValue.split('-').map(d=>parseInt(d, 10));
        if(dateData.length < 3) 
            return null;

        let year = dateData[0];
        let month = dateData[1];
        let date = dateData[2];
        return {year, month, date};
    }

    getAvailableYears =()=> {
        return availableYears;
    }

    getYearBodyStyles =()=> {
        return {
            top: ((this.state.yearTemp - minYear) * -60) + 'px'
        };
    }

    getDateStringFromTimestamp =timestamp=> {
        let dateObject = new Date(timestamp);
        let month = dateObject.getMonth()+1;
        let date = dateObject.getDate();
        return dateObject.getFullYear() + '-' + (month < 10 ? '0'+month : month) + '-' + (date < 10 ? '0'+date : date);
    }

    getDateFormatedString =timestamp=> {
        let dateObject = new Date(timestamp);
        let month = dateObject.getMonth();
        let date = dateObject.getDate();
        return (date < 10 ? '0'+date : date) + ' ' + this.monthMap[month].substr(0,3).toUpperCase() + ' ' + dateObject.getFullYear();
    }

    getStyles =(elementKey, args)=> {
        return this.themeHandler.getStyles(elementKey, args)
    }

    getTheme =key=> {
        return this.themeHandler.getTheme(key)
    }

    /**
     * Setters
     */

    setYearTemp =year=> {
        this.setState({yearTemp: year});
    }

    setYear =year=> {
        this.setState({year: year}, ()=> setTimeout(()=>this.setYearsVisibility(false)));
    }

    setCalendar =(year, month, date, hour, minute)=> {
        let dateObject = validateDate(year, month, date, hour, minute);
        this.setState({
            ...dateObject,
            monthDetails: getMonthDetails(dateObject.year, dateObject.month-1, this.getReminders())
        }, this.updateYearBodyScrollTop);
    }

    setDate =(year, month, date, updatedFromInput=false)=> {
        let dateTimestamp = new Date(year, month, date).getTime();
        this.setState({ dateTimestamp }, ()=>{
            if(!updatedFromInput) {
                this.updateInputFromDate();
            }
            if(this.props.onChange) {
                this.props.onChange(dateTimestamp);
            }
        });
    }

    setCalendarVisibility =active=> {
        if(active) {
            let date = this.getDateFromDateString(this.getDateStringFromTimestamp(this.state.dateTimestamp));
            this.setCalendar(date.year, date.month, date.date);
        }
        this.setState({showCalendar: active, showMonth: false, showYears: false});
    }

    setMonthVisibility =active=> {
        setTimeout(()=>this.setState({showMonth: active}), 10)
    }

    setYearsVisibility =active=> {
        setTimeout(()=> {
            this.setState({showYears: active, yearTemp: this.state.year}, this.updateYearBodyScrollTop)
        }, 10);
    }

    showReminder =day=> {
        if(!day.reminder)
            return;

        this.setState({ reminder: day })
    }

    hideReminder =()=> {
        if(!this.state.reminder) 
            return;

        this.setState({ reminder: false })
    }
 
    /**
     * Validators
     */


    isCurrentDay =day=> {
        return day.valid && day.timestamp === todayTimestamp;
    }

    isSelectedDay =day=> {
        return day.valid && day.timestamp === this.state.dateTimestamp;
    }

    /**
     * Handlers
     */

    onYearScroll =()=> {
        let year = availableYears[Math.floor((yearContainerRef.current.scrollTop + 30) / 60)];
        if(this.state.yearTemp !== year) {
            this.setYearTemp(year);
        }
        clearTimeout(this.debounce);
        this.debounce = setTimeout(this.updateYearBodyScrollTop, 400)
    }

    onYearMouseLeave =()=> {
        this.setState({yearMouse: null})
    } 

    onYearMouseEnter =year=> {
        this.setState({yearMouse: year})
    } 

    onBME =(e, key='button', args={}, callback)=> {
        this.themeHandler.onBME(e, key, args, callback)
    }


    onBML =(e, key='button', args={}, callback)=> {
        this.themeHandler.onBML(e, key, args, callback);
    }
    /**
     * Updaters
     */

    updateDateFromInput =()=> {
        let dateValue = inputRef.current.value;
        let dateData = this.getDateFromDateString(dateValue);
        if(dateData !== null) { 
            this.setDate(dateData.year, dateData.month-1, dateData.date, true);
            this.setCalendar(dateData.year, dateData.month, dateData.date);
        }
    }

    updateInputFromDate =()=> {
        inputRef.current.value = this.getDateStringFromTimestamp(this.state.dateTimestamp);
    }

    updateYearBodyScrollTop =()=> {
        if(yearContainerRef && yearContainerRef.current) {
            yearContainerRef.current.scrollTop = ((this.state.yearTemp - minYear) * 60);
        }
    }

    updateTheme =(theme)=> {
        if(!theme)
            return;
        this.updateThemeRecursive(this.theme, theme);
        this.forceUpdate();
    }

    updateThemeRecursive =(themeStruct, newTheme)=> {
        if(!newTheme)
            return;

        for(let idx in themeStruct) {
            if(!newTheme[idx])
                continue;
            if((!!themeStruct[idx]) && (themeStruct[idx].constructor === Object)) {
                this.updateThemeRecursive(themeStruct[idx], newTheme[idx])
            } else {
                themeStruct[idx] = newTheme[idx]   
            }
        }
    }

    /**
     * 
     */

    selectDate =day=> {
        this.setDate(this.state.year, this.state.month-1, day.date);
        this.setCalendarVisibility(false);
        this.setCalendar(this.state.year, this.state.month, day.date);
    }

    selectMonth =month=> {
        this.setCalendar(this.state.year, month, this.state.date);
        this.setMonthVisibility(false);
    }

    /**
     * 
     */

    changeYear =value=> {
        let year = Math.max(1970, this.state.year + value);
        this.setCalendar(year, this.state.month, this.state.date);
    }

    changeMonth =value=> {
        let month = this.state.month + value;
        let year = this.state.year;
        if(month < 1) {
            month = 12;
            year--;
        } else if(month > 12) {
            month = 1;
            year++;
        }
        this.setCalendar(year, month, this.state.date);
    }

    /**
     * Renderers
     */

    renderYearWidget =()=> {
        return (
            <div className={styles.cdbcyYearWidget}>
                <div className={styles.cdbcyyValue} style={this.getStyles('year')}
                    onMouseEnter={e=>this.onBME(e, 'year')}  
                    onMouseLeave={e=>this.onBML(e, 'year')} 
                    onClick={()=> this.setYearsVisibility(true)}>{this.state.year}</div>
                {this.state.showYears ? (
                    <div className={styles.cdbcyyYears} style={this.getStyles('yearSelectorBackground')}>
                        <div className={styles.cdbcyyyBackdrop} onClick={()=> this.setYearsVisibility(false)}></div>
                        <div className={styles.cdbcyyyPointer} style={this.getStyles('pointerColor')}></div>
                        <div className={styles.cdbcyyyButton} 
                            style={this.getStyles('yearSelectButton')}
                            onMouseEnter={e=>this.onBME(e, 'yearSelectButton')}  
                            onMouseLeave={e=>this.onBML(e, 'yearSelectButton')} 
                            onClick={()=> this.setYear(this.state.yearTemp)}>
                            <span className={styles.cdbcyyybCheck}></span>
                        </div>
                        <div ref={yearContainerRef} className={styles.cdbcyyyContainer + ' ' + styles.carbonDateScroll} onScroll={this.onYearScroll}>
                            {this.getAvailableYears().map((year, index)=> {
                                return <div className={styles.cdbcyyycItem} 
                                    onMouseEnter={()=>this.onYearMouseEnter(year)}
                                    onMouseLeave={this.onYearMouseLeave}
                                    key={index} 
                                    onClick={()=>this.setYear(year)}></div>
                            })}
                        </div>
                        <div ref={yearBodyRef} style={this.getYearBodyStyles()} className={styles.cdbcyyyBody}>
                            {this.getAvailableYears().map((year, index)=> {
                                return (
                                    <div className={styles.cdbcyyycItem + ' ' + (this.state.yearTemp === year ? styles.cdbcyyycItemActive : '')} 
                                        key={index}
                                        style={this.getStyles('yearListItem', 
                                            { hover: this.state.yearMouse === year, active: this.state.yearTemp === year})}>
                                        {year}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                ) : ''}
            </div>
        )
    }

    renderMonthWidget =()=> {
        return (
            <div className={styles.cdbcMonthWidget}>
                <div className={styles.cdbcmName} 
                    onMouseEnter={e=>this.onBME(e, 'month')}  
                    onMouseLeave={e=>this.onBML(e, 'month')} 
                    style={this.getStyles('month')}
                    onClick={()=>this.setMonthVisibility(true)}>
                    {this.monthMap[this.state.month-1]}
                </div>
                {this.state.showMonth ? (
                    <div className={styles.cdbcmMonths} style={this.getStyles('monthSelector')}>
                        <div className={styles.cdbcmmContainer}>
                            <div className={styles.cdbcmmBackdrop} onClick={()=>this.setMonthVisibility(false)}></div>
                            {this.monthMap.map((month, index)=> {
                                return (
                                    <div className={styles.cdbcmmcItem + ' ' + (this.state.month === index + 1 ? styles.cdbcmmcItemActive : '')} 
                                        key={index}>
                                        <span onClick={()=>this.selectMonth(index+1)}
                                            style={this.getStyles('monthSelectorButton', {active: this.state.month === index + 1})}
                                            onMouseEnter={e=>this.onBME(e, 'monthSelectorButton', {active: this.state.month === index + 1})}  
                                            onMouseLeave={e=>this.onBML(e, 'monthSelectorButton', {active: this.state.month === index + 1})}>
                                            {month.substr(0,3)}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                ) : ''}
            </div>
        )
    }

    renderDays =()=> {
        return this.state.monthDetails.map((day, index)=> {
            let active = this.isSelectedDay(day);
            let highlight = this.isCurrentDay(day); 
            return (
                <div className={styles.cdbcdbcDay + ' ' + 
                    (!day.valid ? styles.cdbcdbcDayDisabled : '')} 
                    key={index}>
                    {day.reminder && day.valid ? (
                        <div className={styles.cdbcdbcdReminder} style={{background: day.reminder.color}}></div>
                    ) : ''}
                    <span onClick={()=> this.selectDate(day)} 
                        onMouseEnter={e=>this.onBME(e, 'dateItem', {active, highlight}, e=> this.showReminder(day))}  
                        onMouseLeave={e=>this.onBML(e, 'dateItem', {active, highlight}, e=> this.hideReminder())}
                        style={this.getStyles('date', {day, active, highlight})}>{day.date}</span>
                </div>
            )
        })
    }

    renderCalendar =()=> {
        return this.state.showCalendar || this.state.alwaysShow ? (
            <div className={styles.cdBody} style={this.getStyles('background')}>
                <div className={styles.cdbCalendar}>
                    <div className={styles.cdbcYear}>
                        <div className={styles.cdbcyButton} 
                            onMouseEnter={this.onBME}  
                            onMouseLeave={this.onBML} 
                            style={this.getStyles('button')}
                            onClick={()=>this.changeYear(-1)}>
                            <span className={styles.cdbcybLeftArrow}></span>
                        </div>
                        <div className={styles.cdbcyName}>
                            {this.renderYearWidget()}
                        </div>
                        <div className={styles.cdbcyButton}  
                            onMouseEnter={this.onBME}  
                            onMouseLeave={this.onBML} 
                            style={this.getStyles('button')}
                            onClick={()=>this.changeYear(1)}>
                            <span className={styles.cdbcybRightArrow}></span>
                        </div>
                    </div>
                    <div className={styles.cdbcMonth}>
                        {this.renderMonthWidget()}
                    </div>
                    <div className={styles.cdbcDay}>
                        <div className={styles.cdbcdButton} 
                            onMouseEnter={this.onBME}  
                            onMouseLeave={this.onBML} 
                            style={this.getStyles('button')}
                            onClick={()=>this.changeMonth(-1)}>
                            <span className={styles.cdbcdbLeftArrow}></span>
                        </div>
                        <div className={styles.cdbcdBody}>
                            <div className={styles.cdbcdbHead}>
                                {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
                                    .map((d,i)=><div key={i} style={this.getStyles('dateHeader')} className={styles.cdbcdbhValue}>{d}</div>)}
                            </div>
                            <div className={styles.cdbcdbContainer}>
                                {this.renderDays()}
                            </div>
                        </div>
                        <div className={styles.cdbcdButton} 
                            onMouseEnter={this.onBME}  
                            onMouseLeave={this.onBML} 
                            style={this.getStyles('button')}
                            onClick={()=>this.changeMonth(1)}>
                            <span className={styles.cdbcdbRightArrow}></span>
                        </div>
                    </div>
                </div>
                {this.state.reminder ? (
                    <div className={styles.cdbReminder}>
                        <div className={styles.cdbrName} style={this.getStyles('reminderName')}>
                            <span className={styles.cdbrnTag} style={{background: this.state.reminder.reminder.color}}></span>
                            {this.getDateFormatedString(this.state.reminder.timestamp)}
                        </div>
                        <div className={styles.cdbrDesc} style={this.getStyles('reminderDesc')}>
                            {this.state.reminder.reminder.note}
                        </div>
                    </div>
                ) : ''}
            </div>
        ) : ''
    }

    render() {
        return (
            <div className={styles.CarbonDate + ' ' + (this.getTheme('squareEdge') ? (' ' + styles.CarbonDateSquareEdge) : '')}>
                <div className={styles.cdHead} style={this.getStyles('inputHead')}>
                    <div className={styles.cdhInputDate} >
                        <input type='date' 
                            style={this.getStyles('input')}
                            defaultValue={this.getDateString()}
                            ref={inputRef}  
                            onClick={()=>this.setCalendarVisibility(true)}
                            onChange={this.updateDateFromInput} 
                            className={styles.cdhiDay}/>
                    </div>
                </div>
                {this.renderCalendar()}
            </div>
        )
    }
}
