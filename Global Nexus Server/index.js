const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const serviceAccount = require("./firebase-adminSdk.json");
const admin = require("firebase-admin");

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to GlobalNexus !");
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.rtqrgc9.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const verifyIdToken = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).send({ message: "Unauthorized Access !" });
  }
  const token = authorization.split(" ")[1];

  try {
    const decode = await admin.auth().verifyIdToken(token);
    req.token_email = decode.email;
    next();
  } catch (error) {
    res.status(401).send({
      message: "Token not verified !",
      statement: "Unauthorized Access ",
    });
  }
};

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const productsDB = client.db("ProductsDB");
    const productsCollection = productsDB.collection("Products");
    const importsCollection = productsDB.collection("Imports");

    app.get("/latest-products", async (req, res) => {
      const cursor = productsCollection.find().sort({ createdAt: -1 }).limit(6);
      const result = await cursor.toArray();
      res.send(result);
    }); ///Complete

    app.get("/products", async (req, res) => {
      const result = await productsCollection.find().toArray();
      res.send(result);
    }); ///Complete

    app.get("/my-exports", verifyIdToken, async (req, res) => {
      const exported = req.query.email;
      const email = req.token_email;

      if (exported !== email) {
        return res.status(403).send({ message: "forbidden access" });
      }
      const result = await productsCollection
        .find({ exported_by: exported })
        .toArray();
      res.send(result);
    }); ///Complete

    app.get("/my-imports", verifyIdToken, async (req, res) => {
      const imported = req.query.email;
      const email = req.token_email;
      if (imported !== email) {
        return res.status(403).send({ message: "forbidden access" });
      }
      const result = await importsCollection
        .find({ imported_by: imported })
        .toArray();
      res.send(result);
    }); ///Complete

    app.get("/product-details/:id", verifyIdToken, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await productsCollection.findOne(query);
      res.send(result);
    }); ///Complete

    app.get("/search", async (req, res) => {
      const searching = req.query.name;
      const result = await productsCollection
        .find({ product_name: { $regex: searching, $options: "i" } })
        .toArray();
      res.send(result);
    }); ///Complete

    app.patch("/update-export/:id", verifyIdToken, async (req, res) => {
      const product_id = req.params.id;
      const updated = req.body;
      const query = { _id: new ObjectId(product_id) };

      const update = { $set: { ...updated } };
      const options = {};
      const result = await productsCollection.updateOne(query, update, options);
      res.send({ Success: true, result });
    });

    app.post("/import-product/:id", verifyIdToken,async (req, res) => {
      const importProduct = req.body;
      const product_id = req.params.id;
      const import_qty = Number(importProduct.import_quantity);
      const query = { _id: new ObjectId(product_id) };
      const product = await productsCollection.findOne(query);

      if (typeof product.available_quantity === "string") {
        const quantity = Number(product.available_quantity);
        await productsCollection.updateOne(query, {
          $set: { available_quantity: quantity },
        });
      }

      const update = {
        $inc: {
          available_quantity: -import_qty,
        },
      };
      const result = await importsCollection.insertOne(importProduct);
      const updatedProduct = await productsCollection.updateOne(query, update);

      res.send({ result, updatedProduct });
    }); ///Complete

    app.post("/products", verifyIdToken, async (req, res) => {
      const product = req.body;
      const exported = req.headers.email;
      const email = req.token_email;

      if (exported !== email) {
        return res.status(403).send({ message: "forbidden access" });
      }
      const result = await productsCollection.insertOne(product);
      res.send({ success: true, result });
    }); ///Complete

    app.delete("/export-product/:id", verifyIdToken,async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await productsCollection.deleteOne(query);
      res.send(result);
    }); ///Complete

    app.delete("/import-product/:id", verifyIdToken ,async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await importsCollection.deleteOne(query);
      res.send(result);
    }); ///Complete

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
  } finally {
    // Ensures that the client will close when you finish/error
    //     await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`GlobalNexus app listening on port ${port}`);
});
