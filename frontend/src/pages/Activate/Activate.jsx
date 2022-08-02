import React, { useState } from 'react'
import stepName from '../Steps/StepName/StepName'
import stepAvator from '../Steps/StepAvatar/StepAvatar'

const steps = {
    1: stepName,
    2: stepAvator
}

const Activate = () => {
    const [step, setStep] = useState(1)
    const Step = steps[step];
    function onNext() {
        setStep(step + 1)
    }
    return (
        <div>
            <Step onNext={onNext}></Step>
        </div>
    )
}

export default Activate
