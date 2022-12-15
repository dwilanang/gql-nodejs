const fs = require('fs');
const path = require('path');

const coveragePath = path.resolve('./coverage');
const fn = path.join(coveragePath, 'coverage-summary.json')

try {
  if (fs.existsSync(fn)) {
    const summary = fs.readFileSync(fn, { encoding: 'utf8' });
    const result = JSON.parse(summary)

    const totalSum = ["functions"].map(i => result.total[i].pct)
      .reduce((a, b) => a + b, 0)

    const avgCoverage = totalSum / 4
    console.log(`Total Coverage : ${avgCoverage.toFixed(2)} %`)
  }
} catch(err) {
  console.error(err)
}
