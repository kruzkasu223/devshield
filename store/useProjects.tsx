'use client'
import { useParams } from 'next/navigation'
import projects from '../data/projects.json'
import { useMemo } from 'react'

export type Project = (typeof projects)[0]

export const useProjects = () => {
  const params = useParams()

  const project = useMemo(() => {
    const projectSlug = Array.isArray(params.project)
      ? undefined
      : params.project

    return projects.find((project) => project.slug === projectSlug)
  }, [params.project, projects])

  return {
    projects,
    project: project,
    projectName: project?.name,
  }
}
