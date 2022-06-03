
declare module 'download-git-repo' { 
  declare function download(
    repo: string,
    est?: string,
    opts?: download.DownloadOptions,
    fn?: (err?: Error | undefined) => void
  ): void
   export = download
} 