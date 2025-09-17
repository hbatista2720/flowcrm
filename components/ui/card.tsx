interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}
interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}
interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className = '', ...props }: CardProps) {
  return <div className={`bg-white rounded-lg shadow ${className}`} {...props} />
}

export function CardHeader({ className = '', ...props }: CardHeaderProps) {
  return <div className={`p-6 pb-0 ${className}`} {...props} />
}

export function CardTitle({ className = '', ...props }: CardTitleProps) {
  return <h3 className={`text-lg font-semibold ${className}`} {...props} />
}

export function CardContent({ className = '', ...props }: CardContentProps) {
  return <div className={`p-6 ${className}`} {...props} />
}