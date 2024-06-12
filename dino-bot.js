(function() {
    let previousSpeed = 0;
    let duckTimeoutId;
    let jumpsCount = 0;
    let ducksCount = 0;

    function getNearestObstacle() {
        let obstacles = Runner.instance_.horizon.obstacles;
        return obstacles.length > 0 ? obstacles[0] : null;
    }

    function checkForObstacles() {
        let obstacle = getNearestObstacle();
        let tRex = Runner.instance_.tRex;

        if (obstacle) {
            let tRexBottomPos = tRex.yPos + tRex.config.HEIGHT;
            let speed = Runner.instance_.currentSpeed;

            if (speed !== previousSpeed) {
                previousSpeed = speed;
            }

            if (isObstacleClose(obstacle, tRex, speed)) {
                if (shouldJump(obstacle, tRex, tRexBottomPos)) {
                    simulateJump(speed);
                } else if (shouldDuck(obstacle, tRex, tRexBottomPos)) {
                    simulateDuck(speed);
                } else {
                    stopDuck();
                }
            }
        }
    }

    function shouldJump(obstacle, tRex, tRexBottomPos) {
        let type = obstacle.typeConfig.type;
        return (type === 'CACTUS_SMALL' || type === 'CACTUS_LARGE' || (type === 'PTERODACTYL' && obstacle.yPos > tRexBottomPos - 60)) && !tRex.jumping;
    }

    function shouldDuck(obstacle, tRex, tRexBottomPos) {
        let type = obstacle.typeConfig.type;
        return type === 'PTERODACTYL' && obstacle.yPos < tRexBottomPos - 60;
    }

    function isObstacleClose(obstacle, tRex, speed) {
        let distance = obstacle.xPos - tRex.xPos;
        let earlyJumpOffset = speed > 8 ? -30 : 0;
        if (speed > 10) earlyJumpOffset = -40;
        if (speed > 12) earlyJumpOffset = -50;
        return distance < (100 + speed * 2 - earlyJumpOffset);
    }

    function simulateJump(speed) {
        let tRex = Runner.instance_.tRex;
        if (!tRex.jumping && !tRex.ducking) {
            let jumpDelay = Math.max(0, 250 - speed * 20);
            setTimeout(() => {
                triggerKeyEvent(38);
                jumpsCount++;
                updateCountText();
            }, jumpDelay);
        }
    }

    function simulateDuck(speed) {
        let tRex = Runner.instance_.tRex;
        if (!tRex.jumping && !tRex.ducking) {
            let duckDelay = Math.max(0, 250 - speed * 20);
            setTimeout(() => {
                triggerKeyEvent(40);
                ducksCount++;
                updateCountText();
                let duckDuration = 500;
                clearTimeout(duckTimeoutId);
                duckTimeoutId = setTimeout(stopDuck, duckDuration);
            }, duckDelay);
        }
    }

    function stopDuck() {
        triggerKeyEvent(40, 'keyup');
    }

    function triggerKeyEvent(keyCode, eventType = 'keydown') {
        let event = new KeyboardEvent(eventType, {
            bubbles: true,
            cancelable: true,
            keyCode: keyCode,
        });
        document.dispatchEvent(event);
    }

    function checkForGameOver() {
        if (Runner.instance_.crashed) {
            Runner.instance_.restart();
        }
    }

    // Add the text overlays
    function addTextOverlay() {
        let overlayContainer = document.createElement('div');
        overlayContainer.id = 'overlay-container';
        overlayContainer.style.position = 'absolute';
        overlayContainer.style.top = '10px';
        overlayContainer.style.left = '50%';
        overlayContainer.style.transform = 'translateX(-50%)';
        overlayContainer.style.zIndex = '9999';
        overlayContainer.style.textAlign = 'center';

        let textDiv = document.createElement('div');
        textDiv.id = 'like-comment-subscribe';
        textDiv.style.fontSize = '24px';
        textDiv.style.fontWeight = 'bold';
        textDiv.style.color = 'white';
        textDiv.style.textShadow = '0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000';
        textDiv.style.animation = 'neon-glow 2s infinite alternate, text-fade 2s infinite';

        let countDiv = document.createElement('div');
        countDiv.id = 'jump-duck-count';
        countDiv.style.fontSize = '18px';
        countDiv.style.fontWeight = 'bold';
        countDiv.style.color = 'white';
        countDiv.style.textShadow = '0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000';
        countDiv.style.animation = 'neon-glow 2s infinite alternate, text-fade 2s infinite';

        let style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = `
            @keyframes neon-glow {
                0% { text-shadow: 0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000; }
                10% { text-shadow: 0 0 10px #ff8000, 0 0 20px #ff8000, 0 0 30px #ff8000; }
                20% { text-shadow: 0 0 10px #ffff00, 0 0 20px #ffff00, 0 0 30px #ffff00; }
                30% { text-shadow: 0 0 10px #80ff00, 0 0 20px #80ff00, 0 0 30px #80ff00; }
                40% { text-shadow: 0 0 10px #00ff00, 0 0 20px #00ff00, 0 0 30px #00ff00; }
                50% { text-shadow: 0 0 10px #00ff80, 0 0 20px #00ff80, 0 0 30px #00ff80; }
                60% { text-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff; }
                70% { text-shadow: 0 0 10px #0080ff, 0 0 20px #0080ff, 0 0 30px #0080ff; }
                80% { text-shadow: 0 0 10px #0000ff, 0 0 20px #0000ff, 0 0 30px #0000ff; }
                90% { text-shadow: 0 0 10px #8000ff, 0 0 20px #8000ff, 0 0 30px #8000ff; }
                100% { text-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff; }
            }
        `;
        document.head.appendChild(style);
        overlayContainer.appendChild(textDiv);
        overlayContainer.appendChild(countDiv);
        document.body.appendChild(overlayContainer);

        let texts = ["LIKE", "COMMENT", "SUBSCRIBE","https://github.com/zufarrizal/Chrome-Dino/"];
        let textIndex = 0;

        function changeText() {
            textDiv.textContent = texts[textIndex];
            textIndex = (textIndex + 1) % texts.length;
        }

        setInterval(changeText, 1000);
    }

    function updateCountText() {
        let countDiv = document.getElementById('jump-duck-count');
        countDiv.textContent = `Jumps: ${jumpsCount}, Ducks: ${ducksCount}`;
    }

    addTextOverlay();

    let obstacleIntervalId = setInterval(checkForObstacles, 25);
    let gameOverIntervalId = setInterval(checkForGameOver, 100);
})();
