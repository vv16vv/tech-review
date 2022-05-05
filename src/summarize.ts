import {MAX_NUMBER, MAX_THREADS, MIN_NUMBER, MIN_THREADS, RunCase, ThreadType} from "./constants"
import {summarizeOneProcess} from "./summarizeByProcesses"

const next = (minNumber: number = MIN_NUMBER, maxNumber: number = MAX_NUMBER): number => {
  return Math.floor((Math.random() * (maxNumber - minNumber)) + minNumber)
}

export const generator = (nOfNumbers: number, minNumber: number = MIN_NUMBER, maxNumber: number = MAX_NUMBER): number[] => {
  const numbers: number[] = []
  for (let i = 0; i < nOfNumbers; i++) {
    numbers.push(next(minNumber, maxNumber))
  }
  return numbers
}

export function summarizeOneThread(numbers: number[]): ThreadType {
  return new Promise<number>(resolve => {
    const sum = numbers.reduce((acc, value) => acc + value, 0)
    return resolve(sum)
  })
}

export function summarizeAll(runCase: RunCase, numbers: number[], nOfThreads: number = 1): ThreadType {
  const nThreads = nOfThreads < MIN_THREADS
    ? MIN_THREADS
    : nOfThreads > MAX_THREADS
      ? MAX_THREADS
      : nOfThreads

  const numbersInOneThread = Math.floor(numbers.length / nThreads)
  const partialThreads: ThreadType[] = []

  let minIndex = 0
  let maxIndex = numbersInOneThread
  for (let i = 0; i < nThreads; i++) {
    const partialNumbers = numbers.slice(minIndex, maxIndex)
    if (runCase === "threads") {
      partialThreads.push(summarizeOneThread(partialNumbers))
    } else {
      partialThreads.push(summarizeOneProcess(partialNumbers))
    }
    minIndex = maxIndex
    maxIndex = i < nThreads - 2
      ? maxIndex + numbersInOneThread
      : numbers.length
  }

  return Promise.all(partialThreads)
    .then((partialSums: number[]) => {
      return partialSums.reduce((acc, value) => acc + value, 0)
    })
}
