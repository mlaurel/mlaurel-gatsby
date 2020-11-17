import { useState, useEffect } from 'react'

const gql = String.raw

const deets = `
    name
    _id
    image {
        asset {
            url
            metadata {
                lqip
            }
        }
    }
`

export default function useLatestData() {
    // slicemasters
    const [slicemasters, setSlicemasters] = useState()

    // hot slices
    const [hotSlices, setHotSlices] = useState()

    // use a side effect to fetch the data from the graphql endpoint
    useEffect(function () {
        // when the component loads, fetch the data
        fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: gql`
                    query {
                        StoreSettings(id: "downtown") {
                            name
                            slicemaster {
                                ${deets}
                            }
                            hotSlices {
                                ${deets}
                            }
                        }
                    }
                `,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                // console.log(res.data)
                // TODO: check for errors
                // set the data to state
                setHotSlices(res.data.StoreSettings.hotSlices)
                setSlicemasters(res.data.StoreSettings.slicemaster)
            })
            .catch((err) => {
                console.log('**************')
                console.log(err)
                console.log('**************')
            })
    }, [])
    return {
        hotSlices,
        slicemasters,
    }
}
