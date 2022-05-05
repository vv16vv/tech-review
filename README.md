# Test task for technical review

## Run

- the task: `npm run run`
- tests: `npm test`

## Results Review

| N of threads        | 1   | 2  | 3         | 4        |
|---------------------|-----|----|-----------|----------|
| **using Promises**  | | | | |
| 12 000 numbers      | 1.427ms | 0.388ms | 0.38ms | 0.398ms | 
| 12 000 000 numbers  | 223.063ms | 225.582ms | 226.368ms | 229.32ms | 
| **using Processes** | | | | | 
| 12 000 numbers      | 83.321ms | 89.151ms | 124.25ms | 129.354ms | 
| 12 000 000 numbers  | 2.501s | 1.613s | 1.509s | 1.211s | 

### Machine
- OS: Windows 10 x64
- Processor: Intel(R) Core(TM) i5-2550K CPU @ 3.40GHz   3.40 GHz
- Memory: 16,0 Gb

### Conclusions:
1. Executing in a separate process has additional costs comparing with executing in a separate promise.
2. Number of used promises stop affecting on executing time with increasing of number of summarized numbers. 
3. Difference between executing time for different number of used processes becomes more clear with 
   increasing of number of summarized numbers. 
