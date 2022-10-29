import InsightFacade from "../../src/controller/InsightFacade";

import {
	IInsightFacade,
	InsightDatasetKind,
	InsightError,
	NotFoundError,
	ResultTooLargeError
} from "../../src/controller/IInsightFacade";
import chai, {expect} from "chai";
import * as fs from "fs-extra";

import chaiAsPromised from "chai-as-promised";
import {folderTest} from "@ubccpsc310/folder-test";

chai.use(chaiAsPromised);


function getContents(path: string): string {
	return fs.readFileSync(path).toString("base64");
}

// describe("addDatasetTest", function () {
// 	let facade: InsightFacade;
// 	beforeEach(function () {
// 		fs.removeSync("./data");
// 		facade = new InsightFacade();
// 	});
//
//
// 	it("Check if dataset can be added", function () {
// 		const path: string = "test/resources/courses.zip";
// 		const fileContent = getContents(path);
// 		return facade.addDataset("ubc1", fileContent, InsightDatasetKind.Courses).then((insideDataset) => {
// 			const trueRes = ["ubc1"];
// 			expect(insideDataset).to.be.instanceof(Array);
// 			expect(insideDataset).to.have.deep.members(trueRes);
// 			expect(insideDataset).to.have.length(1);
// 		});
//
//
// 	});
//
// 	it("Check that only valid dataset is added", function () {
// 		const path: string = "test/resources/valid_dataset.zip";
// 		const fileContent = getContents(path);
// 		return facade.addDataset("dataset2", fileContent, InsightDatasetKind.Courses).then((insideDataset) => {
// 			const trueRes = ["dataset2"];
// 			expect(insideDataset).to.be.instanceof(Array);
// 			expect(insideDataset).to.have.deep.members(trueRes);
// 			expect(insideDataset).to.have.length(1);
// 		});
// 	});
//
//
// 	it("Check that name of dataset must not contain underscore", function () {
//
// 		const path: string = "test/resources/courses.zip";
// 		const fileContent = getContents(path);
// 		const result = facade.addDataset("ubc_1", fileContent, InsightDatasetKind.Courses);
// 		return expect(result).eventually.to.be.rejectedWith(InsightError);
//
//
// 	});
//
//
// 	it("Check that no duplicate datasets are added", function () {
// 		const path: string = "test/resources/courses.zip";
// 		const fileContent = getContents(path);
// 		return facade.addDataset("ubc1", fileContent, InsightDatasetKind.Courses).then(() => {
// 			const result = facade.addDataset("ubc1", fileContent, InsightDatasetKind.Courses);
// 			return expect(result).eventually.to.be.rejectedWith(InsightError);
// 		});
// 	});
//
// 	it("Check if multiple datasets can be added", function () {
// 		const path: string = "test/resources/courses.zip";
// 		const fileContent = getContents(path);
// 		return facade.addDataset("dataset1", fileContent, InsightDatasetKind.Courses).then(() => {
// 			return facade.addDataset("dataset2", fileContent, InsightDatasetKind.Courses).then(() => {
// 				return facade.addDataset("dataset3", fileContent, InsightDatasetKind.Courses).then((insideDataset) => {
// 					const trueRes = ["dataset1", "dataset2", "dataset3"];
// 					expect(insideDataset).to.be.instanceof(Array);
// 					expect(insideDataset).to.have.deep.members(trueRes);
// 					expect(insideDataset).to.have.length(3);
// 				});
// 			});
// 		});
//
// 	});
//
//
// 	it("Check that no invalid zip file is added", function () {
// 		const path: string = "test/resources/wrong_root_directory.zip";
// 		const fileContent = getContents(path);
// 		const result = facade.addDataset("dataset1", fileContent, InsightDatasetKind.Courses);
// 		return expect(result).eventually.to.be.rejectedWith(InsightError);
// 	});
//
//
// 	it("Check that non-empty zip file is added", function () {
//
// 		const path: string = "test/resources/empty_dataset.zip";
// 		const fileContent = getContents(path);
// 		const result = facade.addDataset("dataset1", fileContent, InsightDatasetKind.Courses);
// 		return expect(result).eventually.to.be.rejectedWith(InsightError);
// 	});
//
// 	it("Check that name of dataset must not contain whitespace", function () {
//
// 		const path: string = "test/resources/courses.zip";
// 		const fileContent = getContents(path);
// 		const result = facade.addDataset("  ", fileContent, InsightDatasetKind.Courses);
// 		return expect(result).eventually.to.be.rejectedWith(InsightError);
//
// 	});
//
//
// 	it("Check that any folder with non required files not added", function () {
// 		const path: string = "test/resources/invalid_course_file_inside.zip";
// 		const fileContent = getContents(path);
// 		const result = facade.addDataset("dataset1", fileContent, InsightDatasetKind.Courses);
// 		return expect(result).eventually.to.be.rejectedWith(InsightError);
// 	});
//
// 	it("Check that any other kind of file is not added", function () {
// 		const path: string = "test/resources/image.jpeg";
// 		const fileContent = getContents(path);
// 		const result = facade.addDataset("dataset1", fileContent, InsightDatasetKind.Courses);
// 		return expect(result).eventually.to.be.rejectedWith(InsightError);
// 	});
//
// });
//
// describe("listDatasetTest", function () {
//
//
// 	let insightFacade: IInsightFacade = new InsightFacade();
// 	beforeEach(function () {
// 		fs.removeSync("data");
// 		insightFacade = new InsightFacade();
//
// 	});
//
// 	function getFileContent(path: string): string {
// 		return fs.readFileSync(path).toString("base64");
// 	}
//
// 	it("Check that no dataset is listed if one does not exist", function () {
// 		return insightFacade.listDatasets().then((insideDataset) => {
// 			expect(insideDataset).to.be.instanceof(Array);
// 			expect(insideDataset).to.have.length(0);
// 		});
// 	});
// 	it("Check that dataset is listed if it exists", function () {
// 		const path: string = "test/resources/courses.zip";
// 		const fileContent = getFileContent(path);
// 		return insightFacade.addDataset("dataset1", fileContent, InsightDatasetKind.Courses).then(() => {
// 			return insightFacade.listDatasets().then((insideDataset) => {
// 				expect(insideDataset).to.deep.equals([{
// 					id: "dataset1",
// 					kind: InsightDatasetKind.Courses,
// 					numRows: 64612,
// 				}]);
// 				expect(insideDataset).to.be.instanceof(Array);
// 				expect(insideDataset).to.have.length(1);
// 			});
// 		});
// 	});
//
// 	it("Check that all datasets are listed if multiple exists", function () {
// 		const path: string = "test/resources/courses.zip";
// 		const fileContent = getFileContent(path);
// 		return insightFacade.addDataset("dataset1", fileContent, InsightDatasetKind.Courses).then(() => {
// 			return insightFacade.addDataset("dataset2", fileContent, InsightDatasetKind.Courses).then(() => {
// 				return insightFacade.listDatasets().then((insideDataset) => {
// 					const trueRes: InsightDataset[] = [
// 						{
// 							id: "dataset1",
// 							kind: InsightDatasetKind.Courses,
// 							numRows: 64612,
// 						},
// 						{
// 							id: "dataset2",
// 							kind: InsightDatasetKind.Courses,
// 							numRows: 64612,
// 						}];
// 					expect(insideDataset).to.have.deep.members(trueRes);
// 					expect(insideDataset).to.have.length(2);
// 				});
// 			});
// 		});
//
//
// 	});
//
// });
//
// describe("removeDatasetTest", function () {
// 	let insightFacade: InsightFacade;
// 	beforeEach(function () {
// 		fs.removeSync("data");
// 		insightFacade = new InsightFacade();
// 	});
//
// 	it("Check that dataset is removed", function () {
// 		const path: string = "test/resources/courses.zip";
// 		const fileContent = getContents(path);
// 		return insightFacade.addDataset("dataset1", fileContent, InsightDatasetKind.Courses).then(() => {
// 			return insightFacade.removeDataset("dataset1").then((insideDataset: any) => {
// 				expect(insideDataset).to.equal("dataset1");
// 			});
// 		});
// 	});
// 	it("Check that invalid dataset is not removed", function () {
// 		const result = insightFacade.removeDataset("dataset1");
// 		return expect(result).eventually.to.be.rejectedWith(NotFoundError);
//
// 	});
// 	it("Check that dataset with whitespace in id is not removed", function () {
// 		const path: string = "test/resources/courses.zip";
// 		const fileContent = getContents(path);
// 		insightFacade.addDataset("dataset1", fileContent, InsightDatasetKind.Courses).then(() => {
// 			const result = insightFacade.removeDataset(" ");
// 			return expect(result).eventually.to.be.rejectedWith(InsightError);
// 		});
// 	});
// 	it("Check that dataset with underscore in id is not removed", function () {
// 		const path: string = "test/resources/courses.zip";
// 		const fileContent = getContents(path);
// 		insightFacade.addDataset("dataset1", fileContent, InsightDatasetKind.Courses).then(() => {
// 			const result = insightFacade.removeDataset("dataset_1");
// 			return expect(result).eventually.to.be.rejectedWith(InsightError);
// 		});
// 	});
// });
//
// describe("performQueryTest", function () {
//
// 	let facade: IInsightFacade;
// 	before(function () {
// 		fs.removeSync("data");
// 		const path: string = "test/resources/courses.zip";
// 		const fileContent = getContents(path);
// 		facade = new InsightFacade();
// 		return facade.addDataset("courses", fileContent, InsightDatasetKind.Courses).then();
// 	});
// 	folderTest<Input, Output, Error>(
// 		"performQueryTest",
// 		(input: Input): Output => {
// 			return facade.performQuery(input);
// 		},
// 		"./test/resources/testjson",
// 		{
// 			errorValidator: (error: any): error is Error =>
// 				error === "InsightError" || error === "ResultTooLargeError" || error === "NotFoundError",
// 			assertOnError: ((expected: any, actual: any) => {
// 				if (expected === "InsightError") {
// 					expect(actual).to.be.instanceof(InsightError);
// 				} else if (expected === "ResultTooLargeError") {
// 					expect(actual).to.be.instanceof(ResultTooLargeError);
// 				} else if (expected === "NotFoundError") {
// 					expect(actual).to.be.instanceof(NotFoundError);
// 				} else {
// 					expect.fail("Unexpected Error");
// 				}
// 			})
// 		}
// 	);
//
//
// });

