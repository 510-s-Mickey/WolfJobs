let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
const expect = chai.expect;

chai.should();

chai.use(chaiHttp);

describe("Backend API", () => {
  describe("GET /api/v1/users/fetchapplications", () => {
    it("Returns all applications (manager)", (done) => {
      const session = chai
        .request("http://localhost:8000")
        .get("/api/v1/users/fetchapplications")

        .end((err, response) => {
          response.body.should.be.a("object");
          expect(response.body).to.have.property(
            "message",
            "List of Applications"
          );
          expect(response.body).to.have.property("application");
          expect(response.body)
            .to.have.property("application")
            .that.is.an("array").empty;

          done();
        });
    });
  });

  describe("GET /api/v1/users/", () => {
    it("Returns all the jobs (user)", (done) => {
      chai
        .request("http://localhost:8000")
        .get("/api/v1/users/")

        .end((err, response) => {
          response.body.should.be.a("object");
          expect(response.body).to.have.property("message", "List of jobs");
          expect(response.body).to.have.property("jobs");
          expect(response.body).to.have.property("jobs").that.is.an("array")
            .empty;

          done();
        });
    });
  });

  describe("POST /api/v1/users/createjob", () => {
    it("Creates a user and a job and returns it", (done) => {
      const body = {
        name: "Shaan",
        managerid: "1234556",
        skills: "C,java",
        location: "Noida",
        description: "xyz",
        pay: "10",
        schedule: "10/10/10",
      };

      const body2 = {
        role: "Manager",
        name: "Nick Case",
        password: "password",
        email: "n@h.com",
        confirm_password: "password",
      };

      // chai
      //   .request("http://localhost:8000")
      //   .post("/api/v1/users/signup")
      //   .send(body2)
      //   .end((err, response) => {
      //     response.body.should.be.a("object");

      //     //console.log("*********", response);
      //   });

      chai
        .request("http://localhost:8000")
        .post("/api/v1/users/createjob")
        .send(body)
        .end((err, response) => {
          response.body.should.be.a("object");

          //console.log("*********", response);

          done();
        });
    });
  });

  describe("GET /api/v1/users/search", () => {
    it("IT SHOULD RETURN THE SEARCHED JOB", (done) => {
      const body = {
        name: "Shaan",
        managerid: "1234556",
        skills: "C,java",
        location: "Noida",
        description: "xyz",
        pay: "10",
        schedule: "10/10/10",
      };

      chai
        .request("http://localhost:8000")
        .get("/api/v1/users/search/TA")
        // .send(body)
        .end((err, response) => {
          response.body.should.be.a("object");

          console.log("*********", response.body.users);

          done();
        });
    });
  });

  describe("POST /api/v1/users/create-session", () => {
    it("IT SHOULD RETURN THE USER", (done) => {
      const body = { email: "boss@gmail.com", password: "123" };
      chai
        .request("http://localhost:8000")
        .post("/api/v1/users/create-session")
        .send(body)

        .end((err, response) => {
          response.body.should.be.a("object");

          console.log("*********", response.body);

          done();
        });
    });
  });
});
