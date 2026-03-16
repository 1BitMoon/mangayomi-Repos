const BASE_URL = "https://xbato.co.uk";

export default class XBato {
  name = "XBato";
  lang = "en";
  baseUrl = BASE_URL;

  async popular(page = 1) {
    const res = await fetch(`${BASE_URL}/home?page=${page}`);
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, "text/html");

    const list = [];

    doc.querySelectorAll(".item, .manga-item").forEach(el => {
      const a = el.querySelector("a");
      const img = el.querySelector("img");

      if (!a || !img) return;

      list.push({
        title: a.getAttribute("title") || a.textContent.trim(),
        url: a.href,
        cover: img.src
      });
    });

    return list;
  }

  async latest(page = 1) {
    const res = await fetch(`${BASE_URL}/latest?page=${page}`);
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, "text/html");

    const list = [];

    doc.querySelectorAll(".item, .manga-item").forEach(el => {
      const a = el.querySelector("a");
      const img = el.querySelector("img");

      if (!a || !img) return;

      list.push({
        title: a.getAttribute("title") || a.textContent.trim(),
        url: a.href,
        cover: img.src
      });
    });

    return list;
  }

  async chapters(mangaUrl) {
    const res = await fetch(mangaUrl);
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, "text/html");

    const chapters = [];

    doc.querySelectorAll("a[href*='chapter']").forEach(el => {
      chapters.push({
        name: el.textContent.trim(),
        url: el.href
      });
    });

    return chapters.reverse();
  }

  async pages(chapterUrl) {
    const res = await fetch(chapterUrl);
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, "text/html");

    const pages = [];

    doc.querySelectorAll("img").forEach(img => {
      const src = img.getAttribute("src");
      if (src && src.includes("http")) {
        pages.push(src);
      }
    });

    return pages;
  }
}
