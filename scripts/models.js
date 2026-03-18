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
    return this.isOn ? "On" : "OFF";
  }
}

// Приклад розширеного компонента Світильник з регулятором яскравості
const Light = Device.registerClass(
  class Light extends Device {
    constructor(name, extendedName, type, location) {
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
    constructor(name, extendedName, type, location) {
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
    constructor(name, extendedName, type, location) {
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
    constructor(name, extendedName, type, location) {
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
