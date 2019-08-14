import React from 'react';
import './Pagination.css';

const Pangination = props => {
    const { totalPages, page, handlePaginationClick } = props
    return (
        <div className="Pagination">
            <button className="Pagination-button"
                onClick={() => { handlePaginationClick('prew') }}
                disabled={page <= 1}>
                &larr;
            </button>
            <span className="Pagination-info"><b>{page}</b> of {totalPages}</span>
            <button className="Pagination-button"
                onClick={() => { handlePaginationClick('next') }}
                disabled={page >= totalPages}>
                &rarr;
            </button>
        </div>
    )
}

export default Pangination