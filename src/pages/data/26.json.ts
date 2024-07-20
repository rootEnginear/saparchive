import meetings from "@/data/26.json";

export async function GET() {
  return new Response(JSON.stringify(meetings));
}
