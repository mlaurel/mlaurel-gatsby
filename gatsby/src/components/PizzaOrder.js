import React from 'react'
import Img from 'gatsby-image'
import calculatePizzaPrice from '../utils/calculatePizzaPrice'
import formatMoney from '../utils/formatMoney'
import styled from 'styled-components'

const OrderGrid = styled.div`
    display: grid;
    grid-template-columns: 100px 1fr;
    grid-gap: 1rem;
    margin-bottom: 2rem;

    .order-details {
        p {
            display: grid;
            grid-template-columns: 1fr 65px;
        }
        button {
            text-align: center;
            font-size: 1.25rem;
            border-radius: 8px;
        }
    }
`

export default function PizzaOrder({ order, pizzas, removeFromOrder }) {
    return (
        <>
            <p>Your order has {order.length} items.</p>
            {order.map((singleOrder, index) => {
                const pizza = pizzas.find(
                    (pizza) => pizza.id === singleOrder.id
                )
                return (
                    <OrderGrid key={singleOrder.id}>
                        <Img fluid={pizza.image.asset.fluid}></Img>
                        <div className="order-details">
                            <h2>{pizza.name}</h2>
                            <p>
                                {formatMoney(
                                    calculatePizzaPrice(
                                        pizza.price,
                                        singleOrder.size
                                    )
                                )}{' '}
                                ({singleOrder.size})
                                <button
                                    type="button"
                                    className="remove"
                                    title={`Remove ${singleOrder.size} from Order`}
                                    onClick={() => removeFromOrder(index)}
                                >
                                    Remove
                                </button>
                            </p>
                        </div>
                    </OrderGrid>
                )
            })}
        </>
    )
}
