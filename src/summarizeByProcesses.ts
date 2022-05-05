import {exec} from "child_process"
import {ThreadType} from "./constants"

export function summarizeOneProcess(numbers: number[]): ThreadType {
  return new Promise((resolve, reject) => {
    const summarize = exec(`node src/execSummarizeOneProcessFromStdin.js`)
    summarize.stdin.write(numbers.join(','))
    summarize.stdin.end()
    summarize.stdout.on('data', data => {
      resolve(+data)
    })
    summarize.stderr.on('data', data => {
      reject(data)
    })
  })
}
