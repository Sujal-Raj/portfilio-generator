import Link from "next/link";

export default function HomePage(){

    return (
        <section id="home" className="pt-32 pb-20 bg-white dark:bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-900 rounded-full mb-8 border border-gray-200 dark:border-gray-800">
            <span className="text-xl">🎨</span>
            <span className="text-sm text-gray-700 dark:text-gray-300">Introducing AI Portfolio Builder</span>
            {/* <span className="text-gray-400 mt-[-4px]">→</span> */}
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white mb-6 leading-tighter">
            Create a Stunning Portfolio in Minutes
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            No design skills required. Just upload your work, customize your layout,
          </p>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-3xl mx-auto">
            and share your unique portfolio URL with potential clients.
          </p>
          <p className="text-base text-gray-500 dark:text-gray-500 mb-10">
            Perfect for <span className="font-semibold text-black dark:text-white">designers, developers, and creatives</span>.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={"/create-portolio"}>
            <button className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-lg text-base font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition shadow-lg">
              Create Your Portfolio →
            </button>
            </Link>
            <button className="bg-white dark:bg-gray-900 text-black dark:text-white px-8 py-3 rounded-lg text-base font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition border-2 border-gray-200 dark:border-gray-800">
              View Examples →
            </button>
          </div>
        </div>
      </div>
    </section>

    )
}