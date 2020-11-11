import React from 'react'
import styled from 'styled-components'

const BeerGridStyles = styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 4rem;
    grid-auto-rows: auto;
    text-align: center;
`

const BeerStyles = styled.li`
    display: grid;
    /* Take your row sizing not from the pizzaStyles div, but from the PizzaGridStyles grid */
    @supports not (grid-template-rows: subgrid) {
        --rows: auto auto 1fr;
        --rowSpan: 3;
    }
    grid-template-rows: var(--rows, subgrid);
    grid-row: span var(--rowSpan, 2);
    grid-gap: 1rem;
    border: 4px solid var(--red);
    border-radius: 8px;
    padding: 2rem;
    background-color: var(--grey);
    h2,
    p {
        margin: 0;
    }
    article {
        background-color: #fff;
        padding: 2rem;
        border-radius: 8px;
        img {
            object-fit: contain;
        }
    }
`

const RatingStyles = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 1rem 0 0;
`

function BeerRating({ rating }) {
    console.log({ rating })
    const stars = Math.round(rating.average)

    return (
        <RatingStyles>
            <p title={`${stars} out of 5 stars`}>
                {`⭐`.repeat(stars)}
                <span style={{ filter: `grayscale(100%)` }}>
                    {`⭐`.repeat(5 - stars)}
                </span>
            </p>
            <h4>{rating.reviews} reviews</h4>
        </RatingStyles>
    )
}

function SingleBeer({ beer }) {
    return (
        <BeerStyles>
            <h2>{beer.name}</h2>
            <strong>
                Price: <span>{beer.price}</span>
            </strong>
            <article>
                <img src={beer.image} alt={beer.name} />
            </article>
            <BeerRating rating={beer.rating} />
        </BeerStyles>
    )
}

export default function BeerList({ beers }) {
    return (
        <>
            <BeerGridStyles>
                {beers.map((beer) => {
                    return <SingleBeer key={beer.id} beer={beer} />
                })}
            </BeerGridStyles>
        </>
    )
}
