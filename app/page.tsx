import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between pt-8">
      <h1 className="text-3xl">Home</h1>
      <h3 className="text-xl mt-2">
        Go to{' '}
        <Link
          href="/ai-audit"
          className="text-[#007AFF] underline hover:decoration-wavy"
        >
          AI Audit
        </Link>{' '}
        page to get started.
      </h3>
    </div>
  )
}
