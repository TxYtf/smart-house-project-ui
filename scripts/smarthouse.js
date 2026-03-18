class SmartHouse {
  constructor() {
    this.devices = [];
  }

  addDevice(device) {
    this.devices.push(device);
  }

  removeDevice(id) {
    this.devices = this.devices.filter(d => d.id !== id);
  }

  getDeviceById(id) {
    return this.devices.find(d => d.id === id);
  }
}