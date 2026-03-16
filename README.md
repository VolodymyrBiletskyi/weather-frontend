# Welcome to Weather webapp Frontend

## Prerequisites

1. Installed NPM
2. Installed git
3. Installed Docker

## Installation

1. Clone this repo sh

```sh
git clone https://github.com/VolodymyrBiletskyi/weather-frontend.git
```

2. Go to https://openweathermap.org create/login account and get api key

3. Create file `.env.local` and put it into VITE_API_KEY="your_key"

## Usage

1. Install NPM packages

```sh
npm install
```

In terminal execute

```sh
npm run dev
```

and go to the link provided there

2. Via Docker open Docker desktop then go to terminal and execute

```sh
docker build -t your-image-name .
```

after successful build run

```sh
docker run --name your-container-name -p port:port your-image-name
```

and go to the local link provided in terminal
