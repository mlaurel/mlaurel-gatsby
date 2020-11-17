import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

export default {
    pathPrefix: '/pizza',
    siteMetadata: {
        title: `Mikey Slices`,
        siteUrl: 'https://mlaurel-pizza.netlify.app',
        description: 'The best pizza in San Diego!',
        twitter: '@mlaurel',
    },
    plugins: [
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-styled-components',
        {
            // this is the name of the plugin you are adding
            resolve: 'gatsby-source-sanity',
            options: {
                projectId: 'le3pg3ic',
                dataset: 'production',
                watchMode: true,
                token: process.env.SANITY_TOKEN,
            },
        },
    ],
}
