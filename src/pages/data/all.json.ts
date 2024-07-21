import meetings25 from "@/data/25.json";
import meetings26 from "@/data/26.json";

export async function GET() {
  return new Response(JSON.stringify([...meetings26, ...meetings25]));
}
