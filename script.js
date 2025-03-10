{
    "filename": "script.js",
    "content": "// Game State\nlet score = 0;\nlet lives = 5;\nlet currentLevel = 1;\nlet character = '';\nlet questionAnswered = false;\nlet askedQuestions = []; // Track questions asked in the game\n\n// Word Database\nconst wordDatabase = [\n    { word: \"Algorithm\", definition: \"A list of steps to finish a task.\", level: 1, incorrectAnswers: [\"A type of computer\", \"A dance move\", \"A kind of bird\"] },\n    { word: \"Bug\", definition: \"Part of a program that does not work correctly.\", level: 1, incorrectAnswers: [\"A small insect\", \"A feature, not a problem\", \"A type of food\"] },\n    { word: \"Debugging\", definition: \"Finding and fixing problems in an algorithm or program.\", level: 1, incorrectAnswers: [\"Creating new bugs\", \"Ignoring problems\", \"Deleting the program\"] },\n    { word: \"Sequencing\", definition: \"Putting commands in correct order so computers can read the commands.\", level: 1, incorrectAnswers: [\"Mixing up commands\", \"Deleting commands\", \"Ignoring commands\"] },\n    { word: \"Loop\", definition: \"The action of doing something over and over again.\", level: 1, incorrectAnswers: [\"Stopping an action\", \"A straight line\", \"Doing something once\"] },\n    { word: \"Repeat\", definition: \"To do something again.\", level: 1, incorrectAnswers: [\"To do something once\", \"To stop doing something\", \"To avoid doing something\"] },\n    { word: \"Event\", definition: \"An action that causes something to happen.\", level: 1, incorrectAnswers: [\"Nothing happens\", \"A static image\", \"A planned party\"] },\n    { word: \"Code\", definition: \"To write code, or to write instructions for a computer.\", level: 1, incorrectAnswers: [\"To draw pictures\", \"To sing a song\", \"To bake a cake\"] },\n\n    { word: \"Program\", definition: \"An algorithm that has been coded into something that can be run by a machine.\", level: 2, incorrectAnswers: [\"A list of instructions for humans\", \"A physical machine\", \"A type of dance\"] },\n    { word: \"Behavior\", definition: \"An action that a sprite performs continuously until it's told to stop.\", level: 2, incorrectAnswers: [\"A static image\", \"A one-time action\", \"A type of food\"] },\n    { word: \"Sprite\", definition: \"A graphic on the screen with a location, size, and appearance.\", level: 2, incorrectAnswers: [\"A type of drink\", \"A real person\", \"A hidden object\"] },\n    { word: \"Angle\", definition: \"Where two sides of a shape come together, measured in degrees.\", level: 2, incorrectAnswers: [\"A straight line\", \"A curved line\", \"The area of a shape\"] },\n    { word: \"Function\", definition: \"A piece of code that you can easily call over and over again.\", level: 2, incorrectAnswers: [\"A broken piece of code\", \"A comment in the code\", \"A secret code\"] },\n    { word: \"Variable\", definition: \"A label for a piece of information used in a program.\", level: 2, incorrectAnswers: [\"A fixed value\", \"A type of loop\", \"A type of bug\"] },\n    { word: \"Command\", definition: \"An instruction for the computer. Many commands put together make up algorithms and computer programs.\", level: 2, incorrectAnswers: [\"A question for the computer\", \"A suggestion for the computer\", \"A request to the computer\"] },\n    { word: \"Condition\", definition: \"Something a program checks to see if it is true before allowing an action.\", level: 2, incorrectAnswers: [\"A random event\", \"A guaranteed action\", \"A type of variable\"] },\n\n     { word: \"Programming\", definition: \"The art of creating a program.\", level: 3, incorrectAnswers: [\"The act of deleting a program\", \"The science of breaking computers\", \"The study of insects\"] },\n    { word: \"Persistence\", definition: \"Not giving up.\", level: 3, incorrectAnswers: [\"Giving up easily\", \"Ignoring problems\", \"Creating more problems\"] },\n    { word: \"Modify\", definition: \"Make partial or minor changes to something, typically so as to improve it.\", level: 3, incorrectAnswers: [\"Destroying something\", \"Ignoring something\", \"Leaving something unchanged\"] },\n    { word: \"Events\", definition: \"Actions or occurrences that trigger specific code blocks.\", level: 3, incorrectAnswers: [\"Actions that don't trigger anything\", \"Static images\", \"Planned parties\"] },\n    { word: \"Functions\", definition: \"Reusable code blocks for specific tasks.\", level: 3, incorrectAnswers: [\"Blocks of code that do nothing\", \"Comments in the code\", \"Secrets in the code\"] },\n    { word: \"Loops\", definition: \"Repeating instruction sequences multiple times.\", level: 3, incorrectAnswers: [\"Sequences of instructions that run once\", \"Sequences of instructions that stop immediately\", \"Sequences of instructions that are ignored\"] },\n    { word: \"Conditionals\", definition: \"Statements that only run under certain conditions.\", level: 3, incorrectAnswers: [\"Statements that always run\", \"Statements that never run\", \"Statements that run randomly\"] },\n    { word: \"While Loop\", definition: \"Loop repeating while a condition is true.\", level: 3, incorrectAnswers: [\"A loop that runs once\", \"A loop that runs forever\", \"A loop that stops immediately\"] },\n    { word: \"Until\", definition: \"Command to do something until a condition is true.\", level: 3, incorrectAnswers: [\"A command that makes something false\", \"A command that does nothing\", \"A command that runs forever\"] },\n    { word: \"Define\", definition: \"Clarify problem details.\", level: 3, incorrectAnswers: [\"Ignore the details\", \"Create more problems\", \"Make something up\"] },\n    { word: \"Prepare\", definition: \"Research, plan, and get materials ready.\", level: 3, incorrectAnswers: [\"Do no research\", \"Don't plan anything\", \"Use no materials\"] },\n    { word: \"Reflect\", definition: \"Carefully review past actions.\", level: 3, incorrectAnswers: [\"Don't think back\", \"Repeat the same mistakes\", \"Ignore the outcome\"] },\n    { word: \"Try\", definition: \"Attempt to do something.\", level: 3, incorrectAnswers: [\"Avoid doing anything\", \"Assume you can't do it\", \"Don't even start\"] },\n\n    { word: \"Programming\", definition: \"The art of creating a program.\", level: 4, incorrectAnswers: [\"The act of deleting a program\", \"The science of breaking computers\", \"The study of insects\"] },\n    { word: \"Persistence\", definition: \"Not giving up.\", level: 4, incorrectAnswers: [\"Giving up easily\", \"Ignoring problems\", \"Creating more problems\"] },\n    { word: \"Modify\", definition: \"Make partial or minor changes to something, typically so as to improve it.\", level: 4, incorrectAnswers: [\"Destroying something\", \"Ignoring something\", \"Leaving something unchanged\"] },\n    { word: \"Events\", definition: \"Actions or occurrences that trigger specific code blocks.\", level: 4, incorrectAnswers: [\"Actions that don't trigger anything\", \"Static images\", \"Planned parties\"] },\n    { word: \"Functions\", definition: \"Reusable code blocks for specific tasks.\", level: 4, incorrectAnswers: [\"Blocks of code that do nothing\", \"Comments in the code\", \"Secrets in the code\"] },\n    { word: \"Loops\", definition: \"Repeating instruction sequences multiple times.\", level: 4, incorrectAnswers: [\"Sequences of instructions that run once\", \"Sequences of instructions that stop immediately\", \"Sequences of instructions that are ignored\"] },\n    { word: \"Conditionals\", definition: \"Statements that only run under certain conditions.\", level: 4, incorrectAnswers: [\"Statements that always run\", \"Statements that never run\", \"Statements that run randomly\"] },\n    { word: \"While Loop\", definition: \"Loop repeating while a condition is true.\", level: 4, incorrectAnswers: [\"A loop that runs once\", \"A loop that runs forever\", \"A loop that stops immediately\"] },\n    { word: \"Until\", definition: \"Command to do something until a condition is true.\", level: 4, incorrectAnswers: [\"A command that makes something false\", \"A command that does nothing\", \"A command that runs forever\"] },\n    { word: \"Define\", definition: \"Clarify problem details.\", level: 4, incorrectAnswers: [\"Ignore the details\", \"Create more problems\", \"Make something up\"] },\n    { word: \"Prepare\", definition: \"Research, plan, and get materials ready.\", level: 4, incorrectAnswers: [\"Do no research\", \"Don't plan anything\", \"Use no materials\"] },\n    { word: \"Reflect\", definition: \"Carefully review past actions.\", level: 4, incorrectAnswers: [\"Don't think back\", \"Repeat the same mistakes\", \"Ignore the outcome\"] },\n    { word: \"Try\", definition: \"Attempt to do something.\", level: 4, incorrectAnswers: [\"Avoid doing anything\", \"Assume you can't do it\", \"Don't even start\"] },\n\n    { word: \"Programming\", definition: \"The art of creating a program.\", level: 5, incorrectAnswers: [\"The act of deleting a program\", \"The science of breaking computers\", \"The study of insects\"] },\n    { word: \"Persistence\", definition: \"Not giving up.\", level: 5, incorrectAnswers: [\"Giving up easily\", \"Ignoring problems\", \"Creating more problems\"] },\n    { word: \"Modify\", definition: \"Make partial or minor changes to something, typically so as to improve it.\", level: 5, incorrectAnswers: [\"Destroying something\", \"Ignoring something\", \"Leaving something unchanged\"] },\n    { word: \"Events\", definition: \"Actions or occurrences that trigger specific code blocks.\", level: 5, incorrectAnswers: [\"Actions that don't trigger anything\", \"Static images\", \"Planned parties\"] },\n    { word: \"Functions\", definition: \"Reusable code blocks for specific tasks.\", level: 5, incorrectAnswers: [\"Blocks of code that do nothing\", \"Comments in the code\", \"Secrets in the code\"] },\n    { word: \"Loops\", definition: \"Repeating instruction sequences multiple times.\", level: 5, incorrectAnswers: [\"Sequences of instructions that run once\", \"Sequences of instructions that stop immediately\", \"Sequences of instructions that are ignored\"] },\n    { word: \"Conditionals\", definition: \"Statements that only run under certain conditions.\", level: 5, incorrectAnswers: [\"Statements that always run\", \"Statements that never run\", \"Statements that run randomly\"] },\n    { word: \"While Loop\", definition: \"Loop repeating while a condition is true.\", level: 5, incorrectAnswers: [\"A loop that runs once\", \"A loop that runs forever\", \"A loop that stops immediately\"] },\n    { word: \"Until\", definition: \"Command to do something until a condition is true.\", level: 5, incorrectAnswers: [\"A command that makes something false\", \"A command that does nothing\", \"A command that runs forever\"] },\n    { word: \"Define\", definition: \"Clarify problem details.\", level: 5, incorrectAnswers: [\"Ignore the details\", \"Create more problems\", \"Make something up\"] },\n    { word: \"Prepare\", definition: \"Research, plan, and get materials ready.\", level: 5, incorrectAnswers: [\"Do no research\", \"Don't plan anything\", \"Use no materials\"] },\n    { word: \"Reflect\", definition: \"Carefully review past actions.\", level: 5, incorrectAnswers: [\"Don't think back\", \"Repeat the same mistakes\", \"Ignore the outcome\"] },\n    { word: \"Try\", definition: \"Attempt to do something.\", level: 5, incorrectAnswers: [\"Avoid doing anything\", \"Assume you can't do it\", \"Don't even start\"] },\n// The following is level 6's questions\n    { word: \"Programming\", definition: \"The art of creating a program.\", level: 6, incorrectAnswers: [\"The act of deleting a program\", \"The science of breaking computers\", \"The study of insects\"] },\n    { word: \"Persistence\", definition: \"Not giving up.\", level: 6, incorrectAnswers: [\"Giving up easily\", \"Ignoring problems\", \"Creating more problems\"] },\n    { word: \"Modify\", definition: \"Make partial or minor changes to something, typically so as to improve it.\", level: 6, incorrectAnswers: [\"Destroying something\", \"Ignoring something\", \"Leaving something unchanged\"] },\n    { word: \"Events\", definition: \"Actions or occurrences that trigger specific code blocks.\", level: 6, incorrectAnswers: [\"Actions that don't trigger anything\", \"Static images\", \"Planned parties\"] },\n    { word: \"Functions\", definition: \"Reusable code blocks for specific tasks.\", level: 6, incorrectAnswers: [\"Blocks of code that do nothing\", \"Comments in the code\", \"Secrets in the code\"] },\n    { word: \"Loops\", definition: \"Repeating instruction sequences multiple times.\", level: 6, incorrectAnswers: [\"Sequences of instructions that run once\", \"Sequences of instructions that stop immediately\", \"Sequences of instructions that are ignored\"] },\n    { word: \"Conditionals\", definition: \"Statements that only run under certain conditions.\", level: 6, incorrectAnswers: [\"Statements that always run\", \"Statements that never run\", \"Statements that run randomly\"] },\n    { word: \"While Loop\", definition: \"Loop repeating while a condition is true.\", level: 6, incorrectAnswers: [\"A loop that runs once\", \"A loop that runs forever\", \"A loop that stops immediately\"] },\n    { word: \"Until\", definition: \"Command to do something until a condition is true.\", level: 6, incorrectAnswers: [\"A command that makes something false\", \"A command that does nothing\", \"A command that runs forever\"] },\n    { word: \"Define\", definition: \"Clarify problem details.\", level: 6, incorrectAnswers: [\"Ignore the details\", \"Create more problems\", \"Make something up\"] },\n    { word: \"Prepare\", definition: \"Research, plan, and get materials ready.\", level: 6, incorrectAnswers: [\"Do no research\", \"Don't plan anything\", \"Use no materials\"] },\n    { word: \"Reflect\", definition: \"Carefully review past actions.\", level: 6, incorrectAnswers: [\"Don't think back\", \"Repeat the same mistakes\", \"Ignore the outcome\"] },\n    { word: \"Try\", definition: \"Attempt to do something.\", level: 6, incorrectAnswers: [\"Avoid doing anything\", \"Assume you can't do it\", \"Don't even start\"] },\n];\n\nlet currentQuestion = null; // Store the current question\nlet timer;\n    // Function to select a character\n    function selectCharacter(selectedCharacter, element) {\n        // Remove 'selected' class from all character buttons\n        const buttons = document.querySelectorAll('.character-button');\n        buttons.forEach(button => button.classList.remove('selected'));\n\n        // Add 'selected' class to the clicked button\n        element.classList.add('selected');\n\n        character = selectedCharacter;\n    }\n\n    // Function to update the dashboard\n    function updateDashboard() {\n        document.getElementById(\"score\").innerText = score;\n        document.getElementById(\"lives\").innerText = lives;\n    }\n    // Function to generate a single question for a level\n    function generateQuestion(level) {\n         let levelWords = wordDatabase.filter(word => word.level === level);\n\n        // Filter out already asked questions\n        levelWords = levelWords.filter(wordData => !askedQuestions.includes(wordData.word));\n\n        if (levelWords.length === 0) {\n            console.warn(`No new words left for level ${level}. Resetting asked questions.`);\n             askedQuestions = []; // Clear the askedQuestions array if no new words are available\n             levelWords = wordDatabase.filter(word => word.level === level); // Reload all words for the level\n              levelWords = levelWords.filter(wordData => !askedQuestions.includes(wordData.word)); // Ensure no immediate repeats after reset\n             if (levelWords.length === 0) {\n                   console.error(`Still no words after reset for level ${level}! Something is wrong. Please increase the number of question in the array`);\n              return; // Exit if still no words after reset (avoid infinite loop)\n          }\n        }\n        const wordData = levelWords[Math.floor(Math.random() * levelWords.length)];\n        const correctAnswer = wordData.definition;\n        const incorrectAnswers = [...wordData.incorrectAnswers];\n        const answers = [correctAnswer, ...incorrectAnswers];\n\n        // Shuffle answers\n        answers.sort(() => Math.random() - 0.5);\n\n        const questionDiv = document.createElement('div');\n        questionDiv.classList.add('question');\n        questionDiv.innerHTML = `<div class=\"question-text\">What does \"${wordData.word}\" mean?</div>`;\n\n        answers.forEach(answer => {\n            const button = document.createElement('button');\n            button.classList.add('answer-button');\n            button.innerText = answer;\n            button.onclick = () => checkAnswer(answer, correctAnswer, level, button,wordData.word);\n            questionDiv.appendChild(button);\n        });\n\n        // Store the current question data\n        currentQuestion = {\n            correctAnswer: correctAnswer,\n            level: level\n        };\n\n        const questionContainer = document.getElementById(`question-container-${level}`);\n        questionContainer.innerHTML = ''; // Clear previous question\n        questionContainer.appendChild(questionDiv);\n\n        // Enable the \"Restart\" button after the question is loaded\n        document.getElementById(\"restart-button\").disabled = false;\n        questionAnswered = false;\n    }\n    // Function to check the answer\n   function checkAnswer(selectedAnswer, correctAnswer, level, button, word) {\n        const isCorrect = selectedAnswer === correctAnswer;\n        const restartButton = document.getElementById(\"restart-button\");\n\n        // Disable all answer buttons immediately\n        const buttons = document.querySelectorAll(`#question-container-${level} .answer-button`);\n        buttons.forEach(btn => btn.disabled = true);\n\n        if (isCorrect) {\n            score += 10;\n            button.style.backgroundColor = \"green\";\n              askedQuestions.push(word);  // Track the word as asked\n        } else {\n            lives--;\n            score -= 5;\n            button.style.backgroundColor = \"red\";\n\n            // Find the correct answer and make its background green\n            buttons.forEach(btn => {\n                if (btn.innerText === correctAnswer) {\n                    btn.style.backgroundColor = \"green\";\n                }\n            });\n\n             if (score <= 0) {\n                score = 0;\n                if (lives > 0) {\n                    lives--; // Reduce lives to 1 if score goes to zero\n                }\n                updateDashboard();\n                 if (lives <= 0) {\n                     //Show Game Over if the lives are zero.\n                         gameOver();\n                    }\n            }\n        }\n\n        updateDashboard();\n\n        // Automatically enable the Restart button after answering\n        restartButton.disabled = false;\n        questionAnswered = true;\n\n         // Clear any existing timer before setting a new one\n        clearTimeout(timer);\n\n        // Setting Timer if the answer is correct or wrong for an automatic transition to the next slide.\n        timer = setTimeout(() => {\n            nextSlide();\n        }, 2000); // 2-second pause\n    }\n// Function to start the game and go to Level 1\n    function startGame() {\n        // Hide character selection\n        document.getElementById(\"character-selection\").style.display = 'none';\n        // Show Level 1\n        document.getElementById(\"level1\").style.display = 'block';\n        // Generate the first question for Level 1\n        generateQuestion(1);\n    }\n\n     // Function to move to the next slide\n    function nextSlide() {\n            // Reset answer button styling\n            resetAnswerButtonStyles(currentLevel);\n\n        const level = currentLevel;\n\n        // Check if the game is finished\n        if (currentLevel <= 6) {\n            // Move to the next level\n            document.getElementById(`level${level}`).style.display = 'none';\n            currentLevel++;\n\n           //Show Game Over if the current level is above 6.\n            if(currentLevel <=6){\n                 document.getElementById(`level${currentLevel}`).style.display = 'block';\n                  generateQuestion(currentLevel);\n            }\n            else{\n              endGame();\n           }\n     }\n }\n    //Function to reset answer button styles\n    function resetAnswerButtonStyles(level) {\n        const buttons = document.querySelectorAll(`#question-container-${level} .answer-button`);\n        buttons.forEach(button => {\n            button.style.backgroundColor = \"\"; // Remove background color\n            button.disabled = false; // Enable the button\n        });\n    }\n     // Function to end the game\n    function endGame() {\n        document.getElementById(`level${currentLevel-1}`).style.display = 'none';\n        document.getElementById(\"game-over\").style.display = 'block';\n        document.getElementById(\"final-score\").innerText = score;\n        console.log(`Game Over. Final Score: ${score}`);\n    }\n    // Function to handle game over\n    function gameOver() {\n            // Hide all levels\n     /*   for (let i = 1; i <= 6; i++) {\n            document.getElementById(`level${i}`).style.display = 'none';\n        }\n        // Show Game Over\n        document.getElementById(`level${currentLevel-1}`).style.display = 'none';\n        document.getElementById(\"game-over\").style.display = 'block';\n         document.getElementById(\"final-score\").innerText = score; */\n         endGame();\n    }\n    // Function to restart the game\n    function restartGame() {\n        score = 0;\n        lives = 5;\n        currentLevel = 1;\n        updateDashboard();\n        clearTimeout(timer);  // Clear timeout before restarting\n       askedQuestions = [];  // Clear asked questions array\n        // Hide all levels\n         for (let i = 1; i <= 6; i++) {\n            document.getElementById(`level${i}`).style.display = 'none';\n        }\n\n        document.getElementById(\"game-over\").style.display = 'none';\n        document.getElementById(\"restart\").style.display = 'none';\n        document.getElementById(\"character-selection\").style.display = 'block';\n\n         // Remove 'selected' class from all character buttons\n        const buttons = document.querySelectorAll('.character-button');\n        buttons.forEach(button => button.classList.remove('selected'));\n    }\n\n    // Initial game setup\n    updateDashboard();\n    // Initially show the character selection screen\n    document.getElementById(\"character-selection\").style.display = 'block';\n    // Hide other levels\n     for (let i = 1; i <= 6; i++) {\n            document.getElementById(`level${i}`).style.display = 'none';\n        }\n    document.getElementById(\"game-over\").style.display = 'none';\n    document.getElementById(\"restart\").style.display = 'none';\n"
  }