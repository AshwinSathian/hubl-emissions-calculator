import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.coolrun.app',
  appName: 'CoolRun',
  webDir: 'dist/coolrun-emissions-calculator',
  server: {
    androidScheme: 'https',
  },
};

export default config;
