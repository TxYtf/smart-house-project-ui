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

// Базовий клас пристрою
class Device {
  static nextId = 1;

  static deviceClasses = [];
  static registerClass(cls) {
    this.deviceClasses.push(cls);
    return cls;
  }
  static getClassForType(type) {
    return this.deviceClasses.find(cls => cls.name === type) || Device;
  }

  constructor(name, extendedName, type, location) {
    this.id = Device.nextId++;
    this.name = name;
    this.extendedName = extendedName;
    this.type = type;
    this.location = location;
    this.volumeRegulator = null; // Чи має пристрій регулятор гучності/яскравості
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
    return this.isOn ? "On" : "Off";
  }
}

// Приклад розширеного компонента Світильник з регулятором яскравості
const Light = Device.registerClass(
  class Light extends Device {
    constructor(name, extendedName, location) {
      super(name, extendedName, "Light", location);
      this.volumeRegulator = {
        name: "Яскравість:",
        type: "brightness",
        volume: 100, // 0 - вимкнено, 100 - максимально яскраво
        volumeMax: 100
      };
    }
    setVolume(vol) { this.volumeRegulator.volume = vol; }
    getStatus() {
      return this.isOn ? `ON, яскравість: ${this.volumeRegulator.volume}` : "OFF";
    }
  }
);

// Приклад розширеного компонента Котел опалення з регулятором рівня опалення
const HeatingBoiler = Device.registerClass(
  class HeatingBoiler extends Device {
    constructor(name, extendedName, location) {
      super(name, extendedName, "HeatingBoiler", location);
      this.volumeRegulator = {
        name: "Рівень опалення:",
        type: "heatingLevel",
        volume: 0, // 0 - вимкнено, 100 - максимальний рівень
        volumeMax: 100
      };
    }
    setVolume(vol) { this.volumeRegulator.volume = vol; }
    getStatus() {
      return this.isOn ? `ON, рівень опалення: ${this.volumeRegulator.volume}` : "OFF";
    }
  }
);

// Приклад розширеного компонента Жалюзі з регулятором відкриття
const WindowBlind = Device.registerClass(
  class WindowBlind extends Device {
    constructor(name, extendedName, location) {
      super(name, extendedName, "WindowBlind", location);
      this.volumeRegulator = {
        name: "Відкриття:",
        type: "openingLevel",
        volume: 0, // 0 - закрито, 100 - відкрито
        volumeMax: 100
      };
      this.isDown = true; // чи опущені жалюзі
    }
    setVolume(vol) { this.volumeRegulator.volume = vol; }
    setDown(state) {
      this.isDown = state;
    }
    getStatus() {
      let openVolume = "";
      if (this.isDown) {
        if (this.volumeRegulator.volume === 100) {
          openVolume = "повністю відкриті";
        } else if (this.volumeRegulator.volume === 0) {
          openVolume = "повністю закриті";
        } else {
          openVolume = `відкриті на ${this.volumeRegulator.volume}%`;
        }
      }
      return this.isOn ? `ON, ${this.isDown ? "опущені, " : "підняті"}${openVolume}` : "OFF";
    }
  }
);

// Приклад розширеного компонента TV
const TV = Device.registerClass(
  class TV extends Device {
    constructor(name, extendedName, location) {
      super(name, extendedName, "TV", location);
      this.channel = 1;
      this.channels = ["1. News", "2. Sports", "3. Movies"];
      this.volumeRegulator = {
        name: "Гучність:",
        type: "volumeLevel",
        volume: 10, // 0 - вимкнено, 100 - максимально гучно
        volumeMax: 100,
        muted: false
      };
    }
    nextChannel() { this.channel = (this.channel % this.channels.length) + 1; }
    prevChannel() { this.channel = (this.channel - 2 + this.channels.length) % this.channels.length + 1; }
    setVolume(vol) { this.volumeRegulator.volume = vol; }
    toggleMute() {
      this.volumeRegulator.muted = !this.volumeRegulator.muted;
    }
    getStatus() {
      let volumeStatus = this.volumeRegulator.muted ? "Muted" : this.volumeRegulator.volume;
      return this.isOn ? `ON, ch: ${this.channels[this.channel-1]}, гучність: ${volumeStatus}` : "OFF";
    }
  }
);

class SmartHome {
  constructor() { this.devices = []; }
  addDevice(device) { this.devices.push(device); }
  removeDevice(id) { this.devices = this.devices.filter(d => d.id !== id); }
}

const deviceConstructors = Device.deviceClasses.reduce((acc, cls) => {
  acc[cls.name] = cls;
  return acc;
}, {});

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

// Рендеримо пристрої, дозволені для вибраної локації
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

