import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import Logo from './Logo'

const NavStyles = styled.nav`
    .logo {
        transform: translateY(-25%);
    }
    ul {
        display: grid;
        grid-template-columns: 1fr 1fr auto 1fr 1fr;
        list-style: none;
        margin: 0;
        padding: 0;
        text-align: center;
    }
    li {
        --rotate: -2deg;
        transform: rotate(var(--rotate));
        align-self: center;
        order: 1;
    }
    li:nth-child(1) {
        --rotate: 1deg;
    }
    li:nth-child(2) {
        --rotate: -2.5deg;
    }
    li:nth-child(4) {
        --rotate: 2.5deg;
    }
    li:nth-child(5) {
        --rotate: 1deg;
    }
    a {
        display: inline-block;
        text-decoration: none;
        font-size: 3rem;
        &:hover {
            color: var(--red);
            /* transform: rotate(5deg); */
        }
    }
`

export default function Nav() {
    return (
        <NavStyles>
            <ul>
                <li>
                    <Link to="/order">Hot Now</Link>
                </li>
                <li>
                    <Link to="/pizzas">Pizza Menu</Link>
                </li>
                <li>
                    <Link to="/">
                        <Logo />
                    </Link>
                </li>
                <li>
                    <Link to="/beers">Beers</Link>
                </li>
                <li>
                    <Link to="/slicemasters">SliceMasters</Link>
                </li>
            </ul>
        </NavStyles>
    )
}
