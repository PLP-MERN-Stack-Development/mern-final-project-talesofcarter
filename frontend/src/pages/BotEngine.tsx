import { type JSX, useState, useRef, useEffect } from "react";
import Banner from "../components/Banner";
import {
  UploadCloud,
  MessageSquare,
  Send,
  Paperclip,
  Lightbulb,
  TrendingDown,
  Users,
  Leaf,
  X,
  RefreshCw,
  Trash2,
  ThumbsUp,
  ThumbsDown,
  CheckCircle,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface UploadedFile {
  name: string;
  size: number;
  type: string;
}

interface Insight {
  title: string;
  value: string;
  change?: string;
  icon: JSX.Element;
  color: string;
}

function BotEngine(): JSX.Element {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm ProQure, your AI procurement advisor. Upload your documents to get started, or ask me anything about sustainable procurement practices.",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const insights: Insight[] = [
    {
      title: "CO₂ Impact",
      value: "2,450 kg",
      change: "-12%",
      icon: <Leaf className="w-5 h-5" />,
      color: "bg-green-500",
    },
    {
      title: "Cost Savings",
      value: "$45,000",
      change: "+8%",
      icon: <TrendingDown className="w-5 h-5" />,
      color: "bg-blue-500",
    },
    {
      title: "Suppliers",
      value: "24 Active",
      icon: <Users className="w-5 h-5" />,
      color: "bg-purple-500",
    },
    {
      title: "Sustainability Score",
      value: "8.4/10",
      change: "+0.5",
      icon: <Lightbulb className="w-5 h-5" />,
      color: "bg-amber-500",
    },
  ];

  useEffect(() => {
    const messagesRef = chatEndRef.current;

    if (messagesRef) {
      messagesRef.scrollTop = messagesRef.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Based on your uploaded procurement data, I've identified several key opportunities for improvement. Would you like me to elaborate on any specific area?",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;

    const file = files[0];
    const allowedTypes = [
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Invalid file type. Please upload CSV, Excel, PDF, or DOCX files.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("File size exceeds 10MB limit.");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadedFiles((prev) => [
            ...prev,
            { name: file.name, size: file.size, type: file.type },
          ]);

          // Add AI confirmation message
          const confirmMessage: Message = {
            id: Date.now().toString(),
            role: "assistant",
            content: `Great! I've successfully processed "${file.name}". I found several insights in your data. Ask me anything about it!`,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, confirmMessage]);

          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const clearChat = () => {
    setMessages([
      {
        id: "1",
        role: "assistant",
        content: "Chat cleared. How can I help you today?",
        timestamp: new Date(),
      },
    ]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <title>AI Advisor</title>
      <div className="relative bg-gray-50 min-h-screen w-full">
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
              Upload your procurement files and get real-time AI insights
              powered by ProQure.
            </p>
          </div>

          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Left Column - Upload & Insights */}
            <div className="lg:col-span-1 space-y-6">
              {/* File Upload Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <UploadCloud className="w-5 h-5 text-green-500" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Upload Files
                  </h2>
                </div>

                <div
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                    isDragging
                      ? "border-green-500 bg-green-50"
                      : "border-gray-300 hover:border-green-400 hover:bg-gray-50"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <UploadCloud className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Drag & drop your files here
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    or click to browse
                  </p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    Select Files
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept=".csv,.xlsx,.xls,.pdf,.docx"
                    onChange={(e) => handleFileUpload(e.target.files)}
                  />
                  <p className="text-xs text-gray-500 mt-4">
                    Supports: CSV, Excel, PDF, DOCX (Max 10MB)
                  </p>
                </div>

                {/* Upload Progress */}
                {isUploading && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">
                        Uploading...
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {uploadProgress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Uploaded Files List */}
                {uploadedFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                      Uploaded Files
                    </h3>
                    {uploadedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200"
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {file.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {(file.size / 1024).toFixed(1)} KB
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFile(index)}
                          className="p-1 hover:bg-red-100 rounded transition-colors shrink-0"
                        >
                          <X className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Insights Cards */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Key Insights
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
                        {insight.change && (
                          <span
                            className={`text-xs font-semibold px-2 py-1 rounded-full ${
                              insight.change.startsWith("+")
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {insight.change}
                          </span>
                        )}
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
                        message.role === "user"
                          ? "justify-end"
                          : "justify-start"
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
                        {message.role === "assistant" && (
                          <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-200">
                            <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                              <ThumbsUp className="w-3 h-3 text-gray-600" />
                            </button>
                            <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                              <ThumbsDown className="w-3 h-3 text-gray-600" />
                            </button>
                            <button className="p-1 hover:bg-gray-200 rounded transition-colors ml-auto">
                              <RefreshCw className="w-3 h-3 text-gray-600" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 rounded-2xl px-4 py-3">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex items-end gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors shrink-0">
                      <Paperclip className="w-5 h-5 text-gray-600" />
                    </button>
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
                        placeholder="Ask ProQure anything about your procurement data..."
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
    </>
  );
}

export default BotEngine;
