import {generator, summarizeAll} from "./summarize"

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
