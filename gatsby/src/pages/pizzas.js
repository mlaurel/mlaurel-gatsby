import React from 'react'
import { graphql } from 'gatsby'
import PizzaList from '../components/PizzaList'
import styled from 'styled-components'
import ToppingsFilter from '../components/ToppingsFilter'

const PizzaHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0 4rem;
`

export default function PizzasPage({ data, pageContext }) {
    const pizzas = data.pizzas.nodes
    const toppingTitle = pageContext.topping

    return (
        <>
            <PizzaHeader>
                {toppingTitle ? (
                    <h1>{pageContext.topping}</h1>
                ) : (
                    <h1>All Pizzas</h1>
                )}
                <div>{pizzas.length} total pizzas</div>
            </PizzaHeader>
            <ToppingsFilter activeTopping={pageContext.topping} />
            <PizzaList pizzas={pizzas} />
        </>
    )
}

export const query = graphql`
    query PizzaQuery($topping: [String]) {
        pizzas: allSanityPizza(
            filter: { toppings: { elemMatch: { name: { in: $topping } } } }
        ) {
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
                        fixed(width: 600, height: 200) {
                            ...GatsbySanityImageFixed
                        }
                        fluid(maxWidth: 400) {
                            ...GatsbySanityImageFluid
                        }
                    }
                }
            }
        }
    }
`
