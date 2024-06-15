import React, { FC } from 'react'

interface Text  {
	text: string
}
const SectionTitle = ({text}) => {
	return <h1 className='section__title'>{text}</h1>
}

export default SectionTitle
