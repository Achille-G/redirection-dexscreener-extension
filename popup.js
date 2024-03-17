function updatePopup() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentTab = tabs[0];
    if (currentTab && currentTab.url) {
      const url = currentTab.url;
      const patterns = {
        "etherscan.io": "ethereum",
        "snowtrace.io": "avalanche",
        // Ajoutez d'autres explorateurs ici.
      };
      let found = false;
      Object.entries(patterns).forEach(([domain, network]) => {
        if (url.includes(domain)) {
          found = true;
          const address = url.split("/").pop();
          const newUrl = `https://dexscreener.com/${network}/${address}`;
          // Mettez à jour l'affichage ici
          document.getElementById("tokenAddress").textContent = address; // Affiche l'adresse du token
          document.getElementById("redirectSection").style.display = "block";
          chrome.storage.local.set({ redirectUrl: newUrl });
        }
      });

      if (!found) {
        // Aucune redirection trouvée, ajustez l'affichage en conséquence
        document.getElementById("tokenAddress").textContent =
          "Aucune redirection trouvée";
        document.getElementById("redirectSection").style.display = "none"; // Cache le bouton si non applicable
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updatePopup(); // Mettez à jour la popup quand elle est ouverte
  const redirectBtn = document.getElementById("redirectBtn");
  redirectBtn.addEventListener("click", () => {
    chrome.storage.local.get("redirectUrl", function (data) {
      if (data.redirectUrl) {
        chrome.tabs.create({ url: data.redirectUrl });
      }
    });
  });
});
