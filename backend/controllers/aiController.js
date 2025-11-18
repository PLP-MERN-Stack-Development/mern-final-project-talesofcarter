import axios from "axios";
import Report from "../models/Report.js";

const API_URL = "https://router.huggingface.co/v1/chat/completions";
const MODEL_ID = "openai/gpt-oss-120b:together";

export const analyze = async (req, res) => {
  try {
    const { supplierName, industry, responses } = req.body;

    // Build prompt
    const prompt = `
        You are an advanced Sustainability & ESG Procurement Analyst AI with expertise in:
        - Supplier risk assessment
        - Environmental impact calculations
        - Scope 1, 2, and 3 emissions estimation
        - ESG benchmarking using Fortune 500 industry standards
        - Sustainable procurement frameworks (ISO 20400)
        - Social, ethical, and diversity performance evaluation
        - Modern slavery and supply chain due diligence
        - Corporate sustainability reporting (CSRD, GRI, SASB)

        Analyze the supplier based on the information below.

        ### Supplier Information
        Supplier Name: ${supplierName}
        Industry: ${industry}

        ### Supplier Responses
        ${JSON.stringify(responses, null, 2)}

        ---

        ### Your Task
        Generate a comprehensive sustainability, ESG, and procurement analysis that includes structured NUMERIC and TEXTUAL insights.

        Your output MUST contain:

        ---

        ## 1. Environmental Impact (Numeric + Text)
        - Estimate **Scope 1, Scope 2, and Scope 3 emissions** (in metric tons CO₂e).
        - Provide a **Carbon Intensity Score (0–100)**.
        - Estimate potential **annual CO₂ savings** if sustainable alternatives are implemented.
        - Compare the supplier’s carbon performance against **Fortune 500 companies in the same industry**.
        - Provide **3–5 actionable ways** to reduce emissions.

        ---

        ## 2. ESG Scoring (Numeric)
        Provide a full ESG breakdown:

        - **Environmental Score** (0–100)
        - **Social Score** (0–100)
        - **Governance Score** (0–100)
        - **Overall ESG Rating** (A, B, C, D, E)

        Each score must include a short explanation.

        ---

        ## 3. Supplier Risk Analysis (Numeric)
        - **Risk Score (1–10)** – higher means more risky.
        - Breakdown of risk categories:
        - Financial stability
        - Supply continuity
        - Ethical risk
        - Country/geo-political risk
        - Environmental compliance risk
        - Identify any **red flags**.

        ---

        ## 4. Spend & Cost Efficiency Insights
        Using procurement benchmarks:
        - Estimate potential **cost inefficiencies** (%).
        - Show how similar **Fortune 500 companies optimize spend** in this category.
        - Suggest improvement opportunities.

        ---

        ## 5. Diversity & Social Responsibility
        - Determine whether the supplier aligns with:
        - DEI goals
        - Fair labour standards
        - Modern slavery compliance
        - Provide **a diversity alignment score (0–100)**.
        - Provide recommended improvements.

        ---

        ## 6. Fortune 500 Benchmark Comparison
        Compare supplier against Fortune 500 leaders in the same sector:
        - ESG average scores
        - CO₂ intensity range
        - Risk thresholds
        - Typical compliance maturity level
        - Where this supplier falls on a **percentile ranking** (e.g., “34th percentile vs Fortune 500”).

        ---

        ## 7. Final Procurement Recommendation
        Provide a professional procurement recommendation with:
        - Summary of strengths
        - Summary of weaknesses
        - **Go / Conditional Go / Do Not Proceed** verdict
        - Supplier Development Plan (if applicable)

        ---

        ## 8. JSON Output Template
        Return all results ALSO in a JSON-friendly format with the structure below:

        {
        "supplierName": "",
        "industry": "",
        "environment": {
            "scope1": 0,
            "scope2": 0,
            "scope3": 0,
            "carbonIntensityScore": 0,
            "co2SavingsPotential": "",
            "summary": ""
        },
        "esg": {
            "environmental": 0,
            "social": 0,
            "governance": 0,
            "overallRating": ""
        },
        "risk": {
            "riskScore": 0,
            "breakdown": {},
            "redFlags": []
        },
        "spendInsights": {
            "inefficiencyEstimate": "",
            "fortune500Comparison": "",
            "improvementSuggestions": []
        },
        "diversity": {
            "diversityScore": 0,
            "complianceSummary": "",
            "recommendations": []
        },
        "benchmarking": {
            "industryPositionPercentile": 0,
            "fortune500Averages": {}
        },
        "finalRecommendation": ""
        }

        Be accurate, analytical, and provide realistic numeric estimates even if approximated.
`;

    const response = await axios.post(
      API_URL,
      {
        model: MODEL_ID,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,
        max_tokens: 1024,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const aiOutput = response.data;

    // Save report
    const report = await Report.create({
      userId: req.user,
      supplierName,
      industry,
      responses,
      aiOutput,
    });

    res.json({
      success: true,
      message: "AI analysis completed",
      report,
    });
  } catch (err) {
    console.error(err.response?.data || err);
    res
      .status(500)
      .json({
        success: false,
        message: "AI analysis failed",
        error: err.message,
      });
  }
};
