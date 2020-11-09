import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

//  Topping Component Practice... using topping component to loop over
//  See one line join below... more optimal

// function Toppings({ toppings }) {
//     return toppings.map((topping) => {
//         return (
//             <span className="comma" key={topping.id}>
//                 {topping.name}
//             </span>
//         )
//     })
// }

function SinglePizza({ pizza }) {
    return (
        <div>
            <Link to={`/pizza/${pizza.slug.current}`}>
                <h2>
                    <span className="mark">{pizza.name}</span>
                </h2>
                <p>
                    {/* <Toppings toppings={pizza.toppings} /> */}
                    {pizza.toppings.map((topping) => topping.name).join(', ')}
                </p>
                <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
            </Link>
        </div>
    )
}
export default function PizzaList({ pizzas }) {
    return (
        <>
            <p>There are {pizzas.length} pizzas total!</p>
            <ul>
                {pizzas.map((pizza) => {
                    return <SinglePizza key={pizza.id} pizza={pizza} />
                })}
            </ul>
        </>
    )
}
