import React from 'react'
import { graphql, Link } from 'gatsby'
import styled from 'styled-components'
import Img from 'gatsby-image'

const SlicemasterGrid = styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-gap: 4rem;
`

const SlicemasterStyle = styled.li`
    list-style-type: none;

    a {
        text-decoration: none;
    }

    h2 {
        position: relative;
        z-index: 2;
        text-align: center;
        transform: rotate(-2deg);
        font-size: 3rem;
        margin-bottom: -2rem;
    }
    img {
    }
    article {
        position: relative;
        z-index: 2;
        text-align: center;
        transform: rotate(-1deg);
        margin: 2rem;
        margin-top: -5rem;
        padding: 1rem;
        background-color: var(--yellow);
    }
`

export default function SliceMastersPage({ data }) {
    const slicemasters = data.slicemasters.nodes
    // console.log(slicemasters)

    return (
        <>
            <SlicemasterGrid>
                {slicemasters.map((person) => {
                    return (
                        <SlicemasterStyle key={person.id}>
                            <Link to={`/slicemaster/${person.slug.current}`}>
                                <h2>
                                    <span className="mark">{person.name}</span>
                                </h2>
                                <Img
                                    fluid={person.image.asset.fluid}
                                    alt={person.name}
                                />
                                <article>
                                    <p className="mark">{person.description}</p>
                                </article>
                            </Link>
                        </SlicemasterStyle>
                    )
                })}
            </SlicemasterGrid>
        </>
    )
}

export const query = graphql`
    query SlicemasterQuery {
        slicemasters: allSanityPerson {
            nodes {
                name
                id
                slug {
                    current
                }
                description
                image {
                    asset {
                        fluid(maxWidth: 410) {
                            ...GatsbySanityImageFluid
                        }
                    }
                }
            }
            totalCount
        }
    }
`
