// import { SmartHouseAPI } from './api.js';  // імпортуємо тільки коли використовуємо ES6 модулі (import/export)
// import { Auth } from './auth.js';  // імпортуємо тільки коли використовуємо ES6 модулі (import/export)

let locations = [];
let devices = [];

const house = new SmartHouse();
const devicesContainer = document.getElementById("devicesContainer");

const locationSelect = document.getElementById("deviceLocation");
const deviceSelect = document.getElementById("deviceType");

// Заповнюємо список локацій
function renderLocations() {
  locationSelect.innerHTML = "";
  locations.forEach(loc => {
    const option = document.createElement("option");
    option.value = loc;
    option.textContent = loc;
    locationSelect.appendChild(option);
  });
}

// Отримуємо відформатований список пристроїв
function getSortedDevices() {
  const sortValue = document.getElementById('sortSelect').value;
  const devicesCopy = [...house.devices];

  switch (sortValue) {
    case 'location':
      return devicesCopy.sort((a, b) => {
        const locA = locations[a.location] || '';
        const locB = locations[b.location] || '';
        return locA.localeCompare(locB);
      });
    case 'name':
      return devicesCopy.sort((a, b) => a.name.localeCompare(b.name));
    case 'type':
      return devicesCopy.sort((a, b) => {
        const typeA = a.type || '';
        const typeB = b.type || '';
        return typeA.localeCompare(typeB);
      });
    case 'on':
      return devicesCopy.sort((a, b) => b.isOn - a.isOn);
    case 'off':
      return devicesCopy.sort((a, b) => a.isOn - b.isOn);

    default:
      return devicesCopy;
  }
}

// Рендеримо пристрої, дозволені для вибраної локації
function renderDevicesByLocation(selectedLocation) {
  const t = i18n[appState.lang];
  deviceSelect.disabled = !selectedLocation;
  deviceSelect.innerHTML = "";

  const selectedIndex = locations.indexOf(selectedLocation);
  // фільтруємо пристрої, дозволені для локації
  const allowedDevices = devices.filter(device =>
    device.location.includes(selectedLocation)
  );

  // якщо нічого не знайдено
  if (allowedDevices.length === 0) {
    const option = document.createElement("option");
    //option.textContent = "Немає доступних пристроїв";
    option.textContent = t.noDevices;  // ← переклад
    option.disabled = true;
    deviceSelect.appendChild(option);
    return;
  } 

  // додаємо пристрої у список
  allowedDevices.forEach(device => {
    const option = document.createElement("option");
    option.value = device.type;
    option.textContent = device.name;
    deviceSelect.appendChild(option);
  });
}

// Рендеримо картки пристроїв
function renderDevices() {
  devicesContainer.innerHTML = "";
  getSortedDevices().forEach(device => {
    const cardElement = createDeviceCard(device);
    devicesContainer.appendChild(cardElement);
  });
}

// ============== Створюємо картку пристрою ===============
function createDeviceCard(device) {
  const div = document.createElement("div");
  div.className = "col-lg-4 col-md-6 col-12";

  const template = document.getElementById('device-card-template');
  const card = template.content.cloneNode(true);

  // Заповнюємо базові дані
  fillCardBasicInfo(card, device);

  // Установлюємо ID для collapse
  const integrationId = `integration-${device.id}`;
  card.querySelector('.integration-collapse').id = integrationId;

  // Заповнюємо поля інтеграції
  fillIntegrationFields(card, device);

  // Налаштовуємо кнопки
  setupToggleButton(card, device);
  setupRemoveButton(card, device);
  setupIntegrationButton(card, integrationId);
  setupSaveIntegrationButton(card, device);

  // Налаштовуємо регулятор гучності/яскравості
  setupVolumeRegulator(card, device, div);

  // Налаштовуємо спеціальні кнопки
  if (device instanceof WindowBlind) {
    setupWindowBlindButtons(card, device);
  }

  if (device instanceof TV) {
    setupTVButtons(card, device);
  }

  div.appendChild(card);
  return div;
}

