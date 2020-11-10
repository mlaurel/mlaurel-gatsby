import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'

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

const PizzaGridStyles = styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-gap: 4rem;
    grid-auto-rows: auto;
`

const PizzaStyles = styled.li`
    display: grid;
    /* Take your row sizing not from the pizzaStyles div, but from the PizzaGridStyles grid */
    @supports not (grid-template-rows: subgrid) {
        --rows: auto auto 1fr;
        --rowSpan: 3;
    }
    grid-template-rows: var(--rows, subgrid);
    grid-row: span var(--rowSpan, 3);
    grid-gap: 1rem;
    h2,
    p {
        margin: 0;
    }
`

function SinglePizza({ pizza }) {
    return (
        <PizzaStyles>
            <Link to={`/pizza/${pizza.slug.current}`}>
                <h2>
                    <span className="mark">{pizza.name}</span>
                </h2>
                <p>
                    {/* <Toppings toppings={pizza.toppings} /> */}
                    {pizza.toppings.map((topping) => topping.name).join(', ')}
                </p>
            </Link>
            <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
        </PizzaStyles>
    )
}
export default function PizzaList({ pizzas }) {
    return (
        <>
            <PizzaGridStyles>
                {pizzas.map((pizza) => {
                    return <SinglePizza key={pizza.id} pizza={pizza} />
                })}
            </PizzaGridStyles>
        </>
    )
}
