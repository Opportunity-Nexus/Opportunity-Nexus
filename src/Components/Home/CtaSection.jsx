import {Link} from 'react-router-dom';
export default function CtaSection() {
    return (
      <section className="relative dark:bg-gray-950 py-16 w-full">
        <div className=" z-10 md:px-6">
          <svg class="absolute inset-0 z-0 h-full w-full stroke-gray-200 dark:stroke-gray-800 [mask-image:radial-gradient(transparent,white)] md:[mask-image:radial-gradient(white,transparent)]">
            <rect width="100%" height="100%" fill="url(#grid-3)"></rect>
            <defs>
              <pattern
                id="grid-3"
                width="50"
                height="50"
                x="50%"
                y="-1"
                patternUnits="userSpaceOnUse"
              >
                <path fill="none" d="M.5 200V.5H200"></path>
              </pattern>
            </defs>
          </svg>
        
        </div>
        <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8 relative z-20">
          <h2 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            <span
              className="block 
              text-secondary-900 dark:text-white"
            >
              Discover Exciting Job{" "}
            </span>
            <span className="block text-primary-500">Opportunities</span>
          </h2>
          <p className="text-xl mt-5 font-medium text-gray-500 dark:text-gray-300">
            Explore a wide range of job and fellowship Opportunities for you!
          </p>
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-md shadow">
              <Link to="/"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
              >
                Explore
              </Link>
            </div>
            <div className="ml-3 inline-flex">
              <a
                href="/signup"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-gray-200"
              >
                Sign up
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }
  