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

    img {
    }
    button {
        border-radius: 8px;
        font-size: 1.75rem;
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
                        <div>
                            <h2>{pizza.name}</h2>
                            <p>
                                {formatMoney(
                                    calculatePizzaPrice(
                                        pizza.price,
                                        singleOrder.size
                                    )
                                )}{' '}
                                ({singleOrder.size})
                            </p>
                            <button
                                type="button"
                                className="remove"
                                title={`Remove ${singleOrder.size} from Order`}
                                onClick={() => removeFromOrder(index)}
                            >
                                Remove
                            </button>
                        </div>
                    </OrderGrid>
                )
            })}
        </>
    )
}
