import Image from 'next/image'
import React from 'react'

interface Props {
	url: string;
	width?: number;
	height?: number
	alt?: string
}

const Avatar: React.FC<Props> = ({ url, alt, width = 50, height = 50 }) => {
	return (
		<Image src={url} alt={alt || 'avatar'} width={width} height={height} />
	)
}

export default Avatar
