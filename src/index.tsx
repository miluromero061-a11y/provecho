import React from 'react';
import ReactDOM from 'react-dom/client';
import HomeScreen from './screens/HomeScreen';
import { colors } from './styles/theme';

// Estilos globales
const globalStyles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${colors.ultraLight};
    color: ${colors.textPrimary};
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  html, body, #root {
    height: 100%;
    width: 100%;
  }
`;

// Inyectar estilos globales
const style = document.createElement('style');
style.textContent = globalStyles;
document.head.appendChild(style);

// Renderizar aplicación
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <HomeScreen />
  </React.StrictMode>
);
