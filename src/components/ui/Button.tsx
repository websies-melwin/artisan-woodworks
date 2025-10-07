import React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center font-medium transition-all duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-wood-yellow)] focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          
          // Variant styles
          {
            // Primary - Wood yellow background
            'bg-[var(--color-wood-yellow)] text-black hover:bg-[var(--color-wood-brown)] hover:-translate-y-0.5 shadow-md hover:shadow-lg':
              variant === 'primary',
            
            // Secondary - Black background
            'bg-black text-white border-2 border-black hover:bg-[var(--color-gray-700)]':
              variant === 'secondary',
            
            // Outline - Transparent with border
            'bg-transparent text-black border-2 border-black hover:bg-black hover:text-white':
              variant === 'outline',
          },
          
          // Size styles
          {
            'text-sm px-4 py-2 rounded': size === 'sm',
            'text-base px-8 py-3 rounded': size === 'md',
            'text-lg px-10 py-4 rounded': size === 'lg',
          },
          
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
