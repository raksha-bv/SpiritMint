import React, { useState } from "react";
import { ethers } from "../../ethers-6.7.esm.min.js";
import { contractAddress, abi } from "../../constants";

const questions = [
  {
    text: "How do you handle challenges?",
    options: [
      "Face them head-on",
      "Look for a creative solution",
      "Seek guidance from others",
      "Take time to think and act cautiously",
    ],
  },
  {
    text: "Which environment are you most drawn to?",
    options: ["Deep forests", "Open skies", "Mountains", "Oceans"],
  },
  {
    text: "How would friends describe you?",
    options: [
      "Protective and caring",
      "Thoughtful and wise",
      "Bold and confident",
      "Gentle and calm",
    ],
  },
  {
    text: "When working on a task, you prefer to...",
    options: [
      "Work alone",
      "Collaborate with others",
      "Adapt as needed",
      "Stick to a structured plan",
    ],
  },
  {
    text: "What role do you take in a group setting?",
    options: ["Leader", "Planner", "Helper", "Observer"],
  },
  {
    text: "How do you recharge?",
    options: [
      "Spending time in nature",
      "Meditating or journaling",
      "Being with friends",
      "Exploring new things",
    ],
  },
  {
    text: "Which of these values resonates with you the most?",
    options: ["Loyalty", "Freedom", "Compassion", "Resilience"],
  },
  {
    text: "How do you approach new experiences?",
    options: [
      "With caution",
      "With excitement",
      "With curiosity",
      "With confidence",
    ],
  },
  {
    text: "What motivates you the most?",
    options: [
      "Achieving personal goals",
      "Creative growth and transformation",
      "Helping others and making a difference",
      "Joy and connection with others",
    ],
  },
  {
    text: "How do you prefer to solve problems?",
    options: [
      "Approach it head-on with strength",
      "Think outside the box",
      "Collaborate with others",
      "Plan a careful, calculated strategy",
    ],
  },
  {
    text: "What do you value most in a friendship?",
    options: [
      "Loyalty and trust",
      "Creativity and growth",
      "Compassion and support",
      "Fun and adventures",
    ],
  },
  {
    text: "How do you respond to change?",
    options: [
      "Adapt and find the best way to handle it",
      "Embrace it as an opportunity for transformation",
      "Take it slow and think it through",
      "Go with the flow and make the best of it",
    ],
  },
  {
    text: "What is your idea of a perfect day?",
    options: [
      "A peaceful day in nature",
      "A day filled with creative pursuits",
      "A relaxing day with close family and friends",
      "A fun day at the beach with friends",
    ],
  },
  {
    text: "What is most important to you in life?",
    options: [
      "Strength, stability, and solitude",
      "Growth, creativity, and transformation",
      "Peace, harmony, and compassion",
      "Fun, social connections, and joy",
    ],
  },
];

const spiritAnimals = [
  { name: "Bear", traits: ["Brave", "Resilient"], score: 0 },
  { name: "Butterfly", traits: ["Graceful", "Transformative"], score: 0 },
  { name: "Deer", traits: ["Gentle", "Alert"], score: 0 },
  { name: "Dolphin", traits: ["Playful", "Social"], score: 0 },
  { name: "Eagle", traits: ["Visionary", "Free-Spirited"], score: 0 },
  { name: "Fox", traits: ["Clever", "Adaptable"], score: 0 },
  { name: "Lion", traits: ["Confident", "Dominant"], score: 0 },
  { name: "Owl", traits: ["Wise", "Patient"], score: 0 },
  { name: "Tiger", traits: ["Fierce", "Ambitious"], score: 0 },
  { name: "Wolf", traits: ["Loyal", "Protective"], score: 0 },
];

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [walletConnected, setWalletConnected] = useState(false);

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        setWalletConnected(true);
        console.log("Wallet connected!");
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    } else {
      alert("Please install MetaMask to connect your wallet.");
    }
  };
  const hasMinted = async (walletAddress) => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        return await contract.hasMinted(walletAddress);
      } catch (error) {
        console.error("Error checking mint status:", error);
        return false;
      }
    }
    return false;
  };

  const mintNft = async (metadataUri) => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const walletAddress = await signer.getAddress();

        const alreadyMinted = await hasMinted(walletAddress);
        if (alreadyMinted) {
          alert("You have already minted an NFT.");
          return;
        }

        const contract = new ethers.Contract(contractAddress, abi, signer);
        const tx = await contract.mintNft(walletAddress, metadataUri);
        await tx.wait();

        console.log("NFT minted successfully:", metadataUri);
        alert("NFT minted successfully!");
      } catch (error) {
        console.error("Failed to mint NFT:", error);
        alert("An error occurred during the minting process.");
      }
    } else {
      alert("Please install MetaMask to mint the NFT.");
    }
  };

  const handleAnswer = (index) => {
    setUserAnswers([...userAnswers, index]);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult();
    }
  };

  const calculateResult = () => {
    const scoreMap = userAnswers.reduce((map, answer) => {
      map[answer] = (map[answer] || 0) + 1;
      return map;
    }, {});

    const highestScoreIndex = Object.keys(scoreMap).reduce((a, b) =>
      scoreMap[a] > scoreMap[b] ? a : b
    );

    setResult(spiritAnimals[highestScoreIndex]);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100 text-gray-100 p-4">
      <div className="w-full max-w-md p-6 bg-gray-800 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Discover Your Spirit Animal
        </h1>

        {result ? (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">{`Your Spirit Animal: ${result.name}`}</h2>
            <p className="text-gray-400 mb-6">{result.traits.join(", ")}</p>

            {!walletConnected ? (
              <button
                className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded"
                onClick={connectWallet}
              >
                Connect Wallet
              </button>
            ) : (
              <button
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded mt-4"
                onClick={() =>
                  mintNft(
                    `https://aqua-rare-worm-454.mypinata.cloud/ipfs/QmVTDFWMJJ6bJW3ajDzxJkh2FDoq9soS1aADoA1aQYkNH8/${result.name.toLowerCase()}.json`
                  )
                }
              >
                Mint NFT
              </button>
            )}

            <button
              className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded mt-4"
              onClick={() => window.location.reload()}
            >
              Retake Quiz
            </button>
          </div>
        ) : (
          <>
            <p className="text-lg font-medium mb-4">
              {questions[currentQuestion]?.text ||
                "Thank you for completing the quiz!"}
            </p>
            <div className="space-y-2">
              {questions[currentQuestion]?.options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                >
                  {option}
                </button>
              )) || null}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
