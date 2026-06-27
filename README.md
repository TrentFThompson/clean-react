# Rationale

The purpose of this codebase is to demonstrate understanding of Uncle Bob's Clean Architecture (see image below) in TypeScript to write modular and testable React Applications

![Clean Architecture](./courtesy_of_uncle_bob.jpg)

## Codebase description

If you look at the [clean-react](./src/clean-react/) folder you will see core entitites, service implementations, and the [CleanReactProvider](./src/clean-react/react/CleanReactProvider.tsx) which serves as our dependency injection container for the rest of our code.

We use internally defined interfaces to build a bridge between the services that our app depends and the functionality/UI we are defining

Things we want to abstract away such as:

- Backend data fetching (graphql, http api's)
- Logging services (need examples here)
- Authentication providers (OIDC, Firebase)
- Some other fourth thing I'm sure (oh yeah caching!)
- Local storage
- Navigation

are injected into our app in [one spot](./src/sample-app/src/main.tsx), allowing us to build our code independent of their implementation details.

Now we are free to build out hooks that serve as our use cases and react component that serve as our Controllers/Presenters.

By isolating our Core Entities and Use Cases into pure TypeScript, and restricting the react code to either rendering jsx, or calling our use cases and service interfaces, we have clear cut code separation and modular code.

You could build your code like this as a regular react web app, copy the code, port your components over to Native Components, and implement new, unit testable services for different dependencies. Now you have two apps that are virtually identical in what they do under the hood. All with unit tests. You could even do integration tests to make sure you have parity between two apps that use different dependencies.

## Sample app

The crudely slapped together [sample-app](./src/sample-app/) is intended to illustrate the basics. Right now we are injecting mock versions of the providers to show that we can get our app to function without actually relying on the dependencies we choose to really drive the app.

## Benefits

- Easily maintable code. Cleaner hooks and components that aren't cluttered with the call signatures of somebody else's code.
- Testability out the wazoo. Any piece of the puzzle you can take out, inject mock dependencies, and write tests around it. It helps you isolate where you have bugs in your code.
- Ease of development. With a flip of the switch we can use mock providers to stub out data and implement UI before the backend routes are even built.
- Portability as mentioned above
- We can also inject dependencies into our services, so for example our HTTP service could utilize the Auth service to get the bearer token to make an authenticated request

Obviously this isn't a one size fits all solution but it's a fun way to build reliable code, especially when starting from scratch.

NO AI WAS USED IN THE WRITING OF THIS README
