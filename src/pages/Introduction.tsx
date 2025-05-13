import graph from '../assets/graph.png';

const Introduction = () => {
  return (
    <div className="text-white p-8">
      <h1 className="text-4xl font-bold mb-6">Introduction</h1>
      <p className="mb-6 leading-relaxed">
        Welcome to Scoped Observer — a lightweight, event-driven library
        designed to make communication between parts of your application clean,
        scalable, and decoupled. Scoped Observer introduces a flexible, scoped
        event system that works in any frontend environment — whether you're
        using React, Vue, vanilla JavaScript, or anything in between. No need
        for bulky global state managers, complex data flows, or
        boilerplate-heavy setups. Just events — clean, scoped, and intuitive.
      </p>

      <img src={graph} className="mb-10" />

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        Why Scoped Observer?
      </h2>
      <p className="mb-6 leading-relaxed">
        Unlike traditional state management libraries like Redux, MobX, or
        context-based solutions tied to specific frameworks, Scoped Observer is
        built on a pure event-driven architecture. This allows different parts
        of your application to communicate seamlessly without tight coupling,
        global providers, or bloated state containers. It works with any
        frontend stack — React, Vue, Svelte, or even plain JavaScript.
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
        When to Use Scoped observer?
      </h2>
      <p className="mb-6 leading-relaxed">
        Scoped observer is ideal for apps where you need to manage UI state and
        communication across unrelated components without relying on prop
        drilling or complex state management libraries.
      </p>

      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-4">
          Use Scoped observer when:
        </h2>
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
