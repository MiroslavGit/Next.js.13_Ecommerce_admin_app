import { NextRequest, NextResponse } from 'next/server'
import { Product } from '@/../models/Product';
import { mongooseConnect } from '@/../lib/mongoose';

export async function POST(req: NextRequest) {
  await mongooseConnect();
  const data = await req.json();

  try {
    const product = await Product.create(data);
    return NextResponse.json({ status: 200, data: product });
  } catch (error: any) {
    return NextResponse.json({ status: 500, error: error.message });
  }
}

export async function GET(req: NextRequest) {
  await mongooseConnect();

  try {
    const products = await Product.find();
    return NextResponse.json({ status: 200, data: products });
  } catch (error: any) {
    return NextResponse.json({ status: 500, error: error.message });
  }
}