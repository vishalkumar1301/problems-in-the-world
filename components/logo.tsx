import Link from 'next/link'
import { Globe } from 'lucide-react'

const Logo = () => {
  return (
    <Link href="/" className="mr-6 flex items-center space-x-2">
      <Globe className="h-6 w-6 text-primary" />
      <span className="text-xl font-bold">ProblemsInTheWorld.com</span>
    </Link>
  )
}

export default Logo