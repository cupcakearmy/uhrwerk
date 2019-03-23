type Intervals =
	'millisecond'
	| 'milliseconds'
	| 'second'
	| 'seconds'
	| 'minute'
	| 'minutes'
	| 'hour'
	| 'hours'
	| 'day'
	| 'days'
	| 'week'
	| 'weeks'
	| 'year'
	| 'years'

const Millisecond = 1
const Second = Millisecond * 1000
const Minute = Second * 60
const Hour = Minute * 60
const Day = Hour * 24
const Week = Day * 7
const Year = Day * 365.25

export type HumanizerTestFN = (duration: Duration) => boolean
export type HumanizerReturnFN = (duration: Duration) => string
export type Humanizer = [HumanizerTestFN, HumanizerReturnFN][]

const defaultHumanizer: Humanizer = [
	[d => d.years() > 0, d => `${d.years()} years`],
	[d => d.weeks() > 1, d => `${d.weeks()} weeks`],
	[d => d.days() > 0, d => `${d.days()} days`],
	[d => d.hours() > 0, d => `${d.hours()} hours`],
	[d => d.minutes() > 5, d => `${d.minutes()} minutes`],
	[d => d.minutes() > 0, d => `a few minutes`],
	[() => true, () => `a moment`],
]


export class Duration {

	private duration: number

	constructor(amount: number, interval: Intervals) {
		this.duration = Duration.ProcessInterval(amount, interval)
	}

	private static ProcessInterval(amount: number, interval: Intervals): number {
		switch (interval.toLowerCase()) {
			case 'millisecond':
			case 'milliseconds':
				return amount * Millisecond
			case 'second':
			case 'seconds':
				return amount * Second
			case 'minute':
			case 'minutes':
				return amount * Minute
			case 'hour':
			case 'hours':
				return amount * Hour
			case 'day':
			case 'days':
				return amount * Day
			case 'week':
			case 'weeks':
				return amount * Week
			case 'year':
			case 'years':
				return amount * Year
			default:
				throw new Error('Wrong interval')
		}
	}

	public add(amount: number, interval: Intervals): Duration {
		this.duration += Duration.ProcessInterval(amount, interval)
		return this
	}

	public subtract(amount: number, interval: Intervals): Duration {
		this.duration -= Duration.ProcessInterval(amount, interval)
		return this
	}

	public asMilliseconds(): number {
		return this.duration
	}

	public asSeconds(): number {
		return this.duration / Second
	}

	public asMinutes(): number {
		return this.duration / Minute
	}

	public asHours(): number {
		return this.duration / Hour
	}

	public asDays(): number {
		return this.duration / Day
	}

	public asWeeks(): number {
		return this.duration / Week
	}

	public asYears(): number {
		return this.duration / Year
	}

	public milliseconds(): number {
		return (this.duration % Year % Day % Hour % Minute % Second) / Millisecond | 0
	}

	public seconds(): number {
		return (this.duration % Year % Day % Hour % Minute) / Second | 0
	}

	public minutes(): number {
		return (this.duration % Year % Day % Hour) / Minute | 0
	}

	public hours(): number {
		return (this.duration % Year % Day) / Hour | 0
	}

	public days(): number {
		return (this.duration % Year) / Day | 0
	}

	public weeks(): number {
		return (this.duration) / Week | 0
	}

	public years(): number {
		return (this.duration) / Year | 0
	}

	public humanize(humanizer?: Humanizer): string {
		if(!humanizer) humanizer = defaultHumanizer

		for (const [control, value] of humanizer)
			if (control(this))
				return value(this)

		return ''
	}
}