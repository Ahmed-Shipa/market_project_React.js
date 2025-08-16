import React, { useState, useEffect } from "react";
import Results from "../ResultsPage/ResultsPage";

const IntroductionForm = () => {
  // Define all input keys
  const allInputKeys = [
    "input1",
    "input2",
    "input3",
    "input4",
    "input5",
    "input6",
    "input7",
    "input8",
    "input9",
    "input10",
    "input11", // New input key for جبنة
  ];

  // Managing state for each individual input
  const [inputValues, setInputValues] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: "",
    input6: "",
    input7: "",
    input8: "",
    input9: "",
    input10: "",
    input11: "", // New input for جبنة
  });

  // State to manage error messages for each input
  const [inputErrors, setInputErrors] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: "",
    input6: "",
    input7: "",
    input8: "",
    input9: "",
    input10: "",
    input11: "", // New input error for جبنة
  });

  // State variables for combinations and pagination
  const [results, setResults] = useState([]);
  const [doubledResults, setDoubledResults] = useState([]);
  const [tripledResults, setTripledResults] = useState([]);
  const [quadrupledResults, setQuadrupledResults] = useState([]);
  const [customResults, setCustomResults] = useState([]);
  const [sixthResults, setSixthResults] = useState([]);
  const [seventhResults, setSeventhResults] = useState([]);
  const [eighthResults, setEighthResults] = useState([]);

  const [isSubmitted, setIsSubmitted] = useState(false);

  // New loading state
  const [isLoading, setIsLoading] = useState(false);

  // Pagination states
  const combinationsPerPage = 20;

  const [currentPage, setCurrentPage] = useState(0);
  const [visibleResults, setVisibleResults] = useState([]);
  const [showMore, setShowMore] = useState(false);

  const [currentPageForDoubled, setCurrentPageForDoubled] = useState(0);
  const [visibleDoubledResults, setVisibleDoubledResults] = useState([]);
  const [showMoreForDoubled, setShowMoreForDoubled] = useState(false);

  const [currentPageForTripled, setCurrentPageForTripled] = useState(0);
  const [visibleTripledResults, setVisibleTripledResults] = useState([]);
  const [showMoreForTripled, setShowMoreForTripled] = useState(false);

  const [currentPageForQuadrupled, setCurrentPageForQuadrupled] = useState(0);
  const [visibleQuadrupledResults, setVisibleQuadrupledResults] = useState([]);
  const [showMoreForQuadrupled, setShowMoreForQuadrupled] = useState(false);

  const [currentPageForCustom, setCurrentPageForCustom] = useState(0);
  const [visibleCustomResults, setVisibleCustomResults] = useState([]);
  const [showMoreForCustom, setShowMoreForCustom] = useState(false);

  const [currentPageForSixth, setCurrentPageForSixth] = useState(0);
  const [visibleSixthResults, setVisibleSixthResults] = useState([]);
  const [showMoreForSixth, setShowMoreForSixth] = useState(false);

  const [currentPageForSeventh, setCurrentPageForSeventh] = useState(0);
  const [visibleSeventhResults, setVisibleSeventhResults] = useState([]);
  const [showMoreForSeventh, setShowMoreForSeventh] = useState(false);

  const [currentPageForEighth, setCurrentPageForEighth] = useState(0);
  const [visibleEighthResults, setVisibleEighthResults] = useState([]);
  const [showMoreForEighth, setShowMoreForEighth] = useState(false);

  // Predefined multipliers for each input
  const inputMultipliers = {
    input1: 29.75,
    input2: 12.35,
    input3: 8.35,
    input4: 4.90,
    input5: 4.35,
    input6: 3.85,
    input7: 1.15,
    input8: 1.45,
    input9: 7.25,
    input10: 17.75,
    input11: 13.75, // New multiplier for جبنة
  };

  // Handle input changes and validation
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (value === "1" || value === "") {
      setInputErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));

      setInputValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    } else {
      setInputErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "مسموح فقط باضافه رقم 1",
      }));
    }
  };

  // Utility function to ensure all input keys are present in a combination
  const ensureAllInputs = (combination) => {
    const completeCombination = { ...combination };
    allInputKeys.forEach((key) => {
      if (!(key in completeCombination)) {
        completeCombination[key] = 0;
      }
    });
    return completeCombination;
  };

  // Function to calculate combinations for the original inputs (Table 1)
  const calculateCombinations = (inputValues) => {
    const targetMin = 48;
    const targetMax = 49;
    const precision = 0.001;
    const selectedInputs = [];

    Object.keys(inputValues).forEach((key) => {
      if (inputValues[key] !== "") {
        const multiplier = inputMultipliers[key];
        selectedInputs.push({ key, multiplier });
      }
    });

    const combinations = [];

    const generateCombinations = (
      currentIndex,
      currentCombination,
      currentSum
    ) => {
      if (
        currentSum >= targetMin - precision &&
        currentSum <= targetMax + precision
      ) {
        combinations.push(
          ensureAllInputs({ ...currentCombination, sum: currentSum })
        );
      }

      if (
        currentSum > targetMax + precision ||
        currentIndex >= selectedInputs.length
      )
        return;

      const { key, multiplier } = selectedInputs[currentIndex];

      if (key === "input1" || key === "input2") {
        const newCombination = { ...currentCombination, [key]: 1 };
        generateCombinations(
          currentIndex + 1,
          newCombination,
          currentSum + multiplier
        );
      } else {
        for (let i = 0; i <= 20; i++) {
          const newCombination = { ...currentCombination, [key]: i };
          generateCombinations(
            currentIndex + 1,
            newCombination,
            currentSum + i * multiplier
          );
        }
      }
    };

    generateCombinations(0, {}, 0);

    const validCombinations = combinations.filter(
      (combination) =>
        combination.sum !== null &&
        combination.sum !== undefined &&
        !isNaN(combination.sum)
    );

    setResults(validCombinations);
    setCurrentPage(0);
    setVisibleResults(validCombinations.slice(0, combinationsPerPage));
    setShowMore(validCombinations.length > combinationsPerPage);
  };

  // Function to calculate combinations with input1 and input2 doubled (Table 2)
  const calculateCombinationsWithDoubledInputs = (inputValues) => {
    const targetMin = 98;
    const targetMax = 99;
    const precision = 0.001;
    const selectedInputs = [];

    Object.keys(inputValues).forEach((key) => {
      if (inputValues[key] !== "") {
        const multiplier = inputMultipliers[key];
        selectedInputs.push({ key, multiplier });
      }
    });

    const combinations = [];

    const generateCombinations = (
      currentIndex,
      currentCombination,
      currentSum
    ) => {
      if (
        currentSum >= targetMin - precision &&
        currentSum <= targetMax + precision
      ) {
        combinations.push(
          ensureAllInputs({ ...currentCombination, sum: currentSum })
        );
      }

      if (
        currentSum > targetMax + precision ||
        currentIndex >= selectedInputs.length
      )
        return;

      const { key, multiplier } = selectedInputs[currentIndex];

      if (key === "input1" || key === "input2") {
        const newCombination = { ...currentCombination, [key]: 2 };
        generateCombinations(
          currentIndex + 1,
          newCombination,
          currentSum + 2 * multiplier
        );
      } else {
        for (let i = 0; i <= 20; i++) {
          const newCombination = { ...currentCombination, [key]: i };
          generateCombinations(
            currentIndex + 1,
            newCombination,
            currentSum + i * multiplier
          );
        }
      }
    };

    generateCombinations(0, {}, 0);

    const validCombinations = combinations.filter(
      (combination) =>
        combination.sum !== null &&
        combination.sum !== undefined &&
        !isNaN(combination.sum)
    );

    setDoubledResults(validCombinations);
    setCurrentPageForDoubled(0);
    setVisibleDoubledResults(validCombinations.slice(0, combinationsPerPage));
    setShowMoreForDoubled(validCombinations.length > combinationsPerPage);
  };

  // Function to calculate combinations with input1 and input2 tripled (Table 3)
  const calculateCombinationsWithTripledInputs = (inputValues) => {
    const targetMin = 148;
    const targetMax = 149;
    const precision = 0.001;
    const selectedInputs = [];

    Object.keys(inputValues).forEach((key) => {
      if (inputValues[key] !== "") {
        const multiplier = inputMultipliers[key];
        selectedInputs.push({ key, multiplier });
      }
    });

    const combinations = [];

    const generateCombinations = (
      currentIndex,
      currentCombination,
      currentSum
    ) => {
      if (
        currentSum >= targetMin - precision &&
        currentSum <= targetMax + precision
      ) {
        combinations.push(
          ensureAllInputs({ ...currentCombination, sum: currentSum })
        );
      }

      if (
        currentSum > targetMax + precision ||
        currentIndex >= selectedInputs.length
      )
        return;

      const { key, multiplier } = selectedInputs[currentIndex];

      if (key === "input1" || key === "input2") {
        const newCombination = { ...currentCombination, [key]: 3 };
        generateCombinations(
          currentIndex + 1,
          newCombination,
          currentSum + 3 * multiplier
        );
      } else {
        for (let i = 0; i <= 20; i++) {
          const newCombination = { ...currentCombination, [key]: i };
          generateCombinations(
            currentIndex + 1,
            newCombination,
            currentSum + i * multiplier
          );
        }
      }
    };

    generateCombinations(0, {}, 0);

    const validCombinations = combinations.filter(
      (combination) =>
        combination.sum !== null &&
        combination.sum !== undefined &&
        !isNaN(combination.sum)
    );

    setTripledResults(validCombinations);
    setCurrentPageForTripled(0);
    setVisibleTripledResults(validCombinations.slice(0, combinationsPerPage));
    setShowMoreForTripled(validCombinations.length > combinationsPerPage);
  };

  // Function to calculate combinations with input1 and input2 quadrupled (Table 4)
  const calculateCombinationsWithQuadrupledInputs = (inputValues) => {
    const targetMin = 198;
    const targetMax = 199;
    const precision = 0.001;
    const selectedInputs = [];

    Object.keys(inputValues).forEach((key) => {
      if (inputValues[key] !== "") {
        const multiplier = inputMultipliers[key];
        selectedInputs.push({ key, multiplier });
      }
    });

    const combinations = [];

    const generateCombinations = (
      currentIndex,
      currentCombination,
      currentSum
    ) => {
      if (
        currentSum >= targetMin - precision &&
        currentSum <= targetMax + precision
      ) {
        combinations.push(
          ensureAllInputs({ ...currentCombination, sum: currentSum })
        );
      }

      if (
        currentSum > targetMax + precision ||
        currentIndex >= selectedInputs.length
      )
        return;

      const { key, multiplier } = selectedInputs[currentIndex];

      if (key === "input1" || key === "input2") {
        const newCombination = { ...currentCombination, [key]: 4 };
        generateCombinations(
          currentIndex + 1,
          newCombination,
          currentSum + 4 * multiplier
        );
      } else {
        for (let i = 0; i <= 20; i++) {
          const newCombination = { ...currentCombination, [key]: i };
          generateCombinations(
            currentIndex + 1,
            newCombination,
            currentSum + i * multiplier
          );
        }
      }
    };

    generateCombinations(0, {}, 0);

    const validCombinations = combinations.filter(
      (combination) =>
        combination.sum !== null &&
        combination.sum !== undefined &&
        !isNaN(combination.sum)
    );

    setQuadrupledResults(validCombinations);
    setCurrentPageForQuadrupled(0);
    setVisibleQuadrupledResults(
      validCombinations.slice(0, combinationsPerPage)
    );
    setShowMoreForQuadrupled(validCombinations.length > combinationsPerPage);
  };

  // Function to calculate combinations with custom multipliers (Table 5)
  const calculateCombinationsWithCustomInputs = (inputValues) => {
    const targetMin = 223;
    const targetMax = 224;
    const precision = 0.001;
    const selectedInputs = [];

    Object.keys(inputValues).forEach((key) => {
      let multiplier = inputMultipliers[key];

      if (inputValues[key] !== "") {
        if (key === "input1") {
          multiplier *= 4;
        } else if (key === "input2") {
          multiplier *= 5;
        }
        selectedInputs.push({ key, multiplier });
      }
    });

    const combinations = [];

    const generateCombinations = (
      currentIndex,
      currentCombination,
      currentSum
    ) => {
      if (
        currentSum >= targetMin - precision &&
        currentSum <= targetMax + precision
      ) {
        combinations.push(
          ensureAllInputs({ ...currentCombination, sum: currentSum })
        );
      }

      if (
        currentSum > targetMax + precision ||
        currentIndex >= selectedInputs.length
      )
        return;

      const { key, multiplier } = selectedInputs[currentIndex];

      if (key === "input1") {
        const newCombination = { ...currentCombination, [key]: 4 };
        generateCombinations(
          currentIndex + 1,
          newCombination,
          currentSum + 4 * inputMultipliers[key]
        );
      } else if (key === "input2") {
        const newCombination = { ...currentCombination, [key]: 5 };
        generateCombinations(
          currentIndex + 1,
          newCombination,
          currentSum + 5 * inputMultipliers[key]
        );
      } else {
        for (let i = 0; i <= 20; i++) {
          const newCombination = { ...currentCombination, [key]: i };
          generateCombinations(
            currentIndex + 1,
            newCombination,
            currentSum + i * multiplier
          );
        }
      }
    };

    generateCombinations(0, {}, 0);

    const validCombinations = combinations.filter(
      (combination) =>
        combination.sum !== null &&
        combination.sum !== undefined &&
        !isNaN(combination.sum)
    );

    setCustomResults(validCombinations);
    setCurrentPageForCustom(0);
    setVisibleCustomResults(validCombinations.slice(0, combinationsPerPage));
    setShowMoreForCustom(validCombinations.length > combinationsPerPage);
  };

  // Function to calculate combinations for the sixth table (Table 6)
  const calculateCombinationsWithSixthInputs = (inputValues) => {
    const targetMin = 248;
    const targetMax = 249;
    const precision = 0.001;
    const selectedInputs = [];

    Object.keys(inputValues).forEach((key) => {
      let multiplier = inputMultipliers[key];

      if (inputValues[key] !== "") {
        if (key === "input1") {
          multiplier *= 4;
        } else if (key === "input2") {
          multiplier *= 6;
        }
        selectedInputs.push({ key, multiplier });
      }
    });

    const combinations = [];

    const generateCombinations = (
      currentIndex,
      currentCombination,
      currentSum
    ) => {
      if (
        currentSum >= targetMin - precision &&
        currentSum <= targetMax + precision
      ) {
        combinations.push(
          ensureAllInputs({ ...currentCombination, sum: currentSum })
        );
      }

      if (
        currentSum > targetMax + precision ||
        currentIndex >= selectedInputs.length
      )
        return;

      const { key, multiplier } = selectedInputs[currentIndex];

      if (key === "input1") {
        const newCombination = { ...currentCombination, [key]: 4 };
        generateCombinations(
          currentIndex + 1,
          newCombination,
          currentSum + 4 * inputMultipliers[key]
        );
      } else if (key === "input2") {
        const newCombination = { ...currentCombination, [key]: 6 };
        generateCombinations(
          currentIndex + 1,
          newCombination,
          currentSum + 6 * inputMultipliers[key]
        );
      } else {
        for (let i = 0; i <= 20; i++) {
          const newCombination = { ...currentCombination, [key]: i };
          generateCombinations(
            currentIndex + 1,
            newCombination,
            currentSum + i * multiplier
          );
        }
      }
    };

    generateCombinations(0, {}, 0);

    const validCombinations = combinations.filter(
      (combination) =>
        combination.sum !== null &&
        combination.sum !== undefined &&
        !isNaN(combination.sum)
    );

    setSixthResults(validCombinations);
    setCurrentPageForSixth(0);
    setVisibleSixthResults(validCombinations.slice(0, combinationsPerPage));
    setShowMoreForSixth(validCombinations.length > combinationsPerPage);
  };

  // Function to calculate combinations for the seventh table (Table 7)
  const calculateCombinationsWithSeventhInputs = (inputValues) => {
    const targetMin = 273;
    const targetMax = 274;
    const precision = 0.001;
    const selectedInputs = [];

    Object.keys(inputValues).forEach((key) => {
      let multiplier = inputMultipliers[key];

      if (inputValues[key] !== "") {
        if (key === "input1") {
          multiplier *= 4;
        } else if (key === "input2") {
          multiplier *= 6;
        }
        selectedInputs.push({ key, multiplier });
      }
    });

    const combinations = [];

    const generateCombinations = (
      currentIndex,
      currentCombination,
      currentSum
    ) => {
      if (
        currentSum >= targetMin - precision &&
        currentSum <= targetMax + precision
      ) {
        combinations.push(
          ensureAllInputs({ ...currentCombination, sum: currentSum })
        );
      }

      if (
        currentSum > targetMax + precision ||
        currentIndex >= selectedInputs.length
      )
        return;

      const { key, multiplier } = selectedInputs[currentIndex];

      if (key === "input1") {
        const newCombination = { ...currentCombination, [key]: 4 };
        generateCombinations(
          currentIndex + 1,
          newCombination,
          currentSum + 4 * inputMultipliers[key]
        );
      } else if (key === "input2") {
        const newCombination = { ...currentCombination, [key]: 6 };
        generateCombinations(
          currentIndex + 1,
          newCombination,
          currentSum + 6 * inputMultipliers[key]
        );
      } else {
        for (let i = 0; i <= 20; i++) {
          const newCombination = { ...currentCombination, [key]: i };
          generateCombinations(
            currentIndex + 1,
            newCombination,
            currentSum + i * multiplier
          );
        }
      }
    };

    generateCombinations(0, {}, 0);

    const validCombinations = combinations.filter(
      (combination) =>
        combination.sum !== null &&
        combination.sum !== undefined &&
        !isNaN(combination.sum)
    );

    setSeventhResults(validCombinations);
    setCurrentPageForSeventh(0);
    setVisibleSeventhResults(validCombinations.slice(0, combinationsPerPage));
    setShowMoreForSeventh(validCombinations.length > combinationsPerPage);
  };

  // Function to calculate combinations for the eighth table (Table 8)
  const calculateCombinationsWithEighthInputs = (inputValues) => {
    const targetMin = 298;
    const targetMax = 299;
    const precision = 0.001;
    const selectedInputs = [];

    Object.keys(inputValues).forEach((key) => {
      let multiplier = inputMultipliers[key];

      if (inputValues[key] !== "") {
        if (key === "input1") {
          multiplier *= 4;
        } else if (key === "input2") {
          multiplier *= 6;
        }
        selectedInputs.push({ key, multiplier });
      }
    });

    const combinations = [];

    const generateCombinations = (
      currentIndex,
      currentCombination,
      currentSum
    ) => {
      if (
        currentSum >= targetMin - precision &&
        currentSum <= targetMax + precision
      ) {
        combinations.push(
          ensureAllInputs({ ...currentCombination, sum: currentSum })
        );
      }

      if (
        currentSum > targetMax + precision ||
        currentIndex >= selectedInputs.length
      )
        return;

      const { key, multiplier } = selectedInputs[currentIndex];

      if (key === "input1") {
        const newCombination = { ...currentCombination, [key]: 4 };
        generateCombinations(
          currentIndex + 1,
          newCombination,
          currentSum + 4 * inputMultipliers[key]
        );
      } else if (key === "input2") {
        const newCombination = { ...currentCombination, [key]: 6 };
        generateCombinations(
          currentIndex + 1,
          newCombination,
          currentSum + 6 * inputMultipliers[key]
        );
      } else {
        for (let i = 0; i <= 20; i++) {
          const newCombination = { ...currentCombination, [key]: i };
          generateCombinations(
            currentIndex + 1,
            newCombination,
            currentSum + i * multiplier
          );
        }
      }
    };

    generateCombinations(0, {}, 0);

    const validCombinations = combinations.filter(
      (combination) =>
        combination.sum !== null &&
        combination.sum !== undefined &&
        !isNaN(combination.sum)
    );

    setEighthResults(validCombinations);
    setCurrentPageForEighth(0);
    setVisibleEighthResults(validCombinations.slice(0, combinationsPerPage));
    setShowMoreForEighth(validCombinations.length > combinationsPerPage);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    let errors = {};

    if (inputValues.input1 !== "1") {
      errors.input1 = "يجب اضافة الزيت";
    }
    if (inputValues.input2 !== "1") {
      errors.input2 = "يحب اضافة السكر";
    }

    if (Object.keys(errors).length > 0) {
      setInputErrors(errors);
      return;
    }

    // Set loading to true
    setIsLoading(true);

    // Use setTimeout to simulate asynchronous operation
    setTimeout(() => {
      // Calculate all combinations
      calculateCombinations(inputValues);
      calculateCombinationsWithDoubledInputs(inputValues);
      calculateCombinationsWithTripledInputs(inputValues);
      calculateCombinationsWithQuadrupledInputs(inputValues);
      calculateCombinationsWithCustomInputs(inputValues);
      calculateCombinationsWithSixthInputs(inputValues);
      calculateCombinationsWithSeventhInputs(inputValues);
      calculateCombinationsWithEighthInputs(inputValues);

      // Set loading to false after calculations are done
      setIsLoading(false);

      window.history.pushState({ page: "results" }, "", "");
      setIsSubmitted(true);
    }, 100); // Adjust the delay as needed
  };

  // Handle browser navigation
  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state && event.state.page === "results") {
        setIsSubmitted(true);
      } else {
        setIsSubmitted(false);
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // "Show More" functions
  const handleShowMore = () => {
    const nextPage = currentPage + 1;
    const nextResults = results.slice(0, (nextPage + 1) * combinationsPerPage);
    setVisibleResults(nextResults);
    setCurrentPage(nextPage);

    if (nextResults.length >= results.length) {
      setShowMore(false);
    }
  };

  const handleShowMoreForDoubled = () => {
    const nextPage = currentPageForDoubled + 1;
    const nextResults = doubledResults.slice(
      0,
      (nextPage + 1) * combinationsPerPage
    );
    setVisibleDoubledResults(nextResults);
    setCurrentPageForDoubled(nextPage);

    if (nextResults.length >= doubledResults.length) {
      setShowMoreForDoubled(false);
    }
  };

  const handleShowMoreForTripled = () => {
    const nextPage = currentPageForTripled + 1;
    const nextResults = tripledResults.slice(
      0,
      (nextPage + 1) * combinationsPerPage
    );
    setVisibleTripledResults(nextResults);
    setCurrentPageForTripled(nextPage);

    if (nextResults.length >= tripledResults.length) {
      setShowMoreForTripled(false);
    }
  };

  const handleShowMoreForQuadrupled = () => {
    const nextPage = currentPageForQuadrupled + 1;
    const nextResults = quadrupledResults.slice(
      0,
      (nextPage + 1) * combinationsPerPage
    );
    setVisibleQuadrupledResults(nextResults);
    setCurrentPageForQuadrupled(nextPage);

    if (nextResults.length >= quadrupledResults.length) {
      setShowMoreForQuadrupled(false);
    }
  };

  const handleShowMoreForCustom = () => {
    const nextPage = currentPageForCustom + 1;
    const nextResults = customResults.slice(
      0,
      (nextPage + 1) * combinationsPerPage
    );
    setVisibleCustomResults(nextResults);
    setCurrentPageForCustom(nextPage);

    if (nextResults.length >= customResults.length) {
      setShowMoreForCustom(false);
    }
  };

  const handleShowMoreForSixth = () => {
    const nextPage = currentPageForSixth + 1;
    const nextResults = sixthResults.slice(
      0,
      (nextPage + 1) * combinationsPerPage
    );
    setVisibleSixthResults(nextResults);
    setCurrentPageForSixth(nextPage);

    if (nextResults.length >= sixthResults.length) {
      setShowMoreForSixth(false);
    }
  };

  const handleShowMoreForSeventh = () => {
    const nextPage = currentPageForSeventh + 1;
    const nextResults = seventhResults.slice(
      0,
      (nextPage + 1) * combinationsPerPage
    );
    setVisibleSeventhResults(nextResults);
    setCurrentPageForSeventh(nextPage);

    if (nextResults.length >= seventhResults.length) {
      setShowMoreForSeventh(false);
    }
  };

  const handleShowMoreForEighth = () => {
    const nextPage = currentPageForEighth + 1;
    const nextResults = eighthResults.slice(
      0,
      (nextPage + 1) * combinationsPerPage
    );
    setVisibleEighthResults(nextResults);
    setCurrentPageForEighth(nextPage);

    if (nextResults.length >= eighthResults.length) {
      setShowMoreForEighth(false);
    }
  };

  // Conditional rendering
  if (isSubmitted) {
    return (
      <Results
        results={visibleResults}
        showMore={showMore}
        onShowMore={handleShowMore}
        doubledResults={visibleDoubledResults}
        showMoreForDoubled={showMoreForDoubled}
        onShowMoreForDoubled={handleShowMoreForDoubled}
        tripledResults={visibleTripledResults}
        showMoreForTripled={showMoreForTripled}
        onShowMoreForTripled={handleShowMoreForTripled}
        quadrupledResults={visibleQuadrupledResults}
        showMoreForQuadrupled={showMoreForQuadrupled}
        onShowMoreForQuadrupled={handleShowMoreForQuadrupled}
        customResults={visibleCustomResults}
        showMoreForCustom={showMoreForCustom}
        onShowMoreForCustom={handleShowMoreForCustom}
        sixthResults={visibleSixthResults}
        showMoreForSixth={showMoreForSixth}
        onShowMoreForSixth={handleShowMoreForSixth}
        seventhResults={visibleSeventhResults}
        showMoreForSeventh={showMoreForSeventh}
        onShowMoreForSeventh={handleShowMoreForSeventh}
        eighthResults={visibleEighthResults}
        showMoreForEighth={showMoreForEighth}
        onShowMoreForEighth={handleShowMoreForEighth}
        onGoBack={() => window.history.back()}
      />
    );
  }

  // Form rendering
  return (
    <div className="container">
      <h1 className="header">تفريدة الأكواد</h1>
      <form className="form" onSubmit={handleSubmit}>
        {/* Input 1 */}
        <div className="input-container">
          <label htmlFor="input1" className="label fw-bold fs-4">
            الزيت
          </label>
          <input
            type="text"
            id="input1"
            name="input1"
            value={inputValues.input1}
            onChange={handleInputChange}
            className="input"
            placeholder="Enter the number 1"
          />
          {inputErrors.input1 && (
            <p className="error-message">{inputErrors.input1}</p>
          )}
        </div>

        {/* Input 2 */}
        <div className="input-container">
          <label htmlFor="input2" className="label fw-bold fs-4">
            السكر
          </label>
          <input
            type="text"
            id="input2"
            name="input2"
            value={inputValues.input2}
            onChange={handleInputChange}
            className="input"
            placeholder="Enter the number 1"
          />
          {inputErrors.input2 && (
            <p className="error-message">{inputErrors.input2}</p>
          )}
        </div>

        {/* Input 3 */}
        <div className="input-container">
          <label htmlFor="input3" className="label fw-bold fs-4">
            مكرونه
          </label>
          <input
            type="text"
            id="input3"
            name="input3"
            value={inputValues.input3}
            onChange={handleInputChange}
            className="input"
            placeholder="Enter the number 1"
          />
          {inputErrors.input3 && (
            <p className="error-message">{inputErrors.input3}</p>
          )}
        </div>

        {/* Input 4 */}
        <div className="input-container">
          <label htmlFor="input4" className="label fw-bold fs-4">
            الشاى
          </label>
          <input
            type="text"
            id="input4"
            name="input4"
            value={inputValues.input4}
            onChange={handleInputChange}
            className="input"
            placeholder="Enter the number 1"
          />
          {inputErrors.input4 && (
            <p className="error-message">{inputErrors.input4}</p>
          )}
        </div>

        {/* Input 5 */}
        <div className="input-container">
          <label htmlFor="input5" className="label fw-bold fs-4">
            برسيل
          </label>
          <input
            type="text"
            id="input5"
            name="input5"
            value={inputValues.input5}
            onChange={handleInputChange}
            className="input"
            placeholder="Enter the number 1"
          />
          {inputErrors.input5 && (
            <p className="error-message">{inputErrors.input5}</p>
          )}
        </div>

        {/* Input 6 */}
        <div className="input-container">
          <label htmlFor="input6" className="label fw-bold fs-4">
            حلاوه
          </label>
          <input
            type="text"
            id="input6"
            name="input6"
            value={inputValues.input6}
            onChange={handleInputChange}
            className="input"
            placeholder="Enter the number 1"
          />
          {inputErrors.input6 && (
            <p className="error-message">{inputErrors.input6}</p>
          )}
        </div>

        {/* Input 7 */}
        <div className="input-container">
          <label htmlFor="input7" className="label fw-bold fs-4">
            ملح
          </label>
          <input
            type="text"
            id="input7"
            name="input7"
            value={inputValues.input7}
            onChange={handleInputChange}
            className="input"
            placeholder="Enter the number 1"
          />
          {inputErrors.input7 && (
            <p className="error-message">{inputErrors.input7}</p>
          )}
        </div>

        {/* Input 8 */}
        <div className="input-container">
          <label htmlFor="input8" className="label fw-bold fs-4">
            بسكويت
          </label>
          <input
            type="text"
            id="input8"
            name="input8"
            value={inputValues.input8}
            onChange={handleInputChange}
            className="input"
            placeholder="Enter the number 1"
          />
          {inputErrors.input8 && (
            <p className="error-message">{inputErrors.input8}</p>
          )}
        </div>

        {/* Input 9 */}
        <div className="input-container">
          <label htmlFor="input9" className="label fw-bold fs-4">
            صابون
          </label>
          <input
            type="text"
            id="input9"
            name="input9"
            value={inputValues.input9}
            onChange={handleInputChange}
            className="input"
            placeholder="Enter the number 1"
          />
          {inputErrors.input9 && (
            <p className="error-message">{inputErrors.input9}</p>
          )}
        </div>

        {/* Input 10 */}
        <div className="input-container">
          <label htmlFor="input10" className="label fw-bold fs-4">
            دقيق
          </label>
          <input
            type="text"
            id="input10"
            name="input10"
            value={inputValues.input10}
            onChange={handleInputChange}
            className="input"
            placeholder="Enter the number 1"
          />
          {inputErrors.input10 && (
            <p className="error-message">{inputErrors.input10}</p>
          )}
        </div>

        {/* Input 11 */}
        <div className="input-container">
          <label htmlFor="input11" className="label fw-bold fs-4">
            جبنة
          </label>
          <input
            type="text"
            id="input11"
            name="input11"
            value={inputValues.input11}
            onChange={handleInputChange}
            className="input"
            placeholder="Enter the number 1"
          />
          {inputErrors.input11 && (
            <p className="error-message">{inputErrors.input11}</p>
          )}
        </div>

        {/* Submit button with loading spinner */}
        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? <div className="spinner"></div> : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default IntroductionForm;