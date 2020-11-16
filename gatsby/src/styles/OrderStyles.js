import styled from 'styled-components'

//  Exporting individual styles like this kind of sucks
//  A better way would be to export one pageStyle with nested selectors

export const OrderForm = styled.form`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
    legend {
        font-size: 1.25rem;
    }
    fieldset:first-child,
    fieldset:last-child {
        grid-column: 1 / -1;
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 1rem;
    }
    fieldset.menu-group {
        max-height: 60vh;
        overflow: scroll;
        scroll-behavior: scrollbars;
    }
    .mapleSyrup {
        display: none;
        z-index: -999;
        margin-top: -999px;
    }
`

export const MenuGrid = styled.div`
    display: grid;
    grid-template-columns: 100px 1fr;
    grid-gap: 1rem;
    margin-bottom: 2rem;
`

export const PriceGrid = styled.div`
    display: grid;
    grid-template-rows: 1fr 1fr;
    h2 {
        align-self: center;
        margin: 0;
        padding: 0;
    }
`

export const ButtonGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 15px;
    button {
        font-size: 1.5rem;
        margin: 0;
        padding: 0;
        border-radius: 8px;
    }
`
