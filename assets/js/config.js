function createIconSelect(slotIndex, selectId) {
  const select = document.createElement("select");
  select.id = selectId;

  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.disabled = true;
  placeholder.textContent = "Icon";
  select.appendChild(placeholder);

  const defaultGroup = document.createElement("optgroup");
  defaultGroup.label = "Default";
  ICON_OPTIONS.default.forEach((opt) => {
    const option = document.createElement("option");
    option.value = opt.value;
    option.textContent = opt.label;
    defaultGroup.appendChild(option);
  });
  select.appendChild(defaultGroup);

  const brandsGroup = document.createElement("optgroup");
  brandsGroup.label = "Brands";
  ICON_OPTIONS.brands.forEach((opt) => {
    const option = document.createElement("option");
    option.value = opt.value;
    option.textContent = opt.label;
    brandsGroup.appendChild(option);
  });
  select.appendChild(brandsGroup);

  return select;
}

function buildConfigList(container) {
  container.innerHTML = "";
  const fragment = document.createDocumentFragment();

  for (let i = 1; i <= SLOT_COUNT; i++) {
    const li = document.createElement("li");
    li.className = "config-slot";
    li.dataset.slot = String(i);

    const title = document.createElement("h3");
    title.className = "config-slot__title";
    title.textContent = `Shortcut ${i}`;
    li.appendChild(title);

    const row1 = document.createElement("div");
    row1.className = "config-row";

    const nameField = document.createElement("div");
    nameField.className = "config-field config-field--name";
    nameField.innerHTML = `
      <label for="name_${i}">Name</label>
      <input type="text" id="name_${i}" placeholder="YouTube" autocomplete="off">
    `;
    row1.appendChild(nameField);

    const directField = document.createElement("div");
    directField.className = "config-field config-field--url";
    directField.innerHTML = `
      <label for="link_direct_${i}">Direct URL</label>
      <input type="url" id="link_direct_${i}" placeholder="https://www.youtube.com" autocomplete="off">
    `;
    row1.appendChild(directField);
    li.appendChild(row1);

    const row2 = document.createElement("div");
    row2.className = "config-row";

    const prefixField = document.createElement("div");
    prefixField.className = "config-field config-field--prefix";
    prefixField.innerHTML = `
      <label for="link_lmid_${i}">Profile URL prefix</label>
      <input type="url" id="link_lmid_${i}" placeholder="https://www.youtube.com/@" autocomplete="off">
    `;
    row2.appendChild(prefixField);

    const iconField = document.createElement("div");
    iconField.className = "config-field config-field--icon";
    const iconLabel = document.createElement("label");
    iconLabel.htmlFor = `icon_${i}`;
    iconLabel.textContent = "Icon";
    iconField.appendChild(iconLabel);
    iconField.appendChild(createIconSelect(i, `icon_${i}`));
    row2.appendChild(iconField);
    li.appendChild(row2);

    fragment.appendChild(li);
  }

  container.appendChild(fragment);
}

function renderConfigFromStorage(data) {
  for (let i = 1; i <= SLOT_COUNT; i++) {
    const slot = slotDataFromStorage(data, i);
    const nameEl = document.getElementById(`name_${i}`);
    const directEl = document.getElementById(`link_direct_${i}`);
    const prefixEl = document.getElementById(`link_lmid_${i}`);
    const iconEl = document.getElementById(`icon_${i}`);

    if (nameEl) nameEl.value = slot.name;
    if (directEl) directEl.value = slot.link_direct;
    if (prefixEl) prefixEl.value = slot.link_lmid;
    if (iconEl) iconEl.value = slot.icon;
  }
}

function bindConfigInputs(onSaved) {
  const configForm = document.getElementById("configuration");
  if (!configForm) return;

  configForm.addEventListener(
    "change",
    async (event) => {
      const target = event.target;
      if (
        !target.matches("input, select") ||
        !target.id
      ) {
        return;
      }
      await setField(target.id, target.value);
      if (onSaved) {
        const data = await loadAllSlotData();
        onSaved(data);
      }
    },
    true
  );
}
