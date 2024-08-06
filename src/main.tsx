import ReactDOM from 'react-dom/client';
import App from './App';
import ReloadPrompt from './components/ReloadPrompt/ReloadPrompt';

import { registerSW } from 'virtual:pwa-register';

registerSW({ immediate: true });

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <App />
    <ReloadPrompt />
  </>
);
