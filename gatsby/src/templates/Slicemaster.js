import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import SEO from '../components/SEO'

const SliceMasterGrid = styled.div`
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

const BackButton = styled.button`
    background-color: var(--yellow);
    color: #222;
    border-radius: 8px;
`

export default function SingleSlicemasterPage({ data: { slicemaster } }) {
    return (
        <>
            <SEO title={`SliceMaster ${slicemaster.name}`} />
            <SliceMasterGrid>
                <Img
                    fluid={slicemaster.image.asset.fluid}
                    alt={slicemaster.name}
                />
                <article>
                    <h2 className="mark">{slicemaster.name}</h2>
                    <p>{slicemaster.description}</p>
                    <Link to="/slicemasters">
                        <BackButton>Back to Slicemasters</BackButton>
                    </Link>
                </article>
            </SliceMasterGrid>
        </>
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
                    fluid(maxWidth: 1000, maxHeight: 750) {
                        ...GatsbySanityImageFluid
                    }
                }
            }
        }
    }
`
