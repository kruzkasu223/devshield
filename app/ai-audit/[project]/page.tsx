'use client'
import { Project as TProject, useIssues, useProjects } from '@/store'
import { FilesDirectory } from './FilesDirectory'
import { IssuesDirectory } from './IssuesDirectory'
import { CodeEditor } from './CodeEditor'
import { useState } from 'react'
import Image from 'next/image'
import CollapseIcon from '../../../public/collapse-expand.svg'
import clsx from 'clsx'

export default function Project() {
  const { project } = useProjects()
  const { issues, issuesCount } = useIssues()
  const [selectedFile, setSelectedFile] = useState<TProject['files'][number]>()
  const [filesDirectoryOpen, setFilesDirectoryOpen] = useState(true)
  const [issuesDirectoryOpen, setIssuesDirectoryOpen] = useState(true)

  if (!project) {
    return <div className="text-center w-full">Nothingness!!!</div>
  }

  return (
    <>
      <div
        className={clsx(
          'bg-[#13161A] h-full flex-grow rounded p-3 w-80 select-none relative transition-all',
          !filesDirectoryOpen && 'w-0 flex-grow-[0]'
        )}
      >
        {filesDirectoryOpen && (
          <FilesDirectory
            project={project}
            setSelectedFile={setSelectedFile}
            selectedFile={selectedFile}
          />
        )}
        <div
          className="absolute h-6 w-6 bg-[#007AFF] rounded -right-3 bottom-5 flex items-center justify-center cursor-pointer"
          onClick={() => setFilesDirectoryOpen((prev) => !prev)}
        >
          <Image
            src={CollapseIcon}
            alt="collapse"
            height={16}
            width={16}
            className={clsx(
              'transition-all',
              !filesDirectoryOpen && 'rotate-180'
            )}
          />
        </div>
      </div>

      <div className={clsx('bg-[#13161A] h-full flex-grow-[3] rounded p-3')}>
        <CodeEditor selectedFile={selectedFile} />
      </div>

      <div
        className={clsx(
          'bg-[#13161A] h-full flex-grow rounded p-3 w-80 flex flex-col gap-3 relative transition-all',
          !issuesDirectoryOpen && 'w-0 flex-grow-[0]'
        )}
      >
        <div
          className="absolute h-6 w-6 bg-[#007AFF] rounded -left-3 bottom-5 flex items-center justify-center cursor-pointer"
          onClick={() => setIssuesDirectoryOpen((prev) => !prev)}
        >
          <Image
            src={CollapseIcon}
            alt="collapse"
            height={16}
            width={16}
            className={clsx(
              'transition-all',
              issuesDirectoryOpen && 'rotate-180'
            )}
          />
        </div>
        {issuesDirectoryOpen && (
          <IssuesDirectory issuesCount={issuesCount} issues={issues} />
        )}
      </div>
    </>
  )
}
