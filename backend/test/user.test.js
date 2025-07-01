import supertest from "supertest";
import { web } from "../src/utils/database/web.js";
import { logger } from "../src/utils/database/logging.js";
import { deleteAuth, createAdmin } from "./test-utils.js";

describe("POST /api/register", function () {
  afterEach(async function () {
    await deleteAuth();
  });

  it("should create user", async function () {
    const res = await supertest(web).post("/api/register").send({
      name: "test",
      email: "test@gmail.com",
      password: "test",
      address: "test",
      role: "admin",
    });

    logger.info(res.body);

    expect(res.statusCode).toBe(201);
    expect(res.body.data.name).toBe("test");
    expect(res.body.data.email).toBe("test@gmail.com");
    expect(res.body.data.address).toBe("test");
    expect(res.body.data.role).toBe("admin");
  });

  it("should already exists email", async function () {
    await supertest(web).post("/api/register").send({
      name: "test",
      email: "test@gmail.com",
      password: "test",
      address: "test",
      role: "admin",
    });

    const res2 = await supertest(web).post("/api/register").send({
      name: "test",
      email: "test@gmail.com",
      password: "test",
      address: "test",
      role: "admin",
    });

    expect(res2.statusCode).toBe(400);
    expect(res2.body.errors).toBe("User already exists");
  });
});

describe("POST /api/login", function () {
  beforeEach(async function () {
    await createAdmin();
  });
  afterEach(async function () {
    await deleteAuth();
  });

  it("should login user", async function () {
    const res = await supertest(web).post("/api/login").send({
      email: "test@gmail.com",
      password: "test",
    });

    logger.info(res.body);

    expect(res.statusCode).toBe(200);
    expect(res.body.data).toBeDefined();
  });

  it("invalid password", async function () {
    const res = await supertest(web).post("/api/login").send({
      email: "test@gmail.com",
      password: "test1",
    });

    expect(res.statusCode).toBe(401);
    expect(res.body.errors).toBe("Invalid credentials");
  });

  it("invalid email", async function () {
    const res = await supertest(web).post("/api/login").send({
      email: "test1@gmail.com",
      password: "test",
    });

    expect(res.statusCode).toBe(404);
    expect(res.body.errors).toBe("Invalid credentials");
  });
});

describe("POST /api/logout", function () {
  beforeEach(async function () {
    token = await createAdmin();
  });
  afterEach(async function () {
    await deleteAuth();
  });

  it("should logout user", async function () {
    const loginRes = await supertest(web).post("/api/login").send({
      email: "test@gmail.com",
      password: "test",
    });
    console.log("Token from login:", loginRes.body.data); // ← Tambahkan ini

    const token = loginRes.body?.data;
    expect(token).toBeDefined();
  });
});
