const buttons = document.querySelectorAll(".generateBtn");

buttons.forEach((button) => {
  button.addEventListener("click", async () => {
    const item = button.closest(".item");
    const img = item.querySelector("img");
    const result = item.querySelector(".result");

    button.disabled = true;
    button.textContent = "Se generează...";

    try {
      // Convertim imaginea afișată într-un PNG cu canvas
      const imageElement = new Image();
      imageElement.crossOrigin = "anonymous";
      imageElement.src = img.src;

      await new Promise((resolve, reject) => {
        imageElement.onload = resolve;
        imageElement.onerror = reject;
      });

      const canvas = document.createElement("canvas");
      canvas.width = imageElement.width;
      canvas.height = imageElement.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(imageElement, 0, 0);

      const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));

      // Verificăm dacă imaginea este sub 4MB
      if (blob.size > 4 * 1024 * 1024) {
        alert("Imaginea este prea mare (>4MB) pentru OpenAI. Încearcă cu una mai mică.");
        return;
      }

      const formData = new FormData();
      formData.append("image", blob, "original_image.png");

      const apiResponse = await fetch("/api/generate-variation", {
        method: "POST",
        body: formData
      });

      const data = await apiResponse.json();

      if (data.imageUrl) {
        result.innerHTML = '<img src="' + data.imageUrl + '" alt="Imagine generată">';
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
