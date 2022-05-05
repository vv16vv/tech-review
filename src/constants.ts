export const MIN_NUMBER = -10000
export const MAX_NUMBER = 10000

export const MIN_THREADS = 1
export const MAX_THREADS = 4

export type ThreadType = Promise<number>

export type RunCase = 'threads' | 'processes'
