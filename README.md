# Script to migrate collection from MongoDB to AWS DynamoDB

### Prerequisites
1. Install node and npm from [here](https://nodejs.org/en).
2. Create User with write access to DynamoDB in AWS. Note the access keys as they are required in next steps.
3. Have read access to MongoDB Datebase and Collection.

### Setup
1. Clone the directory
2. Open terminal and navigate to the project directory
3. Run command `npm install`
4. Replace AWS access key, secret access key and MongoDB connection URI in .env file with your own
5. Replace fields in < > in export_mongo_aws.js

### Run
1. To execute script run command `node export_mongo_aws.js`


