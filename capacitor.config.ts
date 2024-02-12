import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'ionicappflowtest',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    LiveUpdates: {
      appId: '8e952907',
      channel: 'Production',
      autoUpdateMethod: 'none',
      maxVersions: 2
    }
  }
};

export default config;
