import React from 'react'
import SEO from '../components/SEO'
import useLatestData from '../utils/useLatestData'
import { HomePageGrid } from '../styles/Grids'
import LoadingGrid from '../components/LoadingGrid'
import ItemGrid from '../components/ItemGrid'

function CurrentlySlicing({ slicemasters }) {
    // console.log(slicemasters)
    return (
        <div>
            <h2 className="center">
                <span className="mark tilt">Slicemasters on</span>
            </h2>
            <p>Standing by... ready to slice you up!</p>
            {!slicemasters && <LoadingGrid count={4} />}
            {slicemasters && !slicemasters?.length && (
                <p>No one is working right now!</p>
            )}
            {slicemasters?.length && <ItemGrid items={slicemasters} />}
        </div>
    )
}

function HotSlices({ hotSlices }) {
    return (
        <div>
            <h2 className="center">
                <span className="mark tilt">HotSlices on</span>
            </h2>
            <p>Come on by... buy the slice!</p>
            {!hotSlices && <LoadingGrid count={4} />}
            {hotSlices && !hotSlices?.length && <p>No hot slices right now!</p>}
            {hotSlices?.length && <ItemGrid items={hotSlices} />}
        </div>
    )
}

export default function HomePage() {
    const { slicemasters, hotSlices } = useLatestData()
    // console.log(result)
    return (
        <>
            <SEO />
            <div className="center">
                <h1>The Best Pizza Downtown!</h1>
                <p>Open 11am to 11pm every single day!</p>
                <HomePageGrid>
                    <CurrentlySlicing slicemasters={slicemasters} />
                    <HotSlices hotSlices={hotSlices} />
                </HomePageGrid>
            </div>
        </>
    )
}
