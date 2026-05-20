export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;
    
    // 從 GitHub 抓靜態 HTML
    const githubUrl = `https://raw.githubusercontent.com/waveec/news/main${path}`;
    
    try {
      const response = await fetch(githubUrl);
      if (response.ok) {
        const html = await response.text();
        return new Response(html, {
          headers: { 'Content-Type': 'text/html; charset=utf-8' }
        });
      }
    } catch(e) {}
    
    return new Response('404 Not Found', { status: 404 });
  }
}
