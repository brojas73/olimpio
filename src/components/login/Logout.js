import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const Logout = () => {
    const { logout } = useAuth()

    logout()

    return (
        <Navigate to='/login' />
    )
}

export default Logout
