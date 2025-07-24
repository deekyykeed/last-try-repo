/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#000';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#FAF9F5',
    tint: tintColorLight,
    icon: '#CFCFCF',
    tabIconDefault: '#CFCFCF',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#181627',
    tint: tintColorDark,
    icon: '#CFCFCF',
    tabIconDefault: '#CFCFCF',
    tabIconSelected: tintColorDark,
  },
};
