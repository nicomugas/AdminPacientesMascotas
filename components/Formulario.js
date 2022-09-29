import React , {Fragment, useState} from "react";



const Formulario = ({crearCita}) =>{
    //crear el state de citas
    const [cita, actualizarcita] = useState({
        mascota: '',
        propietario:'',
        fecha: '',
        hora: '',
        sintomas:''

    });

    const [error,actualizarError] = useState(false);

    //funcion que se ejecuta cada vvez que se escribe en un input

    const actualizarState = e =>{
         /// hago una copia de cita y luego rescribo en siguente linea
        actualizarcita({
            ...cita,
            [e.target.name]:e.target.value
        })
    }
    
    // Extraer los valores
    const {mascota, propietario, fecha, hora, sintomas} = cita;

    // cuando aprieta el boton agregarcita
    const submitCita = e =>{
        e.preventDefault();
        // Validar
        if (mascota.trim() === '' || propietario.trim() === '' ||
        fecha.trim() === '' ||hora.trim() === '' || 
        sintomas.trim() === '') {//trim elimina espacios al final y al ppio
            actualizarError(true);
           
            return; // siempre que hay un error poner return para que no se siga ejecutanco codigo

        } 
        // eliminar mensaje de error
        actualizarError(false);
        
        //asignar un ID , lo creo pq no trabajo con BD
        
        cita.id = Math.random();

        // Crear la cita

        crearCita(cita);

        //reiniciar el form. 
        // cuando se agrega la cita se reinician las propiedades
        // esto pasa porque le esta pasando cada valor a la propiedad value. 
        actualizarcita ({
            mascota: '',
            propietario:'',
            fecha: '',
            hora: '',
            sintomas:''
        })
    };


    return (
        <Fragment>
            <h2>Crear Cita</h2>
            {error ? <p className="alerta-error">Todos los campos son obligatorios.</p>  : null};
            <form 
                onSubmit={submitCita}
            >
                <label>Nombre de Mascota</label>
                <input
                    type = "text"
                    name = 'mascota'
                    className = 'u-full-width'
                    placeholder="Nombre Mascota"
                    onChange={actualizarState}     
                    value = {mascota}         
                
                />
                <label>Nombre de Dueño</label>
                <input
                    type = "text"
                    name = 'propietario'
                    className = 'u-full-width'
                    placeholder="Nombre Propietario"              
                    onChange={actualizarState}  
                    value = {propietario}   
                />
                <label>Fecha</label>
                <input
                    type = "date"
                    name = 'fecha'
                    className = 'u-full-width'             
                    onChange={actualizarState}  
                    value = {fecha}   
                />
                <label>Hora</label>
                <input
                    type = "time"
                    name = 'hora'
                    className = 'u-full-width'             
                    onChange={actualizarState}   
                    value = {hora}  
                />
                <label>Sintomas</label>
                <textarea
                className='u-full-width '
                name="sintomas"
                onChange={actualizarState}
                value = {sintomas} 
                 >
                      

                </textarea>
                  
                <button 
                className="u-full-width button-primary"
                type="submit">
                    Agregar cita
                </button>
            </form>

        </Fragment>
    );
}

export default Formulario;