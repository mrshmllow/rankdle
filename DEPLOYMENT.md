# Deployment

I believe this is complete, however I may of forgotten some steps.

## Supabase

### Preperation

The application is built and currently teathered to supabase. Supabase can be locally deployed, or you can create a project [here](https://app.supabase.com/new)

Once you have a supabase instance, you may continue.

Make sure to record the **supabase URL**, and the **public/anon key**, found under settings > api.

![image](https://user-images.githubusercontent.com/40532058/235309461-6adf03f0-bbaa-4a8f-bd8d-05b4a4c448b6.png)

### Authentication Setup

#### Enable discord provider

On supabase, under Authentication > Providers you must enable discord and fill out the required fields, using a discord application.

![image](https://user-images.githubusercontent.com/40532058/235309682-695a9083-4227-43e3-8248-87aa4eefd33d.png)

You must also add the Redirect URL found in the discord section to your discord application, under OAuth2 > General

![image](https://user-images.githubusercontent.com/40532058/235310033-4c3756c8-2ae0-40e2-8349-ecb0b58e0745.png)

#### Configure auth urls

On supabase, under Authentication > URL Configuration, you must
1. Add the domain that you plan to host the web app to the Site URL field.
2. Add the correct redirect URL, which is https://DOMAIN/account/complete

It should look something like this

![image](https://user-images.githubusercontent.com/40532058/235309943-49dfb2ce-dff9-42df-a0e6-3a2015e841f2.png)

#### supabase-custom-claims

Follow the steps to install supabase-custom-claims found here https://github.com/supabase-community/supabase-custom-claims#installing-the-functions

#### Run SQL configuration

Run all the SQL found in sql/ on the database using the sql editor on supabase.

**Imporant**: You must substitute "ADMIN_USER_ID" for the user who is responsible for approving clips, and accessing /approve. This user must sign in with discord using the web app atleast once, and should not delete their account.

## The Web App

Deployment stratergies for NextJS can be found here: https://nextjs.org/docs/deployment.

The web app expects to enviroment variables NEXT_PUBLIC_SUPABASE_URL & NEXT_PUBLIC_SUPABASE_ANON_KEY, which you will remember from [Database preperation](#database-preperation)

