import { NextRequest, NextResponse } from 'next/server'
import { Product } from '@/../models/Product';
import { mongooseConnect } from '@/../lib/mongoose';

/* Get product by ID */
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

/* Update product by ID */
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

/* Delete product by ID */
export async function DELETE(req: NextRequest) {
	await mongooseConnect();
	const id = req.url.split('/').pop();

	try {
		const product = await Product.deleteOne({ _id: id });
		return NextResponse.json({ status: 200, product: product });
	} catch (error: any) {
		return NextResponse.json({ status: 500, error: error.message });
	}
}
