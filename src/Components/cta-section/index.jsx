export default function CtaSection() {
  return (
    <section className="relative py-16 w-full">
      <div className=" z-10 md:px-6">
        <svg class="absolute inset-0 z-0 h-full w-full stroke-gray-200 [mask-image:radial-gradient(transparent,white)] md:[mask-image:radial-gradient(white,transparent)]">
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
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 16 16"
          class="absolute left-2 top-1/2 z-20 h-9 w-9 -translate-y-1/2 text-gray-700 hover:text-gray-800 md:hidden "
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"></path>
        </svg>
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 16 16"
          class="absolute right-2 top-1/2 z-20 h-9 w-9 -translate-y-1/2 text-gray-700 hover:text-gray-800 md:hidden "
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"></path>
        </svg>
      </div>
      <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8 relative z-20">
        <h2 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
          <span
            className="block 
            text-secondary-900"
          >
            Discover Exciting Job{" "}
          </span>
          <span className="block text-primary-500">Opportunities</span>
        </h2>
        <p className="text-xl mt-5 font-medium text-gray-500 ">
          Explore a wide range of job and fellowship Opportunities for you!
        </p>
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-md shadow">
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
            >
              Explore
            </a>
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
