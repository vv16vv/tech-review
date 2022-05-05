let result = 0

process.stdin.on('data', (data: string) => {
  result += data.toString()
    .split(',')
    .map(s => +s)
    .reduce((acc, value) => acc + value, 0)
})

process.stdin.on('end', () => {
  process.stdout.write(result.toString())
})
