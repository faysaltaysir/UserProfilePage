import { HackathonCard } from "@/components/HackathonCard";
import { ThemeTable } from "@/components/ThemeTable";

const articles = [
  {
    title: "Decentralize Dhaka to Ensure Sustainable Urban Development",
    author: "Abu Fattah Hossain",
    date: "21st Aug, 2024",
    image: "components.webp",
    likes: 293,
    dislikes: 0,
    comments: 10,
  },
  {
    title: "Decentralize Dhaka to Ensure Sustainable Urban Development",
    author: "Abu Fattah Hossain",
    date: "21st Aug, 2024",
    image: "components.webp",
    likes: 293,
    dislikes: 0,
    comments: 10,
  },
  {
    title: "Decentralize Dhaka to Ensure Sustainable Urban Development",
    author: "Abu Fattah Hossain",
    date: "21st Aug, 2024",
    image: "components.webp",
    likes: 293,
    dislikes: 0,
    comments: 10,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          <section className="flex flex-col space-y-4">
            <h2 className="text-2xl font-bold">Recent Articles</h2>
            <div className="space-y-4 flex-1">
              {articles.map((article, index) => (
                <HackathonCard key={index} {...article} />
              ))}
            </div>
            <div className="flex justify-center">
              <button className="text-blue-500 hover:text-blue-600 transition-colors">
                View all articles →
              </button>
            </div>
          </section>
          
          <section className="flex flex-col space-y-4">
            <h2 className="text-2xl font-bold">Crime Statistics by Division</h2>
            <ThemeTable />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Index;
