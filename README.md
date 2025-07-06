# DIB-APP-V1.002

## Configuration

Create a `.env` file in the project root based on `.env.example` and provide your API keys:

```bash
cp .env.example .env
```

Edit `.env` and replace the placeholders with your actual keys. `REACT_APP_GEMINI_API_KEY` is used for Google Gemini requests and `REACT_APP_OPENAI_API_KEY` for ChatGPT requests.
`REACT_APP_API_BASE_URL` should point to the Express server URL (default `http://localhost:5000`).

## Running the server

An Express server is included for caching uploaded files and form data. Start it alongside the React app:

```bash
npm install
node server.js
```

