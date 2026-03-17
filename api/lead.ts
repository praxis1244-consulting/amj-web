export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).json({ error: "no" });
  return res.status(200).json({ ok: true, body: req.body });
}
