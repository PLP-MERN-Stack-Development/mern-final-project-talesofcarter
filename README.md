# ProQure - AI-Powered Supplier Intelligence Platform

ProQure is a full-stack web application designed to revolutionize procurement by providing AI-driven insights into supplier sustainability, risk, and performance. It empowers organizations to make smarter, more sustainable sourcing decisions.

## 🌐 Live Demo

[**View the live application here**](https://proqure.vercel.app)

## 📊 Pitch Deck

[**Access the project pitch deck here**](https://your-pitch-deck-link.com) <!-- Replace with your pitch deck URL -->

## ✨ Key Features

- **🤖 AI Advisor Chatbot:** A conversational interface that guides users through a comprehensive supplier evaluation process, collecting data on metrics ranging from delivery reliability to carbon emissions and labor practices.
- **📈 Interactive Dashboard:** A dynamic and visually rich dashboard that aggregates and displays key supplier metrics. It features:
  - **At-a-Glance Metrics:** Cards for average sustainability scores, risk levels, total evaluations, and more.
  - **Data Visualization:** Interactive charts (line, bar, pie, radar) from Recharts to visualize sustainability trends, industry distribution, ESG performance, and risk analysis.
  - **Supplier Table:** A detailed, sortable list of all evaluated suppliers with their scores, risk levels, and progress bars for easy comparison.
- **🌿 Comprehensive ESG & Risk Analysis:** The AI engine analyzes collected data to generate:
  - **Risk Scores:** Quantifies potential supply chain disruptions.
  - **Sustainability & Green Scores:** Measures environmental and social impact.
  - **ESG Breakdowns:** Provides detailed scores for Environmental, Social, and Governance categories.
- **📊 Industry Benchmarking:** Compares a supplier's performance against industry averages to provide context and identify competitive advantages or areas for improvement.
- **💡 Actionable Insights:** The AI generates clear recommendations and alternative supplier suggestions to mitigate risk and enhance sustainability.

## 🚀 Technology Stack

This project is a MERN stack application with a focus on a modern, interactive user experience.

### Frontend

- **Framework:** [React](https://reactjs.org/)
- **JavaScript Superset:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Charting:** [Recharts](https://recharts.org/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **API Communication:** [Axios](https://axios-http.com/)

### Backend

- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express.js](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/) (with Mongoose)
- **AI Integration:** LLM (e.g., OpenAI API).
- **Bcrypt**
- **CORS**
- **JWT**

## 📂 Project Structure

The project follows a standard monorepo structure, separating the frontend and backend concerns.

```
/
├── backend/
│   ├── config/    # Handles API logic (e.g., aiController.js)
│   ├── controllers/         # Mongoose schemas
│   ├── middleware/         # API route definitions
│   └── models/
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/ # Reusable React components (Banner, etc.)
│       ├── pages/      # Main page components (Dashboard.tsx, BotEngine.tsx)
│       ├── services/   # API communication layer (api.ts)
│       ├── App.tsx
│       └── index.tsx
└── README.md
```

## ⚙️ Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js and npm (or yarn)
- MongoDB instance (local or cloud-based like MongoDB Atlas)
- An API key from an AI provider (like OpenAI) if you intend to use the AI analysis feature.

### Installation & Setup

1.  **Clone the repository:**

    ```sh
    git clone https://github.com/your-username/proqure.git
    cd proqure
    ```

2.  **Install Backend Dependencies:**

    ```sh
    cd backend
    npm install
    ```

3.  **Configure Backend Environment:**
    Create a `.env` file in the `backend` directory and add your configuration:

    ```env
    MONGO_URI=your_mongodb_connection_string
    PORT=5000
    OPENAI_API_KEY=your_ai_api_key # Or other AI provider key
    ```

4.  **Install Frontend Dependencies:**

    ```sh
    cd ../frontend
    npm install
    ```

5.  **Run the Application:**
    - In one terminal, start the backend server:
      ```sh
      cd backend && npm start
      ```
    - In another terminal, start the frontend development server:
      ```sh
      cd frontend && npm run dev
      ```

The application should now be running on `http://localhost:3000` (or your configured port).

6. **Screenshots**

## Landing Page

![Landing Page A](./screenshots/landing-page-1.png)

![Landing Page B](./screenshots/landing-page-2.png)

## AI Advisor

![AI Advisor](./screenshots/ai.png)

## Dashboard

![Landing Page B](./screenshots/dashboard.png)

## Report

![Landing Page B](./screenshots/eval.png)

## Suppliers

![Landing Page B](./screenshots/suppliers.png)
