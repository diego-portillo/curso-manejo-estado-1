import { useEffect, Fragment, useReducer} from "react";
const SECUTIRY_CODE = 'paradigma'

function UseReducer({name}) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const onConfirm = () => {
        dispatch({ type: actionTypes.CONFIRM})
    }
    const onDelete = () => {
        dispatch({ type: actionTypes.DELETE})
    }
    const onWrite = (event) => {
        dispatch({ type: actionTypes.WRITE, payload: event.target.value})
    }
    const onError = () => {
        dispatch({ type: actionTypes.ERROR})
    }
    const onCheck = () => {
        dispatch({ type: actionTypes.CHECK})
    }
    const onReset = () => {
        dispatch({ type: actionTypes.RESET})
    }
    useEffect(()=>{
        console.log("Empezando el efecto")
        if (state.loading){
            setTimeout(() => {
                console.log("haciendo la validación")
                if(state.value === SECUTIRY_CODE){
                    onConfirm();          
                } else {
                    onError();          
                }
                console.log("Terminando la validación")
            }, 3000)
        }
        console.log("Terminando el efecto")
    },[state.loading])
    if(!state.deleted && !state.confirmed){
        return (
            <div>
                <h2>Eliminar {name}</h2>
                <p>Por favor, escribe el código de seguridad.</p>
                { (state.error && !state.loading) && (
                    <p>Error: el código es incorrecto.</p>
                )}
                { state.loading && (
                    <p>Cargando...</p>
                )}
                <input 
                    placeholder="Código de seguridad" 
                    value={state.value}
                    onChange={onWrite}
                        // (event)=>{
                        // dispatch({ type: actionTypes.WRITE, payload: event.target.value });          
                        // onWrite(event)
                    // }
                />
                <button
                    onClick={onCheck}
                >Comprobar</button>
            </div>
        )
    } else if (state.confirmed && !state.deleted){
        return (
            <Fragment>
                <p>Pedimos confirmación. Tas segurx?</p>
                <button
                    onClick={onDelete}
                >Sí, eliminar</button>
                <button
                    onClick={onReset}
                >Nop, me arrepenti</button>
            </Fragment>
        )
    } else {
        return (
            <Fragment>
                <p>Eliminado con éxito</p>
                <button
                    onClick={onReset}
                >Resetear, volver atras</button>
            </Fragment>
        )
    }
    
}

export {UseReducer}

const initialState = {
    value:'',
    error:false,
    loading:false,
    deleted: false,
    confirmed: false
}
const actionTypes = {
    CONFIRM: 'CONFIRM',
    CHECK: 'CHECK',
    RESET: 'RESET',
    ERROR: 'ERROR',
    DELETE: 'DELETE',
    WRITE: 'WRITE'
}
// const reducer = (state, action) => {
    
// }
// const reducerIf = (state, action) => {
//     if (action.type === 'ERROR') {
//         return {
//             ...state,
//             error: true,
//             loading: false
//         }
//     } else if (action.type ==='CHECK') {
//         return {
//             ...state,
//             loading: true
//         }
//     } else {
//         return {
//             ...state
//         }
//     }
// }
// const reducerSwitch = (state, action) => {
//     switch(action.type) {
//         case 'ERROR':
//             return {
//                 ...state,
//                 error:true,
//                 loading: false
//             }
//         case 'CHECK':
//             return {
//                 ...state,
//                 loading: true
//             }
//         default:
//             return {
//                 ...state
//             }
            
//         }
// }
const reducerObject = (state, payload) => ({
        [actionTypes.ERROR]: {
            ...state,
            error: true,
            loading: false
        },
        [actionTypes.CHECK]: {
            ...state,
            error:false,
            loading:true
        },
        [actionTypes.CONFIRM]:{
            ...state,
            error:false,
            loading:false,
            confirmed: true
        },
        [actionTypes.DELETE]: {
            ...state, 
            deleted: true, 
        },
        [actionTypes.RESET]: {
            ...state, 
            confirmed: false, 
            deleted: false,
            value:''
        },
        [actionTypes.WRITE]:{
            ...state,
            value: payload
        }
    })

const reducer = (state, action) => {
    if (reducerObject(state)[action.type]){
        return reducerObject(state, action.payload)[action.type]
    } else {
        return state;
    }
}
