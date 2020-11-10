import path from 'path'

async function turnPizzaIntoPages({ graphql, actions }) {
    // 1. Get a template for this page
    // 2. Query all pizzas
    // 3. Loop over each pizza and create a page for that pizza

    const pizzaTemplate = path.resolve('./src/templates/Pizza.js')

    const { data } = await graphql(`
        query {
            pizzas: allSanityPizza {
                nodes {
                    name
                    slug {
                        current
                    }
                }
            }
            toppings: allSanityTopping {
                nodes {
                    name
                }
            }
        }
    `)
    // console.log(data)
    data.pizzas.nodes.forEach((pizza) => {
        console.log('creating a page for', pizza.name)
        actions.createPage({
            path: `pizza/${pizza.slug.current}`,
            component: pizzaTemplate,
            context: {
                slug: pizza.slug.current,
            },
        })
    })
}

async function turnToppingsIntoPages({ graphql, actions }) {
    const toppingTemplate = path.resolve('./src/pages/pizzas.js')

    const { data } = await graphql(`
        query {
            toppings: allSanityTopping {
                nodes {
                    name
                    id
                }
            }
        }
    `)
    console.log(data)
    data.toppings.nodes.forEach((topping) => {
        console.log(`Creating Topping template page for ${topping.name}`)
        actions.createPage({
            path: `topping/${topping.name}`,
            component: toppingTemplate,
            context: {
                topping: topping.name,
                // TODO: regex for topping
            },
        })
    })
}

export async function createPages(params) {
    console.log(`turning the toppings into pages`)
    // Create pages dynamically
    // 1. Pizzas
    // 2. Toppings
    // 3. Slicemasters

    await Promise.all([
        turnPizzaIntoPages(params),
        turnToppingsIntoPages(params),
    ])
}
