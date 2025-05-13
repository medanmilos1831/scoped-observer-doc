import { CopyBlock, dracula } from 'react-code-blocks';

const QuickStart = () => {
  return (
    <section className="py-16 px-6 md:px-16  text-white">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-10">Quick Start</h1>

        <p className="mb-6 text-lg">
          Scoped Observer provides a lightweight, event-driven system for
          component communication in frontend applications. This section covers
          the basic setup and usage, helping you get started quickly, whether
          you're using React, Vue, Svelte, or any other JavaScript framework.
        </p>

        <h2 className="text-2xl font-semibold mb-4 mt-12">Installation</h2>
        <p className="text-base mb-6">
          Scoped observer is a standalone service. No installation is required.
          Simply copy the service code into your project.
        </p>

        <h2 className="text-2xl font-semibold mb-4 mt-12">Basic Usage</h2>
        <p className="text-base mb-4 ">
          Import the{' '}
          <code className="bg-gray-100 px-1 rounded text-black">subscribe</code>{' '}
          and{' '}
          <code className="bg-gray-100 px-1 rounded text-black">dispatch</code>{' '}
          methods directly to manage events across your application.
        </p>

        <div className="rounded-lg mb-8 text-sm overflow-x-auto">
          <CopyBlock
            text={`import { subscribe, dispatch } from '../scoped-observer'
              
  const unsubscribe = subscribe({
    eventName: 'eventName',
    callback(data) {
      console.log(data);
    },
  });

  dispatch({
    eventName: 'eventName',
    payload: 'somePayloadData',
  });

  unsubscribe()
`}
            language={'js'}
            theme={dracula}
          />
        </div>
      </div>
    </section>
  );
};

export { QuickStart };
