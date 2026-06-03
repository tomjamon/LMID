function buildLaunchGrid(container) {
  container.innerHTML = "";
  const fragment = document.createDocumentFragment();

  for (let i = 1; i <= SLOT_COUNT; i++) {
    const card = document.createElement("article");
    card.className =
      i % 2 === 0 ? "launch-card launch-card--alt" : "launch-card";
    card.id = `field_${i}`;

    const iconWrap = document.createElement("div");
    iconWrap.className = "launch-card__icon-wrap";
    const icon = document.createElement("i");
    icon.className = "fa fa-question-circle launch-card__icon";
    icon.setAttribute("aria-hidden", "true");
    iconWrap.appendChild(icon);

    const form = document.createElement("form");
    form.className = "launch-card__form";
    form.dataset.id = String(i);

    const field = document.createElement("div");
    field.className = "launch-card__field";

    const input = document.createElement("input");
    input.type = "text";
    input.id = `conf_${i}`;
    input.className = "launch-card__input";
    input.autocomplete = "off";
    if (i === 1) {
      input.autofocus = true;
    }
    input.setAttribute("tabindex", String(i));

    const label = document.createElement("label");
    label.className = "launch-card__label";
    label.htmlFor = `conf_${i}`;
    label.textContent = "Available";

    field.appendChild(input);
    field.appendChild(label);
    form.appendChild(field);
    card.appendChild(iconWrap);
    card.appendChild(form);
    fragment.appendChild(card);
  }

  container.appendChild(fragment);
}

function renderLaunchFromStorage(data) {
  for (let i = 1; i <= SLOT_COUNT; i++) {
    const slot = slotDataFromStorage(data, i);
    const field = document.getElementById(`field_${i}`);
    if (!field) continue;

    const iconEl = field.querySelector(".launch-card__icon");
    const labelEl = field.querySelector(".launch-card__label");

    if (iconEl) {
      iconEl.className = `fa ${slot.icon} launch-card__icon`;
    }
    if (labelEl) {
      labelEl.textContent = slot.name || "Available";
    }
  }
}

function bindLaunchForms() {
  const launchPanel = document.getElementById("launch");
  if (!launchPanel) return;

  launchPanel.addEventListener("submit", async (event) => {
    const form = event.target.closest("form.launch-card__form");
    if (!form) return;

    event.preventDefault();
    const slotId = form.dataset.id;
    const input = document.getElementById(`conf_${slotId}`);
    const value = input ? input.value.trim() : "";
    const data = await loadAllSlotData();
    const slot = slotDataFromStorage(data, Number(slotId));

    const url = value
      ? `${slot.link_lmid}${value}`
      : slot.link_direct;

    if (url) {
      chrome.tabs.create({ url });
    }
  });
}
