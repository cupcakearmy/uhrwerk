const { describe, it } = require('mocha')
const a = require('assert')

const { Duration } = require('../')

describe('Duration', () => {

    describe('Basics', () => {

        it('as unit', () => {
            const d = new Duration(.5, 'year')

            a.strictEqual(d.asMilliseconds(), 1000 * 60 * 60 * 24 * 365.25 / 2)
            a.strictEqual(d.asSeconds(), 60 * 60 * 24 * 365.25 / 2)
            a.strictEqual(d.asMinute(), 60 * 24 * 365.25 / 2)
            a.strictEqual(d.asHour(), 24 * 365.25 / 2)
            a.strictEqual(d.asDay(), 365.25 / 2)
            a.strictEqual(d.asWeek(), 365.25 / 7 / 2)
            a.strictEqual(d.asYear(), .5)
        })

        it('add / subtract', () => {
            const d = new Duration(1, 'day')
            d.add(4, 'hours')
            a.strictEqual(d.asHour(), 28)
            d.subtract(.5, 'day')
            a.strictEqual(d.asHour(), 16)
        })

        it('exact units', () => {
            const d = new Duration(1, 'day')

            d.add(42, 'milliseconds')
            a.strictEqual(d.milliseconds(), 42)

            d.add(5, 'seconds')
            a.strictEqual(d.seconds(), 5)

            d.add(27, 'minutes')
            a.strictEqual(d.minutes(), 27)

            d.add(8, 'hours')
            a.strictEqual(d.hours(), 8)

            d.add(3, 'days')
            a.strictEqual(d.days(), 4)

            d.add(17, 'weeks')
            a.strictEqual(d.weeks(), 17)

            d.add(2, 'years')
            a.strictEqual(d.years(), 2)
        })

    })

    describe('Humanize', () => {

        it('few minutes', () => {
            a.strictEqual(new Duration(2, 'minutes').humanize(), 'a few minutes')
            a.strictEqual(new Duration(16, 'minutes').humanize(), '16 minutes')
            a.strictEqual(new Duration(30, 'seconds').humanize(), 'a moment')
        })

        it('custom humanizer', () => {
            const humanizer = [
                [d => d.days() > 0, d => `yus for ${d.days()}`],
                [() => true, () => 'cool'],
            ]

            const d = new Duration(5, 'minutes')
            a.strictEqual(d.humanize(humanizer), 'cool')
            d.add(2, 'days')
            a.strictEqual(d.humanize(humanizer), `yus for 2`)
        })
    })

})