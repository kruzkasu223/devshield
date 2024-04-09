'use client'
import { useProjects } from '@/store'
import Image from 'next/image'
import ProjectLogo from '../../../public/project.svg'

export default function AIAuditLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { projectName } = useProjects()

  return (
    <div className="mt-2 h-full rounded flex flex-col items-center bg-[#191D23] p-4 overflow-hidden">
      <div className="flex items-center justify-between w-full border-b-2 border-[#FFFFFF14] pb-4">
        <div className="flex gap-2 items-center">
          <Image src={ProjectLogo} alt="project-logo" />
          <span className="text-2xl">{projectName}</span>
        </div>

        <div className="flex gap-3 items-center">
          <button className="bg-[#007AFF] rounded py-2 px-8 hover:bg-[#007bffbb] transition-all font-bold">
            Audit Now
          </button>
          <button className="bg-[#007AFF28] text-[#007AFF] hover:bg-[#007bff44] rounded py-2 px-8 relative after:content-[''] after:absolute after:-top-[3px] after:-right-[3px] after:h-[10px] after:w-[10px] after:bg-[#FF6F50] after:rounded-full font-bold transition-all">
            Options
          </button>
        </div>
      </div>

      <div className="pt-3 flex gap-3 items-center h-full w-full overflow-hidden">
        {children}
      </div>
    </div>
  )
}
