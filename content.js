function checkUrl(url) {
  const patterns = {
    "etherscan.io": "ethereum",
    "snowtrace.io": "avalanche",
    "basescan.org": "base",
    "arbiscan.io": "arbitrum",
    "bscscan.com": "bsc",
    "polygonscan.com": "polygon",
    "optimistic.etherscan.io": "optimism",
    "ftmscan.com": "fantom",
    // Ajoutez d'autres explorateurs ici.
  };

  Object.entries(patterns).forEach(([domain, network]) => {
    if (url.includes(domain)) {
      const address = url.split("/").pop();
      const newUrl = `https://dexscreener.com/${network}/${address}`;
      // Stockez l'URL de redirection dans le stockage local de l'extension
      chrome.storage.local.set({ redirectUrl: newUrl });
    }
  });
}

// Vérifiez l'URL lors du chargement initial et à chaque changement d'URL
checkUrl(window.location.href);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "checkUrl") {
    currentUrl = window.location.href;
    checkUrl(currentUrl);
  }
});
