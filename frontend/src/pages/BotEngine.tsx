import { useState, useRef, useEffect } from "react";
import Banner from "../components/Banner";
import {
  MessageCircleMore,
  SendHorizontal,
  Trash2 as RecycleBin,
  Sparkles,
  Lightbulb as Dynamo,
  TrendingDown as ChartDown,
  ChartBarBig,
  Users as People,
} from "lucide-react";

// Lucide icons as inline SVGs
const MessageSquare = ({ className }: { className?: string }) => (
  <MessageCircleMore className={className} />
);

const Send = ({ className }: { className?: string }) => (
  <SendHorizontal className={className} />
);

const Trash2 = ({ className }: { className?: string }) => (
  <RecycleBin className={className} />
);

const Leaf = ({ className }: { className?: string }) => (
  <Sparkles className={className} />
);

const Lightbulb = ({ className }: { className?: string }) => (
  <Dynamo className={className} />
);

const BarChart3 = ({ className }: { className?: string }) => (
  <ChartBarBig className={className} />
);

const TrendingDown = ({ className }: { className?: string }) => (
  <ChartDown className={className} />
);

const Users = ({ className }: { className?: string }) => (
  <People className={className} />
);

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface SupplierEvaluationInput {
  supplierName: string;
  industry: string;
  deliveryReliability: number;
  lateDeliveries: number;
  carbonEmissions: number;
  renewableEnergyPct: number;
  laborRating: number;
  governanceRating: number;
  annualSpend: number;
  criticality: number;
}

interface ChartData {
  risk: number;
  environment: number;
  social: number;
  governance: number;
}

interface IndustryBenchmark {
  industry: string;
  avgCarbonEmissions: number;
  avgRenewableEnergyPct: number;
  avgLaborRating: number;
  avgGovernanceRating: number;
  analysis: string;
}

interface SupplierEvaluationResult {
  supplierName: string;
  industry: string;
  riskScore: number;
  sustainabilityScore: number;
  greenScore: number;
  industryBenchmark: IndustryBenchmark;
  insights: string[];
  recommendations: string[];
  alternativeSuggestions: string[];
  chartData: ChartData;
}

type FieldKey = keyof SupplierEvaluationInput;

const QUESTIONS: {
  key: FieldKey;
  label: string;
  placeholder?: string;
  type?: "text" | "number";
}[] = [
  {
    key: "supplierName",
    label: "What is the name of the supplier you want to evaluate?",
    type: "text",
    placeholder: "Supplier name",
  },
  {
    key: "industry",
    label: "What industry does this supplier operate in?",
    type: "text",
    placeholder: "e.g. Manufacturing, Logistics, Retail",
  },
  {
    key: "deliveryReliability",
    label:
      "On a scale of 1–10, how would you rate the supplier's delivery reliability?",
    type: "number",
    placeholder: "1 - 10",
  },
  {
    key: "lateDeliveries",
    label:
      "How many late deliveries has this supplier had in the past 12 months?",
    type: "number",
    placeholder: "count",
  },
  {
    key: "carbonEmissions",
    label:
      "What is the supplier's estimated annual CO₂ emissions (in metric tons)?",
    type: "number",
    placeholder: "e.g. 1200",
  },
  {
    key: "renewableEnergyPct",
    label:
      "What percentage of the supplier's energy comes from renewable sources?",
    type: "number",
    placeholder: "0 - 100",
  },
  {
    key: "laborRating",
    label:
      "On a scale of 1–10, how would you rate the supplier's labor and worker safety practices?",
    type: "number",
    placeholder: "1 - 10",
  },
  {
    key: "governanceRating",
    label:
      "On a scale of 1–10, how transparent and compliant is the supplier in governance practices?",
    type: "number",
    placeholder: "1 - 10",
  },
  {
    key: "annualSpend",
    label:
      "What is your organization's annual spend on this supplier (in USD)?",
    type: "number",
    placeholder: "USD",
  },
  {
    key: "criticality",
    label:
      "How critical is this supplier to your supply chain on a scale of 1–10?",
    type: "number",
    placeholder: "1 - 10",
  },
];

const initialInput = (): SupplierEvaluationInput => ({
  supplierName: "",
  industry: "",
  deliveryReliability: NaN,
  lateDeliveries: NaN,
  carbonEmissions: NaN,
  renewableEnergyPct: NaN,
  laborRating: NaN,
  governanceRating: NaN,
  annualSpend: NaN,
  criticality: NaN,
});

