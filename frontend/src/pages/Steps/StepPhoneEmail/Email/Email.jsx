import React, { useState } from 'react'
import Button from '../../../../components/shared/Button/Button'
import Card from '../../../../components/shared/Card/Card'
import TextInput from '../../../../components/shared/TextInput/TextInput'
import styles from '../StepPhoneEmail.module.css'


const Email = ({ onNext }) => {
    const [email, setEmail] = useState('');
    return (
        <Card title="Enter your Email" icon="email-emoji">
            <TextInput value={email} onChange={(e) => setEmail(e.target.value)} />
            <div>
                <div className={styles.actionButtonWrap}>
                    <Button onClick={onNext} text="Next" />
                </div>
                <p className={styles.bottomParagraph}>
                    By entering your Email,you’re agreeing to or Terms of Service and Privacy Policy. Thanks!
                </p>
            </div>
        </Card>
    )
}

export default Email
