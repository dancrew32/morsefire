const id = "morsefire";

const defaultSettings = {
  wpm: 20,
  freq: 500,
  eff: 15,
  ews: 0.1,
  playvolume: 0.1,
};

function saveSettings(settings) {
  browser.storage.local.set({ [id]: settings });
}

function getSettings() {
  return browser.storage.local
    .get(id)
    .then((result) => result[id] ?? defaultSettings);
}

browser.contextMenus.create({
  id,
  title: "Play selection as Morse code",
  contexts: ["selection"],
});

browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === id) {
    browser.tabs.sendMessage(tab.id, { action: id, text: info.selectionText });
  }
});

browser.runtime.onMessage.addListener((request) => {
  switch (request.action) {
    case "morsefire_settings_get":
      return getSettings();
    case "morsefire_settings_set":
      return saveSettings(request.settings);
  }
});
