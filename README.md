<p align="center">
  <a href="https://www.medusajs.com">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/59018053/229103275-b5e482bb-4601-46e6-8142-244f531cebdb.svg">
      <source media="(prefers-color-scheme: light)" srcset="https://user-images.githubusercontent.com/59018053/229103726-e5b529a3-9b3f-4970-8a1f-c6af37f087bf.svg">
      <img alt="Medusa logo" src="https://user-images.githubusercontent.com/59018053/229103726-e5b529a3-9b3f-4970-8a1f-c6af37f087bf.svg" width=100>
    </picture>
  </a>
  <a href="https://railway.com/deploy/medusajs-20-storefront-b2b?referralCode=-Yg50p">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://railway.app/brand/logo-light.svg">
      <source media="(prefers-color-scheme: light)" srcset="https://railway.app/brand/logo-dark.svg">
      <img alt="Railway logo" src="https://railway.app/brand/logo-light.svg" width=100>
    </picture>
  </a>
</p>

<h2 align="center">
  MedusaJS 2.0 B2B Storefront for Railway
</h2>
<h4 align="center">
  Backend + Storefront + postgres + redis + MinIO
</h4>

<p align="center">Customizable B2B ecommerce built with <a href="https://medusajs.com/" target="_blank">Medusa 2.0</a> & Next.js Storefront, optimized for Railway deployment</p>

<p align="center">Customizable B2B ecommerce built with <a href="https://medusajs.com/" target="_blank">Medusa 2.0</a> & Next.js Storefront</p>

<p align="center">
  <a href="https://github.com/medusajs/medusa/blob/master/CONTRIBUTING.md">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat" alt="PRs welcome!" />
  </a>
    
  <a href="https://discord.gg/xpCwq3Kfn8">
    <img src="https://img.shields.io/badge/chat-on%20discord-7289DA.svg" alt="Discord Chat" />
  </a>

  <a href="https://twitter.com/intent/follow?screen_name=medusajs">
    <img src="https://img.shields.io/twitter/follow/medusajs.svg?label=Follow%20@medusajs" alt="Follow @medusajs" />
  </a>
</p>

<p align="center">
  <video src="https://github.com/user-attachments/assets/833b26a5-4b52-447f-ac30-6ae02cbe8f05" controls="controls" muted="muted" playsinline="playsinline">
</video>
</p>

## Easy deploy in minutes

This repo is a fork of the official Medusa B2B starter: https://github.com/medusajs/b2b-starter-medusa but tweaked for seamless deploy on Railway.

**Disclaimer:** This is a beta template that hasn't had much real-world testing yet. Please test thoroughly before production use.

This Railway template is preconfigured with:
- PostgreSQL database (automatic setup)
- Redis cache (automatic setup)
- MinIO file storage (automatic setup)
- Automatic admin user creation
- Automatic API key sharing between backend and storefront
- No manual setup needed, just click and deploy!

**Note:** This template is not preconfigured with email service, payment service, or MeiliSearch integration. You will need to add those integrations manually if required.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/medusajs-20-storefront-b2b?referralCode=-Yg50p)

If you are looking for the standard medusa webshop starter (D2C) please see: https://github.com/rpuls/medusajs-2.0-for-railway-boilerplate


## Table

