import { useReducer, useCallback } from 'react'

const formReducer = (state, action) => {
    switch(action.type) {
        case "INPUT_CHANGE" :
            let formIsValid = true;
            for (const inputId in state.inputs) {
                if(!state.inputs[inputId]){
                    continue 
                }
                if(inputId === action.id) {
                    formIsValid = formIsValid && action.isValid
                }
                else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid
                }
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.id]: {value: action.value, isValid: action.isValid}
                },
                isValid: formIsValid
            }
        case 'SET_INPUT' :
            return {
                inputs: action.value,
                isValid: action.isValid
            }
        default :
            return state
    }
}

export const useForm = (initialInputs, initialFormValidity) => {

    const [formState, dispatch] = useReducer(formReducer,{
        inputs: initialInputs,
        isValid: initialFormValidity
    })

    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({type: "INPUT_CHANGE",
            value: value,
            isValid: isValid,
            id: id
        })
    }, []);

    const setForm = useCallback((inputData, formValidity) => {
        dispatch({
            type:"SET_INPUT",
            value: inputData,
            isValid: formValidity
        })
    }, [])

    return [formState, inputHandler, setForm]
}