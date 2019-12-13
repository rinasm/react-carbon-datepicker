# react-carbon-datepicker

> An Awesome flexible date picker | Fully Customizable Color Theme | Light weight | opensource | No MomentJS | No other dependancies | Notes / Reminders

[![NPM](https://img.shields.io/npm/v/react-carbon-datepicker.svg)](https://www.npmjs.com/package/react-carbon-datepicker) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-carbon-datepicker
```

## [Demo](http://react-carbon-datepicker.rinas.in/)

This is a [demo](http://react-carbon-datepicker.rinas.in/) of react-carbon-datepicker


## Usage

```jsx
import React, { Component } from 'react'

import CarbonDatePicker from 'react-carbon-datepicker'

class Example extends Component {
  render () {
    return (
      <CarbonDatePicker onChange={this.onChange} config={this.config}/>
    )
  }
}
```

# Props

### date

The default date, should be passed in this format - 'yyyy-mm-dd'. example - '2019-12-23'

### config

The Configuration for the date picker

| Prop         | Defenition                                                            | Data type |
|--------------|-----------------------------------------------------------------------|-----------|
| alwaysShow   | If passed as true, The DatePicker will be always on the visible state | boolean   |
| showCalendar | If passed as true, The DatePicker will be on visible state initially  | boolean   |
| themePreset  | To set the default theme, 'dark' and 'default' is available           | string    |
| reminders    | Array of reminder objects                                             | array     |
| theme        | Theme config object                                                   | object    |

### config.reminders

The Reminders / Notes that will show in the given date

| Prop      | Defenition                                       | Data Type |
|-----------|--------------------------------------------------|-----------|
| note      | The text which will be displayed as the reminder | string    |
| color     | The color of the tag of reminder                 | string    |
| timestamp | The timestamp of the day                         | int       |

### config.theme

Theme for the DatePicker

```
{
        squareEdge: false,
        background: '#fff',
        dateHeaderColor: '#777',
        button: {
            background: '#fff',
            color: '#999',
            hover: {
                background: '#f9f9f9',
                color: '#555',
            }
        },
        input: {
            background: '#f4f4f4',
            color: '#555',
        },
        year: {
            selector: {
                background: '#fff',
                pointerColor: 'rgba(0,0,0,0.03)',
                listItem: {
                    background: 'transparent',
                    color: '#999',
                    hover: {
                        background: 'transparent',
                        color: '#333',
                    },
                    active: {
                        background: 'transparent',
                        color: '#333',
                        hover: {
                            background: 'transparent',
                            color: '#222',
                        },
                    }
                },
                button: {
                    background: '#fff',
                    color: '#999',
                    hover: {
                        background: '#f9f9f9',
                        color: '#555',
                    }
                },
            },
            button: {
                background: '#fff',
                color: '#555',
                hover: {
                    background: '#f9f9f9',
                    color: '#222',
                }
            },
        },
        month: {
            button: {
                background: '#fff',
                color: '#555',
                hover: {
                    background: '#f9f9f9',
                    color: '#222',
                }
            },
            selector: {
                background: 'rgba(255,255,255,0.95)',
                button: {
                    background: 'transparent',
                    color: '#777',
                    hover: {
                        background: '#f5f5f5',
                        color: '#444',
                    },
                    active: {
                        background: '#c1e2c0',
                        color: '#555',
                        hover: {
                            background: '#b0d8af',
                            color: '#444',
                        },
                    }
                }
            }
        },
        date: {
            background: 'transparent',
            color: '#555',
            hover: {
                background: '#f9f9f9',
                color: '#333',
            },
            active: { 
                background: '#ed1f4f',
                color: '#fff',
                hover: {
                    background: '#ed1f4f',
                    color: '#fff',
                }
            },
            highlight: {
                background: '#fde1e7',
                color: '#333',
                hover: {
                    background: '#fde1e7',
                    color: '#333',
                }
            },
            disabled: {
                opacity: 0.4,
                color: '#555',
                background: 'transparent'
            }
        },
        reminder: {
            headerColor: '#666',
            descriptionColor: '#999' 
        }
    }
```

## License

MIT © [rinasm](https://github.com/rinasm)
