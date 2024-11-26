let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
const { application, response } = require("express");
const expect = chai.expect;

chai.should();

chai.use(chaiHttp);
const { sendMail } = require("../../utils/email_service");
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
    it("Tries to create a job without auth", (done) => {
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
        .post("/api/v1/users/createjob")
        .send(body)
        .end((err, response) => {
          response.body.should.be.a("object");
          expect(response.body).to.have.property("message");
          expect(response.body).to.have.property("message", "NOT CREATED");
          // throws a type error because there is not user to associate the job with

          done();
        });
    });
  });

  describe("POST /api/v1/users/create-session", () => {
    it("attempts to create a session, but fails", (done) => {
      const body = { email: "test@example.com", password: "password123" };
      chai
        .request("http://localhost:8000")
        .post("/api/v1/users/create-session")
        .send(body)

        .end((err, response) => {
          response.body.should.be.a("object");
          expect(response.body).to.have.property(
            "message",
            "Invalid username or password"
          );

          done();
        });
    });
  });

  describe("POST /api/v1/users/createapplication", () => {
    it("creates an application for a job, applies for a job", (done) => {
      body = {
        applicantid: "507f1f77bcf86cd799439011",
        applicantname: "Nick Case",
        applicantemail: "nickrcase@gmail.com",
        applicantskills: "talking",
        skills: "communication",
        address: "100 Street",
        phonenumber: "9192492323",
        hours: "30",
        dob: "10/10/10",
        gender: "male",
        jobname: "cashier",
        jobid: "507f1f77bcf86cd799439012",
        managerid: "507f1f77bcf86cd799439013",
      };

      chai
        .request("http://localhost:8000")
        .post("/api/v1/users/createapplication")
        .send(body)

        .end((err, response) => {
          //console.log(response.body);
          response.body.should.be.a("object");
          expect(response.body)
            .to.have.property("data")
            .to.have.property("application")
            .to.have.property("applicantid", "507f1f77bcf86cd799439011");

          expect(response.body)
            .to.have.property("data")
            .to.have.property("application")
            .to.have.property("jobname", "cashier");

          expect(response.body)
            .to.have.property("data")
            .to.have.property("application")
            .to.have.property("address", "100 Street");

          expect(response.body)
            .to.have.property("data")
            .to.have.property("application")
            .to.have.property("status", "applied");

          expect(response.body).to.have.property("message", "Job Created!!");

          expect(response.body).to.have.property("success", true);

          //console.log(response.body);

          done();
        });
    });
  });

  describe("POST /api/v1/users/modifyapplication 1", () => {
    it("modifies an application, adding answers to the screening", (done) => {
      job = {
        applicantid: "60a7f3c8b9e1c82f3c9d4e5f",
        applicantname: "Olivia Rodriguez",
        applicantemail: "olivia.r2024@example.com",
        applicantskills: "problem-solving, teamwork",
        skills: "customer service, cash handling",
        address: "742 Evergreen Terrace, Springfield",
        phonenumber: "5551234567",
        hours: "25",
        dob: "03/15/1998",
        gender: "female",
        jobname: "retail associate",
        jobid: "60a7f3c8b9e1c82f3c9d4e60",
        managerid: "60a7f3c8b9e1c82f3c9d4e61",
      };

      chai
        .request("http://localhost:8000")
        .post("/api/v1/users/createapplication")
        .send(job)

        .end((err, responseJob) => {
          expect(responseJob.body)
            .to.have.property("data")
            .to.have.property("application")
            .to.have.property("applicantid", "60a7f3c8b9e1c82f3c9d4e5f");

          expect(responseJob.body)
            .to.have.property("data")
            .to.have.property("application")
            .to.have.property("jobname", "retail associate");

          expect(responseJob.body)
            .to.have.property("data")
            .to.have.property("application")
            .to.have.property("address", "742 Evergreen Terrace, Springfield");

          expect(responseJob.body)
            .to.have.property("data")
            .to.have.property("application")
            .to.have.property("status", "applied");

          expect(responseJob.body).to.have.property("message", "Job Created!!");

          expect(responseJob.body).to.have.property("success", true);

          id = responseJob.body.data.application._id;
          const body = {
            applicationId: id,
            status: "grading",
            answer1: "a",
            answer2: "b",
            answer3: "c",
            answer4: "d",
          };

          chai
            .request("http://localhost:8000")
            .post("/api/v1/users/modifyapplication")
            .send(body)

            .end((err, response) => {
              //console.log(response.body);

              response.body.should.be.a("object");
              expect(response.body)
                .to.have.property("data")
                .to.have.property("application")
                .to.have.property("applicantid", "60a7f3c8b9e1c82f3c9d4e5f");

              expect(response.body)
                .to.have.property("data")
                .to.have.property("application")
                .to.have.property("jobname", "retail associate");

              expect(response.body)
                .to.have.property("data")
                .to.have.property("application")
                .to.have.property(
                  "address",
                  "742 Evergreen Terrace, Springfield"
                );

              expect(response.body)
                .to.have.property("data")
                .to.have.property("application")
                .to.have.property("status", "grading");

              expect(response.body).to.have.property(
                "message",
                "Application is updated Successfully"
              );

              expect(response.body)
                .to.have.property("data")
                .to.have.property("application")
                .to.have.property("answer1", "a");

              expect(response.body)
                .to.have.property("data")
                .to.have.property("application")
                .to.have.property("answer2", "b");

              expect(response.body)
                .to.have.property("data")
                .to.have.property("application")
                .to.have.property("answer3", "c");

              expect(response.body)
                .to.have.property("data")
                .to.have.property("application")
                .to.have.property("answer4", "d");

              expect(response.body).to.have.property("success", true);

              done();
            });
        });
    });
  });

  describe("POST /api/v1/users/modifyapplication 2", () => {
    it("modifies an application, changing the rating of the application", (done) => {
      job = {
        applicantid: "60a7f3c8b9e1c82f3c9d4e5f",
        applicantname: "Olivia Rodriguez",
        applicantemail: "olivia.r2024@example.com",
        applicantskills: "problem-solving, teamwork",
        skills: "customer service, cash handling",
        address: "742 Evergreen Terrace, Springfield",
        phonenumber: "5551234567",
        hours: "25",
        dob: "03/15/1998",
        gender: "female",
        jobname: "retail associate",
        jobid: "60a7f3c8b9e1c82f3c9d4e60",
        managerid: "60a7f3c8b9e1c82f3c9d4e61",
      };

      chai
        .request("http://localhost:8000")
        .post("/api/v1/users/createapplication")
        .send(job)

        .end((err, responseJob) => {
          expect(responseJob.body)
            .to.have.property("data")
            .to.have.property("application")
            .to.have.property("applicantid", "60a7f3c8b9e1c82f3c9d4e5f");

          expect(responseJob.body)
            .to.have.property("data")
            .to.have.property("application")
            .to.have.property("jobname", "retail associate");

          expect(responseJob.body)
            .to.have.property("data")
            .to.have.property("application")
            .to.have.property("address", "742 Evergreen Terrace, Springfield");

          expect(responseJob.body)
            .to.have.property("data")
            .to.have.property("application")
            .to.have.property("status", "applied");

          expect(responseJob.body).to.have.property("message", "Job Created!!");

          expect(responseJob.body).to.have.property("success", true);

          id = responseJob.body.data.application._id;
          const body = {
            applicationId: id,
            status: "rating",
            rating: "5",
          };

          chai
            .request("http://localhost:8000")
            .post("/api/v1/users/modifyapplication")
            .send(body)

            .end((err, response) => {
              //console.log(response.body);

              response.body.should.be.a("object");
              expect(response.body)
                .to.have.property("data")
                .to.have.property("application")
                .to.have.property("applicantid", "60a7f3c8b9e1c82f3c9d4e5f");

              expect(response.body)
                .to.have.property("data")
                .to.have.property("application")
                .to.have.property("jobname", "retail associate");

              expect(response.body)
                .to.have.property("data")
                .to.have.property("application")
                .to.have.property(
                  "address",
                  "742 Evergreen Terrace, Springfield"
                );

              expect(response.body)
                .to.have.property("data")
                .to.have.property("application")
                .to.have.property("status", "rating");

              expect(response.body).to.have.property(
                "message",
                "Application is updated Successfully"
              );

              expect(response.body).to.have.property("success", true);

              done();
            });
        });
    });
  });

  // describe("POST /api/v1/users/acceptapplication", () => {
  //   it("accepts an application", (done) => {
  //     job = {
  //       applicantid: "60a7f3c8b9e1c82f3c9d4e5f",
  //       applicantname: "Liam Smith",
  //       applicantemail: "liam.smith2024@example.com",
  //       applicantskills: "leadership, adaptability",
  //       skills: "sales, inventory management",
  //       address: "123 Maple Lane, Anytown",
  //       phonenumber: "5559876543",
  //       hours: "35",
  //       dob: "05/20/1995",
  //       gender: "male",
  //       jobname: "store manager",
  //       jobid: "60a7f3c8b9e1c82f3c9d4e61",
  //       managerid: "60a7f3c8b9e1c82f3c9d4e62",
  //     };

  //     chai
  //       .request("http://localhost:8000")
  //       .post("/api/v1/users/createapplication")
  //       .send(job)
  //       .end((err, responseJob) => {
  //         expect(responseJob.body)
  //           .to.have.property("data")
  //           .to.have.property("application")
  //           .to.have.property("applicantid", "60a7f3c8b9e1c82f3c9d4e5f");

  //         expect(responseJob.body)
  //           .to.have.property("data")
  //           .to.have.property("application")
  //           .to.have.property("jobname", "store manager");

  //         expect(responseJob.body)
  //           .to.have.property("data")
  //           .to.have.property("application")
  //           .to.have.property("address", "123 Maple Lane, Anytown");

  //         expect(responseJob.body)
  //           .to.have.property("data")
  //           .to.have.property("application")
  //           .to.have.property("status", "applied");

  //         expect(responseJob.body).to.have.property("message", "Job Created!!");

  //         expect(responseJob.body).to.have.property("success", true);

  //         expect(responseJob.body).to.have.nested.property(
  //           "data.application._id"
  //         );

  //         id = responseJob.body.data.application._id;
  //         const body = {
  //           applicationId: id,
  //         };

  //         console.log(body);

  //         chai
  //           .request("http://localhost:8000")
  //           .post("/api/v1/users/acceptapplication")
  //           .send(body)

  //           .end((err, response) => {
  //             console.log(response);

  //             //response.body.should.be.a("object");

  //             done();
  //           });
  //       });
  //   });
  // });
});

