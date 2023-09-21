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
        contentType: blob.type,
        metadata: { productId: params.id },
      });

      // pipe the readable stream to a writeable stream to save it to the database
      stream.pipe(uploadStream);
    }
  }

  return NextResponse.json({ status: 200, uploaded: true });
}

/* Delete image */
export async function DELETE(req: NextRequest) {
  await mongooseConnect();
  const { bucket } = await connectToDb();

  const { id, image } = req.params;

  const existing = await fileExists(image);
  if (!existing) {
    return NextResponse.json({ status: 404, error: 'File not found' });
  }

  bucket.delete(id, image);

  return NextResponse.json({ status: 200, deleted: true });
}