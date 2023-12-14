import App from './App';
import {AuthProvider} from './contexts/authContext';

export default function Layout() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
