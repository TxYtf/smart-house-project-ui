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

class Light extends Device {
  constructor(name, extendedName, location) {
    super(name, extendedName, "Light", location);
    this.volume = 100;
  }
  setVolume(vol) { this.volume = vol; }
  getStatus() {
    return this.isOn ? `Увімкнено, яскравість: ${this.volume}` : "Вимкнено";
  }
}

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
  setVolume(vol) { this.volume = vol; }
  getStatus() {
    return this.isOn ? `Увімкнено, канал: ${this.channels[this.channel-1]}, гучність: ${this.volume}` : "Вимкнено";
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

    const template = document.getElementById('device-card-template');
    const card = template.content.cloneNode(true);

    // Унікальний id для collapse
    const integrationId = `integration-${device.id}`;

    // Заповнюємо дані в шаблону
    card.querySelector('.card-title').textContent = 
      `${getDeviceDisplayName(device.type)} ${device.extendedName || ''}`;
    
    card.querySelector('.card-text-content').textContent = device.location;
    
    card.querySelector('.device-status').textContent = `[${device.getStatus()}]`;
    
    // Установлюємо ID для collapse
    const collapseDiv = card.querySelector('.integration-collapse');
    collapseDiv.id = integrationId;

    // Заповнюємо поля інтеграції
    card.querySelector('.integration-ip').value = device.integration?.ip || '';
    card.querySelector('.integration-protocol').value = device.integration?.protocol || '';
    card.querySelector('.integration-deviceId').value = device.integration?.deviceId || '';
    card.querySelector('.integration-apiKey').value = device.integration?.apiKey || '';
    
    // Кнопка Toggle (Увімкнути/Вимкнути)
    const toggleBtn = card.querySelector('.toggle-btn');
    toggleBtn.textContent = device.isOn ? "Вимкнути" : "Увімкнути";
    toggleBtn.title = "Увімкнути/Вимкнути цей пристрій";
    toggleBtn.addEventListener("click", () => {
      home.devices.find(d => d.id === device.id).toggle();
      renderDevices();
    });
    
    // Кнопка Remove (Видалити)
    const removeBtn = card.querySelector('.remove-btn');
    removeBtn.title = "Видалити цей пристрій з системи";
    removeBtn.addEventListener("click", () => {
      home.removeDevice(device.id);
      renderDevices();
    });
    
    // Кнопка Integration (Інтеграція)
    const integrationBtn = card.querySelector('.integration-btn');
    integrationBtn.setAttribute('data-bs-target', `#${integrationId}`);
    integrationBtn.setAttribute('aria-controls', `${integrationId}`);
    integrationBtn.title = "Інтеграція в систему через IP, MQTT, HTTP або WebSocket";

    // Регулятор освітлення для Light
    if (device instanceof Light) {
      // Контейнер для регулятора яскравості
      const brightnessContainer = document.createElement("div");
      brightnessContainer.className = "d-flex align-items-center gap-1 mt-2";

      const brightnessLabel = document.createElement("label");
      brightnessLabel.textContent = "Яскравість:";
      brightnessLabel.className = "form-label mb-0";
      
      const brightnessSlider = document.createElement("input");
      brightnessSlider.type = "range";
      brightnessSlider.className = "form-range flex-grow-1";
      brightnessSlider.min = "0";
      brightnessSlider.max = "100";
      brightnessSlider.value = device.volume;
      
      const brightnessDisplay = document.createElement("span");
      brightnessDisplay.textContent = device.volume;
      brightnessDisplay.className = "badge bg-secondary badge__volume";
      
      brightnessSlider.addEventListener("input", () => {
        device.setVolume(parseInt(brightnessSlider.value));
        brightnessDisplay.textContent = device.volume;
        // Оновлення статусу світильника в картці
        div.querySelector('.device-status').textContent = `[${device.getStatus()}]`;
      });
      
      brightnessContainer.appendChild(brightnessLabel);
      brightnessContainer.appendChild(brightnessSlider);
      brightnessContainer.appendChild(brightnessDisplay);
      
      card.querySelector('.specific-buttons').appendChild(brightnessContainer);
    }

    // Спеціальні кнопки для WindowBlind
    if (device instanceof WindowBlind) {
      const openBtn = document.createElement("button");
      openBtn.textContent = "Відкрити";
      openBtn.className = "btn btn-sm btn-info mt-2";
      openBtn.addEventListener("click", () => {
        device.open();
        renderDevices();
      });
      
      const closeBtn = document.createElement("button");
      closeBtn.textContent = "Закрити";
      closeBtn.className = "btn btn-sm btn-info mt-2 ms-1";
      closeBtn.addEventListener("click", () => {
        device.close();
        renderDevices();
      });
      
      card.querySelector('.specific-buttons').appendChild(openBtn);
      card.querySelector('.specific-buttons').appendChild(closeBtn);
    }

    // Спеціальні кнопки для TV
    if (device instanceof TV) {
      const prevBtn = document.createElement("button");
      prevBtn.textContent = "Попередній канал";
      prevBtn.className = "btn btn-sm btn-warning mt-2 card-specific__btn";
      prevBtn.addEventListener("click", () => {
        device.prevChannel();
        renderDevices();
      });
      
      const nextBtn = document.createElement("button");
      nextBtn.textContent = "Наступний канал";
      nextBtn.className = "btn btn-sm btn-warning mt-2 ms-1 card-specific__btn";
      nextBtn.addEventListener("click", () => {
        device.nextChannel();
        renderDevices();
      });
      
      // Контейнер для кнопок каналів
      const channelBtnsContainer = document.createElement("div");
      channelBtnsContainer.className = "mb-2 d-flex card-device__btn-group";
      channelBtnsContainer.appendChild(prevBtn);
      channelBtnsContainer.appendChild(nextBtn);
      
      // Контейнер для регулятора звуку
      const volumeContainer = document.createElement("div");
      volumeContainer.className = "d-flex align-items-center gap-1";
      
      const volumeLabel = document.createElement("label");
      volumeLabel.textContent = "Гучність:";
      volumeLabel.className = "form-label mb-0";
      
      const volumeSlider = document.createElement("input");
      volumeSlider.type = "range";
      volumeSlider.className = "form-range flex-grow-1";
      volumeSlider.min = "0";
      volumeSlider.max = "100";
      volumeSlider.value = device.volume;
      
      const volumeDisplay = document.createElement("span");
      volumeDisplay.textContent = device.volume;
      volumeDisplay.className = "badge bg-secondary badge__volume";
      
      volumeSlider.addEventListener("input", () => {
        device.setVolume(parseInt(volumeSlider.value));
        volumeDisplay.textContent = device.volume;
        // Оновлення статусу телевізора в картці
        div.querySelector('.device-status').textContent = `[${device.getStatus()}]`;
      });
      
      volumeContainer.appendChild(volumeLabel);
      volumeContainer.appendChild(volumeSlider);
      volumeContainer.appendChild(volumeDisplay);
      
      card.querySelector('.specific-buttons').appendChild(channelBtnsContainer);
      card.querySelector('.specific-buttons').appendChild(volumeContainer);
    }

    // Додаємо всю картку до div
    div.appendChild(card);

    // Обробник кнопки "Зберегти" інтеграцію
    const saveBtn = div.querySelector(".save-integration");
    saveBtn.addEventListener("click", () => {
      device.integration.ip = div.querySelector(".integration-ip").value.trim();
      device.integration.protocol = div.querySelector(".integration-protocol").value;
      device.integration.deviceId = div.querySelector(".integration-deviceId").value.trim();
      device.integration.apiKey = div.querySelector(".integration-apiKey").value.trim();
      alert(`Інтеграційні налаштування для "${device.name}" збережено.`);
    });

    // Додаємо картку до контейнера
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