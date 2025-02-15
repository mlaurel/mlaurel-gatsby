import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import SEO from '../components/SEO'

const PizzaGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 2rem;
    ul {
        margin: 2rem 0 0 2rem;
    }
`

export default function SinglePizzaPage({ data: { pizza } }) {
    // console.log(pizza)
    return (
        <>
            <SEO title={pizza.name} image={pizza.image?.asset?.fluid?.src} />
            <PizzaGrid>
                <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
                <div>
                    <h2 className="mark">{pizza.name}</h2>
                    <ul>
                        {pizza.toppings.map((topping) => {
                            return <li key={topping.id}>{topping.name}</li>
                        })}
                    </ul>
                </div>
            </PizzaGrid>
        </>
    )
}

// This needs to be dynamic based on the slug pass in via context in gatsby-node.js
export const query = graphql`
    query($slug: String!) {
        pizza: sanityPizza(slug: { current: { eq: $slug } }) {
            name
            id
            image {
                asset {
                    fluid(maxWidth: 800) {
                        ...GatsbySanityImageFluid
                    }
                }
            }
            toppings {
                id
                name
            }
        }
    }
`
