'use client'
import clsx from 'clsx'
import Image from 'next/image'
import Logo from '../public/logo.svg'
import Avatar from '../public/avatar.svg'
import ArrowDown from '../public/arrow-down.svg'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigation = [
  { name: 'AI Audit', href: '/ai-audit' },
  { name: 'Manual Audit', href: '/manual-audit' },
  { name: 'RedTeam', href: '/red-team' },
  { name: 'Monitor', href: '/monitor' },
  { name: 'Incident Response', href: '/incident-response' },
]

export const Header = () => {
  const pathname = usePathname()

  return (
    <div className="bg-[#191D23] rounded">
      <div className="relative flex items-center justify-between">
        <Link className="py-3 px-9 border-r-2 border-[#FFFFFF14]" href="/">
          <Image src={Logo} alt="logo" />
        </Link>

        <div className="flex items-center gap-10">
          <div className="flex gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  item.href === pathname &&
                    "text-[#007AFF] relative before:absolute before:content-[''] before:h-[2px] before:bg-[#007AFF] before:w-full before:-bottom-1 before:rounded-full",
                  'text-sm font-medium text-[#5D677D] hover:text-[#007AFF]'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="py-3 px-6 border-l-2 border-[#FFFFFF14]">
            <button className="flex items-center justify-evenly gap-3">
              <Image className="rounded-full" src={Avatar} alt="avatar" />
              <span>Jonny Doe</span>
              <Image className="ml-3" src={ArrowDown} alt="avatar" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
