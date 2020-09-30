import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import  './UpdatePlace.css'
import  Input from '../../shared/components/FormElement/Input'
import  Button from '../../shared/components/FormElement/Button'
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH} from '../../shared/util/Validators'
import { useForm } from '../../shared/hooks/form-hook'
import Card from '../../shared/components/UIElement/Card'

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
            lat: 40.7484 ,
            lng: -73.9857
        },
        creator: 'u2'
    }
]

const UpdatePlace = () => {
    const placeid = useParams().placeId

    const [isLoading, setIsLoading ] = useState(true)

    const [formState, inputHandler, setForm] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        }
    }, false)

    const requiredPlace = PLACES.find(place => place.id === placeid)

    useEffect(() => {
        if(requiredPlace) {
            setForm({
                title: {
                    value: requiredPlace.title,
                    isValid: true
                },
                description: {
                    value: requiredPlace.description,
                    isValid: true
                }
            }, true)
        }
        setIsLoading(false)
    }, [setForm, requiredPlace])
    
    if(!requiredPlace) {
        return (
            <Card className="not-found">
                <h2 >Could not find Place !!!</h2>
            </Card>
        );
    }

    const onSubmitHandler = event => {
        event.preventDefault()
        console.log(formState.inputs)
    }

    if(isLoading) {
        return <h1>loading...</h1>
    }

    return (
        <form className="place-form" onSubmit={onSubmitHandler}>
            <Input 
                id="title"
                element="input" 
                type="text" 
                label="Title" 
                errorText="Enter valid input!!!"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}                
                value={formState.inputs.title.value}
                valid={formState.inputs.title.isValid}
            />
            <Input 
                id="description"
                element="textarea" 
                type="text" 
                label="Description" 
                errorText="Enter valid description (min 5 character)"
                validators={[VALIDATOR_MINLENGTH(5)]}
                onInput={inputHandler}
                value={formState.inputs.description.value}
                valid={formState.inputs.description.isValid}
            />
            <Button 
                type="submit" 
                disabled={!formState.isValid}
            >
                Update Place
            </Button>
        </form>
    );
}

export default UpdatePlace 