// Заповнюємо базові дані картки
function fillCardBasicInfo(card, device) {
  const currentDevice = devices.find(dev => dev.type === device.type);
  card.querySelector('.card-title').textContent =
    `${currentDevice ? currentDevice.name : device.type} ${device.extendedName || ''}`;

  card.querySelector('.card-text-content').textContent = locations[device.location];

  const statusEl = card.querySelector('.device-status');
  const statusText = formatStatus(device.getStatus());
  statusEl.textContent = `[${statusText}]`;
  statusEl.className = `device-status ${device.isOn ? 'device-status__on' : 'device-status__off'}`;
}

// Заповнюємо поля інтеграції
function fillIntegrationFields(card, device) {
  const t = i18n[appState.lang];

  // Лейбли
  card.querySelector('.integration-ip-label').textContent = t.integrationIpLabel;
  card.querySelector('.integration-protocol-label').textContent = t.integrationProtocolLabel;
  card.querySelector('.integration-deviceid-label').textContent = t.integrationDeviceIdLabel;
  card.querySelector('.integration-apikey-label').textContent = t.integrationApiKeyLabel;

  // Опції протоколів
  const protocolSelect = card.querySelector('.integration-protocol');
  protocolSelect.querySelectorAll('option').forEach(option => {
    option.textContent = t.protocols[option.value];
  });

  // Значення полів
  card.querySelector('.integration-ip').value = device.integration?.ip || '';
  protocolSelect.value = device.integration?.protocol || 'WebSocket';
  card.querySelector('.integration-deviceId').value = device.integration?.deviceId || '';
  card.querySelector('.integration-apiKey').value = device.integration?.apiKey || '';
}

// Налаштовуємо кнопку Toggle
function setupToggleButton(card, device) {
  const t = i18n[appState.lang];
  const toggleBtn = card.querySelector('.toggle-btn');
  toggleBtn.textContent = device.isOn ? t.toggleOff : t.toggleOn;  // ← переклад
  toggleBtn.addEventListener('click', () => {
    house.devices.find(d => d.id === device.id).toggle();
    renderDevices();
  });
}

// Налаштовуємо кнопку Remove
function setupRemoveButton(card, device) {
  const removeBtn = card.querySelector('.remove-btn');
  removeBtn.textContent = i18n[appState.lang].removeBtn;
  removeBtn.addEventListener("click", () => {
    house.removeDevice(device.id);
    renderDevices();
  });
}

// Налаштовуємо кнопку Integration
function setupIntegrationButton(card, integrationId) {
  const integrationBtn = card.querySelector('.integration-btn');
  integrationBtn.textContent = i18n[appState.lang].integrationBtn;
  integrationBtn.setAttribute('data-bs-target', `#${integrationId}`);
  integrationBtn.setAttribute('aria-controls', `${integrationId}`);
}

// Налаштовуємо кнопку Save Integration
function setupSaveIntegrationButton(card, device) {
  const saveBtn = card.querySelector(".save-integration");
  saveBtn.textContent = i18n[appState.lang].saveIntegrationBtn;
  saveBtn.addEventListener("click", () => {
    device.integration.ip = card.querySelector(".integration-ip").value.trim();
    device.integration.protocol = card.querySelector(".integration-protocol").value;
    device.integration.deviceId = card.querySelector(".integration-deviceId").value.trim();
    device.integration.apiKey = card.querySelector(".integration-apiKey").value.trim();
    alert(i18n[appState.lang].integrationSaved(device.name));  // ← переклад
  });
}

