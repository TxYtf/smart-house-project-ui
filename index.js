const locations = [
  "Кухня", "Вітальня", "Кімната 1 поверх 1", "Кімната 2 поверх 1", "Кабінет поверх 1", "Коридор поверх 1",
  "Ванна кімната поверх 1", "Гардеробна поверх 1", "Кладовка поверх 1", "Кімната 1 поверх 2", "Кімната 2 поверх 2",
  "Коридор поверх 2", "Ванна кімната поверх 2", "Кладовка поверх 2", "Гардеробна поверх 2", "Підвал", "Горище",
  "Гараж", "Тераса", "Двір"
];

const devices = [
  { name: "Світильник", type: "Light",
    location: ["Кухня", "Вітальня", "Кімната 1 поверх 1", "Кімната 2 поверх 1", "Кабінет поверх 1", "Коридор поверх 1",
      "Ванна кімната поверх 1", "Гардеробна поверх 1", "Кладовка поверх 1", "Кімната 1 поверх 2", "Кімната 2 поверх 2",
      "Коридор поверх 2", "Ванна кімната поверх 2", "Кладовка поверх 2", "Гардеробна поверх 2", "Підвал","Горище",
      "Гараж", "Тераса", "Двір"]},

  { name: "Підсвітка", type: "LEDStrip",
    location: ["Кухня", "Вітальня", "Кімната 1 поверх 1", "Кімната 2 поверх 1", "Кабінет поверх 1", "Коридор поверх 1",
      "Ванна кімната поверх 1", "Гардеробна поверх 1", "Кімната 1 поверх 2", "Кімната 2 поверх 2",
      "Коридор поверх 2", "Ванна кімната поверх 2", "Гардеробна поверх 2", "Гараж", "Тераса", "Двір"]},

  { name: "Розетка", type: "Socket",
    location: ["Кухня", "Вітальня", "Кімната 1 поверх 1", "Кімната 2 поверх 1", "Кабінет поверх 1", "Коридор поверх 1",
      "Ванна кімната поверх 1", "Гардеробна поверх 1", "Кладовка поверх 1", "Кімната 1 поверх 2", "Кімната 2 поверх 2",
      "Коридор поверх 2", "Ванна кімната поверх 2", "Кладовка поверх 2", "Гардеробна поверх 2", "Підвал", "Горище",
      "Гараж", "Тераса", "Двір"]},

  { name: "Телевізор", type: "TV",
    location: ["Кухня", "Вітальня", "Кімната 1 поверх 1", "Кімната 2 поверх 1", "Кабінет поверх 1", "Кімната 1 поверх 2",
      "Кімната 2 поверх 2"]},

  { name: "Звукова система", type: "SoundSystem",
    location: ["Кухня", "Вітальня", "Кімната 1 поверх 1", "Кімната 2 поверх 1", "Кабінет поверх 1", "Кімната 1 поверх 2",
      "Кімната 2 поверх 2", "Тераса", "Двір", "Гараж"]},

  { name: "Віконні жалюзі", type: "WindowBlind",
    location: ["Кухня", "Вітальня", "Кімната 1 поверх 1", "Кімната 2 поверх 1", "Кабінет поверх 1", "Кімната 1 поверх 2",
      "Кімната 2 поверх 2"]},

  { name: "Датчик вікна", type: "WindowSensor",
    location: ["Кухня", "Вітальня", "Кімната 1 поверх 1", "Кімната 2 поверх 1", "Кабінет поверх 1", "Кімната 1 поверх 2",
      "Кімната 2 поверх 2"]},

  { name: "Датчик руху", type: "MotionSensor",
    location: ["Кухня", "Вітальня", "Кімната 1 поверх 1", "Кімната 2 поверх 1", "Кабінет поверх 1", "Коридор поверх 1",
      "Ванна кімната поверх 1", "Гардеробна поверх 1", "Кладовка поверх 1", "Кімната 1 поверх 2", "Кімната 2 поверх 2",
      "Коридор поверх 2", "Ванна кімната поверх 2", "Кладовка поверх 2", "Гардеробна поверх 2", "Підвал","Горище",
      "Гараж", "Тераса", "Двір"]},

  { name: "Камера спостереження", type: "Camera",
    location: ["Двір","Тераса","Гараж"]},

  { name: "Кондиціонер", type: "AirConditioner",
    location: ["Кухня", "Вітальня", "Кімната 1 поверх 1", "Кімната 2 поверх 1", "Кабінет поверх 1", "Кімната 1 поверх 2",
      "Кімната 2 поверх 2"]},

  { name: "Термостат", type: "Thermostat",
    location: ["Кухня", "Вітальня", "Кімната 1 поверх 1", "Кімната 2 поверх 1", "Кабінет поверх 1","Ванна кімната поверх 1",
      "Кімната 1 поверх 2", "Кімната 2 поверх 2", "Ванна кімната поверх 2"]},

  { name: "Підігрів підлоги", type: "UnderfloorHeater",
    location: ["Кухня", "Коридор поверх 1", "Ванна кімната поверх 1", "Ванна кімната поверх 2"]},

  { name: "Бойлер", type: "WaterBoiler",
    location: ["Ванна кімната поверх 1", "Ванна кімната поверх 2", "Підвал"]},

  { name: "Витяжка", type: "ExhaustFan",
    location: ["Кухня","Ванна кімната поверх 1", "Ванна кімната поверх 2", "Підвал", "Гараж"]},

  { name: "Рушникосушка", type: "TowelRack",
    location: ["Ванна кімната поверх 1", "Ванна кімната поверх 2"]},

  { name: "Пральна машина", type: "WashingMachine",
    location: ["Ванна кімната поверх 1","Ванна кімната поверх 2", "Підвал"]},

  { name: "Сушарка", type: "Dryer",
    location: ["Ванна кімната поверх 1","Ванна кімната поверх 2", "Підвал"]},

  { name: "Сигналізація", type: "Alarm",
    location: ["Коридор поверх 1", "Гараж", "Двір"]},

  { name: "Домофон", type: "Intercom",
    location: ["Коридор поверх 1", "Гараж", "Двір"]},

  { name: "Wi-Fi роутер", type: "Router",
    location: ["Коридор поверх 1"]},

  { name: "Замок на двері", type: "DoorLock",
    location: ["Коридор поверх 1", "Гараж", "Тераса"]},

  { name: "Гаражні ворота", type: "GarageDoor",
    location: ["Гараж"]},

  { name: "Холодильник", type: "Fridge",
    location: ["Кухня", "Гараж", "Підвал"]},

  { name: "Духовка", type: "Oven",
    location: ["Кухня"]},

  { name: "Кавоварка", type: "CoffeeMaker",
    location: ["Кухня"]},

  { name: "Плита", type: "Stove",
    location: ["Кухня"]},

  { name: "Котел опалення", type: "HeatingBoiler",
    location: ["Підвал"]},

  { name: "Система поливу", type: "SprinklerSystem",
    location: ["Двір"]}
];



