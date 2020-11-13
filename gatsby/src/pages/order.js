import React from 'react'
import useForm from '../utils/useForm'
import SEO from '../components/SEO'

export default function OrderPage() {
    const { values, updateValue } = useForm({
        name: '',
        email: '',
    })
    console.log(values, updateValue)

    return (
        <>
            <SEO title="Order a Pizza" />
            <form>
                <fieldset>
                    <legend>Your Info</legend>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={values.name}
                        onChange={updateValue}
                    />
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        name="email"
                        value={values.email}
                        onChange={updateValue}
                    />
                </fieldset>
                <fieldset>
                    <legend>Menu</legend>
                </fieldset>
                <fieldset>
                    <legend>Order</legend>
                </fieldset>
            </form>
        </>
    )
}
