import React from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  hover?: boolean
}

export function Card({ className, children, hover = true, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-lg border border-[var(--color-gray-100)] overflow-hidden transition-all duration-300',
        {
          'hover:shadow-[var(--shadow-medium)] hover:scale-[1.02]': hover,
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface CardImageProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function CardImage({ className, children, ...props }: CardImageProps) {
  return (
    <div
      className={cn(
        'relative aspect-[4/3] overflow-hidden bg-[var(--color-gray-50)]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function CardContent({ className, children, ...props }: CardContentProps) {
  return (
    <div className={cn('p-5', className)} {...props}>
      {children}
    </div>
  )
}

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
}

export function CardTitle({ className, children, ...props }: CardTitleProps) {
  return (
    <h3
      className={cn(
        'font-[var(--font-heading)] text-xl font-semibold text-black mb-2',
        className
      )}
      {...props}
    >
      {children}
    </h3>
  )
}

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
}

export function CardDescription({ className, children, ...props }: CardDescriptionProps) {
  return (
    <p
      className={cn(
        'text-[var(--color-gray-600)] text-base line-clamp-2',
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
}

interface CardBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
}

export function CardBadge({ className, children, ...props }: CardBadgeProps) {
  return (
    <span
      className={cn(
        'inline-block px-3 py-1 text-xs font-medium uppercase tracking-wider bg-[var(--color-gray-50)] text-[var(--color-gray-700)] rounded-full',
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
