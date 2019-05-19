# Whitelabel Setup
The Outdoorsy Whitelabel interface allows your site visitors to find and book the perfect RV rental directly from your domain.

Using this tool, you'll be able to create a custom header and footer for your site.

## Installation & Development
The whitelabel setup application was created using Yarn.  NPM will likely work as well, but your mileage may vary.  To learn more about installing yarn, [view their documentation](https://yarnpkg.com/en/docs/install)

```bash
git clone https://github.com/outdoorsy/whitelabel-setup
cd whitelabel-setup
yarn install
yarn dev
```

Once the server is running, navigate to http://localhost:5050 to view your custom setup

### Tips & Tricks
* The whitelabel interface comes with Bootstrap 3 installed and ready to use
* The interface works best in full screen mode, we recommend that you create a thin header and footer to match your existing site

## Deploying to production
Once your site is created and ready to go, run `yarn build`, zip up the reasulting `dist` folder changes and send them over to your account rep.

Once your site is live, you can follow the [NGINX or Apache configuration guide](https://developers.outdoorsy.com/help/whitelabel/) to display your search interface on your own domain.
