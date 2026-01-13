const supabaseUrl = "https://zqncprsxfqtgorrjiezl.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxbmNwcnN4ZnF0Z29ycmppZXpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3OTM2ODUsImV4cCI6MjA4MDM2OTY4NX0.BxlNQqxPPI3XnrLL-HLBRDC03JWFKIEcPFZ05xQ3GAI";

const statusEl = document.getElementById("status");
const cardRow = document.getElementById("cardRow");

async function getPokemon() {
  const endpoint = `${supabaseUrl}/rest/v1/pokedex?select=id,name,image_url&order=id.asc`;

  const response = await fetch(endpoint, {
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${supabaseAnonKey}`,
    },
  });

  const data = await response.json();

  // If Supabase returns an error object, it will usually have "message"
  if (!Array.isArray(data)) {
    statusEl.className = "alert alert-danger";
    statusEl.textContent = data.message || "Failed to load data.";
    return;
  }

  if (data.length === 0) {
    statusEl.className = "alert alert-warning";
    statusEl.textContent = "No Pokémon found. Add rows in the pokedex table.";
    return;
  }

  statusEl.className = "alert alert-success";
  statusEl.textContent = `Loaded ${data.length} Pokémon.`;

  renderCards(data);
}

function renderCards(pokemonList) {
  cardRow.innerHTML = "";

  for (const p of pokemonList) {
    const col = document.createElement("div");
    col.className = "col-12 col-sm-6 col-md-4 col-lg-3";

    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img
          src="${p.image_url}"
          class="card-img-top"
          alt="${p.name}"
          style="height: 180px; object-fit: contain; background: white;"
        />
        <div class="card-body text-center">
          <h5 class="card-title mb-0">${p.name}</h5>
        </div>
      </div>
    `;

    cardRow.appendChild(col);
  }
}

document.addEventListener("DOMContentLoaded", getPokemon);