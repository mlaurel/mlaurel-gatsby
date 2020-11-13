import React from 'react'
import styled from 'styled-components'

const FooterStyle = styled.div`
    margin: 6rem auto 4rem;
    text-align: center;
`

export default function Footer() {
    return (
        <FooterStyle>
            <p>&copy; Slick's Slices 2020 </p>
        </FooterStyle>
    )
}
