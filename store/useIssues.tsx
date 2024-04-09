'use client'
import { useParams } from 'next/navigation'
import issues from '../data/issues.json'
import { useMemo } from 'react'

export type Issue = (typeof issues)[number]['issues'][number]

export const useIssues = () => {
  const { project } = useParams()
  const projectSlug = Array.isArray(project) ? undefined : project

  const issuesByProject = useMemo(
    () => issues.find((issue) => issue.slug === projectSlug)?.issues || [],
    [projectSlug, issues]
  )

  const issuesCountByProject = useMemo(
    () => ({
      total: issuesByProject.length,
      high: issuesByProject.filter((issue) => issue.severity === 'high').length,
      medium: issuesByProject.filter((issue) => issue.severity === 'medium')
        .length,
      low: issuesByProject.filter((issue) => issue.severity === 'low').length,
      info: issuesByProject.filter((issue) => issue.severity === 'info').length,
      optimisation: issuesByProject.filter(
        (issue) => issue.severity === 'optimisation'
      ).length,
    }),
    [issuesByProject]
  )

  return {
    issues: issuesByProject,
    issuesCount: issuesCountByProject,
  }
}
