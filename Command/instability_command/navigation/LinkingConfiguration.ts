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
          Map: {
            screens: {
              MapScreen: 'one',
            },
          },
          Control: {
            screens: {
              ControlScreen: 'two',
            },
          },
          Status: {
            screens: {
              StatusScreen: 'three',
            },
          },
        },
      },
      Modal: 'graph',
      NotFound: '*',
    },
  },
};

export default linking;
