async function submitLead() {
  // 1. Collect form field values
  const contact = {
    name: document.getElementById("nameInput").value,
    phone: document.getElementById("phoneInput").value,
    email: document.getElementById("emailInput").value,
    comments: document.getElementById("commentsInput").value,
  };

  console.log("Sending lead:", contact);

  // 2. Your Supabase REST endpoint for the 'Leads' table
  const url = "https://vhuecppiucphoalfhyle.supabase.co/rest/v1/Leads";

  try {
    // 3. Send POST request to Supabase
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZodWVjcHBpdWNwaG9hbGZoeWxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxNDAzMDQsImV4cCI6MjA4MDcxNjMwNH0._xWMGVQTmuds9w46TuFe3975bGEWNp-CNFSUdkwg9rI",
        "Authorization":
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZodWVjcHBpdWNwaG9hbGZoeWxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxNDAzMDQsImV4cCI6MjA4MDcxNjMwNH0._xWMGVQTmuds9w46TuFe3975bGEWNp-CNFSUdkwg9rI",
        "Prefer": "return=representation"
      },
      body: JSON.stringify(contact),
    });

    // 4. Read raw response to avoid the "Unexpected end of JSON input" error
    const raw = await res.text();
    console.log("RAW RESPONSE:", raw);

    if (!raw) {
      console.warn("⛔ Supabase returned an empty response. Check table name, columns, or RLS policies.");
      return;
    }

    // 5. Parse JSON after confirming it is not empty
    const data = JSON.parse(raw);
    console.log("Inserted lead:", data);

    alert("Lead submitted successfully!");

  } catch (err) {
    console.error("❌ Error submitting lead:", err);
  }
}



// ---------------------------
// Supabase REST product fetch
// ---------------------------

// Replace with your real values:
const SUPABASE_URL = "https://vhuecppiucphoalfhyle.supabase.co"; // example: https://vhuecppiucphoalfhyle.supabase.co
const ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZodWVjcHBpdWNwaG9hbGZoeWxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxNDAzMDQsImV4cCI6MjA4MDcxNjMwNH0._xWMGVQTmuds9w46TuFe3975bGEWNp-CNFSUdkwg9rI";

// REST endpoint for the products table
const REST_ENDPOINT = `${SUPABASE_URL}/rest/v1/products`;

// Fetch products
async function getProducts() {
  try {
    const res = await fetch(REST_ENDPOINT + '?select=*', {
      method: 'GET',
      headers: {
        'apikey': ANON_KEY,
        'Authorization': `Bearer ${ANON_KEY}`,
        'Accept': 'application/json'
      }
    });

    if (!res.ok) {
      console.error('Supabase returned non-OK status', res.status, await res.text());
      return;
    }

    const products = await res.json();
    console.log('Fetched products:', products);
    renderProducts(products);

  } catch (err) {
    console.error('Error fetching products:', err);
  }
}

// Render products into #products-list using Bootstrap cards
function renderProducts(products) {
  const container = document.getElementById('products-list');
  if (!container) {
    console.error("No container with id 'products-list' found in the DOM.");
    return;
  }

  container.innerHTML = ''; // clear

  products.forEach(product => {
    // Fallbacks if some fields are missing
    const imageUrl = product.image_url || 'placeholder.png';
    const price = (product.price !== null && product.price !== undefined) ? product.price : '';
    const description = product.description || '';

    const col = document.createElement('div');
    col.className = 'col-md-4';

    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${imageUrl}" class="card-img-top" alt="${escapeHtml(product.name || 'Product')}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${escapeHtml(product.name || '')}</h5>
          <p class="card-text">${escapeHtml(description)}</p>
          <div class="mt-auto">
            <p class="fw-bold mb-0">$${price}</p>
          </div>
        </div>
      </div>
    `;

    container.appendChild(col);
  });
}

// small helper to avoid HTML injection when inserting text
function escapeHtml(text) {
  if (!text && text !== 0) return '';
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

// Ensure the function runs when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  getProducts();
});
