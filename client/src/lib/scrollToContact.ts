export function scrollToContact() {
  const el = document.getElementById("contacto");
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
