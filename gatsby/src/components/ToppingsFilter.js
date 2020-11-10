import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

const ToppingsStyles = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 4rem;
    a {
        display: grid;
        grid-template-columns: auto 1fr;
        grid-gap: 0 1rem;
        align-items: center;
        padding: 5px;
        background: var(--grey);
        border-radius: 2px;
        text-decoration: none;
        font-size: clamp(1.5rem, 1.4vw, 2.5rem);
        .count {
            background: white;
            padding: 2px 5px;
        }
        &[aria-current='page'] {
            background: var(--yellow);
        }
    }
`

function countPizzasInToppings(pizzas) {
    // Return the pizzas with counts
    const counts = pizzas
        .map((pizza) => pizza.toppings)
        .flat()
        .reduce((acc, topping) => {
            // check if this is an existing topping
            const existingTopping = acc[topping.id]
            if (existingTopping) {
                //  if it is, increment by 1
                existingTopping.count += 1
            } else {
                // otherwise create a new entry in our acc and set it to one
                acc[topping.id] = {
                    id: topping.id,
                    name: topping.name,
                    count: 1,
                }
            }
            return acc
        }, {})
    // sort them based on their count
    const sortedToppings = Object.values(counts).sort(
        (a, b) => b.count - a.count
    )
    return sortedToppings
}

export default function ToppingsFilter() {
    // 1. Get a list of all the toppings
    // 2. Get a list of all the Pizzas with their toppings
    const { toppings, pizzas } = useStaticQuery(graphql`
        query {
            toppings: allSanityTopping {
                nodes {
                    name
                    id
                    vegetarian
                }
            }
            pizzas: allSanityPizza {
                nodes {
                    toppings {
                        name
                        id
                    }
                }
            }
        }
    `)

    // console.log({ toppings, pizzas })

    // 3. Count how many pizzas are in each topping
    const toppingsWithCounts = countPizzasInToppings(pizzas.nodes)
    console.log({ toppingsWithCounts })

    // 4. Loop over the list of toppings and display the topping and the count of pizzas in that topping
    // 5. Link it up...

    return (
        <div>
            {toppingsWithCounts.map(() => {})}
            <p>Toppings</p>
        </div>
    )
}
