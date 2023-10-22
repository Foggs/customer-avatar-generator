import React, { useState } from "react";

export default function AITweet() {
  const [jobDescription, setJobDescription] = useState<string>("");

  const [jobTitle, setJobTitle] = useState<string>("");
  const [industry, setIndustry] = useState<string>("");
  const [keyWords, setKeyWords] = useState<string>("");
  const [tone, setTone] = useState<string>("");
  const [numWords, setNumWords] = useState<string>("");

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleCopy = (): void => {
    // navigator.clipboard.writeText(jobDescription);
    setIsCopied(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    const res: Response = await fetch("/api/returnJobDescription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jobTitle,
        industry,
        keyWords,
        tone,
        numWords,
      }),
    });
    setIsGenerating(false);
    const data = await res.json();
    setJobDescription(data.jobDescription.trim());
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center px-4 py-2">
        <h1 className="text-4xl md:text-6xl font-bold">
          AI Custom Tweet Generator
          <span className="text-4xl md:text-6xl font-bold text-blue-600">
            .
          </span>
        </h1>
        <p className="mt-3 text-2xl">
          Create Beautiful
          <span className="text-2xl font-bold text-blue-600"> Tweets </span>
          in Seconds
        </p>
      </div>

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-y-12 md:grid-cols-2 md:gap-x-12 ">
          <div className="">
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="flex flex-col">
                <label className="sr-only" htmlFor="jobTitle">
                  Job Title
                </label>
                <input
                  type="text"
                  className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                  name="jobTitle"
                  placeholder="Job Title"
                  id="jobTitle"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="industry" className="sr-only">
                  Industry
                </label>
                <input
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                  placeholder="Industry (Optional)"
                  type="text"
                  name="industry"
                  id="industry"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="keywords" className="sr-only">
                  Keywords for AI (Optional)
                </label>
                <textarea
                  rows={7}
                  value={keyWords}
                  onChange={(e) => setKeyWords(e.target.value)}
                  name="keyWords"
                  id="keyWords"
                  placeholder="Keywords for AI (Optional)"
                  className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                />
              </div>
              <div className="flex flex-col">
                <label className="sr-only" htmlFor="tone">
                  Tone
                </label>

                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                  name="tone"
                  id="tone"
                >
                  <option value="default">Select Tone (Optional)</option>
                  <option value="casual">Casual</option>
                  <option value="friendly">Friendly</option>
                  <option value="professional">Professional</option>
                  <option value="formal">Formal</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="words" className="sr-only">
                  Words (Optional)
                </label>
                <input
                  value={numWords}
                  onChange={(e) => setNumWords(e.target.value)}
                  type="number"
                  className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                  placeholder="Number Of Words - Default 200 (Optional)"
                  name="words"
                  id="words"
                />
              </div>

              <button
                className={`flex justify-center items-center bg-blue-600 w-full hover:bg-blue-700 text-white font-bold px-4 py-2 rounded
                ${isGenerating ? "cursor-not-allowed opacity-50" : ""}`}
                type="submit"
              >
                {isGenerating ? <Spinner /> : null}
                {isGenerating ? "Generating..." : "Generate Job Description"}
              </button>
            </form>
          </div>
          <div className="">
            <div className="flex flex-col">
              <label htmlFor="output" className="sr-only">
                Output
              </label>
              <textarea
                rows={
                  jobDescription === ""
                    ? 7
                    : jobDescription.split("\n").length + 12
                }
                name="output"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                disabled={jobDescription === ""}
                id="output"
                placeholder="AI Generated Job Description"
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
              />
              <button
                onClick={handleCopy}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="submit"
                disabled={jobDescription === ""}
              >
                {isCopied ? "Copied" : "Copy to Clipboard"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Spinner() {
  return (
    <svg
      className={`animate-spin -ml-1 mr-3 h-5 w-5 text-white`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
}
