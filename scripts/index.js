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

  fillCardBasicInfo(card, device);

  const cardEl = card.querySelector('.device-card');
  cardEl.addEventListener('click', () => openDeviceModal(device));

  div.appendChild(card);
  return div;
}

// Відкриваємо модальне вікно для пристрою
function openDeviceModal(device) {
  const t = i18n[appState.lang];
  const modal = document.getElementById('deviceModal');
  const currentDevice = devices.find(dev => dev.type === device.type);

  // Заголовок
  document.getElementById('deviceModalTitle').textContent =
    `${currentDevice ? currentDevice.name : device.type} ${device.extendedName || ''}`;

  // Тіло модалки — статус + специфічні кнопки + регулятор + інтеграція
  const body = document.getElementById('deviceModalBody');
  body.innerHTML = '';

  // Статус
  const statusEl = document.createElement('p');
  const statusText = formatStatus(device.getStatus());
  statusEl.innerHTML = `<strong class="device-status ${device.isOn ? 'device-status__on' : 'device-status__off'}">[${statusText}]</strong>`;
  body.appendChild(statusEl);

  // Специфічні кнопки
  const specificDiv = document.createElement('div');
  specificDiv.className = 'mb-3';
  if (device instanceof WindowBlind) buildWindowBlindButtons(specificDiv, device, modal);
  if (device instanceof TV) buildTVButtons(specificDiv, device, modal);
  if (specificDiv.children.length) body.appendChild(specificDiv);

  // Регулятор
  buildVolumeRegulator(body, device);

  // Інтеграція collapse
  const integrationCollapse = buildIntegrationSection(device);
  body.appendChild(integrationCollapse);

  // Кнопки футера
  const toggleBtn = modal.querySelector('.modal-toggle-btn');
  toggleBtn.textContent = device.isOn ? t.toggleOff : t.toggleOn;
  toggleBtn.onclick = () => {
    house.devices.find(d => d.id === device.id).toggle();
    renderDevices();
    openDeviceModal(device); // оновлюємо модалку
  };

  const removeBtn = modal.querySelector('.modal-remove-btn');
  removeBtn.textContent = t.removeBtn;
  removeBtn.onclick = () => {
    house.removeDevice(device.id);
    bootstrap.Modal.getInstance(modal).hide();
    renderDevices();
  };

  const integrationBtn = modal.querySelector('.modal-integration-btn');
  integrationBtn.textContent = t.integrationBtn;

  bootstrap.Modal.getOrCreateInstance(modal).show();
  modal.addEventListener('hidden.bs.modal', renderDevices, { once: true });
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

// Створюємо регулятор гучності (для TV) або рівня нагріву (для котла)
function buildVolumeRegulator(container, device) {
  if (!device.volumeRegulator) return;
  const t = i18n[appState.lang];

  const wrapper = document.createElement('div');
  wrapper.className = 'mb-3';
  wrapper.innerHTML = `
    <div class="d-flex align-items-center gap-2 badge__volume">
      <label class="form-label mb-0 vol-label">${t.regulatorNames[device.volumeRegulator.type]}</label>
      <input type="range" class="form-range flex-grow-1 vol-slider"
             min="0" max="${device.volumeRegulator.volumeMax}"
             value="${device.volumeRegulator.volume}">
      <span class="badge bg-secondary vol-display">
        ${device.volumeRegulator.muted ? '(X)' : device.volumeRegulator.volume}
      </span>
    </div>`;

  const slider = wrapper.querySelector('.vol-slider');
  const display = wrapper.querySelector('.vol-display');
  const label = wrapper.querySelector('.vol-label');

  // стан слайдера
  const isDisabled = !device.isOn ||
    (device instanceof WindowBlind && !device.isDown) ||
    (device instanceof TV && device.volumeRegulator.muted);
  slider.disabled = isDisabled;
  if (isDisabled) label.classList.add('text-muted');

  slider.addEventListener('input', () => {
    device.setVolume(parseInt(slider.value));
    display.textContent = device.volumeRegulator.volume;
    renderDevices();
  });

  container.appendChild(wrapper);
}

// Створюємо секцію інтеграції
function buildIntegrationSection(device) {
  const t = i18n[appState.lang];
  const wrapper = document.createElement('div');
  wrapper.innerHTML = `
    <div class="collapse" id="modalIntegrationCollapse">
      <div class="device-card__integration mt-2">
        <div class="mb-2">
          <label>${t.integrationIpLabel}</label>
          <input type="text" class="app-panel__input app-panel__input--sm int-ip" value="${device.integration?.ip || ''}">
        </div>
        <div class="mb-2">
          <label>${t.integrationProtocolLabel}</label>
          <select class="app-panel__select app-panel__select--sm int-protocol">
            <option value="WebSocket">${t.protocols['WebSocket']}</option>
            <option value="MQTT">${t.protocols['MQTT']}</option>
            <option value="HTTP">${t.protocols['HTTP']}</option>
          </select>
        </div>
        <div class="mb-2">
          <label>${t.integrationDeviceIdLabel}</label>
          <input type="text" class="app-panel__input app-panel__input--sm int-deviceId" value="${device.integration?.deviceId || ''}">
        </div>
        <div class="mb-2">
          <label>${t.integrationApiKeyLabel}</label>
          <input type="text" class="app-panel__input app-panel__input--sm int-apiKey" value="${device.integration?.apiKey || ''}">
        </div>
        <button class="app-btn app-btn--sm app-btn--success int-save">${t.saveIntegrationBtn}</button>
      </div>
    </div>`;

  wrapper.querySelector('.int-protocol').value = device.integration?.protocol || 'WebSocket';
  wrapper.querySelector('.int-save').addEventListener('click', () => {
    device.integration.ip = wrapper.querySelector('.int-ip').value.trim();
    device.integration.protocol = wrapper.querySelector('.int-protocol').value;
    device.integration.deviceId = wrapper.querySelector('.int-deviceId').value.trim();
    device.integration.apiKey = wrapper.querySelector('.int-apiKey').value.trim();
    alert(i18n[appState.lang].integrationSaved(device.name));
  });

  return wrapper;
}

// Створюємо специфічні кнопки для пристроїв
function buildWindowBlindButtons(container, device, modal) {
  const t = i18n[appState.lang];
  const group = document.createElement('div');
  group.className = 'd-flex gap-2';

  const upBtn = document.createElement('button');
  upBtn.textContent = t.blindUp;
  upBtn.className = 'btn btn-sm btn-info';
  upBtn.addEventListener('click', () => {
    device.setDown(false);
    renderDevices();
    openDeviceModal(device);
  });

  const downBtn = document.createElement('button');
  downBtn.textContent = t.blindDown;
  downBtn.className = 'btn btn-sm btn-info';
  downBtn.addEventListener('click', () => {
    device.setDown(true);
    renderDevices();
    openDeviceModal(device);
  });

  group.appendChild(upBtn);
  group.appendChild(downBtn);
  container.appendChild(group);
}

// Створюємо специфічні кнопки для TV (зміна каналу, mute)
function buildTVButtons(container, device, modal) {
  const t = i18n[appState.lang];
  const group = document.createElement('div');
  group.className = 'd-flex gap-2 flex-wrap';

  const prevBtn = document.createElement('button');
  prevBtn.textContent = t.prevChannel;
  prevBtn.className = 'btn btn-sm btn-warning';
  prevBtn.addEventListener('click', () => { device.prevChannel(); renderDevices(); openDeviceModal(device); });

  const nextBtn = document.createElement('button');
  nextBtn.textContent = t.nextChannel;
  nextBtn.className = 'btn btn-sm btn-warning';
  nextBtn.addEventListener('click', () => { device.nextChannel(); renderDevices(); openDeviceModal(device); });

  const muteBtn = document.createElement('button');
  muteBtn.textContent = 'Mute';
  muteBtn.className = 'btn btn-sm btn-secondary';
  muteBtn.addEventListener('click', () => { device.toggleMute(); renderDevices(); openDeviceModal(device); });

  group.appendChild(prevBtn);
  group.appendChild(nextBtn);
  group.appendChild(muteBtn);
  container.appendChild(group);
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