export default function BotEngine() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm ProQure, your AI procurement advisor. I'll help you evaluate your supplier's sustainability. Let's start with some questions. What is the name of the supplier you want to evaluate?",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [data, setData] = useState<SupplierEvaluationInput>(initialInput());
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCollectingData, setIsCollectingData] = useState(true);
  const [result, setResult] = useState<SupplierEvaluationResult | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const messagesRef = chatEndRef.current;
    if (messagesRef) {
      messagesRef.scrollTop = messagesRef.scrollHeight;
    }
  }, [messages]);

  const validateField = (key: FieldKey, value: any): string | null => {
    if (key === "supplierName" || key === "industry") {
      if (!value || String(value).trim().length < 1) return "Required";
      return null;
    }

    if (typeof value !== "number" || Number.isNaN(value))
      return "Enter a valid number";

    if (
      [
        "deliveryReliability",
        "laborRating",
        "governanceRating",
        "criticality",
      ].includes(key)
    ) {
      if (value < 1 || value > 10) return "Enter a value between 1 and 10";
    }
    if (key === "renewableEnergyPct") {
      if (value < 0 || value > 100)
        return "Enter a percentage between 0 and 100";
    }
    if (
      key === "lateDeliveries" ||
      key === "carbonEmissions" ||
      key === "annualSpend"
    ) {
      if (value < 0) return "Cannot be negative";
    }
    return null;
  };

  const addMessage = (role: "user" | "assistant", content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role,
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userInput = inputMessage.trim();
    addMessage("user", userInput);
    setInputMessage("");
    setIsTyping(true);

    // Check for restart command
    if (
      !isCollectingData &&
      (userInput.toLowerCase().includes("restart") ||
        userInput.toLowerCase().includes("new evaluation") ||
        userInput.toLowerCase().includes("start over"))
    ) {
      setTimeout(() => {
        clearChat();
        setIsTyping(false);
      }, 800);
      return;
    }

    if (!isCollectingData) {
      // Free chat after evaluation
      setTimeout(() => {
        addMessage(
          "assistant",
          "I've completed the evaluation. Would you like to evaluate another supplier? Just say 'restart' or 'new evaluation' to begin again."
        );
        setIsTyping(false);
      }, 1000);
      return;
    }

    // Process answer
    const currentQuestion = QUESTIONS[currentQuestionIndex];
    let parsedValue: any;

    if (currentQuestion.type === "text") {
      parsedValue = userInput;
    } else {
      parsedValue = Number(userInput);
    }

    const validationError = validateField(currentQuestion.key, parsedValue);

    setTimeout(async () => {
      if (validationError) {
        addMessage("assistant", `${validationError}. ${currentQuestion.label}`);
        setIsTyping(false);
        return;
      }

      // Update data
      setData((prev) => ({ ...prev, [currentQuestion.key]: parsedValue }));

      // Move to next question
      if (currentQuestionIndex < QUESTIONS.length - 1) {
        const nextIndex = currentQuestionIndex + 1;
        setCurrentQuestionIndex(nextIndex);
        addMessage("assistant", QUESTIONS[nextIndex].label);
        setIsTyping(false);
      } else {
        // All questions answered, submit
        addMessage(
          "assistant",
          "Great! I have all the information I need. Let me analyze this supplier for you..."
        );
        setIsTyping(false);

        // Submit evaluation
        const updatedData = { ...data, [currentQuestion.key]: parsedValue };
        await submitEvaluation(updatedData);
      }
    }, 800);
  };

  const submitEvaluation = async (finalData: SupplierEvaluationInput) => {
    setIsTyping(true);

    try {
      const res = await fetch("/api/ai/evaluate-supplier", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server error: ${res.status} ${text}`);
      }

      const json = (await res.json()) as SupplierEvaluationResult;
      setResult(json);
      setIsCollectingData(false);

      // Display results in chat
      setTimeout(() => {
        const resultMessage = `✅ Analysis Complete for ${json.supplierName}

        📊 Key Scores:
        • Risk Score: ${json.riskScore}/100
        • Sustainability Score: ${json.sustainabilityScore}/100
        • Green Score: ${json.greenScore}/100

        🔍 Top Insights:
        ${json.insights.map((insight, i) => `${i + 1}. ${insight}`).join("\n")}

        💡 Recommendations:
        ${json.recommendations.map((rec, i) => `${i + 1}. ${rec}`).join("\n")}

        Would you like to evaluate another supplier?`;

        addMessage("assistant", resultMessage);
        setIsTyping(false);
      }, 1500);
    } catch (err: any) {
      console.error(err);
      addMessage(
        "assistant",
        `Sorry, there was an error processing your request: ${
          err?.message ?? "Unknown error"
        }. Please try again or say 'restart' to start over.`
      );
      setIsTyping(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: "1",
        role: "assistant",
        content:
          "Hello! I'm ProQure, your AI procurement advisor. I'll help you evaluate your supplier's sustainability. Let's start with some questions. What is the name of the supplier you want to evaluate?",
        timestamp: new Date(),
      },
    ]);
    setData(initialInput());
    setCurrentQuestionIndex(0);
    setIsCollectingData(true);
    setResult(null);
  };

  // Insights based on result
  const insights = result
    ? [
        {
          title: "Risk Score",
          value: `${result.riskScore}/100`,
          icon: <BarChart3 className="w-5 h-5" />,
          color: "bg-red-500",
        },
        {
          title: "Sustainability",
          value: `${result.sustainabilityScore}/100`,
          icon: <Leaf className="w-5 h-5" />,
          color: "bg-green-500",
        },
        {
          title: "Green Score",
          value: `${result.greenScore}/100`,
          icon: <Lightbulb className="w-5 h-5" />,
          color: "bg-amber-500",
        },
        {
          title: "Governance",
          value: `${result.chartData.governance}/100`,
          icon: <Users className="w-5 h-5" />,
          color: "bg-purple-500",
        },
      ]
    : [
        {
          title: "Questions",
          value: `${currentQuestionIndex}/${QUESTIONS.length}`,
          icon: <MessageSquare className="w-5 h-5" />,
          color: "bg-blue-500",
        },
        {
          title: "Status",
          value: isCollectingData ? "Collecting" : "Complete",
          icon: <Lightbulb className="w-5 h-5" />,
          color: "bg-green-500",
        },
        {
          title: "Progress",
          value: `${Math.round(
            (currentQuestionIndex / QUESTIONS.length) * 100
          )}%`,
          icon: <TrendingDown className="w-5 h-5" />,
          color: "bg-purple-500",
        },
      ];

  return (
    <div className="relative bg-gray-50 min-h-screen w-full">
      {/* Banner */}
      <Banner
        title="AI Advisor"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "AI Advisor" }]}
        backgroundImage="/aerial-view.webp"
        height="h-96"
      />
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Page Description */}
        <div className="mb-8">
          <p className="text-gray-600 text-lg">
            Get real-time AI insights about supplier sustainability powered by
            ProQure.
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Insights */}
          <div className="lg:col-span-1 space-y-6">
            {/* Insights Cards */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {result ? "Evaluation Results" : "Progress"}
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {insights.map((insight, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div
                        className={`p-2 ${insight.color} rounded-lg text-white`}
                      >
                        {insight.icon}
                      </div>
                    </div>
                    <h3 className="text-sm font-medium text-gray-600 mb-1">
                      {insight.title}
                    </h3>
                    <p className="text-2xl font-bold text-gray-900">
                      {insight.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                💡 Tips
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Answer all questions accurately</li>
                <li>• Use actual data when possible</li>
                <li>• Rate on a scale of 1-10 where applicable</li>
                <li>• Press Enter to send your response</li>
              </ul>
            </div>
          </div>

          {/* Right Column - Chat Interface */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 flex flex-col h-[700px]">
              {/* Chat Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <MessageSquare className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      Chat with ProQure
                    </h2>
                    <p className="text-xs text-gray-500">
                      AI Procurement Advisor
                    </p>
                  </div>
                </div>
                <button
                  onClick={clearChat}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Clear chat"
                >
                  <Trash2 className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Messages Area */}
              <div
                ref={chatEndRef}
                className="flex-1 overflow-y-auto p-4 space-y-4"
              >
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        message.role === "user"
                          ? "bg-green-500 text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">
                        {message.content}
                      </p>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-2xl px-4 py-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        />
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-end gap-2">
                  <div className="flex-1 relative">
                    <textarea
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      placeholder={
                        isCollectingData
                          ? "Type your answer here..."
                          : "Ask me anything or say 'restart'..."
                      }
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                      rows={1}
                    />
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    className="p-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl transition-colors shrink-0"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Press Enter to send, Shift + Enter for new line
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
