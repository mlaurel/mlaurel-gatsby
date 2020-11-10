import React from 'react'
import { graphql } from 'gatsby'
import PizzaList from '../components/PizzaList'
import styled from 'styled-components'
import ToppingsFilter from '../components/ToppingsFilter'

const PizzaHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 2rem 0;
`

export default function PizzasPage({ data }) {
    const pizzas = data.pizzas.nodes

    return (
        <>
            <PizzaHeader>
                <h1>Pizzas</h1>
                <div>{pizzas.length} total pizzas</div>
            </PizzaHeader>
            <ToppingsFilter />
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
