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
        }
    `)
    console.log(data)
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
export async function createPages(params) {
    // Create pages dynamically
    // 1. Pizzas
    // 2. Toppings
    // 3. Slicemasters
    await turnPizzaIntoPages(params)
}
