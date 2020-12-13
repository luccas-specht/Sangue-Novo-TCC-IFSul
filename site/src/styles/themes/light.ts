import loginImgLight from '../../ui/assets/images/login-background-light.png';
import logoSangueNovoLight from '../../ui/assets/svg/logo-sangue-novo-light.svg';

import { DefaultTheme } from 'styled-components';

const light: DefaultTheme = {
  title: 'light',
  colors: {
    text: '#666360',
    backgroundInput: '#FFF',
    primary: '#BF0404',
    primary1: '#3E3B47',
    secundary: '#FF9000',
    background: '#F2F2F2',
    white: '#fff',
    colorIconDarkLight: '#666360',
  },
    imageBackground: loginImgLight,
    logo: logoSangueNovoLight
};

export { light };
