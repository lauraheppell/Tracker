import "./App.css";
import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import 'date-fns';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import MomentUtils from '@date-io/moment'
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';



const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

const marks = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 30,
    label: '30m',
  },
  {
    value: 60,
    label: '1h',
  },
  {
    value: 90,
    label: '1.5h',
  },
  {
    value: 120,
    label: '2h',
  },
  {
    value: 150,
    label: '2.5h',
  },
  {
    value: 180,
    label: '3h',
  },
];
function valuetext(value) {
  return `${value}°C`;
}

function getSteps() {
  return ['Enter date', 'Select activity', 'Enter time spent on activity'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <MyDatePicker></MyDatePicker>;
    case 1:
      return <MyActivityPicker></MyActivityPicker>;
    case 2:
      return <MyTimeSelector></MyTimeSelector>;
    default:
      return 'Unknown step';
  }
}

function MyDatePicker(props){
  const [selectedDate, setSelectedDate] = React.useState(new Date('2021-03-18T21:11:54'));
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return (
<MuiPickersUtilsProvider utils={MomentUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/DD/YYYY"
            margin="normal"
            id="date-picker-inline"
            label="Date picker inline"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
             'aria-label': 'change date',
           }}>
          </KeyboardDatePicker>
         </MuiPickersUtilsProvider> 
  )
}

function MyActivityPicker(props){
  const [value, setValue] = React.useState('female');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
<FormControl component="fieldset">
      <FormLabel component="legend">Activity</FormLabel>
      <RadioGroup aria-label="activity" name="activity1" value={value} onChange={handleChange}>
        <FormControlLabel value="codewars" control={<Radio />} label="CodeWars" />
        <FormControlLabel value="videoproject" control={<Radio />} label="Video Project" />
        <FormControlLabel value="codingtracker" control={<Radio />} label="Coding Tracker" />
        <FormControlLabel value="grocerysplit" control={<Radio />} label="Grocery Split" />
        <FormControlLabel value="freecodecamp" control={<Radio />} label="Free Code Camp" />
        <FormControlLabel value="other"  control={<Radio />} label="Other" />
      </RadioGroup>
    </FormControl>
  )
}

function MyTimeSelector(props){
  const classes = useStyles();

  return (
<div className={classes.root}>
      <Typography id="discrete-slider" gutterBottom>
        Time
        </Typography>
      <Slider
        defaultValue={0}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        step={5}
        marks={marks}
        min={0}
        max={180}
        valueLabelDisplay="auto"/>
        
</div>
  )
}

function App() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div>
      <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepContent(index)}</Typography>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
    </div>
     
      <div class="parent">
        <div class="child inline-block-child no-dashes">
          <h2> Coding practice: </h2>

          <p>Total days: </p>
          <p>Total time: </p>
          <p>Percent spent on each activity: </p>
        </div>
        
      </div>
    </div>
  );
}

export default App;
