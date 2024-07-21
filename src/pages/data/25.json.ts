import meetings from "@/data/25.json";

export async function GET() {
  return new Response(JSON.stringify(meetings));
}
