# uhrwerk 🕰

![dependencies](https://badgen.net/david/dep/cupcakearmy/uhrwerk)
![downloads badge](https://badgen.net/npm/dt/uhrwerk)
![types badge](https://badgen.net/npm/types/uhrwerk)
![version badge](https://badgen.net/npm/v/uhrwerk)
![minzip size badge](https://badgen.net/bundlephobia/minzip/uhrwerk)

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
- interval:
	- millisecond, milliseconds, ms
	- second, seconds, s
	- minute, minutes, m
	- hour, hours, h
	- day, days, d
	- week, weeks, w
	- year, years, y

###### Examples

```javascript
const a = new Duration(1, 'day')
const b = new Duration(2, 'days')
const c = new Duration(0.5, 'year')
const d = new Duration (Date.now(), 'ms')
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
The order of the array is important. The first match will return, like in a standard server router. The first argument is a function that takes the duration and returns a boolean. The second takes also matched duration and returns a string for the user.

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
