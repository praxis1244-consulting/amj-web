import { createHash } from "crypto";

export default function handler(_req: any, res: any) {
  const hash = createHash("sha256").update("test").digest("hex");
  res.status(200).json({ ok: true, hash });
}
