import Link from 'next/link'

function AppLink({ href, className, children }) {
  const hrefPath = href?.startsWith('http')

  return (
    <Link
      href={href}
      className={className}
      target={hrefPath ? '_blank' : '_self'}
      rel={hrefPath ? 'noopener noreferrer' : undefined}
      aria-hidden="true"
    >
      {children}
    </Link>
  )
}

export default AppLink
