const cdk = require('@aws-cdk/core');
const apiGateway = require('@aws-cdk/aws-apigateway');
const ec2 = require('@aws-cdk/aws-ec2');
const lambda = require('@aws-cdk/aws-lambda');
const path = require('path');

class Quotes extends cdk.Stack {
  constructor(parent, id, props) {
    super(parent, id, props);

    const vpc = new ec2.Vpc(this, 'quotes-vpc', {
      cidr: '10.89.0.0/21',
      natGateways: 1,
      maxAzs: 1,
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: 'Backend',
          subnetType: ec2.SubnetType.PRIVATE_WITH_NAT,
        },
        {
          cidrMask: 24,
          name: 'Ingress',
          subnetType: ec2.SubnetType.PUBLIC,
        },
      ],
    });

    const lambdaSettings = {
      code: lambda.Code.fromAsset(`${path.resolve(__dirname)}/lambda/build`),
      runtime: lambda.Runtime.NODEJS_14_X,
      timeout: cdk.Duration.seconds(15),
      removalPolicy: cdk.RemovalPolicy.RETAIN,
      vpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE_WITH_NAT,
      },
      environment: {
        EXTERNAL_URL: 'https://type.fit/api/quotes',
      },
    };

    const quotesByAuthor = new lambda.Function(this, 'quotes-by-author', {
      ...lambdaSettings,
      handler: 'index.handler.getAuthorQuotes',
      functionName: 'quotes-by-author',
    });

    const quotesByAuthorCount = new lambda.Function(this, 'quotes-by-author-count', {
      ...lambdaSettings,
      handler: 'index.handler.getAuthorQuotesCount',
      functionName: 'quotes-count-by-author',
    });

    const allAuthors = new lambda.Function(this, 'all-authors', {
      ...lambdaSettings,
      handler: 'index.handler.getAllAuthors',
      functionName: 'get-all-authors',
    });

    const quotesBySearch = new lambda.Function(this, 'quotes-by-search', {
      ...lambdaSettings,
      handler: 'index.handler.searchQuote',
      functionName: 'quotes-by-search',
    });

    this.api = new apiGateway.RestApi(this, 'quotes-api', {
      restApiName: 'quotes-api',
      defaultCorsPreflightOptions: {
        allowOrigins: apiGateway.Cors.ALL_ORIGINS,
        allowHeaders: ['Content-Type'],
        allowMethods: ['GET'],
      },
    });

    // /authors – Return an array of all authors
    const authorsApi = this.api.root.addResource('authors');
    authorsApi.addMethod('GET', new apiGateway.LambdaIntegration(allAuthors));

    // /authorQuotes/{author} – Return the author’s quote/s.
    const authorQuotesApi = this.api.root.addResource('authorQuotes');
    const author = authorQuotesApi.addResource('{authorName}');
    author.addMethod('GET', new apiGateway.LambdaIntegration(quotesByAuthor));

    // /authorCountQuotes/{author_name} – Return number (count) of quotes for a given author
    const authorCountQuotesApi = this.api.root.addResource('authorCountQuotes');
    const authorNameForCountApi = authorCountQuotesApi.addResource('{authorName}');
    authorNameForCountApi.addMethod('GET', new apiGateway.LambdaIntegration(quotesByAuthorCount));

    // /SearchQuote/{free_text_search} – Return quote/s based for a given free text search (case-insensitive)
    const searchQuoteApi = this.api.root.addResource('searchQuote');
    const searchApi = searchQuoteApi.addResource('{searchText}');
    searchApi.addMethod('GET', new apiGateway.LambdaIntegration(quotesBySearch));
  }
}

const app = new cdk.App();
new Quotes(app, 'quotes');
app.synth();
