import { NextRequest, NextResponse } from 'next/server'
import { mongooseConnect } from '@/../lib/mongoose';
import { connectToDb } from '@/../lib/mongodb';


export async function GET(req, { params }) {
  await mongooseConnect();

  // 1. get GridFS bucket
  const { bucket } = await connectToDb();

  const productID = params.id;
  // 2. validate the filename
  if (!productID) {
    return new NextResponse(null, { status: 400, statusText: "Bad Request" });
  }

  const files = await bucket.find({ "metadata.productId": productID }).toArray();
  if (!files.length) {
    return new NextResponse(null, { status: 404, statusText: "Images to this product not found" });
  }

  const base64Images = [];

  for (const file of files) {
    const imageStream = bucket.openDownloadStreamByName(file.filename);
    const imageBuffer = await streamToBuffer(imageStream);
    const base64String = imageBuffer.toString('base64');
    base64Images.push(base64String);
  }

  return new NextResponse(JSON.stringify(base64Images), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function streamToBuffer(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
    stream.on('error', (error) => reject(error));
  });
}