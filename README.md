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

For develop branch, there is Github Workflow that will do npm build and upload of build directory to S3 in Developer AWS account of Master software.

In workflow file, Node version Developer S3 bucket, Cloudfront distribution are hardcoded env variables, this can be adapted in future.

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