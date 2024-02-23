const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



const db = mongoose.connection;

db.on("connected", () => {
  console.log("Connected to MongoDB");
});

db.on("error", (err) => {
  console.error("Error connecting to MongoDB:", err);
});

db.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  img: Array,
});

const Product = mongoose.model("Product", productSchema);

async function saveProductsOnce(products) {
  try {
  
    const existingProducts = await Product.find();
    if (existingProducts.length === 0) {
      await Product.insertMany(products);
      console.log("Products saved successfully");
    } else {
      console.log("Products already exist in the database, skipping save.");
    }
  } catch (error) {
    console.error("Error saving products:", error);
  }
}

const products = [
  {
    name: "Xiaomi Redmi 10 6GB/128GB",
    price: 399,
    img: [
      "https://sonic.ge/dyn/HPVhZCTW3BQ_YvQtIPfjr-FkxAVog0R7ie-PSxMyjl0/rs:fit:720:0/plain/images/products/original/7a592172-332c-4c6a-8f7a-6189e13c6a8f.jpg",
      "https://sonic.ge/dyn/v3H1h8pTBzxj_m673pd73ZPUaqu3I8WBbIXU5IXwYBs/rs:fit:720:0/plain/images/products/original/18e3a972-0a1d-417d-a1cd-d57e3547cb02.jpg",
      "https://sonic.ge/dyn/pbQY6imAsDrgvI6TA_iR0A2noaztNQ2HFCXrccEvZOM/rs:fit:720:0/plain/images/products/original/8bae1649-f2cc-4e0d-9b1a-33703942f6d6.jpg",
    ],
  },
  {
    name: "Nokia 125",
    price: 112,
    img: [
      "https://sonic.ge/dyn/F_x5jAshtKgTFcYOmWPMTN2VXW1Yvv7qZvMEiwhQKmk/rs:fit:720:0/plain/images/products/original/b01f6706-b2fe-4570-b6a9-1ad6e3a8f35a.jpg",
      "https://sonic.ge/dyn/_FH2GK4woFcML9fRB88q7BxJJXxiiJG2IctO9ubOu74/rs:fit:720:0/plain/images/products/original/707aff12-ddf6-4d89-8f94-6b2c2fdae06b.jpg",
      "https://sonic.ge/dyn/CGioUwkL88_PlIdK7PvytwQhZNX8lMW4xFwSK6IFPRE/rs:fit:720:0/plain/images/products/original/3ffa42be-14fc-495f-bcb6-83c22eeb2749.jpg",
    ],
  },
  {
    name: "Nokia C21 PLUS 3GB/32GB",
    price: 389,
    img: [
      "https://sonic.ge/dyn/YDhkEbAqrT5B8K8aI9J4MwPuLZViSB99lbqPBx8FlP8/rs:fit:720:0/plain/images/products/original/d7f5a34e-3c23-4b10-920e-66f3500a9fa6.jpg",
      "https://sonic.ge/dyn/haeQQ07ZUpGm7eIeUncJ4LWNbdx_lx0U7D2n1uqu_u0/rs:fit:720:0/plain/images/products/original/456a73dd-39c1-482e-ad7d-271feeb944cc.jpg",
      "https://sonic.ge/dyn/ciL8qTpCZGYR8HU8BKQVvpwDhmkAkje8TwtuRzMoJsg/rs:fit:720:0/plain/images/products/original/71c42c21-8cc2-4545-aa79-a22679f105b4.jpg",
    ],
  },
  {
    name: "Samsung A546E Galaxy A54",
    price: 1019,
    img: [
      "https://sonic.ge/dyn/mb8GM7P_Hw4rbFVBxKNKxXw2tdjAp9wODlQowgBsQqI/rs:fit:720:0/plain/images/products/original/4420540c-7832-4cb2-b30d-061b6fd27227.jpg",
      "https://sonic.ge/dyn/ZYgj7oRB58Qj3kvUW04sVKsTh7MNIsXBBSffIbqTgMc/rs:fit:720:0/plain/images/products/original/6b0667cf-ba19-4c85-a780-11b3750c5ac5.jpg",
      "https://sonic.ge/dyn/_dqgyVSXddXDE4XCZQI91YqF75ibVNjRn-RIHWGDoUw/rs:fit:720:0/plain/images/products/original/983a9e96-f82a-4159-8653-87ceb8876508.jpg",
    ],
  },
  {
    name: "NOKIA 105",
    price: 89,
    img: [
      "https://sonic.ge/dyn/QbXp7M2YZQ5JMR9ynyOddcszCSVG-balALKS7vlnFpY/rs:fit:720:0/plain/images/products/original/36cf06e1-b0bc-4a91-98ac-7f8de837126d.jpg",
      "https://sonic.ge/dyn/GjcnBoGRc5w3qVYSbPZe_837f3nHBYeWuiIfid2ERuA/rs:fit:720:0/plain/images/products/original/a5bc59c4-df55-4f34-a3ed-7ab16e2446e0.jpg",
    ],
  },
  {
    name: "Samsung Galaxy A22 ",
    price: 499,
    img: [
      "https://sonic.ge/dyn/9cPyFEAuiTvtyso_rAzJzH0_F9ORR2vMygrXMlEhUCs/rs:fit:720:0/plain/images/products/original/594d4caa-d6a6-4be4-bb4b-12878be1a94d.jpg",
      "https://sonic.ge/dyn/GFqPKhBOse9n4T1zsZwEtakvadfVAT9l32GpBy8pk9o/rs:fit:720:0/plain/images/products/original/4b8eeb2c-4cfa-41c4-ae54-f13e54fdfdf6.jpg",
    ],
  },
];

saveProductsOnce(products);

app.get("/products", async (req, res) => {
  try {
    const allProducts = await Product.find();
    res.json(allProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Error fetching products");
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
