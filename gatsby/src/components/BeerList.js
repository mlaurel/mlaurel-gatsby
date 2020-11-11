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
    }
`

function SingleBeer({ beer }) {
    console.log(beer)
    return (
        <BeerStyles>
            <h2>{beer.name}</h2>
            <strong>
                Price: <span>{beer.price}</span>
            </strong>
            <article>
                <img src={beer.image} alt={beer.name} />
            </article>
        </BeerStyles>
    )
}

export default function BeerList({ beers }) {
    return (
        <>
            <BeerGridStyles>
                {beers.map((beer, index) => {
                    return <SingleBeer key={beer.id} beer={beer} />
                })}
            </BeerGridStyles>
        </>
    )
}
