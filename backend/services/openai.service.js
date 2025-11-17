import axios from "axios";

const API_URL = "https://router.huggingface.co/v1/chat/completions";
const MODEL_ID = "openai/gpt-oss-120b:together";

/**
 * 1. RUN FULL ANALYSIS (The "Golden" Prompt)
 * This is the main analysis engine. It takes the user's query and parsed file data,
 * and forces the AI to return a complex, structured JSON object.
 */
export const runFullAnalysis = async (userQuery, jsonData) => {
  // We provide a sample of the data to keep the prompt size reasonable
  const dataSample = jsonData.slice(0, 50);

  // This is the "Golden Prompt" - it's highly engineered to ensure
  // the AI returns the exact JSON structure we need.
  const prompt = `
    You are "ProQure," an expert-level sustainable procurement AI analyst.

    YOUR TASK:
    Analyze the provided procurement data based on the user's request. You MUST generate a comprehensive, structured JSON response that provides metrics, chart data, AI insights, and a supplier list based on the data.

    CONTEXT:
    1.  User's Request: "${
      userQuery || "Analyze the provided procurement data."
    }"
    2.  Data Sample (first 50 rows): ${JSON.stringify(dataSample)}

    RULES:
    -   You MUST return a single, valid JSON object. Do not include any text before or after the JSON.
    -   Analyze the data to calculate all metrics for the dashboard.
    -   If a value or metric cannot be calculated from the data, return 0, null, or an empty array. DO NOT make up data.
    -   The 'chartsData' values must be arrays of objects, formatted exactly as shown.
    -   'rawInsights' must be an array of actionable, text-based recommendations.
    -   'suppliers' must be an array of unique suppliers, populated with their data.

    REQUIRED JSON OUTPUT STRUCTURE:
    {
      "metrics": {
        "co2Reduction": 0.0, // (Number) Percentage of CO2 reduction (e.g., 12.5)
        "sustainableSuppliers": 0, // (Number) Count of suppliers meeting sustainability criteria
        "spendAnalyzed": 0, // (Number) Total spend from all transactions (e.g., 845000)
        "aiInsights": 0, // (Number) Total count of generated 'rawInsights'
        "riskAlerts": 0, // (Number) Count of suppliers flagged with 'High' risk
        "greenAlternatives": 0 // (Number) Count of identified green alternative opportunities
      },
      "chartsData": {
        "co2Trend": [
          // (Array) e.g., { "month": "Jan", "emissions": 2800, "target": 2500 }
        ],
        "spendDistribution": [
          // (Array) e.g., { "category": "Raw Materials", "amount": 285000, "color": "#10b981" }
        ],
        "esgData": [
          // (Array) e.g., { "category": "Environmental", "score": 85 }
        ],
        "diversityData": [
          // (Array) e.g., { "name": "Women-owned", "value": 30, "color": "#ec4899" }
        ],
        "riskData": [
          // (Array) e.g., { "category": "Supply Chain", "high": 3, "medium": 8, "low": 15 }
        ]
      },
      "rawInsights": [
        // (Array) e.g., { "title": "High CO2 Impact from Supplier X", "description": "Supplier X accounts for 30% of emissions. Recommend review.", "priority": "High" }
      ],
      "suppliers": [
        // (Array) e.g., { "name": "EcoMaterials Inc.", "category": "Raw Materials", "esgScore": "A+", "co2Impact": 450, "risk": "Low", "sustainability": 92, "spend": 120000, "aiNote": "High sustainability supplier with low risk.", "insights": ["Reduces CO2 by 18% vs avg."], "region": "Europe" }
      ]
    }
  `;

  // --- Switched to Axios ---
  const requestBody = {
    model: MODEL_ID,
    messages: [{ role: "user", content: prompt }],
  };

  const requestHeaders = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.HF_TOKEN}`,
    },
  };

  try {
    // Replaced fetch with axios.post
    // The data is in response.data
    const response = await axios.post(API_URL, requestBody, requestHeaders);
    const result = response.data;

    // Parse the AI's JSON string response
    return JSON.parse(result.choices[0].message.content);
  } catch (error) {
    // Axios throws an error for non-2xx responses automatically
    console.error(
      "Hugging Face Analysis Error:",
      error.response ? JSON.stringify(error.response.data) : error.message
    );

    // Re-throw the error so the main analysis.service.js can catch it
    const errorMessage =
      error.response?.data?.error?.message || "Hugging Face API Error";
    throw new Error(errorMessage);
  }
  // --- End of Axios switch ---
};

/**
 * 2. GET CHAT REPLY (RAG - Retrieval-Augmented Generation)
 * This function powers the simple chatbot, using the latest analysis
 * as a "Retrieval" context to answer user questions.
 */
export const getChatReply = async (
  chatHistory,
  analysisContext,
  userMessage
) => {
  // Build the system prompt with the latest data
  const systemPrompt = `
    You are ProQure, an AI procurement advisor.
    You must answer the user's questions based ONLY on the following data context.
    Do not make up information. If the answer is not in the context, say so.

    DATA CONTEXT:
    1.  Latest Analysis Metrics: ${JSON.stringify(
      analysisContext?.metrics || {}
    )}
    2.  Key AI Insights: ${JSON.stringify(analysisContext?.rawInsights || [])}
  `;

  // Format the chat history for the AI
  const messages = [
    { role: "system", content: systemPrompt },
    ...chatHistory.map((msg) => ({
      role: msg.role,
      content: msg.content,
    })),
    { role: "user", content: userMessage }, // Add the new user message
  ];

  // --- Switched to Axios ---
  const requestBody = {
    model: MODEL_ID,
    messages: messages,
  };

  const requestHeaders = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.HF_TOKEN}`,
    },
  };

  try {
    const response = await axios.post(API_URL, requestBody, requestHeaders);
    const result = response.data;
    return result.choices[0].message.content;
  } catch (error) {
    console.error(
      "Hugging Face Chat Error:",
      error.response ? JSON.stringify(error.response.data) : error.message
    );
    return "I'm sorry, I encountered an error trying to process your request.";
  }
  // --- End of Axios switch ---
};

/**
 * 3. GENERATE REPORT SUMMARY
 * A simpler function to write a text summary for a PDF report.
 */
export const generateReportSummary = async (analysis) => {
  const prompt = `
    You are an AI analyst. Write a professional, one-paragraph executive summary
    for a procurement report based on these key metrics:
    ${JSON.stringify(analysis.metrics)}

    Focus on performance, risks, and sustainability.
    Keep it concise and formal.
  `;

  // --- Switched to Axios ---
  const requestBody = {
    model: MODEL_ID,
    messages: [{ role: "user", content: prompt }],
  };

  const requestHeaders = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.HF_TOKEN}`,
    },
  };

  try {
    const response = await axios.post(API_URL, requestBody, requestHeaders);
    const result = response.data;
    return result.choices[0].message.content;
  } catch (error) {
    console.error(
      "Hugging Face Summary Error:",
      error.response ? JSON.stringify(error.response.data) : error.message
    );
    return "Failed to generate AI summary.";
  }
  // --- End of Axios switch ---
};
