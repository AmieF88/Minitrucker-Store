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
