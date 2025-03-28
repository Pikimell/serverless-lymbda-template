<!--
title: 'AWS NodeJS Example'
description: 'This template demonstrates how to deploy a simple NodeJS function running on AWS Lambda using the Serverless Framework.'
layout: Doc
framework: v4
platform: AWS
language: nodeJS
priority: 1
authorLink: 'https://github.com/serverless'
authorName: 'Serverless, Inc.'
authorAvatar: 'https://avatars1.githubusercontent.com/u/13742415?s=200&v=4'
-->

# Serverless Framework AWS NodeJS Example

This template demonstrates how to deploy a simple NodeJS function running on AWS Lambda using the Serverless Framework. The deployed function does not include any event definitions or any kind of persistence (database). For more advanced configurations check out the [examples repo](https://github.com/serverless/examples/) which include use cases like API endpoints, workers triggered by SQS, persistence with DynamoDB, and scheduled tasks. For details about configuration of specific events, please refer to our [documentation](https://www.serverless.com/framework/docs/providers/aws/events/).

## Usage

### Deployment

In order to deploy the example, you need to run the following command:

```
serverless deploy
```

After running deploy, you should see output similar to:

```
Deploying "aws-node" to stage "dev" (us-east-1)

✔ Service deployed to stack aws-node-dev (90s)

functions:
  hello: aws-node-dev-hello (1.5 kB)
```

### Invocation

After successful deployment, you can invoke the deployed function by using the following command:

```
serverless invoke --function hello
```

Which should result in response similar to the following:

```json
{
  "statusCode": 200,
  "body": "{\"message\":\"Go Serverless v4.0! Your function executed successfully!\"}"
}
```

### Local development

The easiest way to develop and test your function is to use the Serverless Framework's `dev` command:

```
serverless dev
```

This will start a local emulator of AWS Lambda and tunnel your requests to and from AWS Lambda, allowing you to interact with your function as if it were running in the cloud.

Now you can invoke the function as before, but this time the function will be executed locally. Now you can develop your function locally, invoke it, and see the results immediately without having to re-deploy.

When you are done developing, don't forget to run `serverless deploy` to deploy the function to the cloud.


---

Щоб почати роботу з serverless на своєму комп’ютері та підключити доступ по accessKey, виконай такі кроки:

1. Переконайся, що у тебе встановлений Node.js

Перевір версію Node.js, використовуючи:

node -v

Якщо немає, встанови Node.js.

2. Встанови Serverless Framework

Якщо ти ще не встановив його, зроби це через npm:

npm install -g serverless

Переконайся, що встановлення успішне:

serverless -v

3. Налаштуй AWS Access Key

У тебе повинні бути accessKey та secretKey, які можна створити в AWS IAM.

Щоб додати їх у конфігурацію Serverless Framework:

serverless config credentials --provider aws --key YOUR_ACCESS_KEY --secret YOUR_SECRET_KEY

Якщо потрібно вказати певний профіль (наприклад, myprofile):

serverless config credentials --provider aws --key YOUR_ACCESS_KEY --secret YOUR_SECRET_KEY --profile myprofile

4. Перевір, чи правильно підключився AWS

Виконай команду:

aws sts get-caller-identity

Якщо вона повертає дані про користувача, значить, все налаштовано правильно.

5. Створи новий проєкт

Наприклад, якщо хочеш зробити Serverless-проєкт на Node.js:

serverless create --template aws-nodejs --path my-service
cd my-service

6. Розгорни функцію

Переконайся, що в кореневій директорії є serverless.yml, а потім розгорни:

serverless deploy

Це створить необхідні ресурси в AWS.

Якщо виникнуть помилки або потрібно щось налаштувати під специфічний профіль або регіон, дай знати!
