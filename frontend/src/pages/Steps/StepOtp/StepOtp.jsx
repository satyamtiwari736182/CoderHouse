import React, { useState } from 'react'
import Button from '../../../components/shared/Button/Button';
import Card from '../../../components/shared/Card/Card';
import TextInput from '../../../components/shared/TextInput/TextInput';
import styles from './StepOtp.module.css'
import { verifyOtp } from '../../../http';
import { useSelector, useDispatch } from 'react-redux'
import { setAuth } from '../../../store/authSlice';

const StepOtp = ({ onNext }) => {
    const [otp, setOtp] = useState('');
    const { phone, hash } = useSelector((state) => state.auth.otp)
    const dispatch = useDispatch();
    async function submit() {
        if (!otp || !phone || !hash) return
        try {
            const { data } = await verifyOtp({ otp, phone, hash })
            console.log(data);
            dispatch(setAuth(data))
            // onNext()
        } catch (err) {
            console.log(err)
        }

    }
    return (
        <div className={styles.cardWrapper}>
            <div>
                <Card title="Enter the code we just texted you." icon="lock-emoji">
                    <TextInput value={otp} onChange={(e) => setOtp(e.target.value)} />
                    <div>
                        <div className={styles.actionButtonWrap} >
                            <Button onClick={submit} text="Next" />
                        </div>
                        <p className={styles.bottomParagraph}>
                            By entering your Number,you’re agreeing to or Terms of Service and Privacy Policy. Thanks!
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default StepOtp
