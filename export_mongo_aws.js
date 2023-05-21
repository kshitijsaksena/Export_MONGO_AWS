const {  DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { PutCommand, DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const awsClient = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(awsClient);

async function run() {
  try {
    await client.connect();
    
    const cursor = client.db("<MONGO_DATABASE>").collection("<MONGO_COLLECTION>").find({});

    for await (const c of cursor) {
      const command = new PutCommand({
        TableName: "<AWS_DYNAMO_TABLE>",
        Item: {
          <AWS_TABLE_FIELD>: c.<MONGO_COLLECTION_FIELD>
        },
      });

      // Example for Item object
      //   Item: {
      //     name: c.name,
      //     age: c.age,
      //     address: c.address,
      //     phoneNumber: c.phoneNumber
      //   }

      const response = await docClient.send(command);
      console.log(response);
    }
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
