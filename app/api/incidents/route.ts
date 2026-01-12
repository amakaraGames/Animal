import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
    const { data } = await supabase.from('incidents').select('*');
    return NextResponse.json({ data });
}

export async function POST(req: Request) {
    const body = await req.json();
    const { animal_type, incident_type, lat, lng } = body;
    
    await supabase.from('incidents').insert([{
        animal_type,
        incident_type,
        lat,
        lng
    }]);
    return NextResponse.json({ ok: true });
}

