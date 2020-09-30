import React from 'react'

import './NewPlace.css'
import Input from '../../shared/components/FormElement/Input'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/Validators'
import Button from '../../shared/components/FormElement/Button'
import {  useForm } from '../../shared/hooks/form-hook'

const NewPlace = () => { 

    const [formState, inputHandler] = useForm({
        title:{
            value: '',
            isValid: false
        },
        description:{
            value: '',
            isValid: false
        },
        address: {
            value: '',
            isValid: false
        }
    }, false)

    const onSubmitHandler = event => {
        event.preventDefault()
        console.log(formState)
    }

    return (
        <form className="place-form">
            <Input 
                id="title"
                element="input" 
                type="text" 
                label="Title" 
                errorText="Enter valid input!!!"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
            />
            <Input 
                id="description"
                element="textarea" 
                type="text" 
                label="Description" 
                errorText="Enter valid description (min 5 character)"
                validators={[VALIDATOR_MINLENGTH(5)]}
                onInput={inputHandler}
            />
            <Input 
                id="address"
                element="input" 
                type="text" 
                label="Address" 
                errorText="Enter valid address"
                validators={[VALIDATOR_MINLENGTH(5)]}
                onInput={inputHandler}
            />
            <Button 
                type='submit' 
                disabled={!formState.isValid}
                onClick={onSubmitHandler}
            >
                Add Place
            </Button> 
        </form>
    )
}

export default NewPlace 