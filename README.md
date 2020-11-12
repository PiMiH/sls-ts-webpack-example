# sls-ts-webpack-example
serverless lambdas with typescript and webpack example
1. create cloudformation stack with yml at '/cloudformation/base.yml'
2. update env vars at '/env.json' with cloudfromation output
3. run cmd 'sls deploy' within '/lambdas/api/debug.get' and '/lambdas/api/debug.post'
4. endpoint urls given from cmd output
5. switch debug mode to false for smaller build sizes