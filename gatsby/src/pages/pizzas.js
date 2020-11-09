import React from 'react'
import { graphql } from 'gatsby'
import PizzaList from '../components/PizzaList'

export default function PizzasPage({ data }) {
    const pizzas = data.pizzas.nodes
    console.log(pizzas)

    return (
        <>
            <h1>Pizzas</h1>
            <PizzaList pizzas={pizzas} />
        </>
    )
}

export const query = graphql`
    query PizzaQuery {
        pizzas: allSanityPizza {
            nodes {
                name
                id
                price
                slug {
                    current
                }
                toppings {
                    id
                    name
                }
                image {
                    asset {
                        fluid(maxWidth: 400) {
                            ...GatsbySanityImageFluid
                        }
                    }
                }
            }
        }
    }
`
