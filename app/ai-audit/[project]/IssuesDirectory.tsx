import { Issue as TIssue } from '@/store'
import Image from 'next/image'
import ArrowRight from '../../../public/arrow-right.svg'
import InfoIcon from '../../../public/info.svg'
import FlagIcon from '../../../public/flag.svg'
import { useState } from 'react'

type P = {
  issuesCount: {
    total: number
    high: number
    medium: number
    low: number
    info: number
    optimisation: number
  }
  issues?: TIssue[]
}

const ISSUE_MAPPER = {
  total: 'Total',
  high: 'High Severity',
  medium: 'Medium Severity',
  low: 'Low Severity',
  info: 'Informational',
  optimisation: 'Optimisation',
}

const ISSUE_COLOR_MAPPER = {
  total: '5481FE',
  high: 'FF4D4D',
  medium: 'FFD166',
  low: '06D6A0',
  info: 'E568FF',
  optimisation: '66E3F4',
}

export const IssuesDirectory = ({ issuesCount, issues }: P) => {
  const [selectedIssueType, setSelectedIssueType] = useState<string>()
  const [selectedIssue, setSelectedIssue] = useState<TIssue>()
  return (
    <>
      <div className="border-b-2 border-[#FFFFFF14] pb-2 pl-2 text-xs flex gap-[6px]">
        <span
          className="cursor-pointer"
          onClick={() => {
            setSelectedIssueType(undefined)
            setSelectedIssue(undefined)
          }}
        >
          Count of Issues
        </span>{' '}
        {selectedIssueType && (
          <>
            <span>/</span>
            <span
              className="cursor-pointer"
              onClick={() => {
                setSelectedIssue(undefined)
              }}
            >
              {ISSUE_MAPPER[selectedIssueType as keyof typeof issuesCount]}
            </span>
          </>
        )}
        {selectedIssue && (
          <>
            <span>/</span>
            <span>Issue #{selectedIssue?.id}</span>
          </>
        )}
      </div>

      {!selectedIssue && (
        <div className="bg-[#1E232B] rounded p-1 flex">
          <button className="bg-[#007AFF] hover:bg-[#007bffbb] transition-all py-2 w-full text-center text-sm rounded font-bold">
            Current File
          </button>
          <button className="py-2 w-full text-center text-sm rounded font-bold text-[#5D677D]">
            Full Project
          </button>
        </div>
      )}

      <div className="flex flex-col gap-2 overflow-auto">
        {selectedIssue ? (
          <>
            <Issue key={selectedIssue.id} issue={selectedIssue} isSelected />

            <div className="bg-[#191D23] py-3 px-4">
              <div className="text-[#007AFF] text-xs">Desciption:</div>
              <div className="text-[#CCCCCC] text-xs">
                {selectedIssue.description}
              </div>

              <div className="text-[#007AFF] text-xs mt-4">Remediation:</div>
              <div className="text-[#CCCCCC] text-xs">
                {selectedIssue.remediation}
              </div>

              <div className="mt-4 flex justify-end items-center gap-3">
                <button className="bg-[#007AFF] rounded py-2 px-8 hover:bg-[#007bffbb] transition-all font-bold text-sm">
                  Auto Fix Code
                </button>
                <button className="rounded p-2 transition-all border border-[#FF4D4D] hover:bg-[#FF4D4D33]">
                  <Image src={FlagIcon} alt="flag-icon" />
                </button>
              </div>
            </div>
          </>
        ) : selectedIssueType ? (
          <>
            <IssueCount
              issueCount={
                issuesCount?.[selectedIssueType as keyof typeof issuesCount]
              }
              issueType={
                ISSUE_MAPPER[selectedIssueType as keyof typeof issuesCount]
              }
              color={
                ISSUE_COLOR_MAPPER[
                  selectedIssueType as keyof typeof issuesCount
                ]
              }
              isSelected
            />

            <div className="border-b-2 border-[#FFFFFF14] pb-2 pl-2 text-xs">
              List of Issues
            </div>

            {issues
              ?.filter(
                (issue) =>
                  issue.severity === selectedIssueType ||
                  selectedIssueType === 'total'
              )
              .map((issue) => (
                <Issue
                  key={issue.id}
                  issue={issue}
                  onSelect={() => setSelectedIssue(issue)}
                />
              ))}
          </>
        ) : (
          <>
            <IssueCount
              issueCount={issuesCount?.total}
              issueType="Total"
              color="5481FE"
              onSelect={() => setSelectedIssueType('total')}
            />
            <IssueCount
              issueCount={issuesCount?.high}
              issueType="High Severity"
              color="FF4D4D"
              onSelect={() => setSelectedIssueType('high')}
            />
            <IssueCount
              issueCount={issuesCount?.medium}
              issueType="Medium Severity"
              color="FFD166"
              onSelect={() => setSelectedIssueType('medium')}
            />
            <IssueCount
              issueCount={issuesCount?.low}
              issueType="Low Severity"
              color="06D6A0"
              onSelect={() => setSelectedIssueType('low')}
            />
            <IssueCount
              issueCount={issuesCount?.info}
              issueType="Informational"
              color="E568FF"
              onSelect={() => setSelectedIssueType('info')}
            />
            <IssueCount
              issueCount={issuesCount?.optimisation}
              issueType="Optimisation"
              color="66E3F4"
              onSelect={() => setSelectedIssueType('optimisation')}
            />
          </>
        )}
      </div>

      <div className="border-t-2 border-[#FFFFFF14] pt-2 pl-2 flex items-center gap-2">
        {selectedIssue ? (
          <>
            <Image src={InfoIcon} alt="info-icon" />
            <span className="text-xs">
              Changes done in the code can be undone.
            </span>
          </>
        ) : (
          <>
            <input type="checkbox" name="checkbox" id="checkbox" />
            <label htmlFor="checkbox" className="text-sm">
              Exclude Dependencies
            </label>
          </>
        )}
      </div>
    </>
  )
}

