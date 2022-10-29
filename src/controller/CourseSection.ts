export class CourseSection {
	public id: string;
	public audit: number;
	public avg: number;
	public dept: string;
	public fail: number;
	public instructor: string;
	public pass: number;
	public title: string;
	public uuid: string;
	public year: number;

	constructor(id: string, audit: number, avg: number, dept: string, fail: number, instructor: string, pass: number,
		title: string, uuid: string, year: number) {
		this.id = id;
		this.audit = audit;
		this.avg = avg;
		this.dept = dept;
		this.fail = fail;
		this.instructor = instructor;
		this.pass = pass;
		this.title = title;
		this.uuid = uuid;
		this.year = year;
	}

	public toJson(): any {
		return {
			id: this.id,
			audit: this.audit,
			avg: this.avg,
			dept: this.dept,
			fail: this.fail,
			instructor: this.instructor,
			pass: this.pass,
			title: this.title,
			uuid: this.uuid,
			year: this.year
		};
	}
}
