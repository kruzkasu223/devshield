'use client'
import { useProjects } from '@/store'
import Link from 'next/link'

export default function AIAuditLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { projectName } = useProjects()

  return (
    <section className="h-full flex flex-col overflow-hidden">
      <nav>
        <ul className="flex text-sm text-[#7B8191] gap-2 pt-4 pl-2">
          <li>
            <Link href="/ai-audit">AI Audit</Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/ai-audit">My Projects</Link>
          </li>
          {projectName && (
            <>
              <li>/</li>
              <li>{projectName}</li>
            </>
          )}
        </ul>
      </nav>

      {children}
    </section>
  )
}
