import { useEffect, useState } from "react"
import { Guitar } from "./components/Guitar"
import Header from "./components/Header"

import { db } from "./data/db"  //Importa la base de datos

function App() {

  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }  //Setea el parse y sino existe es la primera vez que se usa y establece en vacio

  const [data, setData] =  useState(db)  //Declarando el data en state
  const [cart, setCart] = useState(initialCart) //Declarando el carrito como arreglo por amlacenar mas objetos

  useEffect(() => {       //Guarda en la función cada que cart es modificado
    localStorage.setItem('cart', JSON.stringify(cart))  //Usar stringigy para guardar como string 
  },[cart])     //Revisa si cart ha sido cambiado

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

  function removeFromCart(id){    //Función para eliminar el item de carrito
    console.log("DELETING ", id)
    setCart(cart.filter(guitar => guitar.id !== id))
  }

  function increaseQuantity(id){
    const updateCart = cart.map( (item) =>{
      if(item.id === id && item.quantity < 10){
        return {               //Regresa
          ...item,             //Los items completos
          quantity: item.quantity + 1  //se modifica solo el quiantity
        }
      }
      return item       //Regresa el item completo
    })
    setCart(updateCart)   //Hace set del Cart
  }

  function decreaseQuantity(id){
    const updateCart = cart.map( (item) =>{
      if(item.id === id && item.quantity > 1){
        return {               //Regresa
          ...item,             //Los items completos
          quantity: item.quantity - 1  //se modifica solo el quiantity
        }
      }
      return item       //Regresa el item completo
    })
    setCart(updateCart)   //Hace set del Cart
  }

  function clearCart(){   //Reinicia el carrito
    setCart([])
  }

  return (
    <>
      <Header 
        cart = {cart}
        removeFromCart = {removeFromCart} 
        increaseQuantity = {increaseQuantity}
        decreaseQuantity = {decreaseQuantity}
        clearCart = {clearCart}
      />

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