class Device {
  static nextId = 1;
  constructor(name, extendedName, type, location) {
    this.id = Device.nextId++;
    this.name = name;
    this.extendedName = extendedName;
    this.type = type;
    this.location = location;
    this.isOn = false;

    // Налаштування інтеграції
    this.integration = {
      ip: null,            // IP або адреса пристрою
      protocol: null,      // MQTT, HTTP, WebSocket
      apiKey: null,        // ключ для доступу
      deviceId: null       // ID реального пристрою
    };
  }
  toggle() {
    this.isOn = !this.isOn;
  }
  getStatus() {
    return this.isOn ? "Увімкнено" : "Вимкнено";
  }
}

class Light extends Device {}

class HeatingBoiler extends Device {}

class WindowBlind extends Device {
  open() { this.isOn = true; }
  close() { this.isOn = false; }
  getStatus() { return this.isOn ? "Відкрито" : "Закрито"; }
}

// Приклад розширеного компонента TV
class TV extends Device {
  constructor(name, extendedName, location) {
    super(name, extendedName, "TV", location);
    this.channel = 1;
    this.volume = 10;
    this.channels = ["1. News", "2. Sports", "3. Movies"];
  }
  nextChannel() { this.channel = (this.channel % this.channels.length) + 1; }
  prevChannel() { this.channel = (this.channel - 2 + this.channels.length) % this.channels.length + 1; }
  setVolume(v) { this.volume = v; }
  getStatus() {
    return this.isOn ? `Увімкнено, канал: ${this.channel}, гучність: ${this.volume}` : "Вимкнено";
  }
}

