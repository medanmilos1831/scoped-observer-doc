import { CopyBlock, dracula } from 'react-code-blocks';

const ApiReference = () => {
  return (
    <div className="api-reference-page text-white p-8">
      <h1 className="text-4xl font-bold mb-8">API Reference</h1>

      <p className="text-lg mb-10">
        Here’s a complete overview of the available methods in Scoped observer.
        These methods help you manage event-based communication across your
        application.
      </p>

      {/* Subscribe Section */}
      <div className="method-section mb-16">
        <h2 className="text-3xl font-semibold mb-6">subscribe</h2>
        <p className="mb-6">
          The{' '}
          <code className="bg-gray-100 px-1 rounded text-black">subscribe</code>{' '}
          method allows components to listen for specific events and execute a
          callback when the event occurs. It returns an{' '}
          <strong>unsubscribe</strong> function that you can call to stop
          listening to the event.
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

// Later, you can unsubscribe when no longer needed
unsubscribe();
`}
          codeBlock
          theme={dracula}
        />

        <h3 className="text-2xl font-semibold mt-10 mb-4">Parameters</h3>
        <ul className="list-disc pl-6 mb-6">
          <li>
            <strong>eventName</strong> (string): The name of the event to
            subscribe to.
          </li>
          <li>
            <strong>callback</strong> (function): The function that will be
            called when the event is triggered. It receives an object containing
            the <strong>payload</strong>.
          </li>
        </ul>

        <h3 className="text-2xl font-semibold mb-4">Returns</h3>
        <ul className="list-disc pl-6 mb-6">
          <li>
            A function (<strong>unsubscribe</strong>) that can be called to stop
            listening to the event.
          </li>
        </ul>
      </div>

      {/* Dispatch Section */}
      <div className="method-section mb-16">
        <h2 className="text-3xl font-semibold mb-6">dispatch</h2>
        <p className="mb-6">
          The{' '}
          <code className="bg-gray-100 px-1 rounded text-black">dispatch</code>{' '}
          method is used to trigger an event from anywhere in your application.
          All subscribers listening for that event will be notified.
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

        <h3 className="text-2xl font-semibold mt-10 mb-4">Parameters</h3>
        <ul className="list-disc pl-6 mb-6">
          <li>
            <strong>eventName</strong> (string): The name of the event to
            dispatch.
          </li>
          <li>
            <strong>payload</strong> (optional object): Additional data to send
            with the event.
          </li>
        </ul>

        <h3 className="text-2xl font-semibold mb-4">Returns</h3>
        <ul className="list-disc pl-6 mb-6">
          <li>
            <strong>void</strong>: This method does not return a value.
          </li>
        </ul>
      </div>
    </div>
  );
};

export { ApiReference };
