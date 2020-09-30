import React, { useState } from 'react'

import './Auth.css'
import Card from '../../shared/components/UIElement/Card'
import Button from '../../shared/components/FormElement/Button'
import Input from '../../shared/components/FormElement/Input'
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/Validators'
import { useForm } from '../../shared/hooks/form-hook'

const Auth = () => {

    const [isLoginMode, setLoginMode] = useState(true)

    const [formState, inputHandler] = useForm({
        email:{
            value: '',
            isValid: false
        },
        password:{
            value:'',
            isValid: false
        }
    }, false)

    const onLoginHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
    }

    const switchModeHandler = () => {
        console.log("changed to ");
        setLoginMode(prevMode => !prevMode)
       
    };

    return (
        <Card className="authentication">
            <h2>Login</h2>
            <hr></hr>
            <form onSubmit = {onLoginHandler}>
                {!isLoginMode && (
                    <Input
                        element="input"
                        id="name"
                        type="text"
                        label="Your Name"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Enter valid text"
                        onInput={inputHandler}
                    />
                )}
                <Input
                    element="input"
                    id="email"
                    type="email"
                    label="E-Mail"
                    validators={[VALIDATOR_EMAIL()]}
                    errorText="Please enter valid E-Mail..."
                    onInput={inputHandler}
                >
                </Input>
                <Input
                    element="input"
                    id="password"
                    type="password"
                    label="Password"
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText="Password must be more than 4 Characters..."
                    onInput={inputHandler}
                >
                </Input>
                <Button 
                    type="submit" 
                    disabled={!formState.isValid}
                >
                    {isLoginMode ? 'Login' : 'Sign-Up'}
                </Button>
            </form>
            <Button 
                inverse 
                onClick={switchModeHandler}
            >
                Switch to {isLoginMode ? 'Sign-Up' : 'Login'}
            </Button>
        </Card>
    )
}

export default Auth