class SmartHome {
  constructor() { this.devices = []; }
  addDevice(device) { this.devices.push(device); }
  removeDevice(id) { this.devices = this.devices.filter(d => d.id !== id);
}
}

const home = new SmartHome();
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

function renderDevicesByLocation(selectedLocation) {
  deviceSelect.disabled = !selectedLocation;
  deviceSelect.innerHTML = "";

  // фільтруємо пристрої, дозволені для локації
  const allowedDevices = devices.filter(device =>
    device.location.includes(selectedLocation)
  );

  // якщо нічого не знайдено
  if (allowedDevices.length === 0) {
    const option = document.createElement("option");
    option.textContent = "Немає доступних пристроїв";
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

function getDeviceDisplayName(type) {
  const template = devices.find(d => d.type === type);
  return template ? template.name : type;
}

function renderDevices() {
  devicesContainer.innerHTML = "";
  home.devices.forEach(device => {
    const div = document.createElement("div");
    div.className = "col-lg-4 col-md-6 col-12"; // три картки в ряд

    // Унікальний id для collapse
    const integrationId = `integration-${device.id}`;

    div.innerHTML = `
      <div class="card card-device">
        <div class="card-body">
          <h5 class="card-title">${getDeviceDisplayName(device.type)} ${device.extendedName || ''}</h5>
          <p class="card-text"><em>${device.location}</em></p>
          <p><strong>[${device.getStatus()}]</strong></p>
        </div>
      </div>
      <div class="mt-1"></div>
      <div class="collapse my-1" id="${integrationId}">
        <div class="card card-body bg-light">
          <div class="mb-2">
            <label>IP / MAC:</label>
            <input type="text" class="form-control form-control-sm integration-ip" value="${device.integration?.ip || ''}">
          </div>
          <div class="mb-2">
            <label>Протокол:</label>
            <select class="form-select form-select-sm integration-protocol">
              <option value="">Вибрати...</option>
              <option value="MQTT" ${device.integration?.protocol === 'MQTT' ? 'selected' : ''}>MQTT</option>
              <option value="HTTP" ${device.integration?.protocol === 'HTTP' ? 'selected' : ''}>HTTP</option>
              <option value="WebSocket" ${device.integration?.protocol === 'WebSocket' ? 'selected' : ''}>WebSocket</option>
            </select>
          </div>
          <div class="mb-2">
            <label>Device ID:</label>
            <input type="text" class="form-control form-control-sm integration-deviceId" value="${device.integration?.deviceId || ''}">
          </div>
          <div class="mb-2">
            <label>API Key / Token:</label>
            <input type="text" class="form-control form-control-sm integration-apiKey" value="${device.integration?.apiKey || ''}">
          </div>
          <button class="btn btn-success btn-sm save-integration">Зберегти</button>
        </div>
      </div>
    `;

    const btnContainer = document.createElement("div");
    btnContainer.className = "d-flex gap-1 mt-1 w-100"; // d-flex робить рядок, gap-1 додає відступи між кнопками
    btnContainer.style.width = "100%"; // ширина контейнера = ширині картки

    // Додаємо кнопки
    const toggleBtn = document.createElement("button");
    toggleBtn.className = "btn btn-sm btn-success flex-fill"; // flex-fill = займає рівну частину контейнера
    toggleBtn.style.minWidth = "0";
    toggleBtn.textContent = device.isOn ? "Вимкнути" : "Увімкнути";
    toggleBtn.onclick = () => { device.toggle(); renderDevices(); };

    const removeBtn = document.createElement("button");
    removeBtn.className = "btn btn-sm btn-danger flex-fill";
    removeBtn.style.minWidth = "0";
    removeBtn.textContent = "Видалити";
    removeBtn.onclick = () => { home.removeDevice(device.id); renderDevices(); };

    const integrationBtn = document.createElement("button");
    integrationBtn.className = "btn btn-sm btn-secondary flex-fill";
    integrationBtn.style.minWidth = "0";
    integrationBtn.textContent = "Інтеграція";
    integrationBtn.setAttribute("data-bs-toggle", "collapse");
    integrationBtn.setAttribute("data-bs-target", `#${integrationId}`);
    integrationBtn.setAttribute("aria-expanded", "false");
    integrationBtn.setAttribute("aria-controls", integrationId);
    
    // Додаємо контейнер під картку
    div.appendChild(btnContainer);

    btnContainer.appendChild(toggleBtn);
    btnContainer.appendChild(removeBtn);
    btnContainer.appendChild(integrationBtn);

    // div.querySelector(".card-body").appendChild(toggleBtn);
    // div.querySelector(".card-body").appendChild(removeBtn);
    // div.querySelector(".card-body").appendChild(integrationBtn);

    // Обробник кнопки "Зберегти" інтеграцію
    const saveBtn = div.querySelector(".save-integration");
    saveBtn.addEventListener("click", () => {
      device.integration.ip = div.querySelector(".integration-ip").value.trim();
      device.integration.protocol = div.querySelector(".integration-protocol").value;
      device.integration.deviceId = div.querySelector(".integration-deviceId").value.trim();
      device.integration.apiKey = div.querySelector(".integration-apiKey").value.trim();
      alert(`Інтеграційні налаштування для "${device.name}" збережено.`);
    });

    if (device instanceof WindowBlind) {
      const openBtn = document.createElement("button");
      openBtn.textContent = "Відкрити";
      openBtn.onclick = () => { device.open(); renderDevices(); };
      
      const closeBtn = document.createElement("button");
      closeBtn.textContent = "Закрити";
      closeBtn.onclick = () => { device.close(); renderDevices(); };

      div.appendChild(openBtn);
      div.appendChild(closeBtn);
    }

    if (device instanceof TV) {
      const nextBtn = document.createElement("button");
      nextBtn.textContent = "Наступний канал";
      nextBtn.onclick = () => { device.nextChannel(); renderDevices(); };

      const prevBtn = document.createElement("button");
      prevBtn.textContent = "Попередній канал";
      prevBtn.onclick = () => { device.prevChannel(); renderDevices(); };

      div.appendChild(prevBtn);
      div.appendChild(nextBtn);
    }

    devicesContainer.appendChild(div);
  });
}

// Коли змінюється локація
locationSelect.addEventListener("change", () => {
  renderDevicesByLocation(locationSelect.value);
});

// Коли змінюється тип пристрою
document.getElementById("addDeviceBtn").onclick = () => {
  const type = document.getElementById("deviceType").value;
  const name = deviceSelect.options[deviceSelect.selectedIndex].text.trim();
  const extendedName = document.getElementById("extendedName").value.trim();
  const location = document.getElementById("deviceLocation").value;
  
  //if (!name) return alert("Вкажіть назву пристрою");
  
  let device;
  // if (type.toLowerCase() === "tv") device = new TV(name, location);
  // else device = new Device(name, type, location);
  switch(type) {
    case "Light": device = new Light(name, extendedName, type, location); break;
    case "HeatingBoiler": device = new HeatingBoiler(name, extendedName, type, location); break;
    case "WindowBlind": device = new WindowBlind(name,extendedName, type, location); break;
    case "TV": device = new TV(name, extendedName, location); break;

    default: device = new Device(name, extendedName, type, location);
  }

  home.addDevice(device);
  renderDevices();
};

renderLocations();
renderDevicesByLocation(locations[0]); // показати пристрої для першої локації