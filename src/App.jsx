import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import AppLayout from './Components/Layout/AppLayout';
import ErrorPage from './Components/Layout/ErrorPage';
import Cource from './Components/Layout/Pages/cource';
import ForumComponent from './Components/Layout/Pages/Forum/ForumComponent';
import Home from './Components/Layout/Pages/Home';
import Login from './Components/Layout/Pages/Login';
import QuestionList from './Components/Layout/Pages/QNA.jsx/qnaSection';
import DiscriptionHandler from './Components/Layout/Pages/Quran/DiscriptionHandler';
import Quran from './Components/Layout/Pages/Quran/Quran';
import SignupForm from './Components/Layout/Pages/Quran/SignupForm';
import Services from './Components/Layout/Pages/services';
import SurahInfo from './Components/Layout/Pages/SurahInfo';
const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />, // Use AppLayout as the main layout
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />, // Render Home component
      },
      {
        path: '/Quran',
        element: <Quran />,
      },

      /* Dynamic route to handle multiple descriptions */
      {
        path: '/Quran/:type/:id',
        element: <DiscriptionHandler />,
      },

      {
        path: '/QuestionList',
        element: <QuestionList />,
      },

      {
        path: '/Quran/:id/info',
        element: <SurahInfo />,
      },
      {
        path: '/Cource',
        element: <Cource />,
      },
      {
        path: '/Services',
        element: <Services />,
      },
      {
        path: '/Login',
        element: <Login />,
      },
      {
        path: '/SignupForm',
        element: <SignupForm />,
      },
      {
        path: '/ForumComponent',
        element: <ForumComponent />,
      },
    ],
  },
]);

function App() {
  return (
    <div>
      {/* Toast notification system (placed globally) */}
      <Toaster richColors position="top-center" />

      <RouterProvider router={router} />
    </div>
  );
}

export default App;
