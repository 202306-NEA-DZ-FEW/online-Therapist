# Capstone project information

## Project information

-   Project name: Online Therapist
-   Project description: This project will allow users to schedule an appointment with a therapist and take therapy sessions online through chat, video, and voice calls. Users can search for information on the website, and also there will be tests or therapist activities for users.
-   WebSite link: https://online-therapist.vercel.app/
-   Technology used: Nextjs, TailwindCSS, i18next, Husky, Prettier, Eslint, Commitlinter (Conventional Commits)
-   Team members: Walid Lamraoui, Lilia Bendjeddou, MOHAMED MATASSI, Sid Ali Habchi, Meriem MANSOURI, Dalila BENHAMED MEGUENNI.
-   Bootcamp: DZ NEA FEW 2023

## Installation

```shell
npm install -g commitizen // Installs commitizen
npx husky install         // Installs Husky
chmod ug+x .husky/*       // Gives husky executable extension
npm install               // Installs the node modules
```

## Development process

-   When commiting you will have to use `git cz` and then go through the process. Look at the first commit I made to know what that means.
-   The translation process is done using the i18next library. There's an example in the index.js file of how this is done. Check this github project for more info on how to use the i18next library: [i18next](https://github.com/i18next/next-i18next)
-   When writing commits, commitlinter library is used to make sure that your commits are consistent with the conventional commits. To learn more about it refer to the guidelines in Canvas or the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/#summary) site.
-   The `layout` folder contains the components that will be used in the layout of pages, so components like the header and footer will be placed there.

Good luck and happy coding :D
