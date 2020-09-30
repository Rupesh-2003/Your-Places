import React from "react"

import './UserList.css'
import Card from '../../shared/components/UIElement/Card'
import UserItem from './UserItem'

const UserList = props => {
    if(props.item.length === 0) {
        return (
            <div className="center">
                <Card>
                    <h2><center>Users not found</center></h2>
                </Card>
            </div>
        );
    }
    return <ul className="users-list"> 
        {props.item.map(user => {
            return <UserItem 
            key = {user.id} 
            id={user.id} 
            image={user.image} 
            name={user.name} 
            placeCount={user.places.length} />
        })}
    </ul>
}

export default UserList