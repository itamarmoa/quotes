# AWS Quotes API
Steps to use the AWS Quotes API
1. Set your AWS credentials in the `~/.aws/credentials` file or in the AWS CLI.
2. Build & Deploy the project by running 
```bash
npm run build-and-deploy 
```
3. You should now be able to use the following endpoints
   1. `GET '{{api_url}}/authorQuotes/Yogi Berra'`
   2. `GET '{{api_url}}/authorCountQuotes/Ralph Emerson'`
   3. `GET '{{api_url}}/authors'`
   4. `GET '{{api_url}}/searchQuote/learning experience'`
