type FormEventName =
  | "form_start"
  | "form_field_focus"
  | "form_field_error"
  | "form_submit_attempt"
  | "form_submit_success"
  | "form_submit_error";

export function trackFormEvent(
  name: FormEventName,
  payload: Record<string, unknown> = {},
): void {
  const data = { form_id: "contact_lead", ...payload };

  if (typeof window === "undefined") return;

  if (typeof window.gtag === "function") {
    window.gtag("event", name, data);
  } else if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: name, ...data });
  }

  if (
    typeof window.fbq === "function" &&
    (name === "form_start" || name === "form_submit_attempt")
  ) {
    window.fbq("trackCustom", name, data);
  }

  if (typeof window.clarity === "function") {
    window.clarity("event", name);
  }
}
