# Trelent take-home

This take-home challenges you to complete a simple chatbot, which is built using NextJS, Tailwind for styling, and OpenAI's Chat API. Upon successful completion, you should end up with a fully-functioning webapp similar to (or maybe even a little better than) ChatGPT!

This test is designed to take less than two hours to complete for the ideal candidate, however, we are not trying to test speed! It is not timed, and the important thing we want to evaluate is your process, design decisions, and coding style.

## Task Description

Your goal for this project is to make the chat functional by integrating with OpenAI, and improve the design to your liking. The chat should have a streamed response, so that it appears as if the assistant is "typing" to you, as it appears in ChatGPT. You are free to use the method of your choice to do this, and may use the provided OpenAI API key.

Once completed, you should deploy a fully-functioning version of your project on Vercel.

## Instructions

To get started, go ahead and use this template to create a public repo on GitHub. Once created and cloned to your machine, you may use a package manager of your choice (we recommend `pnpm` or `yarn`) to install the dependencies and start the project up with the `dev` script. Now would also be a good time to setup your Vercel deployment and get a successful build deployed.

> Make sure to set `OPENAI_API_KEY` in `.env.local.example` to the API key provided by Calum, and rename the file to be `.env.local`. This will be important after you integrate with OpenAI.

From here, you're on your own! We encourage you to find and use resources to help make this project more doable in a short period of time. You are more than welcome to add extra features, improve the design, or change the project structure to your liking.

Once you feel confident and have a working chat app, Send Calum a link to your GitHub repo and your Vercel deployment.

## Evaluation

There are four criteria under which you will be evaluated.

1. **Successful completion:** Does the chat work such that one can have a multi-message conversation with GPT-3.5? Is this true in the Vercel deployment?
2. **Code quality & style:** Is your code clean, simple, and well-structured? Are you using best practices? Is your code adequately documented?
3. **Design & responsiveness:** Does the chat look good? Is it easy to use? Is it responsive, both to screen size and system dark/light theme? Does it look like a professional product?
4. **Resourcefulness:** Did you find your own resources to help you complete the project? Were those resources up-to date and relevant?

## Resources

You are responsible for finding or using your own resources to help you complete this project. However, we have provided details on the project's structure below so that you can get up to speed quickly.

## Project structure

Some parts of the project already exist, such the basic page layout and some initial messages to demo what it looks like. It is a standard NextJS + Tailwind project, thought we opted to use the `pages` router instead of the `app` router. It is built all in a single page, located at `src/pages/index.tsx` which is itself composed of a few components, located in `src/components`. The `src/styles` directory contains the global styles, which is where we have included Tailwind, and `src/types.ts` contains common types used throughout the project.

We have left the api directory empty excpet for a default route, `api/hello`, for reference purposes.

## Final notes

Once complete, please send Calum your repository and a link to your live vercel deployment. You can always reach out to Calum if you have any questions or get stuck. Thank you for applying to Trelent, and good luck!
