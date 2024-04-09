import { Project } from '@/store'
import { Editor } from '@monaco-editor/react'

type P = {
  selectedFile?: Project['files'][number]
}

export const CodeEditor = ({ selectedFile }: P) => {
  if (!selectedFile) {
    return <div className="text-center w-full">Nothingness!!!</div>
  }
  return (
    <Editor
      theme="vs-dark"
      path={selectedFile.name}
      language={selectedFile.language}
      value={selectedFile.code}
      options={{
        minimap: { renderCharacters: false },
        wordWrap: 'on',
      }}
    />
  )
}
