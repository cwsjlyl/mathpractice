document.addEventListener('DOMContentLoaded', () => {
    // --- DOM 元素 ---
    const screens = {
        loading: document.getElementById('loading-screen'),
        start: document.getElementById('start-screen'),
        select: document.getElementById('select-screen'),
        battle: document.getElementById('battle-screen'),
        end: document.getElementById('end-screen'),
    };
    const loadingText = document.getElementById('loading-text');
    const startButton = document.getElementById('start-button');
    const pokemonSelection = document.getElementById('pokemon-selection');
    const opponentPreview = {
        img: document.getElementById('opponent-preview-img'),
        name: document.getElementById('opponent-preview-name'),
    };
    const battleScreen = document.getElementById('battle-screen');
    const playerPokemonEl = document.getElementById('player-pokemon');
    const opponentPokemonEl = document.getElementById('opponent-pokemon');
    const attackFxLayer = document.getElementById('attack-fx-layer');
    const playerInfo = {
        name: document.getElementById('player-name'),
        hp: document.getElementById('player-hp'),
        xp: document.getElementById('player-xp-text'),
    };
    const opponentInfo = {
        name: document.getElementById('opponent-name'),
        hp: document.getElementById('opponent-hp'),
    };
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const endMessage = document.getElementById('end-message');
    const endImage = document.getElementById('end-image');
    const restartButton = document.getElementById('restart-button');

    // --- 音效庫 ---
    const sfx = {
        hitNormal: new Audio('https://play.pokemonshowdown.com/audio/damage.mp3'),
        hitSuper: new Audio('https://play.pokemonshowdown.com/audio/superdamage.mp3'),
        hitWeak: new Audio('https://play.pokemonshowdown.com/audio/resisted.mp3'),
        victory: new Audio('https://play.pokemonshowdown.com/audio/music/pokemon-xy-victory-road.mp3'),
        capture: new Audio('https://play.pokemonshowdown.com/audio/shiny.mp3'),
        evo: new Audio('https://play.pokemonshowdown.com/audio/evo.mp3'),
        bgMusic: new Audio(),
        select: new Audio('https://play.pokemonshowdown.com/audio/select.mp3')
    };
    sfx.bgMusic.loop = true;
    sfx.victory.loop = true;

    // --- 攻擊特效資源 ---
    const attackEffects = {
        water: 'https://i.imgur.com/J4gqj8s.gif',
        fire: 'https://i.imgur.com/Vp9pT2W.gif',
        electric: 'https://i.imgur.com/K7Mv3c2.gif',
        grass: 'https://i.imgur.com/Y32t3a9.gif',
    };

    // --- 屬性相剋表 ---
    const typeChart = { normal: { rock: 0.5, ghost: 0, steel: 0.5 }, fire: { fire: 0.5, water: 0.5, grass: 2, ice: 2, bug: 2, rock: 0.5, dragon: 0.5, steel: 2 }, water: { fire: 2, water: 0.5, grass: 0.5, ground: 2, rock: 2, dragon: 0.5 }, electric: { water: 2, electric: 0.5, grass: 0.5, ground: 0, flying: 2, dragon: 0.5 }, grass: { fire: 0.5, water: 2, grass: 0.5, poison: 0.5, ground: 2, flying: 0.5, bug: 0.5, rock: 2, dragon: 0.5, steel: 0.5 }, ice: { fire: 0.5, water: 0.5, grass: 2, ice: 0.5, ground: 2, flying: 2, dragon: 2, steel: 0.5 }, fighting: { normal: 2, ice: 2, poison: 0.5, flying: 0.5, psychic: 0.5, bug: 0.5, rock: 2, ghost: 0, dark: 2, steel: 2, fairy: 0.5 }, poison: { grass: 2, poison: 0.5, ground: 0.5, rock: 0.5, ghost: 0.5, steel: 0, fairy: 2 }, ground: { fire: 2, electric: 2, grass: 0.5, poison: 2, flying: 0, bug: 0.5, rock: 2, steel: 2 }, flying: { electric: 0.5, grass: 2, fighting: 2, bug: 2, rock: 0.5, steel: 0.5 }, psychic: { fighting: 2, poison: 2, psychic: 0.5, dark: 0, steel: 0.5 }, bug: { fire: 0.5, grass: 2, fighting: 0.5, poison: 0.5, flying: 0.5, psychic: 2, ghost: 0.5, dark: 2, steel: 0.5, fairy: 0.5 }, rock: { fire: 2, ice: 2, fighting: 0.5, ground: 0.5, flying: 2, bug: 2, steel: 0.5 }, ghost: { normal: 0, psychic: 2, ghost: 2, dark: 0.5 }, dragon: { dragon: 2, steel: 0.5, fairy: 0 }, dark: { fighting: 0.5, psychic: 2, ghost: 2, dark: 0.5, fairy: 0.5 }, steel: { fire: 0.5, water: 0.5, electric: 0.5, ice: 2, rock: 2, steel: 0.5, fairy: 2 }, fairy: { fire: 0.5, fighting: 2, poison: 0.5, dragon: 2, dark: 2, steel: 0.5 } };
    
    // --- 寶可夢資料庫 ---
    const pokemonDB = { 1: { name: "Bulbasaur", type: ["grass", "poison"], evolvesTo: 2, evolutionLevel: 5 }, 2: { name: "Ivysaur", type: ["grass", "poison"], evolvesTo: 3, evolutionLevel: 10 }, 3: { name: "Venusaur", type: ["grass", "poison"] }, 4: { name: "Charmander", type: ["fire"], evolvesTo: 5, evolutionLevel: 5 }, 5: { name: "Charmeleon", type: ["fire"], evolvesTo: 6, evolutionLevel: 10 }, 6: { name: "Charizard", type: ["fire", "flying"] }, 7: { name: "Squirtle", type: ["water"], evolvesTo: 8, evolutionLevel: 5 }, 8: { name: "Wartortle", type: ["water"], evolvesTo: 9, evolutionLevel: 10 }, 9: { name: "Blastoise", type: ["water"] }, 152: { name: "Chikorita", type: ["grass"], evolvesTo: 153, evolutionLevel: 5 }, 153: { name: "Bayleef", type: ["grass"], evolvesTo: 154, evolutionLevel: 10 }, 154: { name: "Meganium", type: ["grass"] }, 155: { name: "Cyndaquil", type: ["fire"], evolvesTo: 156, evolutionLevel: 5 }, 156: { name: "Quilava", type: ["fire"], evolvesTo: 157, evolutionLevel: 10 }, 157: { name: "Typhlosion", type: ["fire"] }, 158: { name: "Totodile", type: ["water"], evolvesTo: 159, evolutionLevel: 5 }, 159: { name: "Croconaw", type: ["water"], evolvesTo: 160, evolutionLevel: 10 }, 160: { name: "Feraligatr", type: ["water"] }, 252: { name: "Treecko", type: ["grass"], evolvesTo: 253, evolutionLevel: 5 }, 253: { name: "Grovyle", type: ["grass"], evolvesTo: 254, evolutionLevel: 10 }, 254: { name: "Sceptile", type: ["grass"] }, 255: { name: "Torchic", type: ["fire"], evolvesTo: 256, evolutionLevel: 5 }, 256: { name: "Combusken", type: ["fire", "fighting"], evolvesTo: 257, evolutionLevel: 10 }, 257: { name: "Blaziken", type: ["fire", "fighting"] }, 258: { name: "Mudkip", type: ["water"], evolvesTo: 259, evolutionLevel: 5 }, 259: { name: "Marshtomp", type: ["water", "ground"], evolvesTo: 260, evolutionLevel: 10 }, 260: { name: "Swampert", type: ["water", "ground"] }, 144: { name: "Articuno", type: ["ice", "flying"] }, 145: { name: "Zapdos", type: ["electric", "flying"] }, 146: { name: "Moltres", type: ["fire", "flying"] }, 150: { name: "Mewtwo", type: ["psychic"] }, 249: { name: "Lugia", type: ["psychic", "flying"] }, };

    Object.keys(pokemonDB).forEach(id => {
        const p = pokemonDB[id];
        const name = p.name.toLowerCase().replace(/-|'|\./g, ''); // More robust name cleaning
        p.img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`;
        p.backImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/${id}.gif`;
        p.cry = `https://play.pokemonshowdown.com/audio/cries/${name}.mp3`;
    });

    const selectablePokemonIds = [1, 4, 7, 152, 155, 158, 252, 255, 258];
    const legendaryOpponentIds = [144, 145, 146, 150, 249];
    let player, opponent, currentQuestion;
    
    // --- 遊戲主流程 ---
    function init() {
        switchScreen('loading');
        preloadAssets(); 
        sfx.bgMusic.src = 'https://play.pokemonshowdown.com/audio/music/hgss-title.mp3';
        sfx.bgMusic.volume = 0.2;
    }

    async function preloadAssets() {
        // 修正：不再阻塞遊戲，而是在完成後切換畫面
        loadingText.textContent = '資源準備就緒！';
        startButton.style.display = 'block';
        
        // **核心修正**：在資源準備好後，自動切換到開始畫面
        setTimeout(() => {
            switchScreen('start');
        }, 500); // 給玩家 0.5 秒看到 "準備就緒" 的訊息
    }

    function switchScreen(screenName) {
        Object.values(screens).forEach(s => s.classList.remove('active'));
        screens[screenName].classList.add('active');
    }

    startButton.addEventListener('click', () => {
        sfx.select.play();
        sfx.bgMusic.play().catch(e => {});

        const opponentId = legendaryOpponentIds[Math.floor(Math.random() * legendaryOpponentIds.length)];
        const opponentData = pokemonDB[opponentId];
        opponent = { id: opponentId, name: opponentData.name, type: opponentData.type, img: opponentData.img, cry: opponentData.cry, hp: 100, maxHp: 100 };

        opponentPreview.img.src = opponent.img;
        opponentPreview.name.textContent = opponent.name;

        setupPokemonSelection();
        switchScreen('select');
    });

    function setupPokemonSelection() {
        pokemonSelection.innerHTML = '';
        selectablePokemonIds.forEach(id => {
            const p = pokemonDB[id];
            const card = document.createElement('div');
            card.className = 'pokemon-card';
            card.innerHTML = `<img src="${p.img}" alt="${p.name}"><p>${p.name}</p>`;
            card.addEventListener('click', () => selectPokemon(id));
            pokemonSelection.appendChild(card);
        });
    }

    function selectPokemon(id) {
        sfx.select.play();
        player = { id: id, hp: 100, maxHp: 100, xp: 0 };
        startBattle();
    }
    
    async function startBattle() {
        battleScreen.classList.remove('intro-start');
        playerPokemonEl.classList.remove('faint-animation');
        opponentPokemonEl.classList.remove('faint-animation');
        player.hp = 100;
        opponent.hp = 100;
        
        const pData = pokemonDB[player.id];
        playerPokemonEl.src = pData.backImg;
        opponentPokemonEl.src = opponent.img;
        updateBattleUI();

        switchScreen('battle');
        await new Promise(r => setTimeout(r, 50));
        battleScreen.classList.add('intro-start');

        await new Promise(r => setTimeout(r, 1000));
        new Audio(opponent.cry).play();
        await new Promise(r => setTimeout(r, 300));
        new Audio(pData.cry).play();
        
        await new Promise(r => setTimeout(r, 500));
        sfx.bgMusic.src = 'https://play.pokemonshowdown.com/audio/music/hgss-kanto-trainer-battle.mp3';
        sfx.bgMusic.play().catch(e => {});
        nextQuestion();
    }

    async function checkAnswer(selectedAnswer) {
        optionsContainer.style.pointerEvents = 'none';
        const isCorrect = String(selectedAnswer) === String(currentQuestion.answer);

        if (isCorrect) {
            const pData = pokemonDB[player.id];
            playerPokemonEl.classList.add('attack-charge');
            await new Promise(r => setTimeout(r, 500));
            playerPokemonEl.classList.remove('attack-charge');
            
            const attackType = pData.type[0];
            if (attackEffects[attackType]) {
                await playAttackFX(attackEffects[attackType], opponentPokemonEl);
            }
            
            const multiplier = calculateMultiplier(pData.type, opponent.type);
            const damage = Math.round((Math.floor(Math.random() * 10) + 15) * multiplier);
            opponent.hp -= damage;
            opponentPokemonEl.classList.add('hit-reaction');
            playHitSound(multiplier);
            player.xp++;
        } else {
            const damage = Math.round(Math.floor(Math.random() * 8) + 10);
            player.hp -= damage;
            playerPokemonEl.classList.add('hit-reaction');
            sfx.hitNormal.play();
        }

        await new Promise(r => setTimeout(r, 500));
        opponentPokemonEl.classList.remove('hit-reaction');
        playerPokemonEl.classList.remove('hit-reaction');
        updateBattleUI();
        
        if (opponent.hp <= 0 || player.hp <= 0) {
            checkWinCondition();
        } else {
            nextQuestion();
        }
    }

    function checkWinCondition() {
        if (opponent.hp <= 0) {
            opponentPokemonEl.classList.add('faint-animation');
            sfx.bgMusic.pause();
            setTimeout(() => endGame(true), 1200);
        } else if (player.hp <= 0) {
            playerPokemonEl.classList.add('faint-animation');
            sfx.bgMusic.pause();
            setTimeout(() => endGame(false), 1200);
        }
    }

    function endGame(isWin) {
        switchScreen('end');
        if (isWin) {
            sfx.victory.play();
            const isCaught = Math.random() < 0.5;
            if (isCaught) {
                endMessage.textContent = `太棒了！你成功捕捉了 ${opponent.name}！`;
                endImage.src = 'https://www.pngkit.com/png/full/20-201198_pokemon-pokeball-png.png';
                setTimeout(() => sfx.capture.play(), 500);
            } else {
                endMessage.textContent = `哦不！${opponent.name} 逃走了！`;
                endImage.src = opponent.img;
            }
        } else {
            endMessage.textContent = '你的寶可夢失去了戰鬥能力...';
            endImage.src = pokemonDB[player.id].img;
        }
    }

    restartButton.addEventListener('click', () => {
        location.reload();
    });

    function updateBattleUI() {
        const pData = pokemonDB[player.id];
        playerInfo.name.textContent = pData.name;
        playerInfo.hp.style.width = `${Math.max(0, (player.hp / player.maxHp)) * 100}%`;
        const evoLevel = pData.evolutionLevel || 'MAX';
        playerInfo.xp.textContent = `XP: ${player.xp}/${evoLevel}`;
        opponentInfo.name.textContent = opponent.name;
        opponentInfo.hp.style.width = `${Math.max(0, (opponent.hp / opponent.maxHp)) * 100}%`;
    }

    function calculateMultiplier(attackerTypes, defenderTypes) {
        let multiplier = 1;
        attackerTypes.forEach(attackType => {
            defenderTypes.forEach(defendType => {
                multiplier *= typeChart[attackType]?.[defendType] ?? 1;
            });
        });
        return multiplier;
    }

    function playHitSound(multiplier) {
        if (multiplier > 1) sfx.hitSuper.play();
        else if (multiplier < 1) sfx.hitWeak.play();
        else sfx.hitNormal.play();
    }

    async function playAttackFX(fxSrc, targetElement) {
        const fx = document.createElement('img');
        fx.src = fxSrc + `?v=${Date.now()}`; // 防止GIF緩存
        fx.className = 'attack-fx';
        const rect = targetElement.getBoundingClientRect();
        const containerRect = attackFxLayer.getBoundingClientRect();
        fx.style.left = `${rect.left - containerRect.left + rect.width / 2}px`;
        fx.style.top = `${rect.top - containerRect.top + rect.height / 2}px`;
        attackFxLayer.appendChild(fx);
        await new Promise(r => setTimeout(r, 900));
        fx.remove();
    }
    
    function nextQuestion() {
        currentQuestion = generateQuestion();
        questionText.textContent = currentQuestion.question;
        optionsContainer.innerHTML = '';
        currentQuestion.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.onclick = () => {
                sfx.select.play();
                checkAnswer(option);
            };
            optionsContainer.appendChild(button);
        });
        optionsContainer.style.pointerEvents = 'auto';
    }

    function generateQuestion() {
        const types = ['add', 'subtract', 'multiply', 'divide'];
        const type = types[Math.floor(Math.random() * types.length)];
        let question, answer;
        const num1 = Math.floor(Math.random() * 90) + 10, num2 = Math.floor(Math.random() * 90) + 10;
        const s_num1 = Math.floor(Math.random() * 9) + 1, s_num2 = Math.floor(Math.random() * 9) + 1;
        switch (type) {
            case 'add': question = `${num1} + ${num2} = ?`; answer = num1 + num2; break;
            case 'subtract': const [n1, n2] = [Math.max(num1, num2), Math.min(num1, num2)]; question = `${n1} - ${n2} = ?`; answer = n1 - n2; break;
            case 'multiply': question = `${s_num1} × ${s_num2} = ?`; answer = s_num1 * s_num2; break;
            case 'divide': const dividend = s_num1 * s_num2; question = `${dividend} ÷ ${s_num1} = ?`; answer = s_num2; break;
        }
        const options = generateOptions(answer);
        return { question, options, answer };
    }
    function generateOptions(correctAnswer) {
        let options = new Set([String(correctAnswer)]);
        while (options.size < 4) {
            const wrong = correctAnswer + Math.floor(Math.random() * 10) - 5;
            if (wrong !== correctAnswer && wrong >= 0) options.add(String(wrong));
        }
        return Array.from(options).sort(() => Math.random() - 0.5);
    }
    
    init();
});
