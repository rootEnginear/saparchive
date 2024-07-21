import meetings from "@/data/25.json";
import Fuse from "fuse.js";

export async function GET() {
  const index = Fuse.createIndex(["title"], meetings);
  return new Response(JSON.stringify(index.toJSON()));
}
