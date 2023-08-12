/*global jscw*/

const containerId = 'morsefire';
const containerCloseId = 'morsefire_close';
const playerId = 'morsefire_player';

const options = {
  wpm: 20,
  freq: 500,
  eff: 15,
  ews: 0.1,
  volume: .1,
};

const m = new jscw(options)

function getEl(id) {
  return document.getElementById(id);
}

function setStyle(el, style) {
  el.style.cssText = Object.keys(style).map(key => `${key}:${style[key]};`).join(' ');
}

function create() {
 
  // the overall container
  const container = document.createElement('div');
  container.id = containerId;
  setStyle(container, {
    position: 'fixed',
    bottom: 0,
    left: 0,
    // transform: 'scale(0.9)',
    // 'transform-origin': 'bottom left',
  });

  // close button
  const close = document.createElement('div');
  close.id = containerCloseId;
  close.addEventListener('click', () => {
    m.stop();
    container.remove();
  });
  close.textContent = 'x';
  setStyle(close, {
   position: 'absolute',
   top: 0,
   right: 0,
   'font-family': 'monospace',
   cursor: 'pointer',
  });

  // Need this style tag to override jscw
  const playerStyle = document.createElement('style');
  playerStyle.textContent = `
    #${playerId} {
      background: #fff;
      border-radius: 4;
      border: 0 !important; 
      opacity: 0.95;
      transition: opacity .2s ease-in-out;
      margin:  0 !important;
    }

    #${playerId}:hover {
      opacity: 1;
    }

    #${playerId} a[title="Settings"] span:first-child {
      bottom: 0 !important;
      top: auto !important;
    }
  `;

  // the jscw player
  const player = document.createElement('div');
  player.id = playerId;

  // append everything
  container.appendChild(playerStyle);
  container.appendChild(player);
  container.appendChild(close);
  document.body.appendChild(container);

  return container;
};

browser.runtime.onMessage.addListener((message) => {
  if (message.action !== containerId) {
    return;
  }
  getEl() ?? create();
  m.setText(message.text);
  m.renderPlayer(playerId, m);
  m.play();
});
