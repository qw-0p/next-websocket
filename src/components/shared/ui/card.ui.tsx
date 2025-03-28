import { cn } from '@/lib/utils'
import React from 'react'

interface Props {
    className?: string
}

const Card: React.FC<React.PropsWithChildren<Props>> = ({ className, children }) => {
    return (
        <div className={cn('px-4 py-6 border-blue-300 border-2 bg-blue-200 rounded-lg max-h-[560px] max-w-[400px]', className)}>
            {children}
        </div>
    )
}

export default Card
