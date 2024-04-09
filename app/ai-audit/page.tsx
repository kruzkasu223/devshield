import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Audit | devshield',
}

export default function AIAudit() {
  return (
    <div className="flex flex-col items-center justify-between pt-8">
      <h1 className="text-3xl">AI Audit</h1>
    </div>
  )
}
