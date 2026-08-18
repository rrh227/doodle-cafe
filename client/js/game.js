const screens = {
  menu: document.getElementById('screen-title'),
  playing: document.getElementById('screen-game'),
  gameover: document.getElementById('screen-gameover'),
};

let currentState = null;

const hooks = {
  menu: { onEnter() {}, onExit() {} },
  playing: { onEnter() {}, onExit() {} },
  gameover: { onEnter() {}, onExit() {} },
};

export function setState(newState) {
  if (newState === currentState) return;
  if (!screens[newState]) {
    console.error(`Unknown state: ${newState}`);
    return;
  }

  const prevState = currentState;

  if (prevState && hooks[prevState]) {
    hooks[prevState].onExit();
  }

  for (const screen of Object.values(screens)) {
    screen.classList.remove('active');
  }
  screens[newState].classList.add('active');

  currentState = newState;
  hooks[newState].onEnter();

  console.log(`State: ${prevState ?? 'init'} → ${newState}`);
}

export function getState() {
  return currentState;
}

export function onState(state, { onEnter, onExit }) {
  if (onEnter) hooks[state].onEnter = onEnter;
  if (onExit) hooks[state].onExit = onExit;
}
