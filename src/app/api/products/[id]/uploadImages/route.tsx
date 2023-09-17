import { NextRequest, NextResponse } from 'next/server'
import { mongooseConnect } from '@/../lib/mongoose';
import { connectToDb, fileExists } from '@/../lib/mongodb';
import { Readable } from 'stream';

type Params = {
  params: { id: string };
};

/* Post images of product */
export async function POST(req: NextRequest, { params }: Params) {
  await mongooseConnect();
  const { bucket } = await connectToDb();

  const data = await req.formData();

  for (const entry of Array.from(data.entries())) {
    const [key, value] = entry;
    // FormDataEntryValue can either be type `Blob` or `string`
    // if its type is object then it's a Blob
    const isFile = typeof value == "object";

    if (isFile) {
      const blob = value as Blob;
      const filename = blob.name;

      // const existing = await fileExists(filename);
      // if (existing) {
      //   continue;
      // }

      //conver the blob to stream
      const buffer = Buffer.from(await blob.arrayBuffer());
      const stream = Readable.from(buffer);

      const uploadStream = bucket.openUploadStream(filename, {
        // make sure to add content type so that it will be easier to set later.
        contentType: blob.type,
        metadata: { productId: params.id },
      });

      // pipe the readable stream to a writeable stream to save it to the database
      stream.pipe(uploadStream);
    }
  }

  // return the response after all the entries have been processed.
  return NextResponse.json({ status: 200, success: true });
}

export async function GET(req: NextRequest, { params }: Params) {
  // 1. get GridFS bucket
  const { bucket } = await connectToDb();

  const productID = params.id as string;;
  // 2. validate the filename
  if (!productID) {
    return new NextResponse(null, { status: 400, statusText: "Bad Request" });
  }

  const files = await bucket.find({ "metadata.productId": productID }).toArray();
  if (!files.length) {
    return new NextResponse(null, { status: 404, statusText: "Images to this product not found" });
  }

  // 3. get file data
  const file = files.at(0)!;

  // 4. get the file contents as stream
  // Force the type to be ReadableStream since NextResponse doesn't accept GridFSBucketReadStream
  const stream = bucket.openDownloadStreamByName(file.filename) as unknown as ReadableStream;

  // 5. return a streamed response
  return new NextResponse(stream, {
    headers: {
      "Content-Type": file.contentType!,
    },
  });
}