const passwords = [
            "password",   // When it says "enter password"
            "again",      // When it says "try again"
            "incorrect",  // When it says "the password is incorrect"
            "again"       // When it says "please try again"
        ];
        
        let currentPasswordIndex = 0;
        let attempts = 0;
        
        const passwordInput = document.getElementById('password-input');
        const submitBtn = document.getElementById('submit-btn');
        const message = document.getElementById('message');
        const attemptCounter = document.getElementById('attempt-counter');
        const passwordGame = document.getElementById('password-game');
        const successPage = document.getElementById('success-page');
        const playAgainBtn = document.getElementById('play-again-btn');
        
        // Initial message
        updateMessage();
        
        submitBtn.addEventListener('click', checkPassword);
        passwordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkPassword();
            }
        });
        
        playAgainBtn.addEventListener('click', resetGame);
        
        function checkPassword() {
            const userInput = passwordInput.value.trim().toLowerCase();
            attempts++;
            attemptCounter.textContent = `Attempts: ${attempts}`;
            
            if (userInput === passwords[currentPasswordIndex]) {
                // Correct password
                currentPasswordIndex++;
                
                if (currentPasswordIndex >= passwords.length) {
                    // All passwords correct - show success page
                    passwordGame.classList.add('hidden');
                    successPage.classList.remove('hidden');
                } else {
                    // Next password
                    passwordInput.value = '';
                    updateMessage();
                }
            } else {
                // Wrong password
                message.textContent = "Wrong! " + getRandomTaunt();
                passwordInput.value = '';
                shakeInput();
            }
        }
        
        function updateMessage() {
            const messages = [
                "Enter password",
                "Try again",
                "The password is incorrect",
                "Please try again"
            ];
            
            if (currentPasswordIndex < messages.length) {
                message.textContent = messages[currentPasswordIndex];
            }
        }
        
        function getRandomTaunt() {
            const taunts = [
                "Did you even read the hint?",
                "Nope, not even close!",
                "Are you just mashing the keyboard?",
                "Maybe try reading the instructions?",
                "The password is literally in the instructions!",
                "You're not very good at this, are you?",
                "I believe in you! (But not really)",
                "Try using your brain this time!"
            ];
            return taunts[Math.floor(Math.random() * taunts.length)];
        }
        
        function shakeInput() {
            passwordInput.style.transform = 'translateX(-5px)';
            setTimeout(() => {
                passwordInput.style.transform = 'translateX(5px)';
                setTimeout(() => {
                    passwordInput.style.transform = 'translateX(-5px)';
                    setTimeout(() => {
                        passwordInput.style.transform = 'translateX(5px)';
                        setTimeout(() => {
                            passwordInput.style.transform = 'translateX(0)';
                        }, 50);
                    }, 50);
                }, 50);
            }, 50);
        }
        
        function resetGame() {
            currentPasswordIndex = 0;
            attempts = 0;
            passwordInput.value = '';
            attemptCounter.textContent = `Attempts: ${attempts}`;
            successPage.classList.add('hidden');
            passwordGame.classList.remove('hidden');
            updateMessage();
        }