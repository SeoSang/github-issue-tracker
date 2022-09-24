export enum HistoryType {
  READ = 'READ',
  PINNED = 'PINNED',
  NONE_READ = 'NONE_READ',
}

export enum IssueType {
  ISSUE = 'issue',
  PR = 'pull_request',
}

export enum EVENT_TYPE {
  RECENT_PRS = 'recent-prs',
  RECENT_ISSUES = 'recent-issues',
  ISSUE_LOADED = 'issue-loaded',
  GO_RECENT_PR = 'go-recent-pr',
  GO_RECENT_ISSUE = 'go-recent-issue',
}