- [Prerequisites](#prerequisites)
- [Overview](#overview)
  - [Features](#features)
  - [Demo](#demo)
- [Quickstart](#quickstart)
- [Update](#update)
- [Resources](#resources)
- [Contributors](#contributors)

&nbsp;

## Prerequisites

⚠️ We have tested this repo with the below versions:

- ✅ Node 20
- ✅ Postgres 15
- ✅ Medusa 2.4
- ✅ Next.js 15

&nbsp;

## Overview
For a full feature overview, please visit [the project wiki](https://github.com/medusajs/b2b-starter-medusa/wiki).

#### Core features

- **Company Management**. Customers can manage their company and invite employees.
- **Spending Limits**. Company admins can assign spending limits to its employees.
- **Bulk add-to-cart**. Customers can add multiple variants of a product to their cart at once.
- **Quote Management**. Customers & Merchants can communicate, accept or reject quotes.
- **Order Edit**. Merchants can edit orders or quotes - add/remove item, update quantity & price management and more.
- **Company Approvals**. Companies can mandate approvals from company admins before employees can finalize a cart.
- **Merchant Approvals**. Merchants can set up approval processes for orders, ensuring compliance with business rules before fulfillment.
- **Promotions**. Customers can apply manual and automatic promotions to their cart.
- **Free Shipping Nudge**. Displays a component showing progress toward free shipping.
- **Full ecommerce support**
  - Product Pages
  - Product Collections & Categories
  - Cart & Checkout
  - User Accounts
  - Order Details
- **Full Next.js 15 support**
  - App Router
  - Caching
  - Server components/actions
  - Streaming
  - Static Pre-Rendering

&nbsp;

#### Demo

#### Quote Management

<img align="right" src="https://github.com/user-attachments/assets/110c99e8-18ba-49e5-8955-84a058b597c7" alt="image" style=: />
&nbsp;

#### Company Management

<img align="right" src="https://github.com/user-attachments/assets/361702ce-d491-4509-a930-4361ab3b4126" alt="image" style=: />
&nbsp;

#### Approval Management

<img align="right" src="https://github.com/user-attachments/assets/b93b7b94-41a9-4c5f-bd6b-abf87492ed46" alt="image" style=: />
&nbsp;

#### Product Page

<img align="right" src="https://github.com/user-attachments/assets/2cd8a3ff-5999-49af-890a-4bac7b6f2f15" alt="image" style=: />
&nbsp;

#### Cart Summary

<img align="right" src="https://github.com/user-attachments/assets/095f5565-992e-4c74-acdc-a44bd905e59b" alt="image" style=: />
&nbsp;

&nbsp;

## Quickstart

#### Setup Medusa project

```bash
# Clone the repository
git clone https://github.com/medusajs/b2b-starter-medusa.git

## Setup Backend

# Go to the folder
cd ./backend

# Clone .env.template
cp .env.template .env

# Install dependencies
yarn install

# Install dependencies, setup database & seed data
yarn install && yarn medusa db:create && yarn medusa db:migrate && yarn run seed && yarn medusa user -e admin@test.com -p supersecret -i admin

# Start Medusa project - backend & admin
yarn dev

## Setup Storefront

# Go to folder
cd ../storefront

# Clone .env.template
cp .env.template .env

# Install dependencies
yarn install
```

#### Setup publishable key

- ✅ Visit [Admin: Publishable Key](http://localhost:9000/app/settings/publishable-api-keys)
  - <b>Credentials</b>:
    - <b>email</b>: `admin@test.com`
    - <b>password</b>: `supersecret`
- ✅ Copy token key of "Webshop"
- ✅ Open file - `storefront/.env`
- ✅ Add token to this var - `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY`

```
# Start Medusa storefront
yarn dev
```

Visit the following links to see the Medusa storefront & admin

- [Medusa Admin](http://localhost:9000/app)
- [Medusa Storefront](http://localhost:8000)

&nbsp;

# Update

Some general guidelines for when you're updating this Starter to a newer version.

## Update packages

Run `yarn install` in both projects to update you're packages to the latest versions.

## Run migrations

To reflect any changes made to data models, make sure to run `npx medusa db:migrate` in the backend project.

> Note: are you updating from a version of this Starter that didn't have the Approval module yet? Run `npx medusa exec src/scripts/create-approval-settings.ts` in the backend project to add approval settings to all existing companies.

# Resources

#### Learn more about Medusa

- [Website](https://www.medusajs.com/)
- [GitHub](https://github.com/medusajs)
- [2.0 Documentation](https://docs.medusajs.com/v2)

#### Learn more about Next.js

- [Website](https://nextjs.org/)
- [GitHub](https://github.com/vercel/next.js)
- [Documentation](https://nextjs.org/docs)

&nbsp;

<p align="center">
  <a href="https://funkyton.com/">
    <div style="text-align: center;">
      A template by,
      <br>
      <picture>
        <img alt="FUNKYTON logo" src="https://res-5.cloudinary.com/hczpmiapo/image/upload/q_auto/v1/ghost-blog-images/funkyton-logo.png" width=200>
      </picture>
    </div>
  </a>
</p>
