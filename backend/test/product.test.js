import supertest from "supertest";
import { web } from "../src/utils/database/web.js";
import { logger } from "../src/utils/database/logging.js";
import { createProduct, deleteAllProducts } from "./test-utils.js";
import { createAdminToken, deleteAuth } from "./test-utils.js";
import path from "path";

describe("GET /api/products", function () {
  afterEach(async function () {
    await deleteAllProducts();
  });

  it("should return a list of products", async function () {
    await createProduct();
    const res = await supertest(web).get("/api/products");
    logger.info(res.body);
    expect(res.statusCode).toBe(200);
  });

  it("should products not found", async function () {
    const res = await supertest(web).get("/api/products");
    expect(res.status).toBe(404);
    expect(res.body.errors).toBe("Products not found");
  });
});

describe("GET /api/products/:id", function () {
  afterEach(async function () {
    await deleteAllProducts();
  });

  it("should get product by id", async function () {
    const product = await createProduct();
    const res = await supertest(web).get(`/api/products/${product.id}`);

    logger.info(res.body);
    expect(res.statusCode).toBe(200);
  });

  it("should invalid product not found", async function () {
    const res = await supertest(web).get("/api/products/1");
    logger.info(res.body);
    expect(res.status).toBe(404);
    expect(res.body.errors).toBe("Product not found");
  });
});

describe("POST /api/products", function () {
  let token;
  const imagePath = path.join(__dirname, "..", "public", "images", "image.jpg"); // Ensure this file exists
  // console.log(imagePath);
  beforeEach(async function () {
    token = await createAdminToken();
  });

  afterEach(async function () {
    await deleteAuth();
    await deleteAllProducts();
  });

  it("should create new product", async function () {
    const res = await supertest(web)
      .post("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .field("name", "Test Product")
      .field("price", 100000)
      .field("desc", "Product for testing")
      .field("qty", 0)
      .attach("image", imagePath); // Ensure the field name is "image"

    expect(res.status).toBe(201);
    expect(res.body.data.name).toBe("Test Product");
  });

  it("should invalid token", async function () {
    const res = await supertest(web)
      .post("/api/products")
      .set("Authorization", `Bearer 11`)
      .field("name", "Test Product")
      .field("price", 100000)
      .field("desc", "Product for testing")
      .field("qty", 100)
      .attach("image", imagePath); // Ensure the field name is "image"

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Unauthorized");
  });

  it("should invalid data validation", async function () {
    const res = await supertest(web)
      .post("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .field("name", "") // ini error: name kosong
      .field("price", "bukan angka") // ini error: price bukan number
      .field("desc", "Product for testing")
      .field("qty", "-10") // ini juga error kalau qty tidak boleh negatif
      .attach("image", imagePath);

    expect(res.statusCode).toBe(400);
  });

  it("should invalid data validation with image", async function () {
    const imagePathError = path.join(
      __dirname,
      "..",
      "public",
      "images",
      "image.gif"
    ); // Ensure this file exists

    const res = await supertest(web)
      .post(`/api/products`)
      .set("Authorization", `Bearer ${token}`)
      .field("name", "") // ini error: name kosong
      .field("price", "bukan angka") // ini error: price bukan number
      .field("desc", "Product for testing")
      .field("qty", "-10") // ini juga error kalau qty tidak boleh negatif
      .attach("image", imagePathError);
    expect(res.status).toBe(400);
    expect(res.body.errors).toContain(
      "Only image files (jpg, png, jpeg) are allowed!"
    );
  });
});

describe("PUT /api/products/:id", function () {
  let token;
  const imagePath = path.join(__dirname, "..", "public", "images", "image.jpg"); // Ensure this file exists
  beforeEach(async function () {
    token = await createAdminToken();
  });

  afterEach(async function () {
    await deleteAuth();
    await deleteAllProducts();
  });

  it("should update product by id", async function () {
    const product = await createProduct();
    const res = await supertest(web)
      .put(`/api/products/${product.id}`)
      .set("Authorization", `Bearer ${token}`)
      .field("name", "Test Product")
      .field("price", 100000)
      .field("desc", "Product for testing")
      .field("qty", 100)
      .attach("image", imagePath); // Ensure the field name is "image"

    expect(res.status).toBe(200);
  });

  it("should invalid token", async function () {
    const product = await createProduct();
    const res = await supertest(web)
      .put(`/api/products/${product.id}`)
      .set("Authorization", `Bearer 11`)
      .field("name", "Test Product")
      .field("price", 100000)
      .field("desc", "Product for testing")
      .field("qty", 100)
      .attach("image", imagePath); // Ensure the field name is "image"

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Unauthorized");
  });

  it("should invalid data validation with image", async function () {
    const product = await createProduct();
    const imagePathError = path.join(
      __dirname,
      "..",
      "public",
      "images",
      "image.gif"
    ); // Ensure this file exists

    const res = await supertest(web)
      .put(`/api/products/${product.id}`)
      .set("Authorization", `Bearer ${token}`)
      .field("name", "") // ini error: name kosong
      .field("price", "bukan angka") // ini error: price bukan number
      .field("desc", "Product for testing")
      .field("qty", "-10") // ini juga error kalau qty tidak boleh negatif
      .attach("image", imagePathError);
    expect(res.status).toBe(400);
    expect(res.body.errors).toContain(
      "Only image files (jpg, png, jpeg) are allowed!"
    );
  });

  it("should invalid data validation", async function () {
    const product = await createProduct();

    const res = await supertest(web)
      .put(`/api/products/${product.id}`)
      .set("Authorization", `Bearer ${token}`)
      .field("name", "") // ini error: name kosong
      .field("price", "bukan angka") // ini error: price bukan number
      .field("desc", "Product for testing")
      .field("qty", "-10") // ini juga error kalau qty tidak boleh negatif
      .attach("image", imagePath);

    expect(res.status).toBe(400);
  });
});

describe("DELETE /api/products/:id", function () {
  let token;
  beforeEach(async function () {
    token = await createAdminToken();
  });
  afterEach(async function () {
    await deleteAuth();
    await deleteAllProducts();
  });

  it("should delete product by id", async function () {
    const product = await createProduct();
    const res = await supertest(web)
      .delete(`/api/products/${product.id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
  });

  it("should invalid token", async function () {
    const product = await createProduct();
    const res = await supertest(web)
      .delete(`/api/products/${product.id}`)
      .set("Authorization", `Bearer 11`);
    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Unauthorized");
  });

  it("should id not found", async function () {
    const res = await supertest(web)
      .delete(`/api/products/10`)
      .set("Authorization", `Bearer ${token}`);
    logger.info(res.body);
    expect(res.status).toBe(400);
    expect(res.body.errors).toBe("Invalid");
  });
});

describe("GET /api/products/search", function () {
  beforeEach(async function () {
    await createProduct();
  });

  afterEach(async function () {
    await deleteAllProducts();
  });
  it("should search product", async function () {
    const res = await supertest(web).get("/api/products/search?keyword=test");
    logger.info(res.body);
    expect(res.status).toBe(200);
  });

  it("should product not found", async function () {
    const res = await supertest(web).get("/api/products/search?keyword=baru");
    expect(res.status).toBe(404);
    expect(res.body.errors).toBe("Products not found");
  });

  it("should keyword is required", async function () {
    const res = await supertest(web).get("/api/products/search");
    expect(res.status).toBe(400);
    expect(res.body.errors).toBe("Search query is required");
  });
});
