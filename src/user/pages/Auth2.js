import React, { useState, useContext } from 'react'

import './Auth.css'
import Card from '../../shared/components/UIElement/Card'
import Button from '../../shared/components/FormElement/Button'
import ErrorModal from '../../shared/components/UIElement/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElement/LoadingSpinner'
import Input from '../../shared/components/FormElement/Input'
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from '../../shared/util/Validators'
import { useForm } from '../../shared/hooks/form-hook'
import { AuthContext } from '../../shared/contexts/auth-context'

const Auth = () => {

    const auth = useContext(AuthContext)

    const [isLoginMode, setLoginMode] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()

    const [formState, inputHandler, formData] = useForm({
        email:{
            value: '',
            isValid: false
        },
        password:{
            value:'',
            isValid: false
        }
    }, false)

    const onLoginHandler = async event => {
        event.preventDefault();
        setIsLoading(true)

        if(isLoginMode){
            try{
                const response = await fetch('http://localhost:5000/api/user/login', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        password: formState.inputs.password.value,
                        email: formState.inputs.email.value
                    })
                })
                const data = await response.json()
                if(!response.ok) {
                    throw new Error(data.message)
                }
                setIsLoading(false)
                auth.login()
            } catch(err) {
                setIsLoading(false)
                setError(err.message || "Something went wrong")
                console.log(err)
            }
        } else {
            try{
                const response = await fetch('http://localhost:5000/api/user/signup', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: formState.inputs.name.value,
                        password: formState.inputs.password.value,
                        email: formState.inputs.email.value
                    })
                })
                const data = await response.json()
                if(!response.ok) {
                    throw new Error(data.message)
                }
                console.log(data)
                setIsLoading(false)
                auth.login()
            } catch(err) {
                setIsLoading(false)
                setError(err.message || "Something went wrong")
                console.log(err)
            }
        } 
        
    }

    const switchModeHandler = () => {
        if(!isLoginMode) {
            formData({
                ...formState.inputs,
                name: undefined
            }, formState.inputs.email.isValid && formState.inputs.password.isValid)
        }
        else {
            formData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                }
            },false)
        }
        setLoginMode(prevMode => !prevMode)
    };

    const onClearHandler = () => {
        setError(null)
    }

    return (
        <React.Fragment>
        <ErrorModal error={error} onClear={onClearHandler}/>
        <Card className="authentication">
            {isLoading && <LoadingSpinner asOverlay/>}
            <h2>Login</h2>
            <hr></hr>
            <form onSubmit={onLoginHandler}>
                {!isLoginMode && (
                    <Input
                        element="input"
                        id="name"
                        type="text"
                        label="Your Name"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Enter valid text"
                        onInput={inputHandler}
                    ></Input>
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
        </React.Fragment>
    )
}

export default Auth