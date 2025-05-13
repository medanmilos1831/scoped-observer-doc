import { createBrowserRouter, NavLink, Outlet } from 'react-router-dom';
import { ScrollProvider } from '../components';
import { Introduction } from '../pages/Introduction';
import { QuickStart } from '../pages/QuickStart';
import { CoreConcepts } from '../pages/CoreConcepts';
import { ApiReference } from '../pages/ApiReference';
import { AdvancedTopics } from '../pages/AdvancedTopics';
import { Examples } from '../pages/Examples';
import { OverlayExample } from '../pages/examples/index';

export const router = () =>
  createBrowserRouter(
    [
      {
        element: (
          <div
            style={{
              height: '100vh',
              width: '100vw',
              background: '#0f0b2b',
            }}
          >
            <div className="flex h-full">
              <div className="flex flex-col h-full bg-[#141226] text-white w-1/5 p-4 space-y-4">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `text-white no-underline hover:text-gray-300 ${
                      isActive ? 'font-bold' : ''
                    }`
                  }
                >
                  Introduction
                </NavLink>
                <NavLink
                  to="/quick-start"
                  className={({ isActive }) =>
                    `text-white no-underline hover:text-gray-300 ${
                      isActive ? 'font-bold' : ''
                    }`
                  }
                >
                  Quick Start
                </NavLink>
                <NavLink
                  to="/core"
                  className={({ isActive }) =>
                    `text-white no-underline hover:text-gray-300 ${
                      isActive ? 'font-bold' : ''
                    }`
                  }
                >
                  Core Concepts
                </NavLink>
                <NavLink
                  to="/api-reference"
                  className={({ isActive }) =>
                    `text-white no-underline hover:text-gray-300 ${
                      isActive ? 'font-bold' : ''
                    }`
                  }
                >
                  API Reference
                </NavLink>
                <NavLink
                  to="/advanced-topics"
                  className={({ isActive }) =>
                    `text-white no-underline hover:text-gray-300 ${
                      isActive ? 'font-bold' : ''
                    }`
                  }
                >
                  Advanced Topics
                </NavLink>
                <NavLink
                  to="/examples"
                  className={({ isActive }) =>
                    `text-white no-underline hover:text-gray-300 ${
                      isActive ? 'font-bold' : ''
                    }`
                  }
                >
                  Examples
                </NavLink>
              </div>

              <div className="w-4/5 relative h-full">
                <ScrollProvider>
                  <ScrollProvider.Container>
                    <div className="px-16">
                      <Outlet />
                    </div>
                  </ScrollProvider.Container>
                </ScrollProvider>
              </div>
            </div>
          </div>
        ),
        children: [
          {
            index: true,
            element: <Introduction />,
          },
          {
            path: '/quick-start',
            element: <QuickStart />,
          },
          {
            path: '/core',
            element: <CoreConcepts />,
          },
          {
            path: '/api-reference',
            element: <ApiReference />,
          },
          {
            path: '/advanced-topics',
            element: <AdvancedTopics />,
          },
          {
            path: '/examples',
            element: <Outlet />,
            children: [
              {
                index: true,
                element: <Examples />,
              },
              {
                path: 'overlay',
                element: <OverlayExample />,
              },
            ],
          },
        ],
      },
    ],
    {
      basename: '/scoped-observer',
    }
  );
