import meetings25 from "@/data/25.json";
import meetings26 from "@/data/26.json";
import Fuse from "fuse.js";

export async function GET() {
  const index = Fuse.createIndex(["title"], [...meetings26, ...meetings25]);
  return new Response(JSON.stringify(index.toJSON()));
}
