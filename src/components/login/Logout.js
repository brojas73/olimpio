import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const Logout = ({onLogout}) => {
    const { logout } = useAuth()

    logout()
    onLogout()

    return (
        <Navigate to='/login' />
    )
}

export default Logout
