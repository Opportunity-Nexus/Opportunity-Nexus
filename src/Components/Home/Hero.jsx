import HeroImageLight from "../../assets/utils/hero-image-light.svg"
import HeroImageDark from "../../assets/utils/hero-image-dark.svg"

export default function Hero() {
  return (
    <div className=" relative flex flex-col justify-center items-center -mt-28 overflow-hidden pt-10 pb-16 w-full dark:bg-gray-900 bg-gray-10">
     <svg className="absolute inset-0 z-0 h-full w-full select-none stroke-gray-200 dark:stroke-gray-800 [mask-image:linear-gradient(90deg,white,transparent_18%,transparent_82%,white)]">
        <rect width="100%" height="100%" fill="url(#grid-1)"></rect>
        <defs>
          <pattern
            id="grid-1"
            width="145"
            height="145"
            x="50%"
            y="-1"
            patternUnits="userSpaceOnUse"
          >
            <path fill="none" d="M.5 200V.5H200"></path>
          </pattern>
        </defs>
      </svg>
      <svg className="absolute inset-0 z-0 h-full w-full select-none stroke-gray-400 dark:stroke-gray-800 [mask-image:linear-gradient(90deg,white,transparent_18%,transparent_82%,white)]">
        <rect width="100%" height="100%" fill="url(#grid-1)"></rect>
        <defs>
          <pattern
            id="grid-1"
            width="145"
            height="145"
            x="50%"
            y="-1"
            patternUnits="userSpaceOnUse"
          >
            <path fill="none" d="M.5 200V.5H200"></path>
          </pattern>
        </defs>
      </svg>
      <main className="w-full realtive z-20">
        <div className=" mx-auto max-w-7xl sm:pt-28 pt-36  lg:overflow-hidden">
          <div className="lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8">
              <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
                <div className="lg:py-24">
                  <div className="flex justify-center items-center text-center dark:bg-black shadow-md dark:text-white text-base font-normal rounded-lg px-2 py-1 w-fit mx-0 sm:mx-auto lg:mx-0">
                    Our Gateway to Infinite Opportunities
                  </div>
                  <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                    <span className="block dark:text-white text-black">
                      Opportunity Awaits,
                    </span>
                    <span className="block text-primary-500">
                      Your Future Begins Here
                    </span>
                  </h1>
                  <p className="mt-3 text-base text-gray-500 dark:text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                    Your gateway to on-campus, off-campus, and prestigious
                    programs. Discover, apply, and track your journey with ease.
                  </p>
                  <div className="mt-10 sm:mt-12 w-fit mx-0 sm:mx-auto lg:mx-0  cursor-pointer">
                    <a href="/signup" className=" cursor-pointer">
                      <div className=" flex items-center justify-center rounded-lg">
                        <button className=" border border-primary-500 focus:ring-2 focus:ring-offset-2 shadow hover:drop-shadow-md bg-primary-500 text-white dark:bg-black dark:text-primary-500 dark:border-none hover:bg-white hover:text-primary-500 dark:hover:bg-primary-500 dark:hover:text-black font-medium rounded-lg px-4 py-2.5 text-base ">
                          Unlock Your Future
                        </button>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-12 -mb-16 lg:m-0 lg:relative">
                <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                  {" "}
                  <img
                    className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none dark:hidden"
                    src={HeroImageLight}
                    alt=""
                  />
                   <img
                    className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none hidden dark:flex"
                    src={HeroImageDark}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
