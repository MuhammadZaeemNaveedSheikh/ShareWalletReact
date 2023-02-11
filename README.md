# My Share Wallet

Qwilr Vetting Task by Matthieu Di Berardino

## Running the app

The project manages dependencies through `npm`. To install them, run the following command in the root of the project:

```
npm install
```

Once done, the single-page application must be built with the following command:

```
npm run build
```

And finally, run the server with the following command:

```
npm run start
```

At this stage, the web app will be available at `https://localhost:8000`.

## Retrospective on the project

### Methodology

After having reviewed the list of requirements, I took about 30 minutes to design on paper the different REST services I would need on the server side and a mock up of the single page application's UI.

I selected **React.JS** for the front-end with the `react-app` scaffolding project because it is fast and simple to set up and running.

On the backend side, I chose a **node.JS** implementation with REST services, as it seemed to be appropriate considering the need for building code fast and with asynchronous external calls.

I started by building the account balance REST API on backend side. I used **Koa.js** for the web server framework because it is lightweight, and has plenty of useful middlewares that work with it (router, etc).

I continued with the front-end components for the account balance, and selected **Material UI** to help with the UI building blocks of the project.

I continued by alternating server and front-end implementation for the other functionalities in the same manner.

To retrieve the up to date stock exchange prices, I found a node library called `iex-api` which does it quite well. It does not require any authentication, and has very high free tier usage quotas. It made it easier to integrate that functionality into the app.

On the front-end side, to manage the state of the components and their refresh, I chose to use **RxJS** Subjects for the Wallet and Account Balance.

### Time management

I started the project at 10am.

I had a lunch break and another break in the afternoon, accounting for a total of 2 hours off the project.

I finished the project around 9pm on the same day.

### Shortcuts, simplifying assumptions, known bugs, etc.

Although I attempted to put as much form and API input validation as I could in the time allocated, there are still numerous areas where it's possible to bypass these.

For instance, adding funds on the account will not be working properly once a too big integer size for the account balance is reached.

In terms of look and feel, the app will not be responsive on mobile phones, as I did not have time to spend on this.

The app is not ready to be internationalised or localised either, does not have proper accessibility (WCAG), and does not use web workers for access offline or optimised caching.

Feature wise, to simplify the problem, it is assumed that there is only one account in the entire server, and thus the account balance and share wallet are singletons of the app.

On server side, although the services were supposed to be REST, they ended up being more 'REST-look-alike' than actual REST (they are verb oriented).

In addition, I initially wanted to have the share price refresh with web sockets, but did not have time at all for this feature unfortunately.

I was slowed down during the project mostly by:

- finding a good API to retrieve stock exchange prices, this took longer than I hoped,
- React.js itself as I am mainly an Angular developer myself and have a lot less knowledge of React. I have used React in this project because it has less boilerplate than Angular and thus it would be faster to get started (that I thought...).

Overall, I am rather happy with the end result.
