import React from 'react'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
	const handleClick = page => {
		if (page >= 1 && page <= totalPages) {
			onPageChange(page)
		}
	}

	const renderPageNumbers = () => {
		const pageNumbers = []
		for (let i = 1; i <= totalPages; i++) {
			pageNumbers.push(
				<li
					key={i}
					className={`page-item ${i === currentPage ? 'active' : ''}`}
					onClick={() => handleClick(i)}
				>
					{i}
				</li>
			)
		}
		return pageNumbers
	}

	return (
		<div className='pagination'>
			<ul>
				<li
					className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
					onClick={() => handleClick(currentPage - 1)}
				>
					&laquo;
				</li>
				{renderPageNumbers()}
				<li
					className={`page-item ${
						currentPage === totalPages ? 'disabled' : ''
					}`}
					onClick={() => handleClick(currentPage + 1)}
				>
					&raquo;
				</li>
			</ul>
		</div>
	)
}

export default Pagination
