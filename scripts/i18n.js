const i18n = {
  uk: {
    models: {
      on: 'ON',
      off: 'OFF',
      Light: {
        regulatorName: 'Яскравість:',
        status: (vol) => `ON, яскравість: ${vol}`
      },
      HeatingBoiler: {
        regulatorName: 'Рівень опалення:',
        status: (vol) => `ON, рівень опалення: ${vol}`
      },
      WindowBlind: {
        regulatorName: 'Відкриття:',
        fullyOpen: 'повністю відкриті',
        fullyClosed: 'повністю закриті',
        partiallyOpen: (vol) => `відкриті на ${vol}%`,
        raised: 'підняті',
        lowered: 'опущені, ',
        status: (isDown, openVolume) => `ON, ${isDown ? 'опущені, ' : 'підняті'}${openVolume}`
      },
      TV: {
        regulatorName: 'Гучність:',
        status: (ch, vol) => `ON, ch: ${ch}, гучність: ${vol}`
      }
    },
    // Navbar
    brandName: 'Розумний Будинок',
    // Форма додавання
    addComponentTitle: 'Додати компонент',
    labelLocation: 'Розташування',
    labelComponent: 'Компонент',
    labelExtendedName: 'Розширена назва',
    extendedNamePlaceholder: 'Наприклад: бра біля ліжка',
    addComponentBtn: 'Додати компонент',
    // Список компонентів
    componentsTitle: 'Компоненти',
    noDevices: 'Немає доступних пристроїв',
    // Картка пристрою
    toggleOn: 'Увімкнути',
    toggleOff: 'Вимкнути',
    removeBtn: 'Видалити',
    integrationBtn: 'Інтеграція',
    saveIntegrationBtn: 'Зберегти',
    integrationProtocolLabel: 'Протокол:',
    integrationIpLabel: 'IP / MAC:',
    integrationDeviceIdLabel: 'Device ID:',
    integrationApiKeyLabel: 'API Key / Token:',
    protocols: {
      WebSocket: 'WebSocket',
      MQTT: 'MQTT',
      HTTP: 'HTTP'
    },
    integrationSaved: (name) => `Інтеграційні налаштування для "${name}" збережено.`,
    // Кнопки WindowBlind
    blindUp: 'Підняти',
    blindDown: 'Опустити',
    // Кнопки TV
    prevChannel: 'Канал --',
    nextChannel: 'Канал ++',
    // Меню
    menuHome: 'Головна',
    menuSettings: 'Налаштування',
    menuSave: 'Зберегти',
    menuSaveAs: 'Зберегти як..',
    menuMyHouses: 'Мої розумні будинки:',
    menuHelp: 'Допомога',
    menuLogout: 'Вийти',
    // Offcanvas
    menuTitle: 'Меню',
  },
  en: {
    models: {
      on: 'ON',
      off: 'OFF',
      Light: {
        regulatorName: 'Brightness:',
        status: (vol) => `ON, brightness: ${vol}`
      },
      HeatingBoiler: {
        regulatorName: 'Heating level:',
        status: (vol) => `ON, heating level: ${vol}`
      },
      WindowBlind: {
        regulatorName: 'Opening:',
        fullyOpen: 'fully open',
        fullyClosed: 'fully closed',
        partiallyOpen: (vol) => `open at ${vol}%`,
        raised: 'raised',
        lowered: 'lowered, ',
        status: (isDown, openVolume) => `ON, ${isDown ? 'lowered, ' : 'raised'}${openVolume}`
      },
      TV: {
        regulatorName: 'Volume:',
        status: (ch, vol) => `ON, ch: ${ch}, volume: ${vol}`
      }
    },
    // Navbar
    brandName: 'Smart House',
    // Форма додавання
    addComponentTitle: 'Add Component',
    labelLocation: 'Location',
    labelComponent: 'Component',
    labelExtendedName: 'Extended Name',
    extendedNamePlaceholder: 'E.g.: lamp near the bed',
    addComponentBtn: 'Add Component',
    // Список компонентів
    componentsTitle: 'Components',
    noDevices: 'No available devices',
    // Картка пристрою
    toggleOn: 'Turn On',
    toggleOff: 'Turn Off',
    removeBtn: 'Remove',
    integrationBtn: 'Integration',
    saveIntegrationBtn: 'Save',
    integrationProtocolLabel: 'Protocol:',
    integrationIpLabel: 'IP / MAC:',
    integrationDeviceIdLabel: 'Device ID:',
    integrationApiKeyLabel: 'API Key / Token:',
    protocols: {
      WebSocket: 'WebSocket',
      MQTT: 'MQTT',
      HTTP: 'HTTP'
    },
    integrationSaved: (name) => `Integration settings for "${name}" saved.`,
    // Кнопки WindowBlind
    blindUp: 'Raise',
    blindDown: 'Lower',
    // Кнопки TV
    prevChannel: 'Channel --',
    nextChannel: 'Channel ++',
    // Меню
    menuHome: 'Home',
    menuSettings: 'Settings',
    menuSave: 'Save',
    menuSaveAs: 'Save As..',
    menuMyHouses: 'My Smart Houses:',
    menuHelp: 'Help',
    menuLogout: 'Logout',
    // Offcanvas
    menuTitle: 'Menu',
  }
};

let currentLang = localStorage.getItem('lang') || 'uk';

// Застосовуємо переклад до статичних елементів
function applyTranslations(lang) {
  const t = i18n[lang];

  // Перекладаємо всі елементи з data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key]) el.textContent = t[key];
  });

  // Перекладаємо placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (t[key]) el.placeholder = t[key];
  });
}

// Завантажуємо дані з JSON файлів відповідно до мови
async function loadData() {
  try {
    const locationsFile = currentLang === 'en' ? './data/locations_en.json' : './data/locations.json';
    const devicesFile = currentLang === 'en' ? './data/devices_en.json' : './data/devices.json';

    const [locationsResponse, devicesResponse] = await Promise.all([
      fetch(locationsFile),
      fetch(devicesFile)
    ]);

    locations = await locationsResponse.json();
    devices = await devicesResponse.json();

    renderLocations();
    renderDevicesByLocation(locations[0]);
    renderDevices();
  } catch (error) {
    console.error('Помилка при завантаженні даних:', error);
  }
}

// Змінюємо мову
async function changeLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  applyTranslations(lang);
  await loadData();
}

// Оновлюємо обробник вибору мови
document.querySelectorAll('.app-navbar__lang-item').forEach(item => {
  item.addEventListener('click', async (e) => {
    e.preventDefault();
    const lang = e.target.dataset.lang;
    langBtn.textContent = e.target.textContent;
    langMenu.classList.add('d-none');
    await changeLanguage(lang);
  });
});