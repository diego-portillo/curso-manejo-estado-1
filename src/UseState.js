import {useState, useEffect} from "react";

const SECUTIRY_CODE = 'paradigma'

function UseState({name}) {
    const [state, setState] = useState({
        value:'',
        error:false,
        loading:false
    })
    useEffect(()=>{
        console.log("Empezando el efecto")
        if (state.loading){
            setTimeout(() => {
                console.log("haciendo la validación")
                if(state.value === SECUTIRY_CODE){
                    setState({
                        ...state,
                        error:false,
                        loading:false
                    })
                } else {
                    setState({
                        ...state,
                        error:true,
                        loading:false
                    })
                }
                console.log("Terminando la validación")
            }, 3000)
        }
        console.log("Terminando el efecto")
    },[state.loading])

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
                    setState({
                        ...state,
                        value:event.target.value
                    })
                }}
            />
            <button
                onClick={() => {
                    setState({
                        ...state,
                        error:false,
                        loading:true
                    })
                }}
            >Comprobar</button>
        </div>
    )
}

export {UseState}