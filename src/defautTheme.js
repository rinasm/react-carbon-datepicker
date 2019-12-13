export default {
    default: {
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
                // background: '#c1e2c0',
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
    }, 

    /**
     * 
     *  Dark Theme
     * 
     */

    dark: {
        squareEdge: false,
        background: '#333',
        dateHeaderColor: '#aaa',
        button: {
            background: '#333',
            color: '#999',
            hover: {
                background: '#444',
                color: '#fff',
            }
        },
        input: {
            background: '#333',
            color: '#ccc',
        },
        year: {
            selector: {
                background: '#333',
                pointerColor:'#66af63',
                listItem: {
                    background: 'transparent',
                    color: '#aaa',
                    hover: {
                        background: 'transparent',
                        color: '#fff',
                    },
                    active: {
                        background: 'transparent',
                        color: '#fff',
                        hover: {
                            background: 'transparent',
                            color: '#fff',
                        },
                    }
                },
                button: {
                    background: '#333',
                    color: '#ccc',
                    hover: {
                        background: '#444',
                        color: '#fff',
                    }
                },
            },
            button: {
                background: '#333',
                color: '#ccc',
                hover: {
                    background: '#444',
                    color: '#fff',
                }
            },
        },
        month: {
            button: {
                background: '#333',
                color: '#ccc',
                hover: {
                    background: '#444',
                    color: '#fff',
                }
            },
            selector: {
                background: 'rgba(60,60,60,0.8)',
                button: {
                    background: '#555',
                    color: '#bbb',
                    hover: {
                        background: '#666',
                        color: '#fff',
                    },
                    active: {
                        background: '#66af63',
                        color: '#fff',
                        hover: {
                            background: '#79d075',
                            color: '#fff',
                        },
                    }
                }
            }
        },
        date: {
            background: 'transparent',
            color: '#ccc',
            hover: {
                background: '#444',
                color: '#fff',
            },
            active: {
                background: '#66af63',
                color: '#fff',
                hover: {
                    background: '#66af63',
                    color: '#fff',
                }
            },
            highlight: {
                background: '#8c5f34',
                color: '#ccc',
                hover: {
                    background: '#ab7541',
                    color: '#fff',
                }
            },
            disabled: {
                opacity: 0.4,
                color: '#ccc',
                background: 'transparent'
            }
        },
        reminder: {
            headerColor: '#ccc',
            descriptionColor: '#aaa' 
        }
    }
}