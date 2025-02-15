import React from 'react'
import { graphql } from 'gatsby'
import useForm from '../utils/useForm'
import SEO from '../components/SEO'
import Img from 'gatsby-image'
import calculatePizzaPrice from '../utils/calculatePizzaPrice'
import formatMoney from '../utils/formatMoney'
import usePizza from '../utils/usePizza'
import {
    OrderForm,
    MenuGrid,
    PriceGrid,
    ButtonGrid,
} from '../styles/OrderStyles'
import PizzaOrder from '../components/PizzaOrder'
import calculateOrderTotal from '../utils/calculateOrderTotal'

export default function OrderPage({ data }) {
    const pizzas = data.pizzas.nodes
    // console.log(pizzas)

    const { values, updateValue } = useForm({
        name: '',
        email: '',
    })
    // console.log(values, updateValue)

    const {
        order,
        addToOrder,
        removeFromOrder,
        error,
        loading,
        message,
        submitOrder,
    } = usePizza({
        pizzas: pizzas,
        values: values,
    })

    if (message) {
        return <p>{message}</p>
    }

    return (
        <>
            <SEO title="Order a Pizza" />
            <OrderForm onSubmit={submitOrder}>
                <fieldset disabled={loading}>
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
                    <input
                        type="text"
                        name="mapleSyrup"
                        id="mapleSyrup"
                        value={values.mapleSyrup}
                        onChange={updateValue}
                        className="mapleSyrup"
                    />
                </fieldset>
                <fieldset disabled={loading} className="menu-group">
                    <legend>Menu</legend>
                    {pizzas.map((pizza) => {
                        //  console.log(pizza.id)
                        return (
                            <MenuGrid key={pizza.id}>
                                <Img
                                    fluid={pizza.image.asset.fluid}
                                    alt={pizza.name}
                                />
                                <PriceGrid>
                                    <h2>{pizza.name}</h2>
                                    <ButtonGrid>
                                        {['S', 'M', 'L'].map((size) => (
                                            <button
                                                type="button"
                                                key={size}
                                                onClick={() => {
                                                    addToOrder({
                                                        id: pizza.id,
                                                        size: size,
                                                    })
                                                }}
                                            >
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
                        )
                    })}
                </fieldset>
                <fieldset disabled={loading}>
                    <legend>Order</legend>
                    <PizzaOrder
                        order={order}
                        pizzas={pizzas}
                        removeFromOrder={removeFromOrder}
                    />
                </fieldset>
                <fieldset disabled={loading}>
                    <legend>Order Total</legend>
                    <h3>
                        <span>Your Total is: </span>
                        {formatMoney(calculateOrderTotal(order, pizzas))}
                    </h3>
                    <div>{error ? <p>{error}</p> : ''}</div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Placing Order...' : 'Order Ahead'}
                    </button>
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
