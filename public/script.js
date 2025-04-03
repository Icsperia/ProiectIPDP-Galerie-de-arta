const buttons = document.querySelectorAll(".generateBtn");

buttons.forEach((button) => {
  button.addEventListener("click", async () => {
    const item = button.closest(".item");
    const descriere = item.querySelector(".descriere").textContent;
    const result = item.querySelector(".result");

    button.disabled = true;
    button.textContent = "Se generează...";

    try {
      const response = await fetch("/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt: descriere })
      });

      const data = await response.json();

      if (data.image) {
        result.innerHTML = '<img src="' + data.image + '" alt="Imagine generată">';
      } else {
        alert("Eroare: " + data.error);
      }
    } catch (error) {
      alert("Eroare la generare!");
      console.error(error);
    } finally {
      button.disabled = false;
      button.textContent = "Generează imagine asemănătoare";
    }
  });
});