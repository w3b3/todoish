# 30 min todo with AstraDB

![image](https://user-images.githubusercontent.com/18291038/129376722-74a53ff3-945f-41e8-bcd9-b9595fbe0088.png)
![image](https://user-images.githubusercontent.com/18291038/129377140-96063519-5e40-498a-924f-e122cdd525d9.png)

A sample TODO app (barebones version takes 30 min to complete) leveraging all free and mostly open-source products and services from:

- React with Typescript
- AstraDB for data persistency [this](https://www.datastax.com/brand-resources)
- Firebase for login authentication [this](https://firebase.google.com/brand-guidelines)
- Deployment using Vercel infrastructured

## Get started

- Clone the repo.
  - `git clone this-repo-name`
- Install deps
  - `npm i`
- Look for a `.env.example` file at the root
- Rename it to `.env`
- Now you need to fill it up with the appropriate data:
- You will get all the required info from [here](https://astra.datastax.com)
  - Create a free account by logging in with Google/Github/etc
  - Create a free DB (any cloud provider, the closest region to you)
  - Once your DB is ready, click on on it and go to the CONNECT page (there should be a button on the top right corner)
  - Follow the instructions and **Grab the values listed in step 2**
  - Do not forget to create you own unique APP_TOKEN as per the instructions.
- These steps should enable you to have all necessary setup to have your cloud db connection up and running.
