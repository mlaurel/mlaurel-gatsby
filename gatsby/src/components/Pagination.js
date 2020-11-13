import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

const PagingStyle = styled.div`
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--grey);
    text-align: center;
    margin: 1rem auto;

    & > * {
        padding: 1rem;
        flex: 1;
        margin: 0.5rem auto;
        border-right: 1px solid var(--grey);
        text-decoration: none;

        &[aria-current],
        .current {
            color: var(--red);
        }
        &[disabled] {
            pointer-events: none;
            color: var(--grey);
        }
    }
`

export default function Pagination({
    pageSize,
    totalCount,
    currentPage,
    skip,
    base,
}) {
    // make some variables
    const totalPages = Math.ceil(totalCount / pageSize)
    const prevPage = currentPage - 1
    const nextPage = currentPage + 1
    const hasNextPage = nextPage <= totalPages
    const hasPrevPage = prevPage >= 1

    return (
        <PagingStyle>
            <Link disabled={!hasPrevPage} to={`${base}/${prevPage}`}>
                &#8592; Prev
            </Link>
            {Array.from({ length: totalPages }).map((_, index) => {
                return (
                    <Link key={index} to={`${base}/${index + 1}`}>
                        {index + 1}
                    </Link>
                )
            })}
            <Link disabled={!hasNextPage} to={`${base}/${nextPage}`}>
                Next &#8594;
            </Link>
        </PagingStyle>
    )
}
