import { useNavigate } from "react-router-dom";

function AIHub() {

  const navigate = useNavigate();

  const cards = [

    {
      title: "Resume Analyzer",
      icon: "📄",
      color: "bg-blue-500",
      route: "/resume-analyzer",
      desc: "Complete ATS Analysis"
    },

    {
      title: "Resume Score",
      icon: "📊",
      color: "bg-green-500",
      route: "/resume-score",
      desc: "Get ATS Score"
    },

    {
      title: "Skill Gap",
      icon: "🎯",
      color: "bg-yellow-500",
      route: "/skill-gap",
      desc: "Find Missing Skills"
    },

    {
      title: "Job Recommendation",
      icon: "💼",
      color: "bg-purple-500",
      route: "/job-recommendation",
      desc: "AI Career Suggestions"
    },

    {
      title: "Interview Questions",
      icon: "🎤",
      color: "bg-pink-500",
      route: "/interview-questions",
      desc: "AI Generated Questions"
    },

    {
      title: "Career Chatbot",
      icon: "🤖",
      color: "bg-indigo-600",
      route: "/career-chat",
      desc: "Ask Anything"
    }

  ];

  return (

    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold text-center mb-3">

          CareerForge AI

        </h1>

        <p className="text-center text-gray-600 mb-10">

          AI Powered Career Assistant

        </p>

        <div className="grid md:grid-cols-3 gap-8">

          {cards.map((card,index)=>(

            <div

              key={index}

              onClick={()=>navigate(card.route)}

              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition cursor-pointer p-8"

            >

              <div className={`w-16 h-16 rounded-full ${card.color} flex items-center justify-center text-3xl text-white mb-5`}>

                {card.icon}

              </div>

              <h2 className="text-2xl font-bold">

                {card.title}

              </h2>

              <p className="text-gray-600 mt-3">

                {card.desc}

              </p>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}

export default AIHub;