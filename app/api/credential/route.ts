import { del, list, put } from "@vercel/blob";
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
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: "Credential storage is not configured. Add BLOB_READ_WRITE_TOKEN to this Vercel project, then redeploy." }, { status: 503 });
  }
  try {
    const body = await request.json() as Partial<CredentialRecord>;
    const builderId = String(body.builderId || "").trim().toUpperCase().replace("#", "");
    const name = String(body.name || "").trim().slice(0, 120);
    const title = String(body.title || "").trim().slice(0, 120);
    const frontUrl = String(body.frontUrl || "");
    const backUrl = String(body.backUrl || "");
    if (!validId(builderId) || !name || !frontUrl || !backUrl) {
      return NextResponse.json({ error: "A valid Builder ID, name, and both credential image URLs are required." }, { status: 400 });
    }
    const record: CredentialRecord = { builderId, name, title, generatedAt: new Date().toISOString(), verified: true, frontUrl, backUrl };
    const existing = await findCredentialFile(builderId, "record.json");
    if (existing) await del(existing.url);
    await put(pathFor(builderId, "record.json"), JSON.stringify(record), { access: "public", addRandomSuffix: false, contentType: "application/json" });
    return NextResponse.json(record);
  } catch (error) {
    console.error("Credential storage error:", error);
    const detail = error instanceof Error ? error.message : "Unknown storage error";
    const configurationIssue = /token|access denied|store does not exist|suspended/i.test(detail);
    return NextResponse.json({
      error: configurationIssue
        ? "Vercel Blob rejected this credential save. Confirm that BLOB_READ_WRITE_TOKEN belongs to an active Blob store connected to this project."
        : `Credential storage failed: ${detail}`,
    }, { status: configurationIssue ? 503 : 500 });
  }
}

export async function GET(request: Request) {
  const id = new URL(request.url).searchParams.get("id")?.trim().toUpperCase().replace("#", "") || "";
  if (!validId(id)) return NextResponse.json({ error: "Credential not found." }, { status: 404 });
  try {
    const blob = await findCredentialFile(id, "record.json");
    if (!blob) throw new Error("Record unavailable");
    const response = await fetch(blob.url, { cache: "no-store" });
    if (!response.ok) throw new Error("Record unavailable");
    return NextResponse.json(await response.json());
  } catch {
    return NextResponse.json({ error: "Credential not found." }, { status: 404 });
  }
}

async function findCredentialFile(id: string, file: string) {
  const pathname = pathFor(id, file);
  const result = await list({ prefix: pathname, limit: 10 });
  return result.blobs.find((blob) => blob.pathname === pathname);
}
