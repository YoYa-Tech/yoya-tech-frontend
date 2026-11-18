import { createIntro } from "/kuru/intro.js?v=57d7b931e97a";
import { createHeroBackground } from "/kuru/hero-background.js?v=57d7b931e97a";
import { createBuildSection } from "/kuru/build-section.js?v=57d7b931e97a";
import { syncSeo } from "/kuru/seo.js?v=57d7b931e97a";
import { polishChrome } from "/kuru/chrome.js?v=57d7b931e97a";
import { syncRipples } from "/kuru/ripple.js?v=57d7b931e97a";
import { createHomeSections, homeAnchors } from "/kuru/sections.js?v=57d7b931e97a";
import { createWorkspace } from "/kuru/workspace.js?v=57d7b931e97a";
import { aboutAdditions, animateAbout, servicesBeyondWeb } from "/kuru/pages.js?v=57d7b931e97a";

let started = false;
function startExperience() {
  if (started) return;
  started = true;
  window.__KURU_STARTED__ = true;
  const intro = createIntro();
  window.__KURU_BOOT_RELEASE__?.();
  const build = createBuildSection();
  const sections = createHomeSections();
  const beyond = servicesBeyondWeb();
  const about = aboutAdditions();
  const pageRipple = Object.assign(document.createElement("div"), {
    className: "kuru-page-ripple",
    innerHTML: "<canvas data-kuru-ripple></canvas>",
  });
  pageRipple.dataset.kuruOwned = "";
  pageRipple.setAttribute("aria-hidden", "true");
  let workspace = null,
    stopAbout = null;

  // The page shell hydrates first; streamed sections hydrate later. React must
  // never meet an owned node inside a range it has not hydrated yet.
  const fiberOf = (node) => {
    for (const key in node) if (key.startsWith("__reactFiber$")) return node[key];
    return null;
  };
  const hydrated = (node) => !node || node.hasAttribute?.("data-kuru-owned") || !!fiberOf(node);
  // A node can carry React's key before its section has really hydrated: React may
  // drop that work and retry it (a scroll update does this on a busy device). So
  // nothing is inserted next to retained sections until the committed tree has no
  // dehydrated Suspense boundary left.
  let pageHydrated = false;
  function hydrationDone() {
    if (pageHydrated) return true;
    let fiber = fiberOf(document.body) ?? fiberOf(document.documentElement);
    if (!fiber) return false;
    while (fiber.return) fiber = fiber.return;
    const root = fiber.stateNode?.current;
    if (!root) return (pageHydrated = true);
    if (root.memoizedState?.isDehydrated) return false;
    for (let node = root.child; node;) {
      // 13: Suspense, 31: Activity. Their state holds the server DOM until hydrated.
      if ((node.tag === 13 || node.tag === 31) && node.memoizedState?.dehydrated) return false;
      if (node.child) {
        node = node.child;
        continue;
      }
      while (node && node !== root && !node.sibling) node = node.return;
      if (!node || node === root) break;
      node = node.sibling;
    }
    return (pageHydrated = true);
  }
  const settled = (anchor) =>
    hydrationDone() && hydrated(anchor) && hydrated(anchor.previousElementSibling);
  let retry = 0;
  function retryLater() {
    if (!retry) retry = setTimeout(() => ((retry = 0), schedule()), 250);
  }
  const refreshScroll = () =>
    requestAnimationFrame(() => window.dispatchEvent(new Event("resize")));

  // Home: each owned section goes in front of the retained block it replaces.
  function syncHome() {
    const anchors = homeAnchors();
    if (!anchors.outcomes || !anchors.pricing || !anchors.closing) {
      if (sections.elements.some((element) => element.isConnected)) sections.remove();
      return;
    }
    const ready = Object.fromEntries(
      Object.entries(anchors).filter(([, anchor]) => anchor && settled(anchor)),
    );
    if (Object.keys(ready).length < Object.values(anchors).filter(Boolean).length) retryLater();
    if (sections.place(ready)) refreshScroll();
    sections.mount();
  }
  // The hero's product view: a YoYa Tech workspace inside the retained editor frame.
  function syncWorkspace() {
    const frame = document.querySelector('#hero .hh-editor[class*="h-[490px]"]');
    if (!frame) {
      workspace?.dispose();
      workspace = null;
      return;
    }
    if (workspace?.element.parentElement === frame) return;
    if (!hydrationDone() || !hydrated(frame)) return retryLater();
    workspace?.dispose();
    workspace = createWorkspace(frame);
    workspace.mount();
  }
  // Inner pages: services beyond the web, the about page's additions, the works ripple.
  function syncPages() {
    const grid = document.querySelector('main > div:has(> div.grid > a[href^="/services/"])');
    if (grid && grid.nextElementSibling !== beyond) {
      if (settled(grid)) {
        grid.after(beyond);
        refreshScroll();
        if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView();
      } else retryLater();
    } else if (!grid) beyond.remove();

    const badges = document.querySelector("main div:has(> img[src*='/about/badge-'])");
    const values = [...document.querySelectorAll("main section")].find((section) =>
      section.querySelector("h2")?.textContent.includes("Why clients work with us"),
    );
    if (badges && values) {
      if (!settled(badges) || !settled(values)) retryLater();
      else {
        const placements = [
          [badges.previousElementSibling, about.stats, () => badges.before(about.stats)],
          [values.previousElementSibling, about.process, () => values.before(about.process)],
          [values.nextElementSibling, about.divisions, () => values.after(about.divisions)],
        ].filter(([neighbour, element]) => neighbour !== element);
        placements.forEach(([, , place]) => place());
        if (placements.length) refreshScroll();
        stopAbout ??= animateAbout(document);
      }
    } else if (about.stats.isConnected) {
      Object.values(about).forEach((element) => element.remove());
      stopAbout?.();
      stopAbout = null;
    }

    const works = location.pathname === "/works" ? document.querySelector("main") : null;
    if (works && pageRipple.parentElement !== works) {
      if (hydrationDone() && hydrated(works)) works.append(pageRipple);
      else retryLater();
    } else if (!works) pageRipple.remove();
  }
  // Owned canvases are ours from the start; retained ones once React owns them.
  const rippleReady = (canvas) => Boolean(canvas.closest("[data-kuru-owned]")) || hydrated(canvas);
  let background = null,
    backgroundRequest = 0,
    currentHero = null,
    syncFrame = 0,
    pageActive = true,
    buildMounted = false;

  function sync() {
    syncFrame = 0;
    if (!pageActive) return;
    syncSeo();
    polishChrome();
    document.documentElement.dataset.kuruReady = "true";
    intro.retain();
    // React may reconcile the captured head and body once during hydration.
    if (!document.querySelector('link[href^="/kuru/styles.css?v=57d7b931e97a"]')) {
      const stylesheet = document.createElement("link");
      stylesheet.rel = "stylesheet";
      stylesheet.href = "/kuru/styles.css?v=57d7b931e97a";
      document.head.append(stylesheet);
    }
    syncHome();
    syncPages();
    syncWorkspace();
    if (syncRipples(rippleReady)) retryLater();
    const hero = document.querySelector("#hero.hh-stage");
    if (!hero) {
      if (currentHero) backgroundRequest++;
      background?.dispose();
      background = null;
      currentHero = null;
      build.element.remove();
      return;
    }
    if (hero !== currentHero && document.documentElement.dataset.kuruIntro !== "playing") {
      const request = ++backgroundRequest;
      background?.dispose();
      background = null;
      currentHero = hero;
      createHeroBackground(hero).then((result) => {
        if (request !== backgroundRequest || currentHero !== hero || !hero.isConnected) {
          result.dispose();
          return;
        }
        background = result;
      });
    }
    if (hero === currentHero && background && !background.canvas.isConnected)
      hero.prepend(background.canvas);
    if (hero.nextElementSibling !== build.element) {
      hero.after(build.element);
      // Refresh the retained site's scroll measurements after adding the section.
      refreshScroll();
    }
    if (!buildMounted) {
      build.mount();
      buildMounted = true;
    }
    document.documentElement.dataset.kuruReady = "true";
  }
  function schedule() {
    if (pageActive && !syncFrame) syncFrame = requestAnimationFrame(sync);
  }
  const observer = new MutationObserver((records) => {
    // Owned components update their own text (counters, clocks, the workspace);
    // those changes should not rescan the whole page.
    if (
      records.every(
        ({ target }) =>
          target instanceof Element && target.closest(".kuru-intro, [data-kuru-owned]"),
      )
    )
      return;
    schedule();
  });
  // The captured runtime can replace the html element during hydration recovery.
  observer.observe(document, { childList: true, subtree: true });
  window.addEventListener("kuru:intro-reveal", schedule);
  window.addEventListener("kuru:intro-complete", schedule);
  window.addEventListener("pagehide", () => {
    pageActive = false;
    backgroundRequest++;
    observer.disconnect();
    cancelAnimationFrame(syncFrame);
    syncFrame = 0;
    background?.dispose();
    background = null;
    currentHero = null;
    build.dispose();
    buildMounted = false;
    // Ripples stay mounted: they pause while hidden, and a released WebGL context
    // could not be recovered when the page returns from the back/forward cache.
    sections.dispose();
  });
  window.addEventListener("pageshow", () => {
    pageActive = true;
    observer.observe(document, { childList: true, subtree: true });
    schedule();
  });
  sync();
}

// The boot cover is CSS-only; wait for the retained app's first committed tree.
if (window.__KURU_HYDRATED__) startExperience();
else {
  window.addEventListener("kuru:hydrated", startExperience, { once: true });
  // A slow app must never race an injected body against React hydration.
  // If its scripts fail, release the CSS cover and leave the server page usable.
  setTimeout(() => {
    if (started) return;
    try {
      sessionStorage.setItem("kuru:entered", "1");
    } catch {
      /* Storage is optional. */
    }
    window.__KURU_BOOT_RELEASE__?.();
  }, 5000);
}
