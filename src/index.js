// @flow

type Serverless = {
    service: {provider: {environment: {[key: string]: string}}}
};

export default class {
    serverless: Serverless;
    hooks: {[key: string]: Function};

    constructor(serverless: Serverless) {
        this.serverless = serverless;
        this.hooks = {
            'before:package:initialize': this.checkEnvironment.bind(this)
        };
    }

    checkEnvironment() {
        const {environment} = this.serverless.service.provider
        Object.keys(environment).forEach((key: string) => {
            if(environment[key] === undefined) {
                throw new Error(`No value could be found for environment variable ${key}. Check your serverless environment configuration and try again`);
            }
        });
    }
};
