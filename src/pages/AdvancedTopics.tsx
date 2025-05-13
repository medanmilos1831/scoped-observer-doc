import { CopyBlock, dracula } from 'react-code-blocks';

const AdvancedTopics = () => {
  return (
    <div className="advanced-topics-page text-white p-8">
      <h1 className="text-4xl font-bold mb-8">
        Advanced Topics: Scopes and Event Interceptors
      </h1>

      <p className="text-lg mb-6">
        Event Pulse provides advanced mechanisms like scopes and event
        interceptors to fine-tune your application's event flow. Scopes help
        isolate events to specific parts of your app, while interceptors allow
        you to modify event data before it reaches subscribers.
      </p>

      <h2 className="text-3xl font-semibold mb-8">Working with Scopes</h2>

      <p className="mb-6">
        Scopes allow you to isolate events within certain areas of your
        application. This way, you can ensure that components react only to
        events relevant to them, avoiding unnecessary cross-communication.
      </p>

      <h3 className="text-2xl font-semibold mb-8">Basic Scope Example</h3>

      <CopyBlock
        language="tsx"
        text={`import { subscribe, dispatch } from 'event-pulse';

// Subscribe to user profile updates
subscribe({
  eventName: 'updateProfile',
  scope: 'user:profile',
  callback({ payload }) {
    console.log('User Profile Updated:', payload);
  },
});

// Dispatch within the same scope
dispatch({
  eventName: 'updateProfile',
  scope: 'user:profile',
  payload: { name: 'Jane Doe' },
});`}
        codeBlock
        theme={dracula}
      />

      <div className="my-8 border-t border-gray-700"></div>

      <h3 className="text-2xl font-semibold mb-8">Nested Scopes</h3>

      <p className="mb-6">
        You can create nested scopes to target even more specific sections of
        your app. Nested scopes help in organizing events for complex
        interfaces.
      </p>

      <CopyBlock
        language="tsx"
        text={`import { subscribe, dispatch } from 'event-pulse';

// Subscribe to a nested scope
subscribe({
  eventName: 'toggleNotification',
  scope: 'user:settings:notifications',
  callback({ payload }) {
    console.log('Notification Toggled:', payload);
  },
});

// Dispatch within the nested scope
dispatch({
  eventName: 'toggleNotification',
  scope: 'user:settings:notifications',
  payload: { enabled: true },
});`}
        codeBlock
        theme={dracula}
      />

      <div className="my-8 border-t border-gray-700"></div>

      <h3 className="text-2xl font-semibold mb-8">
        Scoped Event Example: User Profile and Settings
      </h3>

      <CopyBlock
        language="tsx"
        text={`import { subscribe, dispatch } from 'event-pulse';

// User profile subscriber
subscribe({
  eventName: 'updateProfile',
  scope: 'user:profile',
  callback({ payload }) {
    console.log('User Profile:', payload);
  },
});

// User settings subscriber
subscribe({
  eventName: 'updateSettings',
  scope: 'user:settings',
  callback({ payload }) {
    console.log('User Settings:', payload);
  },
});

// Dispatch events
dispatch({
  eventName: 'updateProfile',
  scope: 'user:profile',
  payload: { name: 'Jane Doe' },
});

dispatch({
  eventName: 'updateSettings',
  scope: 'user:settings',
  payload: { notifications: true },
});`}
        codeBlock
        theme={dracula}
      />

      <div className="my-8 border-t border-gray-700"></div>

      <h2 className="text-3xl font-semibold mb-8">
        Understanding Event Interceptors
      </h2>

      <p className="mb-6">
        Event interceptors allow you to capture and modify events before they
        reach subscribers. This is useful for validation, enriching event data,
        or blocking unwanted events.
      </p>

      <h3 className="text-2xl font-semibold mb-8">Basic Interceptor Example</h3>

      <CopyBlock
        language="tsx"
        text={`import { subscribe, dispatch, eventInterceptor } from 'event-pulse';

// Interceptor modifying event data
eventInterceptor({
  eventName: 'updateProfile',
  callback(data) {
    console.log('Intercepted:', data);
    return { ...data, name: 'Updated User Name' };
  },
});

// Subscriber
subscribe({
  eventName: 'updateProfile',
  callback({ payload }) {
    console.log('Received Updated Data:', payload);
  },
});

// Dispatch event
dispatch({
  eventName: 'updateProfile',
  payload: { name: 'Original Name' },
});`}
        codeBlock
        theme={dracula}
      />

      <div className="my-8 border-t border-gray-700"></div>

      <h3 className="text-2xl font-semibold mb-8">
        Scoped Interceptor Example
      </h3>

      <p className="mb-6">
        You can also scope your interceptors to modify events only within a
        specific section of your app.
      </p>

      <CopyBlock
        language="tsx"
        text={`import { subscribe, dispatch, eventInterceptor } from 'event-pulse';

// Scoped interceptor
eventInterceptor({
  eventName: 'updateProfile',
  scope: 'user:profile',
  callback(data) {
    console.log('Intercepted in profile scope:', data);
    return { ...data, name: 'Scoped User Name' };
  },
});

// Subscriber within scope
subscribe({
  eventName: 'updateProfile',
  scope: 'user:profile',
  callback({ payload }) {
    console.log('Scoped Subscriber Data:', payload);
  },
});

// Dispatch within scope
dispatch({
  eventName: 'updateProfile',
  scope: 'user:profile',
  payload: { name: 'Original Scoped Name' },
});`}
        codeBlock
        theme={dracula}
      />

      <div className="my-8 border-t border-gray-700"></div>

      <p className="mt-8">
        Combining scopes and interceptors gives you powerful control over event
        flows, enabling a cleaner, more predictable application architecture.
      </p>
    </div>
  );
};

export { AdvancedTopics };
