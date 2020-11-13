import React from 'react'
import { graphql } from 'gatsby'
import useForm from '../utils/useForm'
import SEO from '../components/SEO'
import styled from 'styled-components'
import Img from 'gatsby-image'
import calculatePizzaPrice from '../utils/calculatePizzaPrice'
import formatMoney from '../utils/formatMoney'
import {
    OrderForm,
    MenuGrid,
    PriceGrid,
    ButtonGrid,
} from '../styles/OrderStyles'

export default function OrderPage({ data }) {
    const { values, updateValue } = useForm({
        name: '',
        email: '',
    })

    // console.log(values, updateValue)
    const pizzas = data.pizzas.nodes
    console.log(pizzas)

    return (
        <>
            <SEO title="Order a Pizza" />
            <OrderForm>
                <fieldset>
                    <legend>Your Info</legend>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={values.name}
                        onChange={updateValue}
                    />
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        value={values.email}
                        onChange={updateValue}
                    />
                </fieldset>
                <fieldset>
                    <legend>Menu</legend>
                    {pizzas.map((pizza) => (
                        <MenuGrid key={pizza.id}>
                            <Img
                                fluid={pizza.image.asset.fluid}
                                alt={pizza.name}
                            />
                            <PriceGrid>
                                <h2>{pizza.name}</h2>
                                <ButtonGrid>
                                    {['S', 'M', 'L'].map((size, index) => (
                                        <button key={index} type="button">
                                            {size} &nbsp;
                                            {formatMoney(
                                                calculatePizzaPrice(
                                                    pizza.price,
                                                    size
                                                )
                                            )}
                                        </button>
                                    ))}
                                </ButtonGrid>
                            </PriceGrid>
                        </MenuGrid>
                    ))}
                </fieldset>
                <fieldset>
                    <legend>Order</legend>
                </fieldset>
            </OrderForm>
        </>
    )
}

export const query = graphql`
    query {
        pizzas: allSanityPizza {
            nodes {
                name
                id
                slug {
                    current
                }
                price
                image {
                    asset {
                        fluid(maxWidth: 100) {
                            ...GatsbySanityImageFluid
                        }
                    }
                }
            }
        }
    }
`
