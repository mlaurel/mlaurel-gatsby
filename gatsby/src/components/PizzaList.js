import React from 'react'
import { Link } from 'gatsby'

function SinglePizza({ pizza }) {
    return (
        <div>
            <Link to={`/pizza/${pizza.slug.current}`}>
                <h2>
                    <span className="mark">{pizza.name}</span>
                </h2>
                <p>
                    {pizza.toppings.map((topping) => topping.name).join(', ')}
                </p>
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
