import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'fr.ronicobilly.course',
  appName: 'course',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