// Рендеримо картки пристроїв
function renderDevices() {
  devicesContainer.innerHTML = "";
  home.devices.forEach(device => {
    const div = document.createElement("div");
    div.className = "col-lg-4 col-md-6 col-12"; // три картки в ряд

    const template = document.getElementById('device-card-template');
    const card = template.content.cloneNode(true);

    // Унікальний id для collapse
    const integrationId = `integration-${device.id}`;

    // Заповнюємо дані в шаблоні
    const currentDevice = devices.find(dev => dev.type === device.type);
    card.querySelector('.card-title').textContent = 
      `${currentDevice ? currentDevice.name : device.type} ${device.extendedName || ''}`;
    
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
    toggleBtn.addEventListener("click", () => {
      home.devices.find(d => d.id === device.id).toggle();
      renderDevices();
    });
    
    // Кнопка Remove (Видалити)
    const removeBtn = card.querySelector('.remove-btn');
    removeBtn.addEventListener("click", () => {
      home.removeDevice(device.id);
      renderDevices();
    });
    
    // Кнопка Integration (Інтеграція)
    const integrationBtn = card.querySelector('.integration-btn');
    integrationBtn.setAttribute('data-bs-target', `#${integrationId}`);
    integrationBtn.setAttribute('aria-controls', `${integrationId}`);

    // Унікальний регулятор для пристроїв з підтримкою регулятора
    const regulatorWrapper = card.querySelector('.volume-regulator-wrapper');
    const regulatorLabel = card.querySelector('.volume-regulator-label');
    const regulatorSlider = card.querySelector('.volume-regulator-slider');
    const regulatorDisplay = card.querySelector('.volume-regulator-display');

    if (device.volumeRegulator) {
      regulatorWrapper.classList.remove('d-none'); // Показуємо регулятор
      regulatorSlider.max = "100";
      regulatorSlider.value = device.volumeRegulator.volume;
      regulatorDisplay.textContent = device.volumeRegulator.muted ? "(X)" : device.volumeRegulator.volume;

      // Блокуємо регулятор, якщо пристрій вимкнений або для WindowBlind якщо жалюзі підняті
      if (!device.isOn) {
        regulatorSlider.disabled = true;
        regulatorLabel.classList.add('text-muted');
      } else {
        if (device instanceof WindowBlind && !device.isDown) {
          regulatorSlider.disabled = true;
          regulatorLabel.classList.add('text-muted');
        } else if (device instanceof TV && device.volumeRegulator.muted) {
          regulatorSlider.disabled = true;
          regulatorLabel.classList.add('text-muted');
        } else {
          regulatorSlider.disabled = false;
          regulatorLabel.classList.remove('text-muted');
        }
      }

      // Змінюємо label залежно від типу
      regulatorLabel.textContent = device.volumeRegulator.name;
      regulatorSlider.max = device.volumeRegulator.volumeMax;
      
      // Обробник змін регулятора
      regulatorSlider.addEventListener("input", () => {
        device.setVolume(parseInt(regulatorSlider.value));
        regulatorDisplay.textContent = device.volumeRegulator.volume;
        div.querySelector('.device-status').textContent = `[${device.getStatus()}]`;
      });
    }

    // Спеціальні кнопки для WindowBlind
    if (device instanceof WindowBlind) {
      const openBtn = document.createElement("button");
      openBtn.textContent = "Підняти";
      openBtn.className = "btn btn-sm btn-info mt-2";
      openBtn.addEventListener("click", () => {
        device.setDown(false); // підняти
        renderDevices();
      });
      
      const closeBtn = document.createElement("button");
      closeBtn.textContent = "Опустити";
      closeBtn.className = "btn btn-sm btn-info mt-2 ms-1";
      closeBtn.addEventListener("click", () => {
        device.setDown(true); // опустити
        renderDevices();
      });
      
      card.querySelector('.specific-buttons').appendChild(openBtn);
      card.querySelector('.specific-buttons').appendChild(closeBtn);
    }

    // Спеціальні кнопки для TV
    if (device instanceof TV) {
      const prevBtn = document.createElement("button");
      prevBtn.textContent = "Канал --";
      prevBtn.className = "btn btn-sm btn-warning mt-2 card-specific__btn";
      prevBtn.addEventListener("click", () => {
        device.prevChannel();
        renderDevices();
      });
      
      const nextBtn = document.createElement("button");
      nextBtn.textContent = "Канал ++";
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

      // Контейнер для кнопок каналів
      const channelBtnsContainer = document.createElement("div");
      channelBtnsContainer.className = "mb-2 d-flex card-device__btn-group";
      channelBtnsContainer.appendChild(prevBtn);
      channelBtnsContainer.appendChild(nextBtn);
      channelBtnsContainer.appendChild(muteBtn);

      card.querySelector('.specific-buttons').appendChild(channelBtnsContainer);
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

  const Constructor = deviceConstructors[type] || Device;
  const device = new Constructor(name, extendedName, type, location);

  home.addDevice(device);
  renderDevices();
};

renderLocations();
renderDevicesByLocation(locations[0]); // показати пристрої для першої локації