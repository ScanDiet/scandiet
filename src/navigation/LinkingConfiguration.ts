/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Favoris: {
            screens: {
              FavorisScreen: 'favoris',
            },
          },
          Profil: {
            screens: {
              ProfilScreen: 'profil',
            },
          },
          Scan: {
            screens: {
              ScanScreen: 'scan',
            },
          },
          Journal: {
            screens: {
              JournalScreen: 'journal',
            },
          },
          Recherche: {
            screens: {
              RechercheScreen: 'recherche',
            },
          },
        },
      },
      Modal: 'modal',
      NotFound: '*',
    },
  },
};

export default linking;
