# AWS Quotes API
Steps to use the AWS Quotes API
1. Set your AWS credentials in the `~/.aws/credentials` file or in the AWS CLI.
2. Install npm dependencies 
   ```bash
   npm install 
   ```
3. Build & Deploy the project by running
   ```bash
   npm run build-and-deploy 
   ```
4. You should now be able to use the following endpoints
   ```
   GET '{{api_url}}/authorQuotes/Yogi Berra'
   GET '{{api_url}}/authorCountQuotes/Ralph Emerson'`
   GET '{{api_url}}/authors'`
   GET '{{api_url}}/searchQuote/learning experience'
   ```
