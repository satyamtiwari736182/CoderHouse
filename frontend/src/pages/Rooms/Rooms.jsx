import React, { useState } from 'react'
import AddRoomModal from '../../components/AddRoomModal/AddRoomModal'
import RoomCard from '../../components/RoomCard/RoomCard'
import styles from './Rooms.module.css'

const rooms = [
    {
        id: 1,
        topic: 'which framework best for frontend',
        speakers: [
            {
                id: 1,
                name: 'John Doe',
                avatar: '/images/monkey-avatar.png'
            },
            {
                id: 2,
                name: 'John Doe',
                avatar: '/images/monkey-avatar.png'
            }
        ],
        totalPeople: 40
    },

    {
        id: 2,
        topic: 'which framework best for frontend',
        speakers: [
            {
                id: 1,
                name: 'John Doe',
                avatar: '/images/monkey-avatar.png'
            },
            {
                id: 2,
                name: 'John Doe',
                avatar: '/images/monkey-avatar.png'
            }
        ],
        totalPeople: 30
    },

    {
        id: 3,
        topic: 'which framework best for frontend',
        speakers: [
            {
                id: 1,
                name: 'John Doe',
                avatar: '/images/monkey-avatar.png'
            },
            {
                id: 2,
                name: 'John Doe',
                avatar: '/images/monkey-avatar.png'
            }
        ],
        totalPeople: 20
    },

    {
        id: 4,
        topic: 'which framework best for frontend',
        speakers: [
            {
                id: 1,
                name: 'John Doe',
                avatar: '/images/monkey-avatar.png'
            },
            {
                id: 2,
                name: 'John Doe',
                avatar: '/images/monkey-avatar.png'
            }
        ],
        totalPeople: 20
    }
]

const Rooms = () => {
    const [showModal, setShowModal] = useState(false);
    function openModal() {
        setShowModal(true)
    }
    return (
        <React.Fragment>

            <div className='container'>
                <div className={styles.roomsHeader}>

                    <div className={styles.left}>
                        <span className={styles.heading}>All voice room</span>
                        <div className={styles.searchBox}>
                            <img src="/images/search-icon.png" alt="search" />
                            <input type="text" className={styles.searchInput} />
                        </div>
                    </div>

                    <div className={styles.right}>
                        <button onClick={openModal} className={styles.startRoomButton}>
                            <img src="/images/add-room-icon.png" alt="add-room" />
                            <span>Start a room</span>
                        </button>
                    </div>

                </div>

                <div className={styles.roomList}>
                    {
                        rooms.map((room) => (
                            <RoomCard key={room.id} room={room} />
                        ))}
                </div>

            </div>
            {showModal && <AddRoomModal onClose={() => setShowModal(false)} />}
        </React.Fragment>
    )
}

export default Rooms
