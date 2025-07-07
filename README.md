# DIB-APP-V1.002

## Configuration

Create a `.env` file in the project root based on `.env.example` and provide your API keys:

```bash
cp .env.example .env
```

Edit `.env` and replace the placeholders with your actual keys. `REACT_APP_GEMINI_API_KEY` is used for Google Gemini requests and `REACT_APP_OPENAI_API_KEY` for ChatGPT requests. Ensure the keys are on a single line and keep them private.
`REACT_APP_API_BASE_URL` should point to the Express server URL (default `http://localhost:5000`).

## Running the server

An Express server is included for caching uploaded files and form data. Start it alongside the React app:

```bash
npm install
node server.js
```
If you run the server on a different port (e.g. 3001), update `REACT_APP_API_BASE_URL` in your `.env` to match:

```bash
REACT_APP_API_BASE_URL=http://localhost:3001
```

The ChatGPT provider relies on a working internet connection. If requests fail with
"Failed to fetch", ensure that your environment allows outbound HTTPS requests to
`api.openai.com` and that your API key is valid.

## Logs

All errors and ChatGPT responses are written to daily log files under the `logs/`
directory. These files are created automatically when the server runs.


