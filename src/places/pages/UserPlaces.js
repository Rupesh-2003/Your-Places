import React from 'react'

import PlaceList from '../components/PlaceList'
import { useParams } from 'react-router-dom'

const PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrappers in the world',
        imageUrl: 'https://images.pexels.com/photos/2190283/pexels-photo-2190283.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        address: '20 W 34th St, New York, NY 10001, United States',
        location: {
            lat: 40.7484,
            lng: -73.9857
        },
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrappers in the world',
        imageUrl: 'https://images.pexels.com/photos/2190283/pexels-photo-2190283.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        address: '20 W 34th St, New York, NY 10001, United States',
        location: {
            lat: 19.2740343,
            lng: 72.8689977
        },
        creator: 'u2'
    }
]

const UserPlaces = () => {
    const userId = useParams( ).userId ; 
    const loadedItem = PLACES.filter(places => places.creator === userId);
    return <PlaceList item={loadedItem}/>;
};

export default UserPlaces