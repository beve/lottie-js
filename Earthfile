ARG --required NODEJS_VERSION

install-dependencies:
    FROM node:${NODEJS_VERSION}
    WORKDIR /app
    COPY yarn.lock package.json tsconfig.json .
    RUN yarn install --immutable

lint:
    FROM +install-dependencies
    COPY .eslintrc.js .eslintignore prettier.config.js .
    RUN yarn lint

test:
    FROM +install-dependencies
    COPY --dir src jest.config.js .
    RUN yarn test

build:
    FROM +install-dependencies
    COPY --dir src rollup.config.js .
    RUN yarn build

publish:
    BUILD +lint
    BUILD +test
    FROM +build
    RUN --secret NPM_AUTH_TOKEN yarn publish --registry https://npm.pkg.github.com/