describe("Email Service", () => {
    let sendMailStub;

    beforeEach(() => {
        // Stub nodemailer transporter
        const transporter = nodemailer.createTransport();
        sendMailStub = sinon.stub(transporter, "sendMail");
    });

    afterEach(() => {
        sendMailStub.restore(); // Restore the stub after each test
    });

    it("should send an email successfully", async () => {
        sendMailStub.resolves({ response: "Email sent successfully" });

        const result = await sendMail("test@example.com", "Test Subject", "Test Body");
        expect(result).to.be.true;
        sinon.assert.calledOnce(sendMailStub);
    });

    it("should fail to send an email with invalid recipient", async () => {
        sendMailStub.rejects(new Error("Invalid email address"));

        const result = await sendMail("invalid-email", "Test Subject", "Test Body");
        expect(result).to.be.false;
        sinon.assert.calledOnce(sendMailStub);
    });

    it("should fail to send an email without subject", async () => {
        sendMailStub.rejects(new Error("Missing subject"));

        const result = await sendMail("test@example.com", "", "Test Body");
        expect(result).to.be.false;
        sinon.assert.calledOnce(sendMailStub);
    });

    it("should fail to send an email without body", async () => {
        sendMailStub.rejects(new Error("Missing email body"));

        const result = await sendMail("test@example.com", "Test Subject", "");
        expect(result).to.be.false;
        sinon.assert.calledOnce(sendMailStub);
    });

    it("should fail to send an email without recipient", async () => {
        sendMailStub.rejects(new Error("Missing recipient"));

        const result = await sendMail("", "Test Subject", "Test Body");
        expect(result).to.be.false;
        sinon.assert.calledOnce(sendMailStub);
    });

    it("should send an email with special characters in the subject", async () => {
        sendMailStub.resolves({ response: "Email sent successfully" });

        const result = await sendMail("test@example.com", "Subject with @#$%", "Test Body");
        expect(result).to.be.true;
        sinon.assert.calledOnce(sendMailStub);
    });

    it("should send an email with HTML body content", async () => {
        sendMailStub.resolves({ response: "Email sent successfully" });

        const result = await sendMail(
            "test@example.com",
            "Test Subject",
            "<h1>Hello, this is a test email</h1>"
        );
        expect(result).to.be.true;
        sinon.assert.calledOnce(sendMailStub);
    });

    it("should handle email service downtime gracefully", async () => {
        sendMailStub.rejects(new Error("Service unavailable"));

        const result = await sendMail("test@example.com", "Test Subject", "Test Body");
        expect(result).to.be.false;
        sinon.assert.calledOnce(sendMailStub);
    });

    it("should log debug information when sending an email", async () => {
        sendMailStub.resolves({ response: "Email sent successfully" });

        const consoleLogStub = sinon.stub(console, "log");
        await sendMail("test@example.com", "Test Subject", "Test Body");

        sinon.assert.calledWithMatch(consoleLogStub, "[DEBUG] Sending email with options:");
        consoleLogStub.restore();
    });

    it("should handle authentication errors", async () => {
        sendMailStub.rejects(new Error("Invalid authentication"));

        const result = await sendMail("test@example.com", "Test Subject", "Test Body");
        expect(result).to.be.false;
        sinon.assert.calledOnce(sendMailStub);
    });

    it("should send an email to multiple recipients", async () => {
        sendMailStub.resolves({ response: "Email sent successfully" });

        const result = await sendMail(
            "test1@example.com,test2@example.com",
            "Test Subject",
            "Test Body"
        );
        expect(result).to.be.true;
        sinon.assert.calledOnce(sendMailStub);
    });

    it("should send an email with a long subject line", async () => {
        const longSubject = "This is a very long subject line that exceeds typical length limits";
        sendMailStub.resolves({ response: "Email sent successfully" });

        const result = await sendMail("test@example.com", longSubject, "Test Body");
        expect(result).to.be.true;
        sinon.assert.calledOnce(sendMailStub);
    });

    it("should send an email with a long body", async () => {
        const longBody = "This is a very long email body".repeat(100);
        sendMailStub.resolves({ response: "Email sent successfully" });

        const result = await sendMail("test@example.com", "Test Subject", longBody);
        expect(result).to.be.true;
        sinon.assert.calledOnce(sendMailStub);
    });

    it("should not send an email if transporter throws an error", async () => {
        sendMailStub.throws(new Error("Transporter error"));

        const result = await sendMail("test@example.com", "Test Subject", "Test Body");
        expect(result).to.be.false;
        sinon.assert.calledOnce(sendMailStub);
    });

    it("should send an email with unicode characters in the body", async () => {
        sendMailStub.resolves({ response: "Email sent successfully" });

        const result = await sendMail("test@example.com", "Test Subject", "Hello, 世界!");
        expect(result).to.be.true;
        sinon.assert.calledOnce(sendMailStub);
    });

    it("should send an email with emojis in the body", async () => {
        sendMailStub.resolves({ response: "Email sent successfully" });

        const result = await sendMail("test@example.com", "Test Subject", "Hello, 😊!");
        expect(result).to.be.true;
        sinon.assert.calledOnce(sendMailStub);
    });

    it("should handle invalid SMTP configuration", async () => {
        sendMailStub.rejects(new Error("Invalid SMTP configuration"));

        const result = await sendMail("test@example.com", "Test Subject", "Test Body");
        expect(result).to.be.false;
        sinon.assert.calledOnce(sendMailStub);
    });

    it("should handle sending email with CC", async () => {
        sendMailStub.resolves({ response: "Email sent successfully" });

        const result = await sendMail("test@example.com", "Test Subject", "Test Body", {
            cc: "cc@example.com",
        });
        expect(result).to.be.true;
        sinon.assert.calledOnce(sendMailStub);
    });

    it("should handle sending email with BCC", async () => {
        sendMailStub.resolves({ response: "Email sent successfully" });

        const result = await sendMail("test@example.com", "Test Subject", "Test Body", {
            bcc: "bcc@example.com",
        });
        expect(result).to.be.true;
        sinon.assert.calledOnce(sendMailStub);
    });

    it("should send an email with attachments", async () => {
        sendMailStub.resolves({ response: "Email sent successfully" });

        const result = await sendMail("test@example.com", "Test Subject", "Test Body", {
            attachments: [{ filename: "test.txt", content: "Hello, world!" }],
        });
        expect(result).to.be.true;
        sinon.assert.calledOnce(sendMailStub);
    });
});
