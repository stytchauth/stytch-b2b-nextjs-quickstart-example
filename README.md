# Stytch B2B Next.js App Router example application

## Overview

This example application demonstrates how one may use Stytch B2B within a Next.js 13 application using [App Router](https://nextjs.org/docs/app/building-your-application/routing#the-app-router).

## Set up

Follow the steps below to get this application fully functional and running using your own Stytch credentials.

### In the Stytch Dashboard

1. Create a [Stytch](https://stytch.com/) account. Once your account is set up a Project called "My first project" will be automatically created for you.

2. Within your new Project, navigate to [SDK configuration](https://stytch.com/dashboard/sdk-configuration), and click **Enable SDK**.

3. Navigate to [API Keys](https://stytch.com/dashboard/api-keys). You will need the `project_id`, `secret`, and `public_token` values found on this page later on.

### On your machine

In your terminal clone the project and install dependencies:

```bash
git clone https://github.com/cal-stytch/stytch-b2b-nextjs-magic-links.git
cd stytch-b2b-nextjs-magic-links
# Install dependencies using npm.
npm i
```

Next, create `.env.local` file by running the command below which copies the contents of `.env.template`.

```bash
cp .env.template .env.local
```

Open `.env.local` in the text editor of your choice, and set the environment variables using the `project_id`, `secret`, and `public_token` found on [API Keys](https://stytch.com/dashboard/api-keys). Leave the `STYTCH_PROJECT_ENV` value as `test`.

```
# This is what a completed .env.local file will look like
STYTCH_PROJECT_ID=project-test-00000000-0000-1234-abcd-abcdef1234
STYTCH_SECRET=secret-test-12345678901234567890abcdabcd
NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN=public-token-test-abcd123-0000-0000-abcd-1234567abc
```

## Running locally

After completing all the set up steps above the application can be run with the command:

```bash
npm run dev
```

The application will be available at [`http://localhost:3000`](http://localhost:3000).

# Next Steps

This example app showcases a small portion of what you can accomplish with Stytch. Next, explore adding additional login methods, such as [OAuth](https://stytch.com/docs/b2b/guides/oauth/initial-setup) or [SSO](https://stytch.com/docs/b2b/guides/sso/initial-setup).

# :question: Need support?

Come join our [Slack community](https://stytch.slack.com/join/shared_invite/zt-2f0fi1ruu-ub~HGouWRmPARM1MTwPESA) to speak directly with a Stytch auth expert!
