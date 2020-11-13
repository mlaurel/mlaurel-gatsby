import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'

const SlicemasterGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 2rem;
    ul {
        margin: 2rem 0 0 2rem;
    }
    a {
        text-decoration: none;
    }
`

export default function SingleSlicemasterPage({ data: { slicemaster } }) {
    return (
        <SlicemasterGrid>
            <Img fluid={slicemaster.image.asset.fluid} alt={slicemaster.name} />
            <div>
                <h2 className="mark">{slicemaster.name}</h2>
                <p>{slicemaster.description}</p>
                <Link to="/slicemasters"> &#8592; Back to Slicemasters</Link>
            </div>
        </SlicemasterGrid>
    )
}

// This needs to be dynamic based on the slug pass in via context in gatsby-node.js
export const query = graphql`
    query($slug: String!) {
        slicemaster: sanityPerson(slug: { current: { eq: $slug } }) {
            name
            id
            description
            image {
                asset {
                    fluid(maxWidth: 800) {
                        ...GatsbySanityImageFluid
                    }
                }
            }
        }
    }
`
