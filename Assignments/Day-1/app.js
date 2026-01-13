// app.js

const supabaseUrl = "https://zqncprsxfqtgorrjiezl.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxbmNwcnN4ZnF0Z29ycmppZXpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3OTM2ODUsImV4cCI6MjA4MDM2OTY4NX0.BxlNQqxPPI3XnrLL-HLBRDC03JWFKIEcPFZ05xQ3GAI";

const form = document.getElementById("leadForm");
const statusMessage = document.getElementById("statusMessage");
const submitBtn = document.getElementById("submitBtn");

function showStatus(message, type = "success") {
  statusMessage.textContent = message;
  statusMessage.className = `alert alert-${type}`;
  statusMessage.classList.remove("d-none");
}

function hideStatus() {
  statusMessage.classList.add("d-none");
  statusMessage.textContent = "";
}

async function insertLead(email, interest_message) {
  const response = await fetch(`${supabaseUrl}/rest/v1/Leads`, {
    method: "POST",
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${supabaseAnonKey}`,
      "Content-Type": "application/json",
      Prefer: "return=representation"
    },
    body: JSON.stringify([
      { email, interest_message }
    ])
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to insert lead");
  }

  return data;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  hideStatus();

  const email = document.getElementById("email").value.trim();
  const interest_message = document.getElementById("interest_message").value.trim();

  if (!email || !interest_message) {
    showStatus("Please fill out all fields.", "danger");
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = "Saving...";

  try {
    await insertLead(email, interest_message);
    showStatus("Success! Your data was saved.", "success");
    form.reset();
  } catch (error) {
    showStatus(`Error: ${error.message}`, "danger");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit";
  }
});
