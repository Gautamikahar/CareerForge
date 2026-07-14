import CareerChatbot from "../components/CareerChatbot";

function CareerChat() {
  return (
    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-3">
          🤖 AI Career Chatbot
        </h1>

        <p className="text-gray-600 mb-8">
          Ask anything about careers, resumes, interviews, placements, projects or skills.
        </p>

        <CareerChatbot />

      </div>

    </div>
  );
}

export default CareerChat;