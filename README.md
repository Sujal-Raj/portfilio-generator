# Portfolio Generator

A Next.js application that parses resumes (PDFs) using Google Gemini AI to extract structured information for portfolio generation. Includes user registration and MongoDB integration.

## Features

- **Resume Parsing:** Upload a PDF resume and extract structured data (name, about, skills, experience, education, projects, social links) using Google Gemini AI.
- **User Registration:** Register users by email, with MongoDB as the backend.
- **API-first:** All features are exposed via RESTful API endpoints.

## Tech Stack

- [Next.js 13+ (App Router)](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB](https://www.mongodb.com/)
- [Google Gemini AI](https://ai.google.dev/)
- [pdf-parse](https://www.npmjs.com/package/pdf-parse)

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB instance (local or Atlas)
- Google Gemini API Key

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/portfolio-generator.git
   cd portfolio-generator
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file in the root directory:

   ```
   GEMINI_API_KEY=your_google_gemini_api_key
   MONGODB_URI=your_mongodb_connection_string
   ```

### Running the App

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## API Endpoints

### 1. Parse Resume

**POST** `/api/v1/ai/parse`

- **Body:** `multipart/form-data` with a `resume` field (PDF file)
- **Response:** Extracted resume fields in JSON

**Example (using Postman):**
- Method: `POST`
- URL: `http://localhost:3000/api/v1/ai/parse`
- Body: `form-data`, key: `resume` (type: File), value: your PDF

### 2. Register User

**POST** `/api/v1/auth/register`

- **Body:** JSON
  ```json
  {
    "email": "user@example.com"
  }
  ```
- **Response:** Registration status message

## Project Structure

```
app/
  api/
    v1/
      ai/
        parse/
          route.ts      # Resume parsing endpoint
      auth/
        register/
          route.ts      # User registration endpoint
models/
  user.model.ts         # Mongoose user schema
lib/
  db.ts                 # MongoDB connection helper
README.md
```

## Troubleshooting

- **404 Not Found:**  
  Ensure the API route exists and the server is running. Restart the server after adding new files.

- **MongoDB Errors:**  
  Check your `MONGODB_URI` and ensure MongoDB is running.

- **Gemini API Errors:**  
  Make sure your `GEMINI_API_KEY` is valid and has access.

## License

MIT

---

**Made with ❤️ using Next.js and Google Gemini AI**