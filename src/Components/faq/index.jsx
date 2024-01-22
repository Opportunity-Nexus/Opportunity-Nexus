import React from "react";

import { Disclosure } from "@headlessui/react";
import { clsx } from "clsx";

const faqContent = [
  {
    question: "What is Opportunity Nexus?",
    answer: "Opportunity Nexus is a dynamic platform designed to connect individuals with a wide array of opportunities including jobs, internships, scholarships, and professional networking events. Our aim is to facilitate access to career and educational opportunities for everyone."
  },
  {
    question: "How can I find opportunities relevant to my field?",
    answer: "You can easily find opportunities relevant to your field by using our advanced search feature. Filter your search by keywords, location, category, and type of opportunity to find the best matches for your career or educational goals."
  },
  {
    question: "Is there a fee to use Opportunity Nexus?",
    answer: "Opportunity Nexus is free for individuals seeking opportunities. Our goal is to ensure equal access to information and opportunities for all users. However, organizations looking to post opportunities may be subject to a fee."
  },
  {
    question: "Can I save opportunities that interest me?",
    answer: "Yes, you can save opportunities that interest you by creating a free account on our platform. This feature allows you to easily keep track of and manage your saved opportunities."
  },
  {
    question: "How often are new opportunities added to the platform?",
    answer: "New opportunities are added daily. We work diligently to maintain and update our database to ensure our users have access to the most current and relevant opportunities."
  },
  {
    question: "Who can post opportunities on Opportunity Nexus?",
    answer: "Accredited organizations, educational institutions, and companies are welcome to post opportunities on our platform. We review all postings to ensure they meet our quality and relevance standards."
  },
  {
    question: "How do I apply for an opportunity?",
    answer: "To apply for an opportunity, simply click on the 'Apply' button located in the opportunity listing. You will be directed to the application instructions provided by the organization posting the opportunity."
  },
  {
    question: "Can I get notifications for new opportunities?",
    answer: "Yes, by creating an account and setting up your preferences, you can receive notifications for new opportunities that match your interests and qualifications."
  },
  {
    question: "Who do I contact if I have questions about a specific opportunity?",
    answer: "For questions about a specific opportunity, please refer to the contact information provided in the opportunity listing. If no contact information is provided, you can contact our support team for assistance."
  },
  {
    question: "What types of opportunities are available on Opportunity Nexus?",
    answer: "Opportunity Nexus offers a diverse range of opportunities including full-time and part-time jobs, internships, scholarships, grants, workshops, and networking events across various industries and sectors."
  }
];

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
        {faqContent.map((faq) => (
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
                  <p className="text-base text-gray-500 dark:text-gray-600">{faq.answer}</p>
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
