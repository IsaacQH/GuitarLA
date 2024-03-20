import React from 'react'

export const HeaderCart = ({guitar, removeFromCart, increaseQuantity, decreaseQuantity}) => {
    const {name, image, price, quantity, id} = guitar  //Desctructuracion de guitarra

  return (
    <tr>
        <td>
            <img className="img-fluid" src={`./img/${image}.jpg`} alt="imagen guitarra" />
        </td>
        <td>{name}</td>
        <td className="fw-bold">
                ${price}
        </td>
        <td className="flex align-items-start gap-4">
            <button
                type="button"
                className="btn btn-dark"
                onClick={() => decreaseQuantity(id)}
            >
                -
            </button>
                {quantity}
            <button
                type="button"
                className="btn btn-dark"
                onClick={() => increaseQuantity(id)}
            >
                +
            </button>
        </td>
        <td>
            <button
                className="btn btn-danger"
                type="button"
                onClick={() => removeFromCart(id)}
            >
                X
            </button>
        </td>
    </tr>
  )
}
