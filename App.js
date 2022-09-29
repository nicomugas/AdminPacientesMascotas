import React, { Fragment, useState , useEffect} from "react";
import Formulario from './components/Formulario';
import Cita from './components/Cita';
function App() {
  //citas en local storagaes

  let citasIniciales = JSON.parse(localStorage.getItem('citas')) ;
  if (!citasIniciales) {
    citasIniciales = [];
    
  }
  // arreglo de cita
  const [citas, guardarCitas] = useState([citasIniciales]);
// useeffect para realizar ciertas operaciones cuando el state cambia
//siempre es con arroy function 

useEffect(()=>{
if (citasIniciales) {
  localStorage.setItem('citas', JSON.stringify(citas))
} else {
  localStorage.setItem('citas', JSON.stringify([]));
}
}, [citas]);//cada vez que citas cambie se ejecuta ussfeect
// similar a componentdidmount


  //funcion que tome las citas actuales y agregue la nueva

  const crearCita = cita => {
    guardarCitas([
      ...citas, 
      cita
    ]);
  }

  // funcion que elimina una cita por su id
  const eliminarCita = id =>{
    const nuevasCitas = citas?.filter(citas=> citas.id !== id);
    guardarCitas (nuevasCitas)

  }

  console.log(citas.length )
  //mensaje condicional
  const titulo = citas?.length ===0  ? 'No hay citas'  : 'Administra tus citas';
  return (
    <Fragment>
      <h1>Mascotas * Administrador de Pacientes * </h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario
             crearCita = {crearCita}
             />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            { 
           
          
             citas.map(cita =>( 
              <Cita
              key= {cita.id}
              cita={cita}
              eliminarCita={eliminarCita} 
              />
            ))
          }
          </div>

        </div>

      </div>
    </Fragment>
  );
}

export default App;
