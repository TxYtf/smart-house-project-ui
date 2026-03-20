const appState = {
  lang: localStorage.getItem('lang') || 'uk',
  selectedLocationIndex: 0, // ← індекс вибраного розташування пристроїв
  currentHouseId: null,
  currentHouseName: null
};

const i18n = {
  uk: {
    on: 'ON',
    off: 'OFF',
    blindFullyOpen: 'повністю відкриті',
    blindFullyClosed: 'повністю закриті',
    blindPartiallyOpen: (vol) => `відкриті на ${vol}%`,
    blindRaised: 'підняті',
    blindLowered: 'опущені, ',
    muted: 'Без звуку',  
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
    // Сортування
    sortNone: 'Без сортування',
    sortByLocation: 'За локацією',
    sortByName: 'За назвою',
    sortByType: 'За типом',
    sortByOn: 'Спочатку увімкнені',
    sortByOff: 'Спочатку вимкнені',
    // Регулятори
    regulatorNames: {
      brightness:   'Яскравість:',
      heatingLevel: 'Рівень опалення:',
      openingLevel: 'Відкриття:',
      volumeLevel:  'Гучність:'
    },
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
    on: 'ON',
    off: 'OFF',
    blindFullyOpen: 'fully open',
    blindFullyClosed: 'fully closed',
    blindPartiallyOpen: (vol) => `open at ${vol}%`,
    blindRaised: 'raised',
    blindLowered: 'lowered, ',
    muted: 'Muted',
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
    // Сортування
    sortNone: 'No sorting',
    sortByLocation: 'By location',
    sortByName: 'By name',
    sortByType: 'By type',
    sortByOn: 'On first',
    sortByOff: 'Off first',
    // Регулятори
    regulatorNames: {
      brightness:   'Brightness:',
      heatingLevel: 'Heating level:',
      openingLevel: 'Opening:',
      volumeLevel:  'Volume:'
    },
    noDevices: 'No devices available',
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
    menuSaveAs: 'Save As',
    menuMyHouses: 'My Smart Houses:',
    menuHelp: 'Help',
    menuLogout: 'Logout',
    // Offcanvas
    menuTitle: 'Menu',
  }
};

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
    const locationsFile = appState.lang === 'en' ? './data/locations_en.json' : './data/locations.json';
    const devicesFile = appState.lang === 'en' ? './data/devices_en.json' : './data/devices.json';

    const [locationsResponse, devicesResponse] = await Promise.all([
      fetch(locationsFile),
      fetch(devicesFile)
    ]);

    locations = await locationsResponse.json();
    devices = await devicesResponse.json();

    renderLocations();
    locationSelect.selectedIndex = appState.selectedLocationIndex; // ← відновлюємо вибір
    renderDevicesByLocation(locations[appState.selectedLocationIndex]); // ← правильна локація
    renderDevices();
  } catch (error) {
    console.error('Помилка при завантаженні даних:', error);
  }
}

// Змінюємо мову
async function changeLanguage(lang) {
  appState.lang = lang;
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