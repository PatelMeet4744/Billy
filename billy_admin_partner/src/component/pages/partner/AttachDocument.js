import FirstStep from './firstStep';
import SecondStep from './secondStep';
import ThirdStep from './thirdStep';
import FourStep from './fourStep';
import { Stepper, StepLabel, Step, makeStyles } from '@material-ui/core';
import { multiStepContext } from '../../../stepcontext';
import { useContext } from 'react';
import React from 'react'

function AttachDocument() {

  const useStyles = makeStyles(() => ({
    root: {
      "& .MuiStepIcon-active": { color: "#f6881f" },
      "& .MuiStepIcon-completed": { color: "green" },
      "& .Mui-disabled .MuiStepIcon-root": { color: "gray" }
    }
  }));
  const c = useStyles();
  const { currentStep, finalData } = useContext(multiStepContext);

  function showStep(step) {
    switch (step) {
      case 1:
        return <FirstStep />
      case 2:
        return <SecondStep />
      case 3:
        return <ThirdStep />
      case 4:
        return <FourStep />
    }
  }
  return (
    <div>
       <center>
       <div style={{ margin: 2}}>
        <Stepper style={{ width: '50%'}} className={c.root} activeStep={currentStep - 1} orientation="horizontal">
          <Step>
            <StepLabel>Documnets</StepLabel>
          </Step>
          <Step>
            <StepLabel>Timing</StepLabel>
          </Step>
          <Step>
            <StepLabel>Cuisines</StepLabel>
          </Step>
        </Stepper>
        </div>
      </center>
      {showStep(currentStep)}
    </div>
  )
}

export default AttachDocument;
