function formatStatus(status) {
  const t = i18n[appState.lang];

  if (!status.isOn) return t.off;

  switch (status.type) {
    case 'Light':
      return `ON, ${t.regulatorNames.brightness} ${status.brightness}`;

    case 'HeatingBoiler':
      return `ON, ${t.regulatorNames.heatingLevel} ${status.heatingLevel}`;

    case 'WindowBlind': {
      let openVolume = '';
      if (status.isDown) {
        if (status.opening === 100)    openVolume = t.blindFullyOpen;
        else if (status.opening === 0) openVolume = t.blindFullyClosed;
        else                           openVolume = t.blindPartiallyOpen(status.opening);
      }
      return `ON, ${status.isDown ? t.blindLowered : t.blindRaised}${openVolume}`;
    }

    case 'TV': {
      const vol = status.muted ? t.muted : status.volume;
      return `ON, ch: ${status.channel}, ${t.regulatorNames.volumeLevel} ${vol}`;
    }

    default: return t.on;
  }
}