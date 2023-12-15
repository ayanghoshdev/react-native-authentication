import App from './App';
import {AuthProvider} from './src/contexts/authContext';

export default function Layout() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
