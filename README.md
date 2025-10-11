# Portfolio Generator

A Next.js application that lets users register, upload their resume (PDF), and generate a beautiful portfolio using Google Gemini AI. User data and portfolios are stored in MongoDB.

## Features

- **User Registration:** Sign up with email, managed via Clerk and stored in MongoDB.
- **Resume Parsing:** Upload a PDF resume and extract structured data (name, about, skills, experience, education, projects, social links) using Google Gemini AI.
- **Portfolio Creation:** Review and edit parsed data, or fill manually, then save your portfolio.
- **RESTful API:** All features are exposed via API endpoints.
- **Modern UI:** Built with Next.js App Router, Tailwind CSS, and Clerk authentication.

## Tech Stack

- [Next.js 13+ (App Router)](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB](https://www.mongodb.com/)
- [Google Gemini AI](https://ai.google.dev/)
- [pdf-parse](https://www.npmjs.com/package/pdf-parse)
- [Clerk](https://clerk.com/) for authentication
- [Zustand](https://zustand-demo.pmnd.rs/) for state management

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB instance (local or Atlas)
- Google Gemini API Key
- Clerk API keys

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
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   GEMINI_API_KEY=your_google_gemini_api_key
   MONGODB_URI=your_mongodb_connection_string
   ```

### Running the App

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## API Endpoints

### 1. Register User

**POST** `/api/v1/auth/register`

- **Body:** JSON
  ```json
  {
    "email": "user@example.com"
  }
  ```
- **Response:** Registration status message

### 2. Parse Resume

**POST** `/api/v1/ai/parse`

- **Body:** `multipart/form-data` with a `resume` field (PDF file) and `currentUser` (email)
- **Response:** Extracted resume fields in JSON, portfolio saved to MongoDB

**Example (using Postman):**
- Method: `POST`
- URL: `http://localhost:3000/api/v1/ai/parse`
- Body: `form-data`, key: `resume` (type: File), value: your PDF; key: `currentUser`, value: your email

## API Testing

A ready-to-use Postman collection is provided in [postman_collection.json](postman_collection.json).  
Import this file into Postman to quickly test the available endpoints.

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
  create-portolio/
    page.tsx            # Portfolio creation UI
  layout.tsx            # App layout
  page.tsx              # Home page
components/
  layout/
    Navbar.tsx          # Top navigation bar
    HomePage.tsx        # Home page hero section
    HowItWorks.tsx      # How it works section
  AuthProvider.ts       # Clerk + Zustand integration
lib/
  db.ts                 # MongoDB connection helper
models/
  user.model.ts         # Mongoose user schema
  portfolio.model.ts    # Mongoose portfolio schema
store/
  useUserStore.ts       # Zustand store for user registration
public/
  ...                   # Static assets
README.md
```

## Troubleshooting

- **404 Not Found:**  
  Ensure the API route exists and the server is running. Restart the server after adding new files.

- **MongoDB Errors:**  
  Check your `MONGODB_URI` and ensure MongoDB is running.

- **Gemini API Errors:**  
  Make sure your `GEMINI_API_KEY` is valid and has access.

- **Clerk Errors:**  
  Ensure your Clerk keys are correct and environment variables are set.

## License

MIT

---

**Made with ❤️ using Next.js, Clerk, and Google Gemini AI**