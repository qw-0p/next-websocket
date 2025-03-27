import Image from 'next/image'
import React from 'react'

interface Props {
	url: string;
	width?: number;
	height?: number
}

const Avatar: React.FC<Props> = ({ url, width = 50, height = 50 }) => {
	return (
		<Image src={url} alt={''} width={width} height={height} />
	)
}

export default Avatar