// File: app/api/customer/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Customer from '@/models/Customer';

export async function GET() {
  try {
    await dbConnect();
    const customers = await Customer.find({});
    
    if (customers.length === 0) {
      return NextResponse.json({ message: 'No customers found', customers: [] }, { status: 200 });
    }
    
    return NextResponse.json({ customers });
  } catch (error) {
    console.error('Failed to fetch customers:', error);
    return NextResponse.json({ error: 'Failed to load customers' }, { status: 500 });
  }
}