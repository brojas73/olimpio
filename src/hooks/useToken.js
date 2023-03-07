import { useState } from "react"

const useToken = () => {   
    const [token, setToken] = useState(getToken())

    function saveWithExpiry(key, value, ttl) {
        const now = new Date()
        const item = {
            value: value,
            expiry: now.getTime() + ttl
        }

        localStorage.setItem(key, JSON.stringify(item))
    }

    function getWithExpiry(key) {
        const itemStr = localStorage.getItem(key)

        // If the item doesn't exist, return null
        if (!itemStr) {
            return null
        }

        const item = JSON.parse(itemStr)
        const now = new Date()

        // If the item is expired
        if (now.getTime() > item.expiry) {
            // Remove it from local storage and return null
            localStorage.removeItem(key)
            return null
        }

        // If we got here is that the item is still valid
        return item.value
    }

    function getToken() {
        getWithExpiry('token')
    }

    function saveToken(userToken) {
        saveWithExpiry('token', userToken, 15 * 60 * 1000)
        setToken(userToken.token)
    }

    return {
        token,
        setToken: saveToken
    }
}

export default useToken
