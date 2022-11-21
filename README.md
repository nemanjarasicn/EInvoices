## Backoffice

# For .env setup

Use .env for production (e.g. when running build) and .env.local for local development (e.g. when running locally)

## REACT_APP_PUBLIC_API_URL = "Add URL to GOV.e-fakture API"

## GENERATE_SOURCEMAP = "false"

## REACT_APP_GATEWAY = "Add Gateway URL"

Install packages localy

## npm install

Run application

## npm start

Build for development

## npm run build

# Opinionated deployment

For main and develop branch, when code is pushed, there is Github Workflow that will do npm build and upload of build directory ( artifact ) to S3. Depending on branch, artifact will be upladed either to Developer AWS account of Master software or Production one.

> main branch -> deploys static files to production hosting S3 bucket -> prod.mastersoftware.rs
> </br>develop branch -> deploys static files to developer hosting S3 bucket -> dev.mastersoftware.rs

In workflow file, Node version Developer S3 bucket, Cloudfront distribution are hardcoded env variables, this can be adapted in future.

<<<<<<< HEAD
> main branch -> deploys static files to production hosting S3 bucket -> prod.mastersoftware.rs
> develop branch -> deploys static files to developer hosting S3 bucket -> dev.mastersoftware.rs

=======
>>>>>>> develop
## Developer Account

```yaml
env:
  NODE_VERSION: "18.12.1"
  S3_BUCKET: "frontend-mastersoftware-developer"
  CDN_DISTRIBUTION_ID: "E2GJG44R3KPS1H"
  AWS_DEFAULT_REGION: eu-central-1
  ROLE_TO_ASSUME: "arn:aws:iam::067493719983:role/github-action-s3-deployment-role"
  REACT_APP_PUBLIC_API_URL: https://demoefaktura.mfin.gov.rs
  REACT_APP_GATEWAY: https://api-gateway.mastersoftware.trampic.info
  GENERATE_SOURCEMAP: false
  DISABLE_ESLINT_PLUGIN: true
```

## Production Account

```yaml
env:
  NODE_VERSION: "18.12.1"
  S3_BUCKET: "frontend-mastersoftware-production"
  CDN_DISTRIBUTION_ID: "E1X8WU0JHSVH"
  AWS_DEFAULT_REGION: eu-central-1
  ROLE_TO_ASSUME: "arn:aws:iam::610055566994:role/github-action-s3-deployment-role"
  REACT_APP_PUBLIC_API_URL: https://demoefaktura.mfin.gov.rs
  REACT_APP_GATEWAY: https://api-gateway.mastersoftware.trampic.info
  GENERATE_SOURCEMAP: false
  DISABLE_ESLINT_PLUGIN: true
```