import React from 'react'

const StepUserName = ({onNext}) => {
    return (
        <div>
            <h1>Step User Name</h1>
            <button onClick={onNext}>Next</button>
        </div>
    )
}

export default StepUserName
