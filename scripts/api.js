class SmartHouseAPI {
  static API_BASE_URL = 'https://ne7yja1gxe.execute-api.eu-north-1.amazonaws.com/smart-house-api';
  
    static getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Auth.getToken()}`
    };
  }
  static async getSmartHouses() {
    const response = await fetch(`${this.API_BASE_URL}/smart-houses`, {
      headers: this.getHeaders()
    });
    return await response.json();
  }

  static async getDevices(smartHouseId) {
    const response = await fetch(`${this.API_BASE_URL}/smart-houses/${smartHouseId}/devices`, {
      headers: this.getHeaders()
    });
    return await response.json();
  }

  static async addDevice(smartHouseId, deviceData) {
    const response = await fetch(`${this.API_BASE_URL}/smart-houses/${smartHouseId}/devices`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(deviceData)
    });
    return await response.json();
  }

  static async updateDevice(smartHouseId, deviceId, state) {
    const response = await fetch(`${this.API_BASE_URL}/smart-houses/${smartHouseId}/devices/${deviceId}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(state)
    });
    return await response.json();
  }

  static async deleteDevice(smartHouseId, deviceId) {
    const response = await fetch(`${this.API_BASE_URL}/smart-houses/${smartHouseId}/devices/${deviceId}`, {
      method: 'DELETE',
      headers: this.getHeaders()
    });
    return await response.json();
  }
}