// Налаштовуємо регулятор гучності/яскравості
function setupVolumeRegulator(card, device, div) {
  const regulatorWrapper = card.querySelector('.volume-regulator-wrapper');
  const regulatorLabel = card.querySelector('.volume-regulator-label');
  const regulatorSlider = card.querySelector('.volume-regulator-slider');
  const regulatorDisplay = card.querySelector('.volume-regulator-display');

  if (!device.volumeRegulator) return;

  regulatorWrapper.classList.remove('d-none');
  regulatorSlider.max = device.volumeRegulator.volumeMax;
  regulatorSlider.value = device.volumeRegulator.volume;
  regulatorDisplay.textContent = device.volumeRegulator.muted ? "(X)" : device.volumeRegulator.volume;
  regulatorLabel.textContent = i18n[appState.lang].regulatorNames[device.volumeRegulator.type];

  updateRegulatorState(regulatorSlider, regulatorLabel, device);

  regulatorSlider.addEventListener("input", () => {
    device.setVolume(parseInt(regulatorSlider.value));
    regulatorDisplay.textContent = device.volumeRegulator.volume;
    div.querySelector('.device-status').textContent =
      `[${formatStatus(device.getStatus())}]`;
  });
}

// Оновлюємо стан регулятора
function updateRegulatorState(slider, label, device) {
  if (!device.isOn) {
    slider.disabled = true;
    label.classList.add('text-muted');
  } else if (device instanceof WindowBlind && !device.isDown) {
    slider.disabled = true;
    label.classList.add('text-muted');
  } else if (device instanceof TV && device.volumeRegulator.muted) {
    slider.disabled = true;
    label.classList.add('text-muted');
  } else {
    slider.disabled = false;
    label.classList.remove('text-muted');
  }
}

// Налаштовуємо кнопки для WindowBlind
function setupWindowBlindButtons(card, device) {
  const t = i18n[appState.lang];
  const openBtn = document.createElement('button');
  openBtn.textContent = t.blindUp;  // ← переклад
  openBtn.className = 'btn btn-sm btn-info mt-2';
  openBtn.addEventListener('click', () => {
    device.setDown(false);
    renderDevices();
  });

  const closeBtn = document.createElement('button');
  closeBtn.textContent = t.blindDown;  // ← переклад
  closeBtn.className = 'btn btn-sm btn-info mt-2 ms-1';
  closeBtn.addEventListener('click', () => {
    device.setDown(true);
    renderDevices();
  });

  card.querySelector('.specific-buttons').appendChild(openBtn);
  card.querySelector('.specific-buttons').appendChild(closeBtn);
}

// Налаштовуємо кнопки для TV
function setupTVButtons(card, device) {
  const t = i18n[appState.lang];
  const prevBtn = document.createElement("button");
  prevBtn.textContent = t.prevChannel;  // ← переклад
  prevBtn.className = "btn btn-sm btn-warning mt-2 card-specific__btn";
  prevBtn.addEventListener("click", () => {
    device.prevChannel();
    renderDevices();
  });
  
  const nextBtn = document.createElement("button");
  nextBtn.textContent = t.nextChannel;  // ← переклад
  nextBtn.className = "btn btn-sm btn-warning mt-2 ms-1 card-specific__btn";
  nextBtn.addEventListener("click", () => {
    device.nextChannel();
    renderDevices();
  });
  
  const muteBtn = document.createElement("button");
  muteBtn.textContent = "Mute";
  muteBtn.className = "btn btn-sm btn-secondary mt-2 ms-1 card-specific__btn";
  muteBtn.addEventListener("click", () => {
    device.toggleMute();
    renderDevices();
  });

  const channelBtnsContainer = document.createElement("div");
  channelBtnsContainer.className = "mb-2 d-flex card-device__btn-group";
  channelBtnsContainer.appendChild(prevBtn);
  channelBtnsContainer.appendChild(nextBtn);
  channelBtnsContainer.appendChild(muteBtn);

  card.querySelector('.specific-buttons').appendChild(channelBtnsContainer);
}
// ============== /Створюємо картку пристрою ===============

