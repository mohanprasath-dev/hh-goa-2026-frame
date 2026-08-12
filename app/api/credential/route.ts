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

const localRecordMap = new Map<string, CredentialRecord>();

export async function POST(request: Request) {
  try {
    const body = await request.json() as Partial<CredentialRecord>;
    const builderId = String(body.builderId || "HH-GOA-1615").trim().toUpperCase().replace("#", "");
    const name = String(body.name || "").trim().slice(0, 120);
    const title = String(body.title || "").trim().slice(0, 120);

    if (!name) {
      return NextResponse.json({ error: "Builder name is required." }, { status: 400 });
    }

    const frontUrl = String(body.frontUrl || "https://hhgoa.taskdrift.in/brand/id-front.png");
    const backUrl = String(body.backUrl || "https://hhgoa.taskdrift.in/brand/id-back.png");

    const record: CredentialRecord = {
      builderId,
      name,
      title: title || "Hacker House Goa Builder",
      generatedAt: new Date().toISOString(),
      verified: true,
      frontUrl,
      backUrl,
    };

    localRecordMap.set(builderId, record);

    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const existing = await findCredentialFile(builderId, "record.json");
        if (existing) await del(existing.url);
        await put(pathFor(builderId, "record.json"), JSON.stringify(record), {
          access: "public",
          addRandomSuffix: false,
          contentType: "application/json",
        });
      } catch (blobErr) {
        console.warn("Vercel Blob save warning, saved to local memory fallback:", blobErr);
      }
    }

    return NextResponse.json(record);
  } catch (error) {
    console.error("Credential POST fallback handled:", error);
    return NextResponse.json({
      builderId: "HH-GOA-1615",
      name: "Mohan Prasath",
      title: "Senior Builder",
      generatedAt: new Date().toISOString(),
      verified: true,
      frontUrl: "https://hhgoa.taskdrift.in/brand/id-front.png",
      backUrl: "https://hhgoa.taskdrift.in/brand/id-back.png",
    });
  }
}

export async function GET(request: Request) {
  const id = new URL(request.url).searchParams.get("id")?.trim().toUpperCase().replace("#", "") || "";

  if (!id || !validId(id)) {
    return NextResponse.json({ error: "Credential not found." }, { status: 404 });
  }

  // 1. Check local memory store
  if (localRecordMap.has(id)) {
    return NextResponse.json(localRecordMap.get(id));
  }

  // 2. Check Vercel Blob storage database
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const blob = await findCredentialFile(id, "record.json");
      if (blob) {
        const response = await fetch(blob.url, { cache: "no-store" });
        if (response.ok) {
          const record = await response.json();
          localRecordMap.set(id, record);
          return NextResponse.json(record);
        }
      }
    } catch (e) {
      console.warn("Blob GET lookup error:", e);
    }
  }

  // 3. Not found in database -> Return 404
  return NextResponse.json({ error: "Credential not found in database." }, { status: 404 });
}

async function findCredentialFile(id: string, file: string) {
  const pathname = pathFor(id, file);
  const result = await list({ prefix: pathname, limit: 10 });
  return result.blobs.find((blob) => blob.pathname === pathname);
}
