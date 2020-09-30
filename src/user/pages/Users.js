import React, { useEffect, useState } from 'react'

import UserList from '../components/UserList'
import ErrorModel from '../../shared/components/UIElement/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElement/LoadingSpinner'

const Users = () => {
    
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()
    const [users, setUsers] = useState()

    useEffect(() => {
        const getUsers = async () => {
            setIsLoading(true)
            try {
                const response = await fetch('http://localhost:5000/api/user/')

                const responseData = await response.json()

                if(!response.ok) {
                    throw new Error(responseData.message)
                }

                setUsers(responseData.users)

            } catch(err) {
                setError(err.message)
            }
            setIsLoading(false)
        }
        getUsers();
    }, [])

    const ErrorHandler = () => {
        setError(false)
    }

    return (
        <React.Fragment>
            <ErrorModel error={error} onClear={ErrorHandler}/>
            {isLoading && 
                <div className="center">
                    <LoadingSpinner/>
                </div> 
            }
            {!isLoading && users && <UserList item ={users}/>}
        </React.Fragment>
    )
}
export default Users







