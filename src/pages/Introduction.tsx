import graph from '../assets/graph.png';

const Introduction = () => {
  return (
    <div className="text-white p-8">
      <h1 className="text-4xl font-bold mb-6">Introduction</h1>
      <p className="mb-6 leading-relaxed">
        Welcome to Event Pulse — a lightweight, event-driven library designed to
        make communication between your components clean, scalable, and
        decoupled. Traditional React apps often struggle with passing data
        through deeply nested structures or managing scattered UI states. Event
        Pulse solves this by introducing a simple event-based communication
        model. No need for heavy global state managers, prop drilling, or
        boilerplate setups. Just events — clean and scoped.
      </p>

      <img src={graph} className="mb-10" />

      <h2 className="text-2xl font-semibold mt-10 mb-4">Why Event Pulse?</h2>
      <p className="mb-6 leading-relaxed">
        Unlike traditional state management libraries like Redux, MobX, or even
        Context-heavy solutions, Event Pulse is based purely on an event-driven
        architecture. This allows components to listen and react to changes
        without being tightly coupled or burdened by global providers or massive
        stores.
      </p>

      <section className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Built for:</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>Dynamic UI flows (open modals, drawers, notifications)</li>
          <li>Cross-component communication without prop drilling</li>
          <li>Highly decoupled systems with minimal overhead</li>
        </ul>
      </section>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        When to Use Event Pulse?
      </h2>
      <p className="mb-6 leading-relaxed">
        Event Pulse is ideal for apps where you need to manage UI state and
        communication across unrelated components without relying on prop
        drilling or complex state management libraries.
      </p>

      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Use Event Pulse when:</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>You want to open or close modals from anywhere in the app</li>
          <li>
            You need to trigger UI updates across unrelated parts of your
            component tree
          </li>
          <li>You want a clean separation of concerns between components</li>
          <li>
            You are building systems that rely heavily on user interactions and
            need reactive behavior
          </li>
        </ul>
      </section>
    </div>
  );
};

export { Introduction };
