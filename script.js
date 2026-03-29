document.addEventListener('DOMContentLoaded', () => {
    // DOM 元素
    const screens = {
        loading: document.getElementById('loading-screen'),
        start: document.getElementById('start-screen'),
        select: document.getElementById('select-screen'),
        battle: document.getElementById('battle-screen'),
        end: document.getElementById('end-screen'),
    };
    const gameContainer = document.getElementById('game-container');
    const floatingTextContainer = document.getElementById('floating-text-container');
    const chargeAttackButton = document.getElementById('charge-attack-button');
    const playerPokemonImg = document.getElementById('player-pokemon');
    const opponentPokemonImg = document.getElementById('opponent-pokemon');
    const startButton = document.getElementById('start-button');
    const restartButton = document.getElementById('restart-button');
    const pokemonSelection = document.getElementById('pokemon-selection');
    const playerName = document.getElementById('player-name');
    const playerHp = document.getElementById('player-hp');
    const playerXpText = document.getElementById('player-xp-text');
    const opponentName = document.getElementById('opponent-name');
    const opponentHp = document.getElementById('opponent-hp');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const endMessage = document.getElementById('end-message');
    const endImage = document.getElementById('end-image');
    
    // 音效
    const sounds = {
        bgMusic: document.getElementById('bg-music'),
        attack: document.getElementById('attack-sound'),
        victory: document.getElementById('victory-music'),
        capture: document.getElementById('capture-sound'),
        evo: document.getElementById('evo-sound'),
    };

    // 屬性相剋表 (2: 超效, 0.5: 減半, 0: 無效)
    const typeChart = {
        normal: { rock: 0.5, ghost: 0, steel: 0.5 }, fire: { fire: 0.5, water: 0.5, grass: 2, ice: 2, bug: 2, rock: 0.5, dragon: 0.5, steel: 2 }, water: { fire: 2, water: 0.5, grass: 0.5, ground: 2, rock: 2, dragon: 0.5 }, electric: { water: 2, electric: 0.5, grass: 0.5, ground: 0, flying: 2, dragon: 0.5 }, grass: { fire: 0.5, water: 2, grass: 0.5, poison: 0.5, ground: 2, flying: 0.5, bug: 0.5, rock: 2, dragon: 0.5, steel: 0.5 }, ice: { fire: 0.5, water: 0.5, grass: 2, ice: 0.5, ground: 2, flying: 2, dragon: 2, steel: 0.5 }, fighting: { normal: 2, ice: 2, poison: 0.5, flying: 0.5, psychic: 0.5, bug: 0.5, rock: 2, ghost: 0, dark: 2, steel: 2, fairy: 0.5 }, poison: { grass: 2, poison: 0.5, ground: 0.5, rock: 0.5, ghost: 0.5, steel: 0, fairy: 2 }, ground: { fire: 2, electric: 2, grass: 0.5, poison: 2, flying: 0, bug: 0.5, rock: 2, steel: 2 }, flying: { electric: 0.5, grass: 2, fighting: 2, bug: 2, rock: 0.5, steel: 0.5 }, psychic: { fighting: 2, poison: 2, psychic: 0.5, dark: 0, steel: 0.5 }, bug: { fire: 0.5, grass: 2, fighting: 0.5, poison: 0.5, flying: 0.5, psychic: 2, ghost: 0.5, dark: 2, steel: 0.5, fairy: 0.5 }, rock: { fire: 2, ice: 2, fighting: 0.5, ground: 0.5, flying: 2, bug: 2, steel: 0.5 }, ghost: { normal: 0, psychic: 2, ghost: 2, dark: 0.5 }, dragon: { dragon: 2, steel: 0.5, fairy: 0 }, dark: { fighting: 0.5, psychic: 2, ghost: 2, dark: 0.5, fairy: 0.5 }, steel: { fire: 0.5, water: 0.5, electric: 0.5, ice: 2, rock: 2, steel: 0.5, fairy: 2 }, fairy: { fire: 0.5, fighting: 2, poison: 0.5, dragon: 2, dark: 2, steel: 0.5 }
    };

    // 寶可夢資料庫
    const pokemonDB = {
        1: { name: "妙蛙種子", type: ["grass", "poison"], evolvesTo: 2, evolutionLevel: 4 }, 2: { name: "妙蛙草", type: ["grass", "poison"], evolvesTo: 3, evolutionLevel: 8 }, 3: { name: "妙蛙花", type: ["grass", "poison"], megaEvolvesTo: 10033, megaEvolutionLevel: 12 }, 4: { name: "小火龍", type: ["fire"], evolvesTo: 5, evolutionLevel: 4 }, 5: { name: "火恐龍", type: ["fire"], evolvesTo: 6, evolutionLevel: 8 }, 6: { name: "噴火龍", type: ["fire", "flying"], megaEvolvesTo: 10034, megaEvolutionLevel: 12 }, 7: { name: "傑尼龜", type: ["water"], evolvesTo: 8, evolutionLevel: 4 }, 8: { name: "卡咪龜", type: ["water"], evolvesTo: 9, evolutionLevel: 8 }, 9: { name: "水箭龜", type: ["water"], megaEvolvesTo: 10036, megaEvolutionLevel: 12 }, 152: { name: "菊草葉", type: ["grass"], evolvesTo: 153, evolutionLevel: 4 }, 153: { name: "月桂葉", type: ["grass"], evolvesTo: 154, evolutionLevel: 8 }, 154: { name: "大竺葵", type: ["grass"] }, 155: { name: "火球鼠", type: ["fire"], evolvesTo: 156, evolutionLevel: 4 }, 156: { name: "火岩鼠", type: ["fire"], evolvesTo: 157, evolutionLevel: 8 }, 157: { name: "火爆獸", type: ["fire"] }, 158: { name: "小鋸鱷", type: ["water"], evolvesTo: 159, evolutionLevel: 4 }, 159: { name: "藍鱷", type: ["water"], evolvesTo: 160, evolutionLevel: 8 }, 160: { name: "大力鱷", type: ["water"] }, 252: { name: "木守宮", type: ["grass"], evolvesTo: 253, evolutionLevel: 4 }, 253: { name: "森林蜥蜴", type: ["grass"], evolvesTo: 254, evolutionLevel: 8 }, 254: { name: "蜥蜴王", type: ["grass"] }, 255: { name: "火稚雞", type: ["fire"], evolvesTo: 256, evolutionLevel: 4 }, 256: { name: "力壯雞", type: ["fire", "fighting"], evolvesTo: 257, evolutionLevel: 8 }, 257: { name: "火焰雞", type: ["fire", "fighting"] }, 258: { name: "水躍魚", type: ["water"], evolvesTo: 259, evolutionLevel: 4 }, 259: { name: "沼躍魚", type: ["water", "ground"], evolvesTo: 260, evolutionLevel: 8 }, 260: { name: "巨沼怪", type: ["water", "ground"] }, 10033: { name: "超級妙蛙花", type: ["grass", "poison"] }, 10034: { name: "超級噴火龍X", type: ["fire", "dragon"] }, 10036: { name: "超級水箭龜", type: ["water"] }, 144: { name: "急凍鳥", type: ["ice", "flying"] }, 145: { name: "閃電鳥", type: ["electric", "flying"] }, 146: { name: "火焰鳥", type: ["fire", "flying"] }, 150: { name: "超夢", type: ["psychic"] }, 249: { name: "洛奇亞", type: ["psychic", "flying"] },
    };

    Object.keys(pokemonDB).forEach(id => {
        const p = pokemonDB[id];
        const officialArt = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
        p.img = officialArt;
        p.backImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`;
    });

    const selectablePokemonIds = [1, 4, 7, 152, 155, 158, 252, 255, 258];
    const legendaryOpponentIds = [144, 145, 146, 150, 249];
    let player, opponent, currentQuestion;

    function switchScreen(screenName) {
        for (let key in screens) {
            screens[key].classList.remove('active');
        }
        screens[screenName].classList.add('active');
    }

    async function preloadAssets() {
        const idsToLoad = [...selectablePokemonIds, ...legendaryOpponentIds];
        const promises = idsToLoad.map(id => {
            return new Promise((resolve) => {
                const img = new Image();
                img.src = pokemonDB[id].img;
                img.onload = resolve;
                img.onerror = resolve; // 即使圖片載入失敗也繼續，避免卡住
            });
        });
        await Promise.all(promises);
    }
    
    function setupPokemonSelection() {
        pokemonSelection.style.gridTemplateColumns = 'repeat(3, 1fr)';
        pokemonSelection.innerHTML = '';
        selectablePokemonIds.forEach(id => {
            const p = pokemonDB[id];
            const card = document.createElement('div');
            card.className = 'pokemon-card';
            card.dataset.id = id;
            card.innerHTML = `<img src="${p.img}" alt="${p.name}"><p>${p.name}</p>`;
            card.addEventListener('click', () => selectPokemon(id));
            pokemonSelection.appendChild(card);
        });
    }

    function selectPokemon(id) {
        const base = pokemonDB[id];
        player = {
            id: id, name: base.name, type: base.type, hp: 100, maxHp: 100, xp: 0, chargeMeter: 0
        };
        Object.assign(player, (({ evolvesTo, evolutionLevel, megaEvolvesTo, megaEvolutionLevel }) => ({ evolvesTo, evolutionLevel, megaEvolvesTo, megaEvolutionLevel }))(base));
        startBattle();
    }
    
    function startBattle() {
        const opponentId = legendaryOpponentIds[Math.floor(Math.random() * legendaryOpponentIds.length)];
        const base = pokemonDB[opponentId];
        opponent = { id: opponentId, name: base.name, type: base.type, hp: 100, maxHp: 100, img: base.img };
        
        player.hp = 100;
        player.xp = 0;
        player.chargeMeter = 0;

        updateBattleUI();
        switchScreen('battle');
        nextQuestion();
        
        sounds.bgMusic.src = 'https://play.pokemonshowdown.com/audio/music/hgss-kanto-trainer-battle.mp3';
        sounds.bgMusic.play().catch(e => console.log("戰鬥音樂播放失敗", e));
    }

    function updateBattleUI() {
        // Player
        const pData = pokemonDB[player.id];
        playerName.textContent = pData.name;
        playerPokemonImg.src = pData.backImg;
        playerHp.style.width = `${(player.hp / player.maxHp) * 100}%`;
        const evoLevel = pData.megaEvolutionLevel || pData.evolutionLevel || 'MAX';
        playerXpText.textContent = `XP: ${player.xp}/${evoLevel}`;

        // Opponent
        opponentName.textContent = opponent.name;
        opponentPokemonImg.src = opponent.img;
        opponentHp.style.width = `${(opponent.hp / opponent.maxHp) * 100}%`;

        // Charge Button
        if (player.chargeMeter >= 3) {
            chargeAttackButton.classList.remove('charge-button-hidden');
        } else {
            chargeAttackButton.classList.add('charge-button-hidden');
        }
    }

    function showFloatingText(text, element, type) {
        const textEl = document.createElement('div');
        textEl.className = `floating-text ${type}-text`;
        textEl.textContent = text;
        const rect = element.getBoundingClientRect();
        const containerRect = floatingTextContainer.getBoundingClientRect();
        textEl.style.left = `${rect.left - containerRect.left + rect.width / 2 - 20}px`;
        textEl.style.top = `${rect.top - containerRect.top + 20}px`;
        floatingTextContainer.appendChild(textEl);
        setTimeout(() => textEl.remove(), 1500);
    }
    
    function checkAnswer(selectedAnswer) {
        optionsContainer.style.pointerEvents = 'none';
        let isCorrect = String(selectedAnswer) === String(currentQuestion.answer);

        if (isCorrect) {
            let damage = Math.floor(Math.random() * 8) + 10;
            let multiplier = 1;
            const pData = pokemonDB[player.id];
            pData.type.forEach(attackType => {
                opponent.type.forEach(defendType => { multiplier *= typeChart[attackType]?.[defendType] ?? 1; });
            });
            if (multiplier > 1) showFloatingText('效果絕佳！', opponentPokemonImg, 'super-effective');
            if (multiplier < 1 && multiplier > 0) showFloatingText('效果不太好...', opponentPokemonImg, 'not-very-effective');
            damage = Math.round(damage * multiplier);
            opponent.hp -= damage;
            showFloatingText(`-${damage}`, opponentPokemonImg, 'damage');
            player.xp++;
            player.chargeMeter = Math.min(3, player.chargeMeter + 1);
            opponentPokemonImg.classList.add('attack-animation');
            gameContainer.classList.add('screen-shake');
        } else {
            let damage = Math.floor(Math.random() * 10) + 10;
            player.hp -= damage;
            player.chargeMeter = Math.max(0, player.chargeMeter - 1);
            showFloatingText(`-${damage}`, playerPokemonImg, 'damage');
            playerPokemonImg.classList.add('attack-animation');
        }

        setTimeout(() => {
            opponentPokemonImg.classList.remove('attack-animation');
            playerPokemonImg.classList.remove('attack-animation');
            gameContainer.classList.remove('screen-shake');
            updateBattleUI();
            checkEvolution();
            checkWinCondition();
        }, 800);
    }
    
    function handleChargeAttack() {
        if (player.chargeMeter < 3) return;
        chargeAttackButton.classList.add('charge-button-hidden');
        optionsContainer.style.pointerEvents = 'none';
        let damage = Math.floor(Math.random() * 20) + 30;
        let multiplier = 1;
        const pData = pokemonDB[player.id];
        pData.type.forEach(attackType => {
            opponent.type.forEach(defendType => { multiplier *= typeChart[attackType]?.[defendType] ?? 1; });
        });
        if (multiplier > 1) showFloatingText('效果絕佳！', opponentPokemonImg, 'super-effective');
        if (multiplier < 1) showFloatingText('效果不太好...', opponentPokemonImg, 'not-very-effective');
        damage = Math.round(damage * multiplier);
        opponent.hp -= damage;
        player.chargeMeter = 0;
        showFloatingText(`-${damage}`, opponentPokemonImg, 'damage');
        showFloatingText('蓄力攻擊!', playerPokemonImg, 'feedback');
        playerPokemonImg.classList.add('charge-attack-animation');
        gameContainer.classList.add('screen-shake');
        setTimeout(() => {
            playerPokemonImg.classList.remove('charge-attack-animation');
            gameContainer.classList.remove('screen-shake');
            updateBattleUI();
            checkWinCondition();
        }, 1000);
    }
    
    function checkWinCondition() {
        if (opponent.hp <= 0) {
            opponent.hp = 0;
            updateBattleUI();
            setTimeout(() => endGame(true), 500);
        } else if (player.hp <= 0) {
            player.hp = 0;
            updateBattleUI();
            setTimeout(() => endGame(false), 500);
        } else {
            nextQuestion();
        }
    }
    
    function endGame(isWin) {
        sounds.bgMusic.pause();
        switchScreen('end');
        if (isWin) {
            sounds.victory.src = 'https://play.pokemonshowdown.com/audio/music/pokemon-xy-victory-road.mp3';
            sounds.victory.play();
            const isCaught = Math.random() < 0.5;
            if (isCaught) {
                endMessage.textContent = `太棒了！你成功捕捉了 ${opponent.name}！`;
                endImage.src = 'https://i.imgur.com/L1CCyC2.png';
                sounds.capture.src = 'https://play.pokemonshowdown.com/audio/shiny.mp3';
                sounds.capture.play();
            } else {
                endMessage.textContent = `哦不！${opponent.name} 逃走了！`;
                endImage.src = opponent.img;
            }
        } else {
            endMessage.textContent = '你的 Pokemon 失去了戰鬥能力...';
            endImage.src = pokemonDB[player.id].img;
            endImage.style.filter = 'grayscale(100%)';
        }
    }
    
    async function checkEvolution() {
        const currentPokemon = pokemonDB[player.id];
        if (currentPokemon.megaEvolvesTo && player.xp >= currentPokemon.megaEvolutionLevel) {
            await evolvePlayer(currentPokemon.megaEvolvesTo, true);
        } else if (currentPokemon.evolvesTo && player.xp >= currentPokemon.evolutionLevel) {
            await evolvePlayer(currentPokemon.evolvesTo, false);
        }
    }

    async function evolvePlayer(evolutionId, isMega) {
        player.xp = 0;
        const evolutionData = pokemonDB[evolutionId];
        sounds.bgMusic.pause();
        sounds.evo.src = isMega ? 'https://play.pokemonshowdown.com/audio/megaevo.mp3' : 'https://play.pokemonshowdown.com/audio/evo.mp3';
        sounds.evo.play();
        playerPokemonImg.classList.add(isMega ? 'mega-evolve-animation' : 'evolve-animation');
        await new Promise(resolve => setTimeout(resolve, isMega ? 2500 : 2000));
        playerPokemonImg.classList.remove(isMega ? 'mega-evolve-animation' : 'evolve-animation');
        player.id = evolutionId;
        updateBattleUI();
        sounds.bgMusic.play();
    }
    
    // --- 題目生成 (無變動) ---
    function generateQuestion() {
        const types = ['add', 'subtract', 'multiply', 'divide', 'simplify'];
        const type = types[Math.floor(Math.random() * types.length)];
        let question, answer;
        const num1 = Math.floor(Math.random() * 90) + 10, num2 = Math.floor(Math.random() * 90) + 10;
        const s_num1 = Math.floor(Math.random() * 9) + 1, s_num2 = Math.floor(Math.random() * 9) + 1;
        switch (type) {
            case 'add': question = `${num1} + ${num2} = ?`; answer = num1 + num2; break;
            case 'subtract': const [n1, n2] = [Math.max(num1, num2), Math.min(num1, num2)]; question = `${n1} - ${n2} = ?`; answer = n1 - n2; break;
            case 'multiply': question = `${s_num1} × ${s_num2} = ?`; answer = s_num1 * s_num2; break;
            case 'divide': const dividend = s_num1 * s_num2; question = `${dividend} ÷ ${s_num1} = ?`; answer = s_num2; break;
            case 'simplify':
                const common = Math.floor(Math.random() * 5) + 2;
                const num = (Math.floor(Math.random() * 5) + 1) * common;
                const den = (Math.floor(Math.random() * 5) + 6) * common;
                question = `約簡分數: ${num}/${den}`;
                const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
                const commonDivisor = gcd(num, den);
                answer = `${num/commonDivisor}/${den/commonDivisor}`;
                break;
        }
        const options = generateOptions(answer);
        return { question, options, answer };
    }
    function generateOptions(correctAnswer) {
        let options = new Set([String(correctAnswer)]);
        while (options.size < 4) {
            if (typeof correctAnswer === 'number') {
                const wrong = correctAnswer + Math.floor(Math.random() * 10) - 5;
                if (wrong !== correctAnswer && wrong >= 0) options.add(String(wrong));
            } else {
                const [num, den] = correctAnswer.split('/').map(Number);
                const wrongNum = num + Math.floor(Math.random() * 3) - 1;
                const wrongDen = den + Math.floor(Math.random() * 3) - 1;
                if (wrongNum > 0 && wrongDen > 0 && wrongNum/wrongDen !== num/den) options.add(`${wrongNum}/${wrongDen}`);
            }
        }
        return Array.from(options).sort(() => Math.random() - 0.5);
    }
    function nextQuestion() {
        currentQuestion = generateQuestion();
        questionText.textContent = currentQuestion.question;
        optionsContainer.innerHTML = '';
        currentQuestion.options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'option-button';
            button.textContent = option;
            button.onclick = () => checkAnswer(option);
            optionsContainer.appendChild(button);
        });
        optionsContainer.style.pointerEvents = 'auto';
    }

    // --- 遊戲啟動 ---
    async function init() {
        switchScreen('loading');
        await preloadAssets();
        switchScreen('start');
        sounds.bgMusic.src = 'https://play.pokemonshowdown.com/audio/music/hgss-title.mp3';
        sounds.bgMusic.volume = 0.2;
    }
    
    // 事件監聽
    startButton.addEventListener('click', () => {
        sounds.bgMusic.play().catch(e => console.log("背景音樂播放需要用戶互動", e));
        setupPokemonSelection();
        switchScreen('select');
    });

    restartButton.addEventListener('click', () => {
        sounds.victory.pause();
        sounds.victory.currentTime = 0;
        endImage.style.filter = 'none';
        
        // 返回選擇角色畫面，而不是刷新頁面
        setupPokemonSelection();
        switchScreen('select');
        sounds.bgMusic.play().catch(e => console.log("背景音樂播放需要用戶互動", e));
    });

    chargeAttackButton.addEventListener('click', handleChargeAttack);

    init();
});