// Запускаємо завантаження даних при завантаженні сторінки
document.addEventListener('DOMContentLoaded', () => {
  applyTranslations(appState.lang);
  // Оновлюємо кнопку мови відповідно до збереженої мови
  langBtn.textContent = appState.lang === 'en' ? '🌐 EN' : '🌐 UA';
  loadData();
  initializeApp();
});

// Слухач для сортування
document.getElementById('sortSelect').addEventListener('change', renderDevices);

// Коли змінюється локація
locationSelect.addEventListener("change", () => {
  appState.selectedLocationIndex = locationSelect.selectedIndex; // ← зберігаємо індекс
  renderDevicesByLocation(locationSelect.value);
  document.getElementById('extendedName').value = ''; // ← очищаємо розширену назву при зміні локації
});

deviceSelect.addEventListener('change', () => {
  document.getElementById('extendedName').value = ''; // ← очищаємо розширену назву при зміні типу пристрою
});

// Коли змінюється тип пристрою
document.getElementById("addDeviceBtn").onclick = () => {
  const type = document.getElementById("deviceType").value;
  const name = deviceSelect.options[deviceSelect.selectedIndex].text.trim();
  const extendedName = document.getElementById("extendedName").value.trim();
  const locationIndex = document.getElementById("deviceLocation").selectedIndex;

  const Constructor = Device.getClassForType(type);
  const device = new Constructor(name, extendedName, type, locationIndex);

  house.addDevice(device);
  renderDevices();
};

renderLocations();
renderDevicesByLocation(locations[0]); // показати пристрої для першої локації

// Ініціалізація додатку: перевірка автентифікації та завантаження даних
async function initializeApp() {
  if (!Auth.isAuthenticated()) {
    window.location.href = 'login.html';
    return;
  }

  await loadSmartHouses();
}

document.getElementById('userName').textContent = localStorage.getItem('login') || 'Гість';

const langBtn = document.getElementById('langBtn');
const langMenu = document.getElementById('langMenu');

langBtn.addEventListener('click', () => {
  langMenu.classList.toggle('d-none');
});

document.querySelectorAll('.app-navbar__lang-item').forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const lang = e.target.dataset.lang;
    langBtn.textContent = e.target.textContent;
    langMenu.classList.add('d-none');
    // тут логіка зміни мови
  });
});

// Закриваємо меню при кліку поза ним
document.addEventListener('click', (e) => {
  if (!langDropdown.contains(e.target)) {
    langMenu.classList.add('d-none');
  }
});

// Завантажуємо список смарт будинків
async function loadSmartHouses() {
  try {
    const smartHouses = await SmartHouseAPI.getSmartHouses();
    renderSmartHousesMenu(smartHouses);
  } catch (error) {
    console.error('Помилка при завантаженні будинків:', error);
  }
}

// Рендеримо меню смарт будинків
function renderSmartHousesMenu(smartHouses) {
  const menu = document.getElementById('smartHousesMenu');
  menu.innerHTML = '';
  
  smartHouses.forEach(house => {
    const item = document.createElement('a');
    item.href = '#';
    item.textContent = house.name;
    item.addEventListener('click', (e) => {
      e.preventDefault();
      selectSmartHouse(house.id, house.name);
    });
    menu.appendChild(item);
  });
}

// Вибираємо смарт будинок і завантажуємо його пристрої
async function selectSmartHouse(houseId, houseName) {
  appState.currentHouseId = houseId;
  appState.currentHouseName = houseName;
  document.getElementById('currentHouseName').textContent = houseName;

  try {
    devices = await SmartHouseAPI.getDevices(houseId);
    renderDevices();
  } catch (error) {
    console.error('Помилка при завантаженні пристроїв:', error);
  }
}

// Налаштовуємо кнопку Logout
document.getElementById('logoutBtn').addEventListener('click', (e) => {
  e.preventDefault();
  Auth.logout();
});