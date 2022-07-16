import { strictEqual } from 'assert'
import { describe, it } from 'mocha'

import { Duration } from '../dist/index.js'

describe('Duration', () => {
  describe('Basics', () => {
    it('as unit', () => {
      const d = new Duration(0.5, 'year')

      strictEqual(d.asMilliseconds(), (1000 * 60 * 60 * 24 * 365.25) / 2)
      strictEqual(d.asSeconds(), (60 * 60 * 24 * 365.25) / 2)
      strictEqual(d.asMinutes(), (60 * 24 * 365.25) / 2)
      strictEqual(d.asHours(), (24 * 365.25) / 2)
      strictEqual(d.asDays(), 365.25 / 2)
      strictEqual(d.asWeeks(), 365.25 / 7 / 2)
      strictEqual(d.asYears(), 0.5)
    })

    it('add / subtract', () => {
      const d = new Duration(1, 'day')
      d.add(4, 'hours')
      strictEqual(d.asHours(), 28)
      d.subtract(0.5, 'day')
      strictEqual(d.asHours(), 16)
    })

    it('exact units', () => {
      const d = new Duration(1, 'day')

      d.add(42, 'milliseconds')
      strictEqual(d.milliseconds(), 42)

      d.add(5, 'seconds')
      strictEqual(d.seconds(), 5)

      d.add(27, 'minutes')
      strictEqual(d.minutes(), 27)

      d.add(8, 'hours')
      strictEqual(d.hours(), 8)

      d.add(3, 'days')
      strictEqual(d.days(), 4)

      d.add(17, 'weeks')
      strictEqual(d.weeks(), 17)

      d.add(2, 'years')
      strictEqual(d.years(), 2)
    })
  })

  describe('Humanize', () => {
    it('few minutes', () => {
      strictEqual(new Duration(2, 'minutes').humanize(), 'a few minutes')
      strictEqual(new Duration(16, 'minutes').humanize(), '16 minutes')
      strictEqual(new Duration(30, 'seconds').humanize(), 'a moment')
    })

    it('custom humanizer', () => {
      const humanizer = [
        [(d) => d.days() > 0, (d) => `yus for ${d.days()}`],
        [() => true, () => 'cool'],
      ]

      const d = new Duration(5, 'minutes')
      strictEqual(d.humanize(humanizer), 'cool')
      d.add(2, 'days')
      strictEqual(d.humanize(humanizer), `yus for 2`)
    })
  })
})
