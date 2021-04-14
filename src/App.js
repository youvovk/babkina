import React, { useState } from 'react';
import './App.scss';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '90vw',
      marginTop: '50px',
    },
  },
  apply: {
    width: 'fit-content',
    position: 'absolute',
    height: '50px',
    fontSize: '18px',
    right: '-275px',
    top: '36%',
  }
}));

function genCharArray() {
  return 'бвгґджзклмнпрстфхцчшщйаеєиіїоуюяь'.split('').sort();
}

function App() {
  const classes = useStyles();
  const [text, setText] = useState('');
  const [results, setResults] = useState([]);
  const [record, setRecord] = useState(Infinity);
  const [value, setValue] = useState('');

  return (
    <div className="page">
      <div className="alphabet">
        {genCharArray().map(letter => (
          <div 
            className={`alphabet__letter ${text.toLocaleLowerCase().includes(letter) ? 'alphabet__letter--active' : ''}`}
          >
            {letter}
          </div>
        ))}

        {genCharArray().filter(letter => !text.toLocaleLowerCase().includes(letter)).length < 1
            ? (
                <Button onClick={() => {
                  if (text.split(' ').length <= record) {
                    setRecord(text.split(' ').length);
                  }

                  setResults([...results, text]);
                  setText('');
                  setValue('');
                }} className={classes.apply} variant="contained" color="primary">
                  Зберегти результат!
                </Button>
              ) 
          : ''
        }
      </div>

      <form className={classes.root} noValidate autoComplete="off">
        <TextField value={value} id="standard-basic" label="Standard" onChange={event => {
          setText(event.target.value.replace(/\s\s+/g, ' ').replace(/^\s/g, '').replace(/\s+$/g, ''))
          setValue(event.target.value);
        }} />
      </form>

      <div className="bottom">
        <div className="header">
          <p className="results__title">Попередні результати:</p>
          <p className="used">Використано слів: <span>{text.length ? text.split(' ').length : 0}</span></p>
        </div>
        <div className="results">{results.map(result => {
          return <p className="result">{result} <span>(слів: {result.split(' ').length}) {record === Infinity || record >= result.split(' ').length ? 'Кращий результат!' : ''}</span></p>
        })}</div>
      </div>
    </div>
  );
}

export default App;
