import { NextRequest, NextResponse } from 'next/server'
import { Product } from '@/../models/Product';
import { mongooseConnect } from '@/../lib/mongoose';

export async function GET(req: NextRequest) {
	await mongooseConnect();
	const id = req.url.split('/').pop();

	try {
		const product = await Product.findOne({ _id: id });
		return NextResponse.json({ status: 200, product: product });
	} catch (error: any) {
		return NextResponse.json({ status: 500, error: error.message });
	}
}

export async function PUT(req: NextRequest) {
	await mongooseConnect();
	const id = req.url.split('/').pop();
	const data = await req.json();

	try {
		const product = await Product.updateOne({ _id: id }, data);
		return NextResponse.json({ status: 200, product: product });
	} catch (error: any) {
		return NextResponse.json({ status: 500, error: error.message });
	}
}