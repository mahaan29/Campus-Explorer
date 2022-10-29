import fs from "fs-extra";
import {filterArray} from "./InsightFacadePerformQuery";

let queryKeys: string[] = ["WHERE", "OPTIONS"];
export let initialArray: any[];
export class InsightFacadePerformQueryPro {

	protected loadDataset(datasetName: any): boolean {
		initialArray = [];
		const jsonFile = fs.readFileSync("./data/" + datasetName + ".json", "utf-8");
		let parsedData = JSON.parse(jsonFile);
		parsedData = JSON.parse(parsedData);
		if (parsedData !== null) {
			initialArray = [];
			for (let i of parsedData) {
				initialArray.push(i);
			}
			return true;
		}

		return false;
	}

	public queryValidity(query: any): boolean {
		let keysInQuery: any[] = Object.keys(query);


		for (let key of keysInQuery) {
			if (!(queryKeys.includes(key))) {
				console.log("Invalid key");
				return false;
			}
		}

		if (!("WHERE" in query)) {
			console.log("WHERE does not exist in the query.");
			return false;
		}

		if (!("OPTIONS" in query)) {
			console.log("OPTIONS does not exist in query");
			return false;
		}
		return true;
	}

	protected getValue(i: any, key: any): any {
		if (key === "avg") {
			return i.avg;
		} else if (key === "pass") {
			return i.pass;
		} else if (key === "fail") {
			return i.fail;
		} else if (key === "dept") {
			return i.dept;
		} else if (key === "audit") {
			return i.audit;
		} else if (key === "year") {
			return i.year;
		} else if (key === "id") {
			return i.id;
		} else if (key === "instructor") {
			return i.instructor;
		} else if (key === "uuid") {
			return i.uuid;
		} else if (key === "title") {
			return i.title;
		} else {
			return 0;
		}
	}

	protected mCompHelper(filter: any, field: any, mComparisonValue: any) {
		if (filter === "GT") {
			this.mCompGTHelper(field, mComparisonValue);
		} else if (filter === "LT") {
			this.mCompLTHelper(field, mComparisonValue);
		} else if (filter === "EQ") {
			this.mCompEQHELPER(field, mComparisonValue);
		}
	}

	private mCompGTHelper(field: any, mComparisonValue: any) {
		for (let i of initialArray) {
			if (field === "avg") {
				if (i.avg > mComparisonValue[0]) {
					filterArray.push(i);
				}
			} else if (field === "pass") {
				if (i.pass > mComparisonValue[0]) {
					filterArray.push(i);
				}
			} else if (field === "fail") {
				if (i.fail > mComparisonValue[0]) {
					filterArray.push(i);
				}
			} else if (field === "audit") {
				if (i.audit > mComparisonValue[0]) {
					filterArray.push(i);
				}
			} else if (field === "year") {
				if (i.year > mComparisonValue[0]) {
					filterArray.push(i);
				}
			}
		}
	}

	private mCompLTHelper(field: any, mComparisonValue: any) {
		for (let i of initialArray) {
			if (field === "avg") {
				if (i.avg < mComparisonValue[0]) {
					filterArray.push(i);
				}
			} else if (field === "pass") {
				if (i.pass < mComparisonValue[0]) {
					filterArray.push(i);
				}
			} else if (field === "fail") {
				if (i.fail < mComparisonValue[0]) {
					filterArray.push(i);
				}
			} else if (field === "audit") {
				if (i.audit < mComparisonValue[0]) {
					filterArray.push(i);
				}
			} else if (field === "year") {
				if (i.year < mComparisonValue[0]) {
					filterArray.push(i);
				}
			}
		}
	}

	private mCompEQHELPER(field: any, mComparisonValue: any) {
		for (let i of initialArray) {
			if (field === "avg") {
				if (i.avg === mComparisonValue[0]) {
					filterArray.push(i);
				}
			} else if (field === "pass") {
				if (i.pass === mComparisonValue[0]) {
					filterArray.push(i);
				}
			} else if (field === "fail") {
				if (i.fail === mComparisonValue[0]) {
					filterArray.push(i);
				}
			} else if (field === "audit") {
				if (i.audit === mComparisonValue[0]) {
					filterArray.push(i);
				}
			} else if (field === "year") {
				if (i.year === mComparisonValue[0]) {
					filterArray.push(i);
				}
			}
		}
	}
}
