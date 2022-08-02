import React, { useState } from 'react'
import Button from '../../../components/shared/Button/Button'
import Card from '../../../components/shared/Card/Card'
import styles from './StepAvatar.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { setAvatar, setName } from '../../../store/activateSlice'
import { activate } from '../../../http'
import { setAuth } from '../../../store/authSlice'
import Loader from '../../../components/shared/Loading/Loader'

const StepAvatar = ({ onNext }) => {
    const dispatch = useDispatch();
    const { name, avatar } = useSelector((state) => state.activate)
    const [image, setImage] = useState('/images/user-pic.png')
    const [loading, setLoading] = useState(false)
    function captureImage(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            // console.log(reader.result)
            setImage(reader.result)
            dispatch(setAvatar(reader.result))
        }
        // console.log(e);
    }
    async function submit() {
        if (!name || !avatar) return
        setLoading(true)
        try {
            const { data } = await activate({ name, avatar })
            console.log(data);
            if (data.auth)
                dispatch(setAuth(data))
            // onNext()
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false)
        }
    }
    return (
        loading ? <Loader message="Activation in progress..." /> :
            <React.Fragment>
                <div className={styles.cardWrapper}>
                    <Card title={`okay, ${name}`} icon="monkey-Emoji">
                        <p className={styles.subHeading}>How's this photo? {name}</p>

                        <div className={styles.avatarWrapper}>
                            <img className={styles.avatarImage} src={image} alt="User-pic" />
                        </div>

                        <div>
                            <input onChange={captureImage} id="avatarInput" className={styles.avatarInput} type="file" />
                            <label className={styles.avatarLable} htmlFor="avatarInput">
                                Choose a different Photo
                            </label>
                        </div>

                        <div>
                            <Button onClick={submit} text="Next" />
                        </div>
                    </Card>
                </div>
            </React.Fragment>
    )
}

export default StepAvatar

