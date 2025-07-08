# DIB-APP-V1.002

## Configuration

Create a `.env` file in the project root based on `.env.example` and provide your API keys:

```bash
cp .env.example .env
```

Edit `.env` and replace the placeholders with your actual keys. `REACT_APP_GEMINI_API_KEY` is used for Google Gemini requests and `REACT_APP_OPENAI_API_KEY` for ChatGPT requests. Ensure the keys are on a single line and keep them private.
`REACT_APP_API_BASE_URL` should point to the Express server URL (default `http://localhost:7003`). `REACT_APP_OPENAI_URL` and `REACT_APP_GEMINI_URL` allow overriding the default API endpoints if needed.

## Running the server

An Express server is included for caching uploaded files and form data. Start it alongside the React app:

```bash
npm install
node server.js
```
The React development server started with `npm start` runs on port `7002`.
If you run the server on a different port (e.g. 7003), update `REACT_APP_API_BASE_URL` in your `.env` to match:

```bash
REACT_APP_API_BASE_URL=http://localhost:7003
```

The ChatGPT provider relies on a working internet connection. If requests fail with
"Failed to fetch", ensure that your environment allows outbound HTTPS requests to
`api.openai.com` and that your API key is valid.

### Testing the database connection

The server exposes an endpoint `/api/test-db` which performs a simple database query. On the language selection page a "Test DB Connection" button calls this endpoint and shows whether the connection succeeds.

## Logs

All errors and ChatGPT responses are written to daily log files under the `logs/`
directory. Each AI reply is also stored in files prefixed `ai_respo_` followed by
the date (e.g. `logs/ai_respo_2024-05-30.log`). These files are created
automatically when the server runs. In addition to file logs, activities are
inserted into an `activity_log` table and errors into an `error_log` table in the
database.


