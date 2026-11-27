import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const expectedOrigin = process.env.SITE_URL ? new URL(process.env.SITE_URL).origin : new URL(request.url).origin;
  if (origin && origin !== expectedOrigin) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }
  if (request.headers.get("content-type")?.split(";")[0] !== "application/json") {
    return Response.json({ error: "Unsupported content type" }, { status: 415 });
  }

  const body = await request.json().catch(() => null);
  const summary = typeof body?.summary === "string" ? body.summary.trim() : "";
  const replyTo = body?.replyTo;
  if (!summary || summary.length > 3500 || typeof replyTo !== "string" ||
      replyTo.length > 200 || (replyTo && !/^[^\s@<>,;:"]+@[^\s@<>,;:"]+\.[^\s@<>,;:"]+$/.test(replyTo))) {
    return Response.json({ error: "Invalid contact details" }, { status: 400 });
  }

  const { SMTP_HOST: host, SMTP_USER: user, SMTP_PASSWORD: pass } = process.env;
  const port = Number(process.env.SMTP_PORT || 465);
  if (!host || !user || !pass || (port !== 465 && port !== 587)) {
    return Response.json({ error: "Email unavailable" }, { status: 503 });
  }

  const transport = nodemailer.createTransport({
    host, port, secure: port === 465, requireTLS: port === 587,
    auth: { user, pass },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 12000,
  });
  try {
    await transport.sendMail({
      from: user,
      to: user,
      replyTo: replyTo || undefined,
      subject: "Demande d’assistance ALF",
      text: summary,
    });
    return Response.json({ sent: true });
  } catch {
    return Response.json({ error: "Email delivery failed" }, { status: 502 });
  }
}
