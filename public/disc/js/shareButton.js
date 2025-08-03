document.getElementById("shareBtn").addEventListener("click", () => {
  console.log("Button clicked!");
  const name = document.getElementById("nameInput").value;
  const email = document.getElementById("emailInput").value;
  if (!name) {
    alert("Please enter your name before sharing.");
    return;
  }
  if (!email) {
    alert("Please enter your email before sharing.");
    return;
  }
  const html = `
                <p>Hi 101 Church,</p>
                <br/>
                <h2>Here are my results from the 101 Church DISC and Spiritual Gifts assessment:</h2>
                <br/>
                <p><strong>Personality Type:</strong> ${discResult.code} - ${
    discResult.breakdown[0].type
  }</p>
                <p>Summary: ${discResult.summary}</p>
                <h3>Spiritual Gifts:</h3>
                <ul>
                  ${giftsResult
                    .map(
                      (g) =>
                        `<li>${g.gift} (${g.score}) - ${g.description}</li>`
                    )
                    .join("")}
                </ul>
                <p>Shared by: name</p>
            `;

  fetch("https://one01church-growth-track-server.onrender.com/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, html }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        alert("You've shared your results with 101 Church!");
      } else {
        alert("Error sending email: " + data.error);
      }
    })
    .catch((err) => {
      console.error("Fetch error:", err);
      alert("An error occurred while sending the email.");
    });
});
