# uhrwerk 🕰
Minimal time duration utility. Replacement for MomentJS Durations. If you are looking into the time component of MomentJS check out this awesome library [dayjs](https://github.com/iamkun/dayjs).

📦 It's **tiny**: [1.6kB](https://bundlephobia.com/result?p=uhrwerk@1.0.0) vs moment js [231.7kb](https://bundlephobia.com/result?p=moment@latest)

**Typescript typings included**

## Quickstart 🚀

```typescript
// Whatever import you prefer
// const { Duration } = require('uhrwerk')
import { Duration } from 'uhrwerk'

const d = new Duration(10, 'days')
d.subtract(1, 'week')
d.add(5, 'minutes')

d.humanize()    // '3 days'
d.minutes()     // 5
d.asMinute()    // 4325

d.subtract(3, 'days')
d.humanize()    // 'a few minutes'
```

### Reference 📒

#### `new Duration(amount, interval)`

- amount: number
- interval: 'millisecond', 'second', 'minute', 'hour', 'day', 'week', 'year'
Intervals can also be plural: e.g. 'days' is an alias for 'day'

###### Examples

```javascript
const a = new Duration(1, 'day')
const b = new Duration(2, 'days')
const c = new Duration(0.5, 'year')
```

#### `.add(amount, interval)`

Adds a specified amount to an existing duration

###### Example

```javascript
const a = new Duration(1, 'day')
a.add(12, 'hours')
a.asHour() // 36
```

#### `.subtract(amount, interval)`

Subtracts a specified amount to an existing duration

###### Example

```javascript
const a = new Duration(1, 'day')
a.subtract(12, 'hours')
a.asHour() // 12
```

#### Getters

Gets the amount of time interval, not the total time

- `.milliseconds()`
- `.seconds()`
- `.minutes()`
- `.hours()`
- `.days()`
- `.weeks()`
- `.years()`

###### Example

```javascript
const a = new Duration(1, 'day')
a.days() // 1
a.add(5, 'minutes')
a.days() // 1
a.add(1, 'year')
a.days() // 1
a.add(24, 'hours')
a.days() // 2
```

#### As interval

Calculates the time duration as a time interval.

- `.asMilliseconds()`
- `.asSeconds()`
- `.asMinutes()`
- `.asHours()`
- `.asDays()`
- `.asWeeks()`
- `.asYears()`

###### Example

```javascript
const a = new Duration(1, 'day')
a.asHours() // 24
```

#### `.humanize()`

This functions takes a duration and tries to make a human readable version out of it.

###### Example

```javascript
const a = new Duration(4, 'seconds')
a.humanize() // 'a moment'
a.add(5, 'minutes')
a.humanize() // 'a few minutes'
```

##### Own rules / i18n

If you want to pass a different humanize function you can.

###### Example

```javascript
const humanizer = [
	[d => d.days() > 1, d => `${d.days()} days`],
	[d => d.days() > 0, d => `1 day`],
	[() => true, () => 'catch all, below 1 day'],
]

const a = new Duration(2, 'days')
a.humanize(humanizer) // '2 days'
a.subtract(1, 'day')
a.humanize(humanizer) // '1 day'
a.subtract(12, 'hours')
a.humanize(humanizer) // 'catch all, below 1 day'
```