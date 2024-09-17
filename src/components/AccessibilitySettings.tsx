'use client';

import React, { useState } from 'react';

interface AccessibilitySettingsProps {
  onSettingsChange: (settings: AccessibilityOptions) => void;
}

interface AccessibilityOptions {
  fontSize: string;
  highContrast: boolean;
  dyslexicFont: boolean;
}

const AccessibilitySettings: React.FC<AccessibilitySettingsProps> = ({ onSettingsChange }) => {
  const [settings, setSettings] = useState<AccessibilityOptions>({
    fontSize: 'medium',
    highContrast: false,
    dyslexicFont: false,
  });

  const handleSettingChange = (setting: keyof AccessibilityOptions, value: string | boolean) => {
    const newSettings = { ...settings, [setting]: value };
    setSettings(newSettings);
    onSettingsChange(newSettings);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Accessibility Settings</h2>
      <div className="mb-4">
        <label htmlFor="font-size" className="block mb-2">Font Size</label>
        <select
          id="font-size"
          value={settings.fontSize}
          onChange={(e) => handleSettingChange('fontSize', e.target.value)}
          className="w-full p-2 border rounded"
          aria-label="Font Size"
        >
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="high-contrast" className="flex items-center">
          <input
            id="high-contrast"
            type="checkbox"
            checked={settings.highContrast}
            onChange={(e) => handleSettingChange('highContrast', e.target.checked)}
            className="mr-2"
          />
          High Contrast
        </label>
      </div>
      <div className="mb-4">
        <label htmlFor="dyslexic-font" className="flex items-center">
          <input
            id="dyslexic-font"
            type="checkbox"
            checked={settings.dyslexicFont}
            onChange={(e) => handleSettingChange('dyslexicFont', e.target.checked)}
            className="mr-2"
          />
          Dyslexia-Friendly Font
        </label>
      </div>
    </div>
  );
};

export default AccessibilitySettings;