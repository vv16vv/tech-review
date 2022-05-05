import {generator, summarizeAll} from "./summarize"
import {RunCase} from "./constants"

const run = async (runCase: RunCase, label: string, numbers: number[], nOfThreads: number): Promise<void> => {
  console.time(label)
  const sum = await summarizeAll(runCase, numbers, nOfThreads)
  console.timeLog(label)
  console.log(`Sum for ${label} = ${sum}`)
}

(async () => {
  const numbers = generator(12000000, -10, 10)

  console.log(`Summarizing using Promises:`)
  await run('threads', 'one-thread', numbers, 1)
  await run('threads', 'two-threads', numbers, 2)
  await run('threads', 'three-threads', numbers, 3)
  await run('threads', 'four-threads', numbers, 4)

  console.log(`\nSummarizing using processes:`)
  await run('processes', 'one-process', numbers, 1)
  await run('processes', 'two-processes', numbers, 2)
  await run('processes', 'three-processes', numbers, 3)
  await run('processes', 'four-processes', numbers, 4)
})()
