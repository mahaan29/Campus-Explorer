import {IInsightFacade, InsightDataset, InsightDatasetKind, InsightError, NotFoundError} from "./IInsightFacade";
import JSZip from "jszip";
import {CourseSection} from "./CourseSection";
import {InsightFacadePerformQuery} from "./InsightFacadePerformQuery";


let datasetsAdded: InsightDataset[];
let zip = new JSZip();
let records: CourseSection[];
let jsonArray: any;


const fs = require("fs-extra");

/**
 * This is the main programmatic entry point for the project.
 * Method documentation is in IInsightFacade
 *
 */
export default class InsightFacade extends InsightFacadePerformQuery implements IInsightFacade {
	constructor() {
		super();
		console.log("InsightFacadeImpl::init()");
		records = [];
		zip = new JSZip();
		jsonArray = [];
		datasetsAdded = [];
	}

	public addDataset(id: string, content: string, kind: InsightDatasetKind): Promise<string[]> {
		if (id.includes("_") || id.match(/\s/) != null) {
			return Promise.reject(new InsightError("Insight Error"));
		} else if ((datasetsAdded.filter((dataset: any) => dataset.id === id)).length > 0) {
			return Promise.reject(new InsightError("Insight Error"));
		} else {
			if (kind === InsightDatasetKind.Courses) {
				return zip.loadAsync(content, {base64: true}).then((result: any) => {
					if (result.folder(/courses/).length === 0) {
						return Promise.reject(new InsightError("InsightError"));
					}
					if (result.file(/.*/).length === 0) {
						return Promise.reject(new InsightError("InsightError"));
					}
					let counter = 0;
					return this.datasetAdder(result, counter).then((val) => {
						if (val === 0) {
							return Promise.reject(new InsightError("InsightError"));
						} else {
							for (let i of records) {
								jsonArray.push(i.toJson());
							}
							this.courseLocalStorage(id);
							datasetsAdded.push({id: id, numRows: records.length, kind: kind});
							let retArray: string[];
							retArray = [];
							records = [];
							for (let i of datasetsAdded) {
								retArray.push(i.id);
							}
							return Promise.resolve(retArray);
						}
					});
				}).catch(() => {
					return Promise.reject(new InsightError("InsightError"));
				});
			}
			return Promise.reject(new InsightError("InsightError"));
		}
	}

	private datasetAdder(result: any, counter: number): Promise<number> {
		let PromiseArray: Array<Promise<string>> = [];
		result.folder("courses").forEach((relativePath: any, file: any) => {
			PromiseArray.push(file.async("string"));
		});
		return Promise.all(PromiseArray).then((ArrayContents: string[]) => {
			ArrayContents.forEach((val) => {
				try {
					let parsedData = JSON.parse(val);
					let tempRows: CourseSection[];
					tempRows = [];
					for (let i of parsedData.result) {
						if (i.Section === "overall") {
							tempRows.push(new CourseSection(i.Course, i.Audit, i.Avg, i.Subject, i.Fail, i.Professor,
								i.Pass, i.Title, i.id.toString(), 1900));
						} else {
							tempRows.push(new CourseSection(i.Course, i.Audit, i.Avg, i.Subject, i.Fail, i.Professor,
								i.Pass, i.Title, i.id.toString(), +i.Year));
						}
					}
					if (tempRows.length === 0) {
						throw new Error();
					}
					records = records.concat(tempRows);
					counter++;
				} catch (e) {
					// console.log("Invalid ye wala");
				}

			});
			return counter;
		});
	}

	private courseLocalStorage(id: string) {
		fs.ensureDir("./data").then(() => {
			fs.writeJSON("./data/" + id + ".json", JSON.stringify(jsonArray), {name: "fs-extra"});
		});

	}

	public removeDataset(id: string): Promise<string> {
		if (id.includes("_") || id.match(/\s/) != null) {
			return Promise.reject(new InsightError("Invalid"));
		} else if (datasetsAdded.filter((dataset) => dataset.id === id).length === 0) {
			return Promise.reject(new NotFoundError("NotFoundError"));
		} else {
			const index = datasetsAdded.findIndex((dataset) => dataset.id === id);
			datasetsAdded.splice(index, 1);
			fs.remove("./data/" + id + ".json", (error: any) => {
				if (error) {
					return Promise.reject(new InsightError());
				}
			});
			return Promise.resolve(id);
		}
	}

	public listDatasets(): Promise<InsightDataset[]> {
		return Promise.resolve(datasetsAdded);
	}
}
