import React from "react";
import FaqContent from "../../Data/Home/FAQ";
import { Disclosure } from "@headlessui/react";
import { clsx } from "clsx";



const FrequentlyAskedQuestions = () => {
  return (
    <section className="bg-gray-100 dark:bg-gray-900" id="faq"><div
    className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 "
    
  >
    <div className="mx-auto max-w-3xl divide-y-2 divide-gray-200 dark:divide-gray-700">
      <h2 className="text-center text-3xl font-extrabold text-secondary-900 dark:text-white sm:text-4xl">
        Frequently asked questions
      </h2>
      <dl className="mt-6 space-y-6 divide-y divide-gray-200 dark:divide-gray-700">
        {FaqContent.map((faq) => (
          <Disclosure as="div" key={faq.question} className="pt-6">
            {({ open }) => (
              <>
                <dt className="text-lg">
                  <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-400">
                    <span className="font-medium dark:text-gray-500 text-gray-700">
                      {faq.question}
                    </span>
                    <span className="ml-6 flex h-7 items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className={clsx(
                          open ? "-rotate-180" : "rotate-0",
                          "h-6 w-6 transform"
                        )}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m19.5 8.25-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </span>
                  </Disclosure.Button>
                </dt>
                <Disclosure.Panel as="dd" className="mt-2 pr-12">
                  <p className="text-base text-gray-500 dark:text-gray-200">{faq.answer}</p>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </dl>
    </div>
  </div></section>
  );
};

export default FrequentlyAskedQuestions;
