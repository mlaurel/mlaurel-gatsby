import path from 'path'
import fetch from 'isomorphic-fetch'

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
        // console.log(`Creating Pizza template page for ${pizza.name}`)
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
    // console.log(data)
    data.toppings.nodes.forEach((topping) => {
        // console.log(`Creating Topping template page for ${topping.name}`)
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

async function fetchBeersAndTurnIntoNodes({
    actions,
    createNodeId,
    createContentDigest,
}) {
    // 1. Fetch a list of beers
    const res = await fetch('https://sampleapis.com/beers/api/ale')
    const beers = await res.json()
    console.log(beers)

    // 2. Loop over each one
    for (const beer of beers) {
        // const nodeContent = JSON.stringify(beer)
        const nodeMeta = {
            id: createNodeId(`beer-${beer.name}`),
            parent: null,
            children: [],
            internal: {
                type: 'Beer',
                mediaType: 'application/json',
                contentDigest: createContentDigest(beer),
            },
        }
        actions.createNode({
            ...beer,
            ...nodeMeta,
        })
    }
    // 3. Create a note for that beer
}

export async function sourceNodes(params) {
    // fetch a list of beers and source them into our gatsby API!
    await Promise.all([fetchBeersAndTurnIntoNodes(params)])
}

export async function createPages(params) {
    // Create pages dynamically
    // 1. Pizzas
    // 2. Toppings
    // 3. Slicemasters

    // console.log(`turning the toppings into pages`)

    await Promise.all([
        turnPizzaIntoPages(params),
        turnToppingsIntoPages(params),
    ])
}
