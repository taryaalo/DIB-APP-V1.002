# DIB-APP-V1.002

## Configuration

Create a `.env` file in the project root based on `.env.example` and provide your Google API key:

```bash
cp .env.example .env
```

Edit `.env` and replace `YOUR_API_KEY_HERE` with your actual key. The application reads this key from `process.env.REACT_APP_GEMINI_API_KEY`.

