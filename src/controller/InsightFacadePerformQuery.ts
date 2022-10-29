import {InsightError, InsightResult, ResultTooLargeError} from "./IInsightFacade";
import {initialArray, InsightFacadePerformQueryPro} from "./InsightFacadePerformQueryPro";
export let filterArray: any[];
let finalArray: any, dName: any;

export class InsightFacadePerformQuery extends InsightFacadePerformQueryPro {
	public performQuery(query: unknown): Promise<InsightResult[]> {
		try{
			let realQuery: any;
			if (query === null || query === undefined) {
				return Promise.reject(new InsightError("InsightError"));
			} else {
				if (this.queryValidity(query)) {
					console.log("Query validated.");
					realQuery = query;
					let a: any = realQuery["OPTIONS"], b: any = a["COLUMNS"], c: any = b[0], d: any = c.split("_");
					dName = d[0];
					filterArray = [];
					finalArray = [];
					this.loadDataset(dName);
					if (this.whereFilterValidity(realQuery["WHERE"])) {
						if (this.optionsValidity(realQuery["OPTIONS"])) {
							if (finalArray.length > 5000) {
								return Promise.reject(new ResultTooLargeError());
							} else {
								return Promise.resolve(finalArray);
							}
						}
					}
				}
				return Promise.reject(new InsightError());
			}
		} catch (e){
			return Promise.reject(new InsightError());
		}
	}

	public optionsValidity(optionQuery: any): boolean {
		let options: any[] = Object.values(optionQuery["COLUMNS"]), reqKeys: any = [];
		if (options.length === 0) {
			console.log("OPTIONS cannot be 0");
			return false;
		}
		let arr: any, databaseName: any, field: any, colArray: any = [];
		for (let i in options) {
			arr = options[i].split("_");
			databaseName = arr[0];
			field = arr[1];
			if (databaseName !== dName) {
				console.log("Database does not match");
				return false;
			}
			if (field === "avg" || field === "pass" || field === "fail" || field === "audit" || field === "year" ||
				field === "dept" || field === "id" || field === "instructor" || field === "title" || field === "uuid") {
				colArray.push(field);
				reqKeys.push(options[i]);
			} else {
				return false;
			}
		}
		for (let i of filterArray) {
			let indexArray: {[key: string]: any} = {};
			for (let j in colArray) {
				indexArray[reqKeys[j]] = this.getValue(i, colArray[j]);
			}
			finalArray.push(indexArray);
		}
		if ("ORDER" in optionQuery) {
			let order = optionQuery["ORDER"];
			if (typeof order !== "string") {
				return false;
			}
			if (!reqKeys.includes(order)) {
				console.log("Columns does not contain order parameter");
				return false;
			}
			finalArray.sort((a: any, b: any) => (a[order] > b[order]) ? 1 : -1);
		}
		console.log(finalArray);
		return true;
	}

	private whereFilterValidity(filterQuery: any): boolean {
		filterArray = [];
		let filters: any[] = Object.keys(filterQuery),filter = filters[0];
		if (filter === "LT" || filter === "GT" || filter === "EQ") {
			let mComparisonKey: any = Object.keys(filterQuery[filter]);
			let mComparisonValue: any = Object.values(filterQuery[filter]);
			if (mComparisonKey.length > 1 || mComparisonKey === 0 || typeof mComparisonValue[0] !== "number") {
				return false;
			}
			let arr = mComparisonKey[0].split("_"), databaseName = arr[0], field = arr[1];
			if (!databaseName.match(dName)) {
				return false;
			}
			if (!(field === "avg" || field === "pass" || field === "fail" || field === "audit" || field === "year")) {
				return false;
			}
			this.mCompHelper(filter, field, mComparisonValue);
		}
		if (filter === "IS") {
			let sComparisonKey: any = Object.keys(filterQuery[filter]);
			let sComparisonValue: any = Object.values(filterQuery[filter]);
			if (sComparisonValue.length > 1) {
				return false;
			}
			let arr = sComparisonKey[0].split("_"), databaseName = arr[0], field = arr[1];
			if (!databaseName.match(dName)) {
				return false;
			}
			if (!(field === "dept" || field === "id" || field === "instructor" ||
				field === "title" || field === "uuid")) {
				return false;
			}
			this.sCompHelper(field, sComparisonValue);
		}
		if (filter === "OR") {
			if(filterQuery.length === 0){
				return false;
			}
			return this.orHelper(filterQuery);
		}

		if (filter === "AND") {
			if(filterQuery.length === 0){
				return false;
			}
			return this.andHelper(filterQuery);
		}
		this.negationChecker(filter, filterQuery);
		return true;
	}

	public andHelper(filterQuery: any): boolean {
		let query: any = filterQuery["AND"], leftQuery: any = query[0], rightQuery: any = query[1], arr1: any[];
		let arr2: any[];
		if (this.whereFilterValidity(leftQuery)) {
			arr1 = [];
			for (let i of filterArray) {
				arr1.push(i);
			}
		} else {
			return false;
		}
		if (this.whereFilterValidity(rightQuery)) {
			arr2 = [];
			for (let i of filterArray) {
				arr2.push(i);
			}
		} else {
			return false;
		}
		let tempArray: any[];
		tempArray = [];
		for (let i of arr1) {
			if (!tempArray.includes(i) && arr2.includes(i)) {
				tempArray.push(i);
			}
		}
		for (let i of arr2) {
			if (!tempArray.includes(i) && arr1.includes(i)) {
				tempArray.push(i);
			}
		}
		filterArray = [];
		for (let i of tempArray) {
			filterArray.push(i);
		}
		return true;
	}

	private orHelper(filterQuery: any): boolean {
		let query: any = filterQuery["OR"], leftQuery: any = query[0], rightQuery: any = query[1], arr1: any[];
		let arr2: any[];
		if (this.whereFilterValidity(leftQuery)) {
			arr1 = [];
			for (let i of filterArray) {
				arr1.push(i);
			}
		} else {
			return false;
		}
		if (this.whereFilterValidity(rightQuery)) {
			arr2 = [];
			for (let i of filterArray) {
				arr2.push(i);
			}
		} else {
			return false;
		}
		let tempArray: any[];
		tempArray = [];
		for (let i of arr1) {
			if (!tempArray.includes(i)) {
				tempArray.push(i);
			}
		}
		for (let i of arr2) {
			if (!tempArray.includes(i)) {
				tempArray.push(i);
			}
		}
		filterArray = [];
		for (let i of tempArray) {
			filterArray.push(i);
		}
		return true;
	}

	private sCompHelper(field: any, sComparisonValue: any) {
		for (let i of initialArray) {
			if (field === "dept") {
				if (i.dept.match(sComparisonValue[0])) {
					filterArray.push(i);
				}
			}
			if (field === "id") {
				if (i.id.match(sComparisonValue[0])) {
					filterArray.push(i);
				}
			}
			if (field === "instructor") {
				if (i.intructor.match(sComparisonValue[0])) {
					filterArray.push(i);
				}
			}
			if (field === "title") {
				if (i.title.match(sComparisonValue[0])) {
					filterArray.push(i);
				}
			}
			if (field === "uuid") {
				if (i.uuid.match(sComparisonValue[0])) {
					filterArray.push(i);
				}
			}

		}
	}

	private negationChecker(filter: any, filterQuery: any) {
		if (filter === "NOT") {
			let diff: any;
			if (this.whereFilterValidity(filterQuery["NOT"])) {
				diff = initialArray.filter((x) => !filterArray.includes(x));
			}
			filterArray = [];
			for (let i of diff) {
				filterArray.push(i);
			}
		}
	}
}
