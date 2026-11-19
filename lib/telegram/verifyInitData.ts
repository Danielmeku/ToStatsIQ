import crypto from "crypto";

export function verifyTelegramInitData(
  initDataRaw: string,
  botToken: string
): boolean {
  if (!initDataRaw || !botToken) return false;

  const params = new URLSearchParams(initDataRaw);
  const hash = params.get("hash");
  if (!hash) return false;

  params.delete("hash");
  const sortedEntries = Array.from(params.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");

  const secretKey = crypto
    .createHmac("sha256", "WebAppData")
    .update(botToken)
    .digest();

  const computedHash = crypto
    .createHmac("sha256", secretKey)
    .update(sortedEntries)
    .digest("hex");

  const hashBuf = Buffer.from(hash, "hex");
  const computedBuf = Buffer.from(computedHash, "hex");

  if (hashBuf.length !== computedBuf.length) return false;
  return crypto.timingSafeEqual(hashBuf, computedBuf);
}
