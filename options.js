const fields = ["wpm", "freq", "eff", "ews", "playvolume", "onHighlight"];

document.addEventListener("DOMContentLoaded", () => {
  // Load current settings and populate the form
  browser.runtime
    .sendMessage({ action: "morsefire_settings_get" })
    .then((settings) => {
      fields.forEach((field) => {
        switch (field) {
          case "onHighlight":
            document.getElementById(field).checked = settings[field];
            break;
          default:
            document.getElementById(field).value = settings[field];
        }
      });
    });

  // Save settings when the Save button is clicked
  document.getElementById("save").addEventListener("click", () => {
    const settings = {};
    fields.forEach((field) => {
      switch (field) {
        case "onHighlight":
          settings[field] = document.getElementById(field).checked;
          break;
        default:
          settings[field] = parseInt(document.getElementById(field).value, 10);
      }
    });

    // Repeat for other settings
    browser.runtime.sendMessage({
      action: "morsefire_settings_set",
      settings,
    });
  });
});
