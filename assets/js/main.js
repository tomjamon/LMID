function initTabs(onLaunchTabActivate) {
  const tabButtons = document.querySelectorAll(".tab-button");
  const panels = document.querySelectorAll(".tab-panel");

  function activateTab(tabId) {
    tabButtons.forEach((btn) => {
      const isSelected = btn.dataset.tab === tabId;
      btn.setAttribute("aria-selected", isSelected ? "true" : "false");
    });
    panels.forEach((panel) => {
      panel.classList.toggle("is-active", panel.id === tabId);
      panel.hidden = panel.id !== tabId;
    });
    if (tabId === "launch" && onLaunchTabActivate) {
      onLaunchTabActivate();
    }
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => activateTab(btn.dataset.tab));
  });

  activateTab("launch");
}

function bindFooterLink() {
  const footerLink = document.querySelector(".app-footer a");
  if (!footerLink) return;

  footerLink.addEventListener("click", (event) => {
    event.preventDefault();
    chrome.tabs.create({ url: "https://tomjamon.com" });
  });
}

async function init() {
  const launchGrid = document.getElementById("launch-grid");
  const configList = document.getElementById("config-list");

  buildLaunchGrid(launchGrid);
  buildConfigList(configList);

  await ensureDefaults();
  const data = await loadAllSlotData();
  renderLaunchFromStorage(data);
  renderConfigFromStorage(data);

  bindLaunchForms();
  bindConfigInputs(async (updated) => {
    renderLaunchFromStorage(updated);
  });

  initTabs(async () => {
    const fresh = await loadAllSlotData();
    renderLaunchFromStorage(fresh);
    const firstInput = document.getElementById("conf_1");
    if (firstInput) firstInput.focus();
  });

  bindFooterLink();

  const firstInput = document.getElementById("conf_1");
  if (firstInput) firstInput.focus();
}

document.addEventListener("DOMContentLoaded", init);
