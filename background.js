const id = "morsefire";

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
