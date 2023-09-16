import { NextRequest, NextResponse } from 'next/server'
import { Product } from '@/../models/Product';
import { mongooseConnect } from '@/../lib/mongoose';

/* Post images of product */
export async function POST(req: NextRequest) {
  await mongooseConnect();
  const data = await req.formData();
  const images = data.getAll('images');

  console.log(images);

  return NextResponse.json({ status: 200, message: images });
}

