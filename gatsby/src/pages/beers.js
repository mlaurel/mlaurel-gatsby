import React from 'react'
import { graphql } from 'gatsby'
import BeerList from '../components/BeerList'
import styled from 'styled-components'
import SEO from '../components/SEO'

const BeerTitle = styled.h1`
    text-align: center;
    margin: 0 0 4rem;
    span {
        padding-right: 2rem;
    }
`

export default function BeersPage({ data }) {
    const beers = data.beers.nodes

    return (
        <>
            <SEO title={`We have ${data.beers.nodes.length}`} />
            <BeerTitle>
                <span>Holy Smokes!</span> We have {beers.length} total beers
            </BeerTitle>
            <BeerList beers={beers} />
        </>
    )
}

export const query = graphql`
    query BeerQuery {
        beers: allBeer {
            nodes {
                name
                rating {
                    average
                    reviews
                }
                price
                image
                id
            }
        }
    }
`
