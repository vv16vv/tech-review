const MIN_NUMBER = -10000
const MAX_NUMBER = 10000

const next = (minNumber: number = MIN_NUMBER, maxNumber: number = MAX_NUMBER): number => {
  return Math.floor((Math.random() * (maxNumber - minNumber)) + minNumber)
}

const generator = (nOfNumbers: number, minNumber: number = MIN_NUMBER, maxNumber: number = MAX_NUMBER): number[] => {
  const numbers: number[] = []
  for (let i = 0; i < nOfNumbers; i++) {
    numbers.push(next(minNumber, maxNumber))
  }
  return numbers
}

type ThreadType = Promise<number>

const summarizeOneThread = (numbers: number[]): ThreadType => {
  return new Promise<number>(resolve => {
    const sum = numbers.reduce((acc, value) => acc + value, 0)
    return resolve(sum)
  })
}

const MIN_THREADS = 1
const MAX_THREADS = 4

export const summarizeAll = (numbers: number[], nOfThreads: number = 1): ThreadType => {
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
    partialThreads.push(summarizeOneThread(numbers.slice(minIndex, maxIndex)))
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

const run = async (label: string, numbers: number[], nOfThreads: number): Promise<void> => {
  console.time(label)
  const sum = await summarizeAll(numbers, nOfThreads)
  console.timeLog(label)
  console.log(`Sum for ${label} = ${sum}\n`)
}

(async () => {
  const numbers = generator(12000)

  await run('one-thread', numbers, 1)
  await run('two-threads', numbers, 2)
  await run('three-threads', numbers, 3)
  await run('four-threads', numbers, 4)
})()
