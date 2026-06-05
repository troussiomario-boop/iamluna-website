// Waitlist subscribe endpoint.
// Receives { email } from the landing-page forms and adds the contact to
// Brevo list #14. The Brevo API key is read from the BREVO_API_KEY
// environment variable (set in Netlify) so it never reaches the browser.

const BREVO_LIST_ID = 14;
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  let email;
  try {
    email = (JSON.parse(event.body || "{}").email || "").trim();
  } catch {
    return json(400, { error: "Invalid request body" });
  }

  if (!EMAIL_RE.test(email)) {
    return json(400, { error: "Invalid email address" });
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    return json(500, { error: "Server is not configured" });
  }

  try {
    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        listIds: [BREVO_LIST_ID],
        updateEnabled: true,
      }),
    });

    // Brevo returns 201 (created) or 204 (updated) on success.
    if (res.ok) {
      return json(200, { ok: true });
    }

    const detail = await res.text();
    return json(res.status, { error: "Subscription failed", detail });
  } catch (err) {
    return json(502, { error: "Could not reach Brevo" });
  }
};

function json(statusCode, body) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
}
