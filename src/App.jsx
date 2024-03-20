import { useState } from "react"
import { Guitar } from "./components/Guitar"
import Header from "./components/Header"

import { db } from "./data/db"  //Importa la base de datos

function App() {

  const [data, setData] =  useState(db)  //Declarando el data en state
  const [cart, setCart] = useState([]) //Declarando el carrito como arreglo por amlacenar mas objetos

  function addToCart(item){     //Función añadir cart

    const itemExist = cart.findIndex((guitar) => guitar.id === item.id)  //Revisa en cada item de cart el id. Guarda los items que no se repiten

    if(itemExist >= 0){ //Revisa que exista, si es así no hace nada, no añade
      console.log("ALREADY IN CART...")
      const updateCart = [...cart]
      updateCart[itemExist].quantity++     //Aumenta en uno la cantidad
      setCart(updateCart)       //Esto se hace para no mutar cart directamente

    } else{       //Añade el itema al arreglo
      console.log("ADDING...")
      item.quantity = 1  //añade un parametro que inicia en 1 el no. de items
      setCart([...cart, item])    //Añade al array pasado, el nuevo objeto
    }


  }

  return (
    <>
      <Header cart = {cart} />

        <main className="container-xl mt-5">
            <h2 className="text-center">Nuestra Colección</h2>

            <div className="row mt-5">
                {data.map((guitar) => (
                  <Guitar
                    key = {guitar.id}
                    guitar = {guitar}

                    setCart = {setCart}
                    addToCart = {addToCart}
                  />
                ))}
                
            </div>
        </main>


        <footer className="bg-dark mt-5 py-5">
            <div className="container-xl">
                <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
            </div>
        </footer>

    </>
  )
}

export default App