const IssueCount = ({
  issueCount,
  issueType,
  color,
  isSelected = false,
  onSelect,
}: {
  issueCount: number
  issueType: string
  color: string
  isSelected?: boolean
  onSelect?: () => void
}) => {
  return (
    <div
      className="flex justify-between items-center py-3 px-5 bg-[#191D23] cursor-pointer hover:bg-[#007AFF28] transition-all rounded"
      onClick={onSelect}
    >
      <div className="w-40 flex items-center gap-2">
        <div
          className="w-[10px] h-[10px] rounded-full"
          style={{
            backgroundColor: `#${color}`,
          }}
        ></div>
        <span className="text-3xl">{issueCount}</span>
      </div>

      <div className="border-l-2 border-[#FFFFFF14] pl-4 w-full text-[#AAAAAA]">
        {issueType} Issue{issueCount === 1 ? '' : 's'}{' '}
        {issueType === 'Total' ? 'Found' : ''}
      </div>

      {!isSelected && (
        <div className="ml-5">
          <Image src={ArrowRight} alt="arrow-right" height={16} />
        </div>
      )}
    </div>
  )
}

const Issue = ({
  issue,
  onSelect,
  isSelected = false,
}: {
  issue: TIssue
  onSelect?: () => void
  isSelected?: boolean
}) => {
  return (
    <div
      className="flex justify-between items-center py-3 px-4 bg-[#191D23] cursor-pointer hover:bg-[#007AFF28] transition-all rounded"
      onClick={onSelect}
    >
      <div className="text-xs flex gap-2 items-center">
        {isSelected && (
          <div
            className="w-[10px] h-[10px] rounded-full"
            style={{
              backgroundColor: `#${
                ISSUE_COLOR_MAPPER[
                  issue.severity as keyof typeof ISSUE_COLOR_MAPPER
                ]
              }`,
            }}
          ></div>
        )}
        #{issue.id}. {issue.name}
      </div>

      {!isSelected && (
        <div className="ml-2 border-l-2 border-[#FFFFFF14] pl-4">
          <Image src={ArrowRight} alt="arrow-right" height={10} width={5} />
        </div>
      )}
    </div>
  )
}
