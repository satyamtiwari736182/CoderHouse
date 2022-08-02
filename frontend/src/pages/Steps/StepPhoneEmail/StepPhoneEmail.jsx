import React, { useState } from 'react'
import Email from './Email/Email'
import Phone from './Phone/Phone'
import styles from './StepPhoneEmail.module.css'

const phoneEmailMap = {
    phone: Phone,
    email: Email,

}
const StepPhoneEmail = ({ onNext }) => {
    const [type, setType] = useState('phone')
    const Component = phoneEmailMap[type]
    return (
        <React.Fragment>
            <div className={styles.cardWrapper}>
                <div>
                    <div className={styles.buttonWrapper}>

                        <button className={`${styles.tabButton} ${type === 'phone' ? styles.active : ''}`} onClick={() => setType('phone')}>
                            <img src="/images/phone-white.png" alt="Phone" />
                        </button>
                        <button className={`${styles.tabButton} ${type === 'email' ? styles.active : ''}`} onClick={() => setType('email')}>
                            <img src="/images/mail_white.png" alt="Email" />
                        </button>
                    </div>
                    <Component onNext={onNext} />
                </div>
            </div>

        </React.Fragment>
    )
}

export default StepPhoneEmail
