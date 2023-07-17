import {useState, useEffect, Fragment} from "react";

const SECUTIRY_CODE = 'paradigma'

function UseState({name}) {
    const [state, setState] = useState({
        value:'',
        error:false,
        loading:false,
        deleted: false,
        confirmed: false
    })

    const onConfirm = () => {
        setState({
            ...state,
            error:false,
            loading:false,
            confirmed: true
        })
    }

    const onError = () => {
        setState({
            ...state,
            error:true,
            loading:false
        })
    }

    const onWrite = (event) => {
        setState({
            ...state,
            value:event.target.value
        })
    }

    const onCheck = () => {
        setState({
            ...state,
            error:false,
            loading:true
        })
    }

    const onDelete = () => {
        setState({
            ...state, 
            deleted: true, 
        })
    }

    const onReset = () => {
        setState({
            ...state, 
            confirmed: false, 
            deleted: false,
            value:''
        })
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
                    onChange={(event)=>{
                        onWrite(event)
                    }}
                />
                <button
                    onClick={() => {
                        onCheck()
                    }}
                >Comprobar</button>
            </div>
        )
    } else if (state.confirmed && !state.deleted){
        return (
            <Fragment>
                <p>Pedimos confirmación. Tas segurx?</p>
                <button
                    onClick={() => {
                        onDelete()
                    }}
                >Sí, eliminar</button>
                <button
                    onClick={() => {
                        onReset()
                    }}
                >Nop, me arrepenti</button>
            </Fragment>
        )
    } else {
        return (
            <Fragment>
                <p>Eliminado con éxito</p>
                <button
                    onClick={() => {
                        onReset()
                    }}
                >Resetear, volver atras</button>
            </Fragment>
        )
    }
    
}

export {UseState}