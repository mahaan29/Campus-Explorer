import Server from "../../src/rest/Server";
import InsightFacade from "../../src/controller/InsightFacade";
import {expect} from "chai";
let chai = require("chai")
	, chaiHttp = require("chai-http");
import * as fs from "fs-extra";
const SERVER_URL = "http://localhost:4321";
const queryExample = {
	WHERE: {
		OR: [
			{
				AND: [
					{
						GT: {}
					},
					{
						IS: {
							courses_dept: "adhe"
						}
					}
				]
			},
			{
				EQ: {
					courses_avg: 95
				}
			}
		]
	}
};

describe("Server tests", function () {

	let facade: InsightFacade;
	let server: Server;
	let dataCourses: any;
	chai.use(chaiHttp);

	before(function () {
		facade = new InsightFacade();
		server = new Server(4321);
		server.start().then((val: any) => {
			console.log("App::initServer() - started: " + val);
		}).catch(function (err: Error) {
			console.log("App::initServer() - ERROR: " + err.message);
		});
		dataCourses = fs.readFileSync("./test/resources/courses.zip");
		fs.removeSync("./data");
		fs.mkdir("./data");
	});

	after(function () {
		server.stop();
	});


	it("PUT test for courses dataset", function () {
		try {
			return chai.request(SERVER_URL)
				.put("/dataset/courses/courses")
				.send(dataCourses)
				.set("Content-Type", "application/x-zip-compressed")
				.then((res: any) => {
					expect(res.status).to.be.equal(200);
				})
				.catch(function (err: any) {
					console.log(err);
					expect.fail();
				});
		} catch (err) {
			console.log(err);
		}
	});


	it("DELETE test for courses dataset", function () {
		try {
			return chai.request(SERVER_URL)
				.put("/dataset/courses/courses")
				.send(dataCourses)
				.set("Content-Type", "application/x-zip-compressed")
				.then(() => {
					return chai.request(SERVER_URL)
						.delete("/dataset/courses")
						.then((res: any) => {
							expect(res.status).to.be.equal(200);
						})
						.catch(function (err: any) {
							console.log(err);
							expect.fail();
						});
				})
				.catch(function (err: any) {
					console.log(err);
					expect.fail();
				});
		} catch (err) {
			console.log(err);
		}
	});

	it("List test for courses dataset", function () {
		try {
			return chai.request(SERVER_URL)
				.put("/dataset/courses/courses")
				.send(dataCourses)
				.set("Content-Type", "application/x-zip-compressed")
				.then(() => {
					return chai.request(SERVER_URL)
						.get("/datasets")
						.then((res: any) => {
							expect(res.status).to.be.equal(200);
						})
						.catch(function (err: any) {
							console.log(err);
							expect.fail();
						});
				})
				.catch(function (err: any) {
					console.log(err);
					expect.fail();
				});
		} catch (err) {
			console.log(err);
		}
	});

	it("Query test for courses dataset", function () {
		try {
			return chai.request(SERVER_URL)
				.put("/dataset/courses/courses")
				.send(dataCourses)
				.set("Content-Type", "application/x-zip-compressed")
				.then(() => {
					return chai.request(SERVER_URL)
						.post("/query")
						.send(queryExample)
						.then((res: any) => {
							expect(res.status).to.be.equal(400);
						})
						.catch(function (err: any) {
							console.log(err);
							expect.fail();
						});
				})
				.catch(function (err: any) {
					console.log(err);
					expect.fail();
				});
		} catch (err) {
			console.log(err);
		}
	});
});
