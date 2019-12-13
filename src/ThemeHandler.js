export default class ThemeHandler {

    constructor({getThemeConfig}) {
        this.getThemeConfig = getThemeConfig;
    }

    getTheme =key=> {
        let keyArr = key.split('.'); 
        let currentValue = this.getThemeConfig();
        for(let idx in keyArr) {
            if(currentValue[keyArr[idx]] != null) {
                currentValue = currentValue[keyArr[idx]];
            } else {
                console.warn('Didnt found key', keyArr[idx], ' in ', key);
                currentValue = null;
                break;
            }
        }
        return currentValue != null ? currentValue : null;
    }

    getStyles =(elementKey, args)=> {
        switch(elementKey) {
            case 'input':
                return {
                    color: this.getTheme('input.color'),
                }

            case 'inputHead':
                return {
                    background: this.getTheme('input.background'),
                }
                
            case 'background':
                return {
                    background: this.getTheme('background')
                }

            case 'date':
                return {
                    opacity: args.day.valid ? 1 : this.getTheme('date.disabled.opacity'),
                    color: args.day.valid ? args.active ? this.getTheme('date.active.color') : args.highlight ?
                        this.getTheme('date.highlight.color') : this.getTheme('date.color'): 
                        this.getTheme('date.disabled.color'),
                    background: args.day.valid ? args.active ? this.getTheme('date.active.background') : args.highlight ?
                        this.getTheme('date.highlight.background') : this.getTheme('date.background'): 
                        this.getTheme('date.disabled.background'),
                }

            case 'dateHeader':
                return {
                    color: this.getTheme('dateHeaderColor')
                } 

            case 'yearSelectorBackground':
                return {
                    background: this.getTheme('yearGradient')
                }
            
            case 'yearListItem':
                return {
                    background: args.active && args.hover ? this.getTheme('year.selector.listItem.active.hover.background') : 
                        args.active ? this.getTheme('year.selector.listItem.active.background') : args.hover ? 
                        this.getTheme('year.selector.listItem.hover.background') : this.getTheme('year.selector.listItem.background'),
                    color: args.active && args.hover  ? this.getTheme('year.selector.listItem.active.hover.color') : 
                        args.active ? this.getTheme('year.selector.listItem.active.color') : args.hover ? 
                        this.getTheme('year.selector.listItem.hover.color') : this.getTheme('year.selector.listItem.color'),
                }
            
            case 'pointerColor': 
                return {
                    background: this.getTheme('year.selector.pointerColor')
                }

            case 'monthSelector':
                return {
                    background: this.getTheme('month.selector.background')
                }

            case 'button':
                return {
                    background: this.getTheme('button.background'),
                    color: this.getTheme('button.color'),
                    borderColor: this.getTheme('button.color')
                }

            case 'year':
                return {
                    background: this.getTheme('year.button.background'),
                    color: this.getTheme('year.button.color')
                }
            
            case 'month':
                return {
                    background: this.getTheme('month.button.background'),
                    color: this.getTheme('month.button.color')
                }

            case 'yearSelectButton':
                return {
                    background: this.getTheme('year.selector.button.background'),
                    color: this.getTheme('year.selector.button.color'),
                    borderColor: this.getTheme('year.selector.button.color')
                }
            
            case 'monthSelectorButton':
                return {
                    background: args.active ? this.getTheme('month.selector.button.active.background') :
                        this.getTheme('month.selector.button.background'),
                    color: args.active ? this.getTheme('month.selector.button.active.color') :
                        this.getTheme('month.selector.button.color')
                }

            case 'reminderName':
                return {
                    color: this.getTheme('reminder.headerColor')
                }

            case 'reminderDesc':
                return {
                    color: this.getTheme('reminder.descriptionColor')
                }
                        
            default:
                return {}
        }
    }
    

    onBME =(e, key='button', args={}, callback)=> {
        if(key === 'button') {
            e.target.style.color = this.getTheme('button.hover.color');
            e.target.style.borderColor = this.getTheme('button.hover.color');
            e.target.style.background = this.getTheme('button.hover.background');
        } else
        if(key === 'year') {
            e.target.style.color = this.getTheme('year.button.hover.color');
            e.target.style.background = this.getTheme('year.button.hover.background');
        } else 
        if(key === 'month') {
            e.target.style.color = this.getTheme('month.button.hover.color');
            e.target.style.background = this.getTheme('month.button.hover.background');
        } else 
        if(key === 'yearSelectButton') {
            e.target.style.color = this.getTheme('year.selector.button.hover.color');
            e.target.style.borderColor = this.getTheme('year.selector.button.hover.color');
            e.target.style.background = this.getTheme('year.selector.button.hover.background');
        } else 
        if(key === 'monthSelectorButton') {
            e.target.style.color = args.active ? this.getTheme('month.selector.button.active.hover.color') :
                this.getTheme('month.selector.button.hover.color');
            e.target.style.background = args.active ? this.getTheme('month.selector.button.active.hover.background') :
                this.getTheme('month.selector.button.hover.background');
        } else 
        if(key === 'dateItem') {
            e.target.style.color = args.active ? this.getTheme('date.active.hover.color') : args.highlight ?
                this.getTheme('date.highlight.hover.color') :
                this.getTheme('date.hover.color');
            e.target.style.background = args.active ? this.getTheme('date.active.hover.background') : args.highlight ?
                this.getTheme('date.highlight.hover.background') :
                this.getTheme('date.hover.background');
        }
        if(callback)
            callback(e);
    }


    onBML =(e, key='button', args={}, callback)=> {
        if(key === 'button') {
            e.target.style.color = this.getTheme('button.color');
            e.target.style.borderColor = this.getTheme('button.color');
            e.target.style.background = this.getTheme('button.background');
        }
        if(key === 'year') {
            e.target.style.color = this.getTheme('year.button.color');
            e.target.style.background = this.getTheme('year.button.background');
        } else 
        if(key === 'month') {
            e.target.style.color = this.getTheme('month.button.color');
            e.target.style.background = this.getTheme('month.button.background');
        } else 
        if(key === 'yearSelectButton') {
            e.target.style.color = this.getTheme('year.selector.button.color');
            e.target.style.borderColor = this.getTheme('year.selector.button.color');
            e.target.style.background = this.getTheme('year.selector.button.background');
        } else 
        if(key === 'monthSelectorButton') {
            e.target.style.color = args.active ? this.getTheme('month.selector.button.active.color') :
                this.getTheme('month.selector.button.color');
            e.target.style.background = args.active ? this.getTheme('month.selector.button.active.background') :
                this.getTheme('month.selector.button.background');
        } else 
        if(key === 'dateItem') {
            e.target.style.color = args.active ? this.getTheme('date.active.color') : args.highlight ?
                this.getTheme('date.highlight.color') :
                this.getTheme('date.color');
            e.target.style.background = args.active ? this.getTheme('date.active.background') : args.highlight ?
                this.getTheme('date.highlight.background') :
                this.getTheme('date.background');
        }
        if(callback)
            callback(e);
    }
}