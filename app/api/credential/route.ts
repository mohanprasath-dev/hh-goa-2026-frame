import { head, put } from "@vercel/blob";
import { NextResponse } from "next/server";

const credentialPrefix = "builder-credentials";

type CredentialRecord = {
  builderId: string;
  name: string;
  title: string;
  generatedAt: string;
  verified: true;
  frontUrl: string;
  backUrl: string;
};

function pathFor(id: string, file: string) {
  return `${credentialPrefix}/${id}/${file}`;
}

function validId(id: string) {
  return /^HH-GOA-(?:R)?[A-Z0-9-]{3,12}$/.test(id);
}

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const builderId = String(form.get("builderId") || "").trim().toUpperCase().replace("#", "");
    const name = String(form.get("name") || "").trim().slice(0, 120);
    const title = String(form.get("title") || "").trim().slice(0, 120);
    const front = form.get("front");
    const back = form.get("back");
    if (!validId(builderId) || !name || !(front instanceof File) || !(back instanceof File)) {
      return NextResponse.json({ error: "A valid Builder ID, name, front image, and back image are required." }, { status: 400 });
    }
    if (!front.type.startsWith("image/") || !back.type.startsWith("image/")) {
      return NextResponse.json({ error: "Credential images must be PNG files." }, { status: 400 });
    }

    const [frontBlob, backBlob] = await Promise.all([
      put(pathFor(builderId, "front.png"), front, { access: "public", addRandomSuffix: false }),
      put(pathFor(builderId, "back.png"), back, { access: "public", addRandomSuffix: false }),
    ]);
    const record: CredentialRecord = { builderId, name, title, generatedAt: new Date().toISOString(), verified: true, frontUrl: frontBlob.url, backUrl: backBlob.url };
    await put(pathFor(builderId, "record.json"), JSON.stringify(record), { access: "public", addRandomSuffix: false, contentType: "application/json" });
    return NextResponse.json(record);
  } catch (error) {
    console.error("Credential storage error:", error);
    return NextResponse.json({ error: "We could not save this credential. Please try again." }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const id = new URL(request.url).searchParams.get("id")?.trim().toUpperCase().replace("#", "") || "";
  if (!validId(id)) return NextResponse.json({ error: "Credential not found." }, { status: 404 });
  try {
    const blob = await head(pathFor(id, "record.json"));
    const response = await fetch(blob.url, { cache: "no-store" });
    if (!response.ok) throw new Error("Record unavailable");
    return NextResponse.json(await response.json());
  } catch {
    return NextResponse.json({ error: "Credential not found." }, { status: 404 });
  }
}
