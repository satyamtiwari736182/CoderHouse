import React, { useState } from 'react'
import Button from '../../../components/shared/Button/Button'
import Card from '../../../components/shared/Card/Card'
import TextInput from '../../../components/shared/TextInput/TextInput'
import styles from './StepName.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { setName } from '../../../store/activateSlice'
const StepName = ({ onNext }) => {
    const { name } = useSelector((state) => state.activate)
    const [fullname, setFullName] = useState(name)
    const dispatch = useDispatch()
    function nextStep() {
        if (!fullname) return;
        dispatch(setName(fullname))
        onNext();

    }
    return (
        <React.Fragment>
            <div className={styles.cardWrapper}>
                <div>
                    <Card title="What's your full name?" icon="moj">
                        <TextInput value={fullname} onChange={(e) => setFullName(e.target.value)} />

                        <p className={styles.bottomParagraph}>
                            People uses real names at CoderHouse :) !
                        </p>
                        <div className={styles.actionButtonWrap} >
                            <Button onClick={nextStep} text="Next" />
                        </div>
                    </Card>
                </div>
            </div>
        </React.Fragment>
    )
}

export default StepName
