import { NextResponse } from 'next/server';
import Customer from "@/models/Customer";
import dbConnect from "@/lib/db";

export async function GET() {
  try {
    const customers = await Customer.find();
    return NextResponse.json(customers);
  } catch (error) {
    console.error("Failed to fetch customers:", error);
    return NextResponse.json({ error: "Failed to fetch customers" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const customer = new Customer(body);
    await customer.save();
    return NextResponse.json(customer, { status: 201 });
  } catch (error) {
    console.error("Failed to create customer:", error);
    return NextResponse.json({ error: "Failed to create customer" }, { status: 500 });
  }
}