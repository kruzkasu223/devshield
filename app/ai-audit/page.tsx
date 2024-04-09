'use client'
import { useProjects } from '@/store'
import Link from 'next/link'

export default function AIAudit() {
  const { projects } = useProjects()
  return (
    <>
      <h1 className="text-center pt-4 text-3xl">My Projects</h1>
      <div className="flex flex-col py-4 px-2">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/ai-audit/${project.slug}`}
            className="block max-w-sm p-6 border rounded shadow bg-[#007aff28] border-[#007AFF] transition-all hover:bg-[#007aff]"
          >
            <h5 className="text-2xl font-bold tracking-tight">
              {project.name}
            </h5>
          </Link>
        ))}
      </div>
    </>
  )
}
