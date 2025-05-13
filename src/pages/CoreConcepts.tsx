import { CopyBlock, dracula } from 'react-code-blocks';

const CoreConcepts = () => {
  return (
    <div className="core-concepts-page text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Core Concepts</h1>

      <p className="text-lg mb-6">
        Scoped observer is designed around a simple event-driven model that
        helps manage communication between components. Here’s an overview of the
        core concepts to get you started with using Scoped observer in your app.
      </p>

      <div className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">1. The Subscribe Method</h2>
        <p className="mb-6">
          The{' '}
          <code className="bg-gray-100 px-1 rounded text-black">subscribe</code>{' '}
          method allows components to listen for specific events and react when
          they are triggered.
        </p>

        <CopyBlock
          language="tsx"
          text={`import { subscribe } from 'scoped-observer';

// Inside your component
const unsubscribe = subscribe({
  eventName: 'openModal',
  callback({ payload }) {
    console.log('Modal opened', payload);
  },
});

// Later, you can unsubscribe to stop listening to this event
unsubscribe();
`}
          codeBlock
          theme={dracula}
        />
      </div>

      <div className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">2. The Dispatch Method</h2>
        <p className="mb-6">
          The{' '}
          <code className="bg-gray-100 px-1 rounded text-black">dispatch</code>{' '}
          method is used to trigger an event from anywhere in your application.
          This sends the event to all subscribers that are listening for that
          event.
        </p>

        <CopyBlock
          language="tsx"
          text={`import { dispatch } from 'scoped-observer';

// Trigger an event
dispatch({
  eventName: 'openModal',
  payload: { id: 1, content: 'Welcome!' },
});
`}
          codeBlock
          theme={dracula}
        />
      </div>

      <div className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">3. Event Payload</h2>
        <p className="mb-6">
          Events in Scoped observer can carry data via a payload, which allows
          for more dynamic and flexible events.
        </p>

        <CopyBlock
          language="tsx"
          text={`import { subscribe, dispatch } from 'scoped-observer';

// Subscribe to a modal event
subscribe({
  eventName: 'openModal',
  callback({ payload }) {
    console.log('Modal content:', payload.content);
  },
});

// Dispatch an event with a payload
dispatch({
  eventName: 'openModal',
  payload: { content: 'This is a modal!' },
});
`}
          codeBlock
          theme={dracula}
        />
      </div>

      <div className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">
          4. Unsubscribing from Events
        </h2>
        <p className="mb-6">
          Once a component no longer needs to listen for an event, you can
          unsubscribe from it. This prevents memory leaks and ensures that your
          components remain efficient.
        </p>

        <CopyBlock
          language="tsx"
          text={`// Inside the component where you subscribed
const unsubscribe = subscribe({
  eventName: 'openModal',
  callback({ payload }) {
    console.log('Modal opened:', payload);
  },
});

// Unsubscribe when no longer needed
unsubscribe();
`}
          codeBlock
          theme={dracula}
        />
      </div>

      <div className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">
          5. Example of Scoped observer in Action
        </h2>
        <p className="mb-6">
          Here’s a simple example of how you might use Scoped observer to open
          and close a modal across your app.
        </p>

        <CopyBlock
          language="tsx"
          text={`import { subscribe, dispatch } from 'scoped-observer';

// Component 1: Open Modal
dispatch({
  eventName: 'openModal',
  payload: { content: 'Hello, world!' },
});

// Component 2: Modal Listener
subscribe({
  eventName: 'openModal',
  callback({ payload }) {
    console.log('Modal opened with content:', payload.content);
  },
});
`}
          codeBlock
          theme={dracula}
        />
      </div>

      <p className="mt-12 text-lg">
        By understanding and using these core concepts, you can begin leveraging
        Scoped observer to create a more scalable and maintainable event-driven
        architecture in your React applications.
      </p>
    </div>
  );
};

export { CoreConcepts };
