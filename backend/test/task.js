let chai = require("chai");
let chaiHttp = require("chai-http");

chai.should();

chai.use(chaiHttp);
const jwt = require('jsonwebtoken');

chai.use(chaiHttp);
const expect = chai.expect;

describe("Backend API testing", () => {
  let authToken;

  //before(async () => {
  //   try {
  //     // Create a test user or use an existing one
  //     const testUser = {
  //       email: "testuser@example.com",
  //       password: "testpassword"
  //     };

  //     // Login to get the auth token
  //     const response = await chai
  //       .request("http://localhost:8000")
  //       .post("/api/v1/users/createsession")
  //       .send(testUser);

  //     expect(response).to.have.status(200);
  //     expect(response.body.data).to.have.property('token');
  //     authToken = response.body.data.token;
  //   } catch (error) {
  //     console.error("Error in before hook:", error);
  //     throw error;
  //   }
  // });

  describe("GET /api/v1/users/createsession", () => {
    it("hits the create session endpoint which should be empty since nothing was passed in", async () => {
      try {
        const response = await chai
          .request("http://localhost:8000")
          .get("/api/v1/users/createsession")
          .set('Authorization', `Bearer ${authToken}`);
    
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body).to.be.empty;
        console.log(response.body);
      } catch (error) {
        throw error;
      }
    });
  });
});


  // describe("GET /api/v1/users/", () => {
  //   it("IT SHOULD RETURN ALL THE JOBS", (done) => {
  //     // const task = {
  //     //     email:'shaangzb@gmail.com',
  //     //     password:'123',

  //     // };

  //     chai
  //       .request("http://localhost:8000")
  //       .get("/api/v1/users/")

  //       .end((err, response) => {
  //         response.body.should.be.a("object");

  //         console.log("*********", response.body);

  //         done();
  //       });
  //   });
  // });

  // describe("GET /api/v1/users/", () => {
  //   it("IT SHOULD RETURN ALL THE JOBS", (done) => {
  //     // const task = {
  //     //     email:'shaangzb@gmail.com',
  //     //     password:'123',

  //     // };

  //     chai
  //       .request("http://localhost:8000")
  //       .get("/api/v1/users/")

  //       .end((err, response) => {
  //         response.body.should.be.a("object");

  //         console.log("*********", response.body);

  //         done();
  //       });
  //   });
  // });

  // describe("POST /api/v1/users/createjob", () => {
  //   it("IT SHOULD RETURN THE JOB", (done) => {
  //     const body = {
  //       name: "Shaan",
  //       managerid: "1234556",
  //       skills: "C,java",
  //       location: "Noida",
  //       description: "xyz",
  //       pay: "10",
  //       schedule: "10/10/10",
  //     };

  //     chai
  //       .request("http://localhost:8000")
  //       .post("/api/v1/users/createjob")
  //       .send({
  //         name: "Shaan",
  //         managerid: "1234556",
  //         skills: "C,java",
  //         location: "Noida",
  //         description: "xyz",
  //         pay: "10",
  //         schedule: "10/10/10",
  //       })
  //       .end((err, response) => {
  //         response.body.should.be.a("object");

  //         console.log("*********", response.body);

  //         done();
  //       });
  //   });
  // });

  // describe("GET /api/v1/users/search", () => {
  //   it("IT SHOULD RETURN THE SEARCHED JOB", (done) => {
  //     const body = {
  //       name: "Shaan",
  //       managerid: "1234556",
  //       skills: "C,java",
  //       location: "Noida",
  //       description: "xyz",
  //       pay: "10",
  //       schedule: "10/10/10",
  //     };

  //     chai
  //       .request("http://localhost:8000")
  //       .get("/api/v1/users/search/TA")
  //       // .send(body)
  //       .end((err, response) => {
  //         response.body.should.be.a("object");

  //         console.log("*********", response.body.users);

  //         done();
  //       });
  //   });
  // });

  // describe("POST /api/v1/users/create-session", () => {
  //   it("IT SHOULD RETURN THE USER", (done) => {
  //     const body = { email: "boss@gmail.com", password: "123" };
  //     chai
  //       .request("http://localhost:8000")
  //       .post("/api/v1/users/create-session")
  //       .send(body)

  //       .end((err, response) => {
  //         response.body.should.be.a("object");

  //         console.log("*********", response.body);

  //         done();
  //       });
  //   });
  // });
