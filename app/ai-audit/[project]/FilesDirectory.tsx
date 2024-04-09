import { Project } from '@/store'
import Image from 'next/image'
import FileIcon from '../../../public/file.svg'
import FileSelectedIcon from '../../../public/file-selected.svg'
import clsx from 'clsx'

type P = {
  project: Project
  selectedFile?: Project['files'][number]
  setSelectedFile?: (file: Project['files'][number]) => void
}

export const FilesDirectory = ({
  project,
  selectedFile,
  setSelectedFile,
}: P) => {
  return (
    <div className="h-full overflow-hidden">
      <div className="border-b-2 border-[#FFFFFF14] pb-3 pl-2 text-sm mb-2">
        Folders & Files
      </div>

      <div className="h-full overflow-auto px-1">
        <ul>
          {project.folders.map((folder) => (
            <FolderComponent
              key={folder.id}
              folder={folder}
              setSelectedFile={setSelectedFile}
              selectedFile={selectedFile}
            />
          ))}
          {project.files.map((file) => (
            <FileComponent
              key={file.id}
              file={file}
              setSelectedFile={setSelectedFile}
              selectedFile={selectedFile}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

const FileComponent = ({
  file,
  setSelectedFile,
  selectedFile,
}: {
  file: Project['files'][number]
  setSelectedFile?: (file: Project['files'][number]) => void
  selectedFile?: Project['files'][number]
}) => (
  <li
    key={file.id}
    className={clsx(
      'ml-2 py-1 px-3 hover:bg-[#007AFF28] cursor-pointer flex items-center gap-2',
      selectedFile?.name === file.name && 'bg-[#007AFF28] text-[#007AFF]'
    )}
    onClick={() => setSelectedFile?.(file)}
  >
    {selectedFile?.name === file.name ? (
      <Image src={FileSelectedIcon} alt="file" />
    ) : (
      <Image src={FileIcon} alt="file" />
    )}
    {file.name}
  </li>
)

const FolderComponent = ({
  folder,
  setSelectedFile,
  selectedFile,
}: {
  folder: Project['folders'][number]
  setSelectedFile?: (file: Project['files'][number]) => void
  selectedFile?: Project['files'][number]
}) => (
  <li key={folder.id}>
    <details className="py-1 px-3">
      <summary className="cursor-pointer py-1 px-3 hover:bg-[#007AFF28]">
        {folder.name}
      </summary>
      <ul className="ml-4">
        {folder.folders.map((subfolder) => (
          <FolderComponent
            key={subfolder.id}
            folder={subfolder}
            setSelectedFile={setSelectedFile}
            selectedFile={selectedFile}
          />
        ))}
        {folder.files.map((file) => (
          <FileComponent
            key={file.id}
            file={file}
            setSelectedFile={setSelectedFile}
            selectedFile={selectedFile}
          />
        ))}
      </ul>
    </details>
  </li>
)
