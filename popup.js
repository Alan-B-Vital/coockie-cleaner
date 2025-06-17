document.getElementById('clearCookies').addEventListener('click', async () => {
  // Pega a aba ativa
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab || !tab.url) return;

  // Extrai o domínio da aba ativa
  let url = new URL(tab.url);
  let domain = url.hostname;

  // Limpa os cookies para o domínio da aba ativa
  chrome.cookies.getAll({ domain: domain }, (cookies) => {
    cookies.forEach((cookie) => {
      const cookieUrl = `http${cookie.secure ? 's' : ''}://${cookie.domain.startsWith('.') ? cookie.domain.substring(1) : cookie.domain}${cookie.path}`;
      chrome.cookies.remove({
        url: cookieUrl,
        name: cookie.name
      });
    });
  });

  alert(`Cookies do domínio ${domain} foram limpos.`);
});
