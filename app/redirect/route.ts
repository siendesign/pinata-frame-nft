import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
  try {
   return NextResponse.redirect('https://pinata.cloud', { status: 302 }) 
  } catch (error) {
   console.log(error) 
    return NextResponse.json({ error: error })
  }
}  