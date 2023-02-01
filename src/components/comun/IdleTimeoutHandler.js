import { useEffect, useState } from "react"
import moment from 'moment'
import IdleTimeoutModal from "./IdleTimeoutModal"
import { Navigate, useNavigate } from "react-router-dom"

const IdleTimeoutHandler = (props) => {
    let timer = undefined
    const navigate = useNavigate()
    const [isLogout, setIsLogout] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const events = ['click', 'scroll', 'load', 'keydown']
    
    function eventHandler(eventType) {
        localStorage.setItem('lastInteractionTime', moment())
        if (timer) {
            props.onActive()
            startTimer()
        }
    }

    useEffect(() => {
        addEvents()

        return (() => {
            removeEvents()
            clearTimeout(timer)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function startTimer() {
        if (timer) {
            clearTimeout(timer)
        }

        timer = setTimeout(() => {
            const lastInteractionTime = localStorage.getItem('lastInteractionTime')
            const diff = moment.duration(moment().diff(moment(lastInteractionTime)))
            const timeOutInterval = (props.timeOutInterval ? props.timeOutInterval : 60000)

            if (isLogout) {
                clearTimeout(timer)
            } else {
                if (diff.milliseconds < timeOutInterval) {
                    startTimer()
                    props.onActive()
                } else {
                    props.onIdle()
                    setShowModal(true)
                }
            }
        }, props.timeOutInterval ? props.timeOutInterval : 60000)
    }

    function addEvents() {
        events.forEach(eventName => {
            window.addEventListener(eventName, eventHandler)
        })

        startTimer()
    }

    function removeEvents() {
        events.forEach(eventName => {
            window.removeEventListener(eventName, eventHandler)
        })
    }

    function handleContinueSession() {
        setShowModal(false)
        setIsLogout(false)
    }

    function handleLogout() {
        console.log('IdleTimeoutHandler.handleLogout()')
        removeEvents()
        clearTimeout(timer)
        setIsLogout(true)
        props.onLogout()
        setShowModal(false)
        navigate(props.onLogoutURL)
    }

    return (
        <div>
            <IdleTimeoutModal showModal={showModal} handleContinue={handleContinueSession} handleLogout={handleLogout}/>
        </div>
    )
}

export default IdleTimeoutHandler
