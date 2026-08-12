"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, BadgeCheck, Calendar, Search, ShieldAlert, Sparkles } from "lucide-react";
import { Wordmark } from "@/components/brand/Wordmark";

type Credential = { builderId: string; name: string; title: string; generatedAt: string; verified: true; frontUrl: string; backUrl: string };

export default function VerifyIdPage() {
  const params = useParams();
  const router = useRouter();
  const rawId = typeof params?.id === "string" ? params.id : "";
  const builderId = decodeURIComponent(rawId).trim().toUpperCase().replace("#", "");
  const [lookupInput, setLookupInput] = useState("");
  const [credential, setCredential] = useState<Credential | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true); setCredential(null);
    fetch(`/api/credential?id=${encodeURIComponent(builderId)}`)
      .then((response) => response.ok ? response.json() : null)
      .then((record) => { if (active) setCredential(record); })
      .catch(() => { if (active) setCredential(null); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [builderId]);

  const handleLookup = (event: React.FormEvent) => {
    event.preventDefault();
    const clean = lookupInput.trim().toUpperCase().replace("#", "");
    if (clean) router.push(`/verify/${encodeURIComponent(clean)}`);
  };

  return <main className="min-h-screen bg-[#0B3D2E] px-4 py-7 text-[#F5F0E1] sm:py-10">
    <header className="mx-auto flex max-w-3xl items-center justify-between"><Link href="/" className="inline-flex min-h-[44px] items-center gap-2 text-xs font-black uppercase tracking-widest text-[#FFD400]"><ArrowLeft className="h-4 w-4" /> Home</Link><Link href="/generate" className="text-xs font-black uppercase tracking-widest text-[#F5F0E1]/70 hover:text-[#FFD400]">Generate</Link></header>
    <section className="mx-auto mt-10 max-w-3xl"><div className="text-center"><Wordmark width={400} className="max-w-[240px]" /><p className="mt-3 text-[10px] font-black uppercase tracking-[.22em] text-[#FFD400]">Official builder credential check</p></div>
      <div className="mt-8 overflow-hidden rounded-3xl border border-[#155340] bg-[#07261D] shadow-2xl"><div className="border-b border-[#155340] bg-[#0B3D2E] px-6 py-4 text-[10px] font-black uppercase tracking-[.18em] text-[#F5F0E1]/65">Credential lookup</div><div className="p-6 sm:p-9">
        {loading ? <div className="py-12 text-center text-sm font-bold text-[#F5F0E1]/70">Checking credential…</div> : credential ? <VerifiedCredential credential={credential} /> : <NotFound builderId={builderId} />}
        <form onSubmit={handleLookup} className="mt-7"><label className="mb-2 block text-[10px] font-black uppercase tracking-[.18em] text-[#FFD400]">Try another Builder ID</label><div className="flex gap-2"><input value={lookupInput} onChange={(e) => setLookupInput(e.target.value)} placeholder="HH-GOA-00001" className="min-h-[48px] min-w-0 flex-1 rounded-xl border border-[#155340] bg-[#0B3D2E] px-4 font-mono text-sm font-bold text-[#F5F0E1] outline-none focus:border-[#FFD400]" /><button type="submit" className="inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-[#FFD400] px-4 text-xs font-black uppercase tracking-wide text-[#0B3D2E]"><Search className="h-4 w-4" /> Verify</button></div></form>
        <Link href="/generate" className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-wide text-[#FFD400] hover:text-[#F0176D]"><Sparkles className="h-4 w-4" /> Need a Builder ID? Generate a frame</Link>
      </div></div>
      <p className="mt-8 text-center text-[11px] font-bold text-[#F5F0E1]/55">Built by Mohan Prasath P · Founder, <a href="https://taskdrift.in" className="text-[#FFD400] hover:underline">Taskdrift</a> · <a href="https://x.com/mohanprasathdev" className="text-[#FFD400] hover:underline">@mohanprasathdev</a> · <a href="https://mohanprasath.dev" className="text-[#FFD400] hover:underline">mohanprasath.dev</a></p>
    </section>
  </main>;
}

function VerifiedCredential({ credential }: { credential: Credential }) {
  return <div className="grid gap-6 sm:grid-cols-[.75fr_1fr]"><img src={credential.frontUrl} alt={`${credential.name}'s Builder ID front`} className="mx-auto w-full max-w-[240px] rounded-2xl border-2 border-[#FFD400]" /><div className="flex flex-col justify-center"><span className="inline-flex w-fit items-center gap-1 rounded-full bg-[#FFD400] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#0B3D2E]"><BadgeCheck className="h-3.5 w-3.5 text-[#F0176D]" /> Verified credential</span><h1 className="mt-4 text-3xl font-black text-[#F5F0E1]">{credential.name}</h1><p className="mt-1 text-lg font-bold text-[#FFD400]">{credential.title}</p><p className="mt-4 font-mono text-xs font-bold text-[#F5F0E1]/70">#{credential.builderId}</p><p className="mt-2 flex items-center gap-2 text-xs text-[#F5F0E1]/65"><Calendar className="h-4 w-4 text-[#F0176D]" /> Generated {new Date(credential.generatedAt).toLocaleString()}</p><a href={credential.backUrl} target="_blank" rel="noreferrer" className="mt-5 text-xs font-black uppercase tracking-wide text-[#FFD400] hover:text-[#F0176D]">View back of credential →</a></div></div>;
}

function NotFound({ builderId }: { builderId: string }) { return <div className="flex flex-col items-center rounded-2xl border border-[#F0176D]/40 bg-[#0B3D2E] px-5 py-8 text-center"><div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#F0176D] bg-[#F0176D]/10"><ShieldAlert className="h-8 w-8 text-[#F0176D]" /></div><p className="mt-5 text-[11px] font-black uppercase tracking-[.2em] text-[#F0176D]">Credential not found</p><h1 className="mt-3 break-all font-mono text-xl font-black text-[#F5F0E1]">{builderId ? `#${builderId}` : "No Builder ID supplied"}</h1><p className="mt-3 max-w-md text-sm leading-relaxed text-[#F5F0E1]/70">We couldn&apos;t find an issued Builder ID for this link. Check the ID on the frame, then try again.</p></div>; }
