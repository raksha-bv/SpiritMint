import React, { useState } from "react";
import { ethers } from "../../ethers-6.7.esm.min.js";
import { contractAddress, abi } from "../../constants";

const questions = [
  {
    text: "How do you handle challenges?",
    options: [
      "Face them head-on", // Bear, Lion
      "Look for a creative solution", // Fox, Owl
      "Seek guidance from others", // Wolf, Deer
      "Take time to think and act cautiously", // Deer, Owl
    ],
  },
  {
    text: "Which environment are you most drawn to?",
    options: [
      "Deep forests", // Bear, Deer, Fox
      "Open skies", // Eagle, Owl
      "Mountains", // Lion, Tiger
      "Oceans", // Dolphin, Whale
    ],
  },
  {
    text: "How would friends describe you?",
    options: [
      "Protective and caring", // Bear, Wolf
      "Thoughtful and wise", // Owl, Deer
      "Bold and confident", // Lion, Tiger
      "Gentle and calm", // Deer, Dolphin
    ],
  },
  {
    text: "When working on a task, you prefer to...",
    options: [
      "Work alone", // Bear, Tiger
      "Collaborate with others", // Dolphin, Wolf
      "Adapt as needed", // Fox, Owl
      "Stick to a structured plan", // Eagle, Lion
    ],
  },
  {
    text: "What role do you take in a group setting?",
    options: [
      "Leader", // Lion, Eagle
      "Planner", // Owl, Fox
      "Helper", // Deer, Dolphin
      "Observer", // Wolf, Owl
    ],
  },
  {
    text: "How do you recharge?",
    options: [
      "Spending time in nature", // Bear, Deer
      "Meditating or journaling", // Owl, Deer
      "Being with friends", // Dolphin, Wolf
      "Exploring new things", // Fox, Tiger
    ],
  },
  {
    text: "Which of these values resonates with you the most?",
    options: [
      "Loyalty", // Wolf, Lion
      "Freedom", // Eagle, Tiger
      "Compassion", // Dolphin, Deer
      "Resilience", // Bear, Lion
    ],
  },
  {
    text: "How do you approach new experiences?",
    options: [
      "With caution", // Deer, Owl
      "With excitement", // Dolphin, Fox
      "With curiosity", // Fox, Eagle
      "With confidence", // Lion, Tiger
    ],
  },
  {
    text: "What motivates you the most?",
    options: [
      "Achieving personal goals", // Tiger, Lion
      "Creative growth and transformation", // Butterfly, Fox
      "Helping others and making a difference", // Dolphin, Wolf
      "Joy and connection with others", // Dolphin, Wolf
    ],
  },
  {
    text: "How do you prefer to solve problems?",
    options: [
      "Approach it head-on with strength", // Bear, Lion
      "Think outside the box", // Fox, Owl
      "Collaborate with others", // Dolphin, Wolf
      "Plan a careful, calculated strategy", // Eagle, Tiger
    ],
  },
  {
    text: "What do you value most in a friendship?",
    options: [
      "Loyalty and trust", // Wolf, Lion
      "Creativity and growth", // Fox, Butterfly
      "Compassion and support", // Dolphin, Deer
      "Fun and adventures", // Dolphin, Tiger
    ],
  },
  {
    text: "How do you respond to change?",
    options: [
      "Adapt and find the best way to handle it", // Fox, Deer
      "Embrace it as an opportunity for transformation", // Butterfly, Owl
      "Take it slow and think it through", // Deer, Lion
      "Go with the flow and make the best of it", // Dolphin, Tiger
    ],
  },
  {
    text: "What is your idea of a perfect day?",
    options: [
      "A peaceful day in nature", // Bear, Deer
      "A day filled with creative pursuits", // Fox, Owl
      "A relaxing day with close family and friends", // Dolphin, Wolf
      "A fun day at the beach with friends", // Dolphin, Tiger
    ],
  },
  {
    text: "What is most important to you in life?",
    options: [
      "Strength, stability, and solitude", // Bear, Tiger
      "Growth, creativity, and transformation", // Butterfly, Fox
      "Peace, harmony, and compassion", // Dolphin, Deer
      "Fun, social connections, and joy", // Dolphin, Lion
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
    const scores = spiritAnimals.reduce((acc, animal) => {
      acc[animal.name] = 0;
      return acc;
    }, {});

    userAnswers.forEach((answerIndex, questionIndex) => {
      const question = questions[questionIndex];
      const selectedOption = question.options[answerIndex];

      spiritAnimals.forEach((animal) => {
        if (animal.traits.includes(selectedOption)) {
          scores[animal.name] += 1;
        }
      });
    });

    const maxScore = Math.max(...Object.values(scores));
    const highestScoringAnimals = Object.keys(scores).filter(
      (animal) => scores[animal] === maxScore
    );

    const randomAnimal =
      highestScoringAnimals[
        Math.floor(Math.random() * highestScoringAnimals.length)
      ];

    setResult(spiritAnimals.find((animal) => animal.name === randomAnimal));
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-white text-gray-800 p-4">
      <div className="w-full max-w-lg bg-white rounded-lg p-6 shadow-xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Discover Your Spirit Animal
        </h1>

        {result ? (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {`Your Spirit Animal: ${result.name}`}
            </h2>
            <img
              src={`https://aqua-rare-worm-454.mypinata.cloud/ipfs/QmWueHr66NxYr31RbRPvFyLMwwk3sJz8GCkJ3hkah4L1od/${result.name.toLowerCase()}.png`}
              alt={result.name}
              className="w-32 h-32 mx-auto rounded-full mb-4 shadow-lg"
            />
            <p className="text-gray-500 mb-6">{result.traits.join(", ")}</p>

            {!walletConnected ? (
              <button
                className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 mx-5 rounded-full text-lg shadow-lg mb-4"
                onClick={connectWallet}
              >
                Connect Metamask
              </button>
            ) : (
              <button
                className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 mx-5 rounded-full text-lg shadow-lg mb-4"
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
              className="bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 mx-5 rounded-full text-lg shadow-lg mt-4"
              onClick={() => window.location.reload()}
            >
              Retake Quiz
            </button>
          </div>
        ) : (
          <>
            <p className="text-lg text-center text-gray-800 mb-4">
              {questions[currentQuestion].text}
            </p>
            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className="w-full bg-indigo-400 text-white py-3 px-6 rounded-lg hover:bg-indigo-500"
                  onClick={() => handleAnswer(index)}
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
