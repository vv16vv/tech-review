import {summarizeAll, summarizeOneThread} from "./summarize"
import {RunCase} from "./constants"

describe("summarizeOneThread", () => {
  it('should return 0 for empty array', async () => {
    const sum = await summarizeOneThread([])
    expect(sum).toBe(0)
  })

  it('should return number for array of one number', async () => {
    const sum = await summarizeOneThread([2])
    expect(sum).toBe(2)
  })

  it('should return sum for array of several numbers', async () => {
    const sum = await summarizeOneThread([1, 2, 3])
    expect(sum).toBe(6)
  })
})

const summarizeAllTests = (runCase: RunCase) => {
  it(`run in several ${runCase} should return the same result as for one`, async () => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const sum1 = await summarizeAll(runCase, numbers, 1)
    const sum2 = await summarizeAll(runCase, numbers, 2)
    expect(sum2).toBe(sum1)
  })

  it(`${runCase}: if number of numbers is not divisible to number of ${runCase}`, async () => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const sum1 = await summarizeAll(runCase, numbers, 1)
    const sum2 = await summarizeAll(runCase, numbers, 2)
    expect(sum2).toBe(sum1)
  })

  it(`${runCase}: if number of numbers is less than number of ${runCase}`, async () => {
    const numbers = [1, 2, 3]
    const sum1 = await summarizeAll(runCase, numbers, 1)
    const sum2 = await summarizeAll(runCase, numbers, 4)
    expect(sum2).toBe(sum1)
  })
}

describe("summarizeAll", () => {
  describe(`run in several threads`, () => summarizeAllTests('threads'))
  describe(`run in several processes`, () => summarizeAllTests('processes'))
})
