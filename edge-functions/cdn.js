const UPSTREAM_BASE = "https://www.murec.com/images";
const PASSTHROUGH_HEADERS = [
  "content-type",
  "content-length",
  "content-range",
  "accept-ranges",
  "etag",
  "last-modified",
];

export default async (request) => {
  const url = new URL(request.url);
  const path = url.pathname.replace(/^\/api\/cdn\//, "");

  if (!path) {
    return new Response("Missing asset path", { status: 400 });
  }

  const upstreamHeaders = {
    Referer: "https://www.murec.com/",
    Origin: "https://www.murec.com",
    "User-Agent": "Mozilla/5.0 (compatible; MurecAssetProxy/1.0)",
  };

  const range = request.headers.get("range");
  if (range) upstreamHeaders.Range = range;

  let upstreamRes;
  try {
    upstreamRes = await fetch(`${UPSTREAM_BASE}/${path}`, {
      headers: upstreamHeaders,
    });
  } catch {
    return new Response("Upstream fetch failed", { status: 502 });
  }

  if (!upstreamRes.ok && upstreamRes.status !== 206) {
    return new Response("Asset not found", { status: upstreamRes.status });
  }

  const headers = new Headers();
  for (const key of PASSTHROUGH_HEADERS) {
    const value = upstreamRes.headers.get(key);
    if (value) headers.set(key, value);
  }
  headers.set(
    "cache-control",
    "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400"
  );

  return new Response(upstreamRes.body, {
    status: upstreamRes.status,
    headers,
  });
};

export const config = { path: "/api/cdn/*" };
