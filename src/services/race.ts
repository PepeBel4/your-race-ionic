export class Race {
	constructor(
		public id: number,
		public name: string,
		public metrics?: string,
		public race_competitors?: string,
		public race_scorings?: string,
		public scheduled_for?: Date,
		public started_at?: Date,
		public ongoingFor?: number,
		public finished_at?: Date,
		public canceled_at?: Date,
		public aasm?: string
	) {}
}