const searchInput = document.querySelector("#systemSearch");
const systemCards = [...document.querySelectorAll(".system-card")];
const noResults = document.querySelector("#noResults");
const trafficTabs = [...document.querySelectorAll(".traffic-tab")];
const trafficPanels = [...document.querySelectorAll(".traffic-panel")];
const navLinks = [...document.querySelectorAll(".topnav a")];

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();
  let visibleCards = 0;

  systemCards.forEach((card) => {
    const content = `${card.dataset.search} ${card.textContent}`.toLowerCase();
    const matches = content.includes(query);
    card.hidden = !matches;
    if (matches) visibleCards += 1;
  });

  noResults.hidden = visibleCards !== 0;
});

trafficTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const panelName = tab.dataset.panel;

    trafficTabs.forEach((item) => item.classList.toggle("active", item === tab));
    trafficPanels.forEach((panel) => {
      panel.classList.toggle("active", panel.id === `panel-${panelName}`);
    });
  });
});

const observedSections = [...document.querySelectorAll("main section[id]")];
const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visibleSection = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visibleSection) return;

    navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${visibleSection.target.id}`
      );
    });
  },
  { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.2, 0.5] }
);

observedSections.forEach((section) => sectionObserver.observe(section));
