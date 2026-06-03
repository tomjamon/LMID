function storageGet(keys) {
  return new Promise((resolve) => {
    chrome.storage.sync.get(keys, resolve);
  });
}

function storageSet(items) {
  return new Promise((resolve) => {
    chrome.storage.sync.set(items, resolve);
  });
}

async function loadAllSlotData() {
  return storageGet(storageKeysForAllSlots());
}

async function ensureDefaults() {
  const data = await storageGet("name_1");
  if (!data.name_1) {
    await storageSet(buildDefaultStoragePayload());
  }
}

async function setField(fieldId, value) {
  await storageSet({ [fieldId]: value });
}

function slotDataFromStorage(data, slotIndex) {
  const n = slotIndex;
  return {
    name: data[`name_${n}`] || "",
    link_direct: data[`link_direct_${n}`] || "",
    link_lmid: data[`link_lmid_${n}`] || "",
    icon: data[`icon_${n}`] || "fa-question-circle",
  };
}
