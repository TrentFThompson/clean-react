# Rationale

The purpose of this codebase is to demonstrate understanding of Uncle Bob's Clean Architecture (see image below) in TypeScript to write modular and testable React Applications

![Clean Architecture](./courtesy_of_uncle_bob.jpg)

## How it applies to React Code

Most react apps mix business logic, dependencies, and presentation into one layer (either all inside of hooks or components)

By dependency injecting our services we can write hooks (our use cases) and components (the presentation layer) without intertwining the call signatures of other packages we didn't write.

## Codebase description

If you look at the [clean-react](./src/clean-react/) folder you will see core entitites, service implementations, and the [CleanReactProvider](./src/clean-react/react/CleanReactProvider.tsx) which serves as our dependency injection container for the rest of our code.

We use internally defined interfaces to build a bridge between the services that our app depends and the functionality/UI we are defining.

Dependencies we may want to use include:

- Data fetching (graphql, http api's)
- Logging services (Sentry, Console for local dev, set it up as a service that goes to your own backend to log messages)
- Authentication providers (OIDC, Firebase)
- Caching (redis, react query, etc.)
- Local storage (browser storage, sessions, secure storage in Native)
- Navigation (React Router, NextJs, Expo, etc)

Thes packages are abstracted by interfaces, and the implementations are injected into our app in [one spot](./src/sample-app/src/main.tsx), allowing us to build the innter layers of our code independent of the implementation details of the services that drive it.

This gives us modular code that makes test coverage simple. We can mock the different services and inject those into our components and hooks, which allows for testing at multiple layers without relying on the actual services

## Sample app

The crudely slapped together [sample-app](./src/sample-app/) is intended to illustrate the basics of using the injected dependencies in components and hooks. Right now we are injecting mock versions of the providers to show that we can get our app to function without actually relying on the dependencies we choose to really drive the app.

## Benefits

- Easily maintable code. Cleaner hooks and components that aren't cluttered with the call signatures of somebody else's code.
- Testability out the wazoo. At any layer you can take out a component, inject mock dependencies, and write tests around it. It helps you isolate where you have bugs in your code.
- By building the plugins for the services we can test those too without having to test through our react code
- Ease of development. With a flip of the switch we can use mock providers to stub out data and implement UI before the backend routes are even built.
- Portability. simple layers make it easy to swap other pieces in and out.
- We can also inject dependencies into our services, so for example our HTTP service could utilize the Auth service to get the bearer token to make an authenticated request. Since the interfaces to these services live at the same level

Obviously this isn't a one size fits all solution but it's a fun way to build reliable code, especially when starting from scratch.

NO AI WAS USED IN THE WRITING OF THIS README
