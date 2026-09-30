import {NextRequest,NextResponse} from 'next/server';
import {partnerScore} from '@/lib/scoring';
export async function POST(req:NextRequest){const body=await req.json();return NextResponse.json({score:partnerScore(body)});}
