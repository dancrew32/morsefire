/*global jscw*/

const containerId = "morsefire";
const containerCloseId = "morsefire_close";
const playerId = "morsefire_player";

let cw;
browser.runtime
  .sendMessage({ action: "morsefire_settings_get" })
  .then((settings) => {
    cw = new jscw(settings);
  });

function getEl(id) {
  return document.getElementById(id);
}

function setStyle(el, style) {
  el.style.cssText = Object.keys(style)
    .map((key) => `${key}:${style[key]};`)
    .join(" ");
}

function create() {
  // the overall container
  const container = document.createElement("div");
  container.id = containerId;
  setStyle(container, {
    position: "fixed",
    bottom: 0,
    left: 0,
  });

  // close button
  const close = document.createElement("div");
  close.id = containerCloseId;
  close.addEventListener("click", () => {
    try {
      cw.stop();
    } catch (err) {
      // nothing to stop
    }
    container.remove();
  });
  close.textContent = "x";
  setStyle(close, {
    position: "absolute",
    top: "-1px",
    right: "2px",
    "font-family": "monospace",
    cursor: "pointer",
    "z-index": 2,
  });

  // Need this style tag to override jscw
  const playerStyle = document.createElement("style");
  playerStyle.textContent = `
    #${playerId} {
      background: #fff;
      border-radius: 4;
      border: 0 !important; 
      opacity: 0.95;
      transition: opacity .2s ease-in-out;
      margin: 0 !important;
    }

    #${playerId}:hover {
      opacity: 1;
    }

    #${playerId} a[title="Settings"] span:first-child {
      bottom: 0 !important;
      top: auto !important;
      z-index: 3 !important;
    }
  `;

  // the jscw player
  const player = document.createElement("div");
  player.id = playerId;

  // append everything
  container.appendChild(playerStyle);
  container.appendChild(close); // close before player important (z-index thing)
  container.appendChild(player);
  document.body.appendChild(container);

  return container;
}

browser.runtime.onMessage.addListener((message) => {
  if (message.action !== containerId) {
    return;
  }
  try {
    cw.stop(); // stop any existing plays
  } catch (err) {
    // nothing to stop
  }
  getEl() ?? create();
  cw.setText(message.text);
  cw.renderPlayer(playerId, cw);
  cw.play();
});