type Input = any;
type Output = any;
type Error = "InsightError" | "ResultTooLargeError" | "NotFoundError";

describe("Dynamic folder test", function () {
	let facade: IInsightFacade;
	before(function () {
		fs.removeSync("data");
		const path: string = "test/resources/courses.zip";
		const fileContent = getContents(path);
		facade = new InsightFacade();
		return facade.addDataset("courses", fileContent, InsightDatasetKind.Courses).then();
	});

	// Assert value equals expected
	function assertResult(actual: any, expected: Output): void {
		expect(actual).to.deep.equal(expected);
	}

	// Assert actual error is of expected type
	function assertError(actual: any, expected: Error): void {
		if (expected === "InsightError") {
			expect(actual).to.be.instanceof(InsightError);
		} else if (expected === "ResultTooLargeError") {
			expect(actual).to.be.instanceof(ResultTooLargeError);
		} else if (expected === "NotFoundError") {
			expect(actual).to.be.instanceof(NotFoundError);
		} else {
			expect.fail("Unexpected Error");
		}
	}

	folderTest<Input, Output, Error>(
		"PerformQuery Tests",                               // suiteName
		(input: Input): Output => facade.performQuery(input),      // target
		"./test/resources/json",                   // path
		{
			assertOnResult: assertResult,
			assertOnError: assertError,                 // options
		}
	);
});
