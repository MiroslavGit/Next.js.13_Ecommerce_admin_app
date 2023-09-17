/* Advanced connect to mongodb with bucket for uploading files */
import { MongoClient, GridFSBucket } from "mongodb";

declare global {
  var client: MongoClient | null;
  var bucket: GridFSBucket | null;
}

const MONGODB_URI = process.env.MONGODB_URI;
const DEFAULT_BUCKET_NAME = "images";  // Default bucket name for storing images

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

export async function connectToDb() {
  if (global.client) {
    return {
      client: global.client,
      bucket: global.bucket!,
    };
  }

  const client = (global.client = new MongoClient(MONGODB_URI!, {}));
  const bucket = (global.bucket = new GridFSBucket(client.db(), { bucketName: DEFAULT_BUCKET_NAME }));

  await global.client.connect();
  console.log("Connected to the Database ");
  return { client, bucket: bucket! };
}

// utility to check if file exists
export async function fileExists(filename: string): Promise<boolean> {
  const { client } = await connectToDb();
  const count = await client
    .db()
    .collection("images.files")
    .countDocuments({ filename });

  return !!count;
}


/* Vanilla connect to mongodb with nextAuth */
// import { MongoClient } from "mongodb";

// if (!process.env.MONGODB_URI) {
//   throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
// }

// const uri = process.env.MONGODB_URI;
// const options = {};

// let client;
// let clientPromise;

// if (process.env.NODE_ENV === "development") {
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(uri, options);
//     global._mongoClientPromise = client.connect();
//   }
//   clientPromise = global._mongoClientPromise;
// } else {
//   client = new MongoClient(uri, options);
//   clientPromise = client.connect();
// }

// export default clientPromise;
