export async function GET(){ return new Response(JSON.stringify({ ok: true, note: 'export placeholder' }), { headers: { 'Content-Type': 'application/json' } }); }
