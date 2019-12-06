# Inventory database

First, copy the template script which sets all the environment variables

```console
cp env.sh.example env.sh
```

Edit the `env.sh` file to your needs.
Then, in Visual Code, open a terminal:

```console
./build.sh
./start.sh
```

CTRL+C or open another terminal:

```console
./stop.sh
```

# Development

Start backend

```console
cd ui/packages/server
yarn start
```

Start frontend

```console
cd ui/packages/client
yarn build
yarn start
```
