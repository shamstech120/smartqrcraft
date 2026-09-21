import { api, $ } from "/js/common.js";

const errors = {
  expired: "That sign-in link has expired or was already used. Request a new one below.",
  banned: "This account has been disabled.",
};
const q = new URLSearchParams(location.search).get("error");
if (q && errors[q]) {
  const box = $("#err");
  box.textContent = errors[q];
  box.hidden = false;
}

$("#form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const btn = $("#go");
  const err = $("#err");
  err.hidden = true;
  btn.disabled = true;
  try {
    const r = await api("/api/auth/request", { method: "POST", body: { email: $("#email").value } });
    $("#form").hidden = true;
    $("#sent").hidden = false;
    $("#sentText").textContent = r.message;
    if (r.devLink) {
      $("#devBox").hidden = false;
      $("#devLink").href = r.devLink;
    }
  } catch (ex) {
    err.textContent = ex.message;
    err.hidden = false;
    btn.disabled = false;
  }
});
