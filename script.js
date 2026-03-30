document.addEventListener('DOMContentLoaded', () => {
    // 遊戲資料
    const POKEMON_DATA = {
        // 16隻可選Pokémon，包含進化鏈，超級進化及極巨化
        bulbasaur: { name: 'Bulbasaur', type: ['Grass', 'Poison'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/bulbasaur.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/bulbasaur.gif', evolution: { name: 'Ivysaur', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/ivysaur.gif', evolution: { name: 'Venusaur', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/venusaur.gif', mega: {name: 'Mega Venusaur', back_img: 'https://img.pokemondb.net/sprites/xy/anim/back-normal/venusaur-mega.gif'} } } },
        charmander: { name: 'Charmander', type: ['Fire'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/charmander.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/charmander.gif', evolution: { name: 'Charmeleon', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/charmeleon.gif', evolution: { name: 'Charizard', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/charizard.gif', mega: {name: 'Mega Charizard Y', back_img: 'https://img.pokemondb.net/sprites/xy/anim/back-normal/charizard-mega-y.gif'} } } },
        squirtle: { name: 'Squirtle', type: ['Water'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/squirtle.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/squirtle.gif', evolution: { name: 'Wartortle', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/wartortle.gif', evolution: { name: 'Blastoise', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/blastoise.gif', mega: {name: 'Mega Blastoise', back_img: 'https://img.pokemondb.net/sprites/xy/anim/back-normal/blastoise-mega.gif'} } } },
        pichu: { name: 'Pichu', type: ['Electric'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/pichu.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/pichu.gif', evolution: { name: 'Pikachu', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/pikachu.gif', evolution: { name: 'Raichu', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/raichu.gif' } } },
        machop: { name: 'Machop', type: ['Fighting'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/machop.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/machop.gif', evolution: { name: 'Machoke', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/machoke.gif', evolution: { name: 'Machamp', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/machamp.gif', gmax: { name: 'Gigantamax Machamp', back_img: 'https://img.pokemondb.net/sprites/sword-shield/anim/back-normal/machamp-gigantamax.gif' } } } },
        gastly: { name: 'Gastly', type: ['Ghost', 'Poison'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/gastly.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/gastly.gif', evolution: { name: 'Haunter', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/haunter.gif', evolution: { name: 'Gengar', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/gengar.gif', gmax: { name: 'Gigantamax Gengar', back_img: 'https://img.pokemondb.net/sprites/sword-shield/anim/back-normal/gengar-gigantamax.gif' }} } },
        dratini: { name: 'Dratini', type: ['Dragon'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/dratini.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/dratini.gif', evolution: { name: 'Dragonair', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/dragonair.gif', evolution: { name: 'Dragonite', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/dragonite.gif' } } },
        larvitar: { name: 'Larvitar', type: ['Rock', 'Ground'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/larvitar.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/larvitar.gif', evolution: { name: 'Pupitar', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/pupitar.gif', evolution: { name: 'Tyranitar', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/tyranitar.gif', mega: {name: 'Mega Tyranitar', back_img: 'https://img.pokemondb.net/sprites/xy/anim/back-normal/tyranitar-mega.gif'} } } },
        bagon: { name: 'Bagon', type: ['Dragon'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/bagon.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/bagon.gif', evolution: { name: 'Shelgon', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/shelgon.gif', evolution: { name: 'Salamence', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/salamence.gif', mega: {name: 'Mega Salamence', back_img: 'https://img.pokemondb.net/sprites/xy/anim/back-normal/salamence-mega.gif'} } } },
        gible: { name: 'Gible', type: ['Dragon', 'Ground'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/gible.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/gible.gif', evolution: { name: 'Gabite', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/gabite.gif', evolution: { name: 'Garchomp', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/garchomp.gif', gmax: {name: 'Gigantamax Garchomp', back_img: 'https://img.pokemondb.net/sprites/sword-shield/anim/back-normal/garchomp-gigantamax.gif' } } } },
        eevee: { name: 'Eevee', type: ['Normal'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/eevee.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/eevee.gif', gmax: { name: 'Gigantamax Eevee', back_img: 'https://img.pokemondb.net/sprites/sword-shield/anim/back-normal/eevee-gigantamax.gif' }, evolution: { name: 'Vaporeon', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/vaporeon.gif' } }, // Simplified evolution for the game
        // 5 隻可選的傳說 Pokémon
        mew: { name: 'Mew', type: ['Psychic'], isLegendary: true, front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/mew.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/mew.gif' },
        celebi: { name: 'Celebi', type: ['Psychic', 'Grass'], isLegendary: true, front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/celebi.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/celebi.gif' },
        jirachi: { name: 'Jirachi', type: ['Steel', 'Psychic'], isLegendary: true, front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/jirachi.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/jirachi.gif' },
        victini: { name: 'Victini', type: ['Psychic', 'Fire'], isLegendary: true, front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/victini.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/victini.gif' },
        shaymin: { name: 'Shaymin', type: ['Grass'], isLegendary: true, front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/shaymin-land.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/shaymin-land.gif' },
    };

    const LEGENDARY_ENEMIES = {
        mewtwo: { name: 'Mewtwo', type: ['Psychic'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/mewtwo.gif' },
        lugia: { name: 'Lugia', type: ['Psychic', 'Flying'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/lugia.gif' },
        hooh: { name: 'Ho-Oh', type: ['Fire', 'Flying'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/ho-oh.gif' },
        rayquaza: { name: 'Rayquaza', type: ['Dragon', 'Flying'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/rayquaza.gif' },
        arceus: { name: 'Arceus', type: ['Normal'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/arceus.gif' }
    };
    
    // 屬性相剋表 (攻擊方 -> 防守方 -> 效果倍率)
    const TYPE_CHART = {
        'Normal': {'Rock': 0.5, 'Ghost': 0, 'Steel': 0.5},
        'Fire': {'Fire': 0.5, 'Water': 0.5, 'Grass': 2, 'Ice': 2, 'Bug': 2, 'Rock': 0.5, 'Dragon': 0.5, 'Steel': 2},
        'Water': {'Fire': 2, 'Water': 0.5, 'Grass': 0.5, 'Ground': 2, 'Rock': 2, 'Dragon': 0.5},
        'Electric': {'Water': 2, 'Electric': 0.5, 'Grass': 0.5, 'Ground': 0, 'Flying': 2, 'Dragon': 0.5},
        'Grass': {'Fire': 0.5, 'Water': 2, 'Grass': 0.5, 'Poison': 0.5, 'Ground': 2, 'Flying': 0.5, 'Bug': 0.5, 'Rock': 2, 'Dragon': 0.5, 'Steel': 0.5},
        'Fighting': {'Normal': 2, 'Ice': 2, 'Poison': 0.5, 'Flying': 0.5, 'Psychic': 0.5, 'Bug': 0.5, 'Rock': 2, 'Ghost': 0, 'Dark': 2, 'Steel': 2, 'Fairy': 0.5},
        'Poison': {'Grass': 2, 'Poison': 0.5, 'Ground': 0.5, 'Rock': 0.5, 'Ghost': 0.5, 'Steel': 0, 'Fairy': 2},
        'Ground': {'Fire': 2, 'Electric': 2, 'Grass': 0.5, 'Poison': 2, 'Flying': 0, 'Bug': 0.5, 'Rock': 2, 'Steel': 2},
        'Flying': {'Electric': 0.5, 'Grass': 2, 'Fighting': 2, 'Bug': 2, 'Rock': 0.5, 'Steel': 0.5},
        'Psychic': {'Fighting': 2, 'Poison': 2, 'Psychic': 0.5, 'Dark': 0, 'Steel': 0.5},
        'Bug': {'Fire': 0.5, 'Grass': 2, 'Fighting': 0.5, 'Poison': 0.5, 'Flying': 0.5, 'Psychic': 2, 'Ghost': 0.5, 'Dark': 2, 'Steel': 0.5, 'Fairy': 0.5},
        'Rock': {'Fire': 2, 'Ice': 2, 'Fighting': 0.5, 'Ground': 0.5, 'Flying': 2, 'Bug': 2, 'Steel': 0.5},
        'Ghost': {'Normal': 0, 'Psychic': 2, 'Ghost': 2, 'Dark': 0.5},
        'Dragon': {'Dragon': 2, 'Steel': 0.5, 'Fairy': 0},
        'Steel': {'Fire': 0.5, 'Water': 0.5, 'Electric': 0.5, 'Ice': 2, 'Rock': 2, 'Steel': 0.5, 'Fairy': 2}
    };


    // 遊戲狀態
    let state = {
        playerPokemon: null,
        enemyPokemon: null,
        playerHP: 100,
        enemyHP: 200, // 增加敵人血量
        evolutionCounter: 0,
        evolutionGoal: 5,
        currentQuestion: null,
    };
    
    // 音效 (為簡化，此處未實際加載，但保留了結構)
    const audio = {
        battleMusic: new Audio('https://www.youtube.com/watch?v=vGOPihbhs-A'), // 僅為示例
        victoryMusic: new Audio(),
        attackSound: new Audio(),
        evolutionSound: new Audio('https://www.youtube.com/watch?v=johJmKzCIzw') // 僅為示例
    };


    // DOM 元素
    const screens = {
        start: document.getElementById('start-screen'),
        selection: document.getElementById('selection-screen'),
        battle: document.getElementById('battle-screen'),
        end: document.getElementById('end-screen'),
    };
    const startButton = document.getElementById('start-button');
    const pokemonSelectionGrid = document.getElementById('pokemon-selection-grid');
    const confirmSelectionButton = document.getElementById('confirm-selection-button');
    const enemyPreviewImg = document.getElementById('enemy-preview-img');
    const enemyPreviewName = document.getElementById('enemy-preview-name');
    
    const playerName = document.getElementById('player-name');
    const playerHPBar = document.getElementById('player-hp-bar');
    const playerPokemonImg = document.getElementById('player-pokemon');
    const enemyName = document.getElementById('enemy-name');
    const enemyHPBar = document.getElementById('enemy-hp-bar');
    const enemyPokemonImg = document.getElementById('enemy-pokemon');
    const messageLog = document.getElementById('message-log');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const evoCounterSpan = document.getElementById('evo-counter');
    const evoGoalSpan = document.getElementById('evo-goal');
    
    const endMessage = document.getElementById('end-message');
    const captureResultImg = document.getElementById('capture-result-img');
    const captureText = document.getElementById('capture-text');
    const playAgainButton = document.getElementById('play-again-button');


    // 函數
    function switchScreen(screenName) {
        Object.values(screens).forEach(screen => screen.classList.add('hidden'));
        screens[screenName].classList.remove('hidden');
    }

    function initGame() {
        // 選擇隨機敵人
        const enemyKeys = Object.keys(LEGENDARY_ENEMIES);
        const randomEnemyKey = enemyKeys[Math.floor(Math.random() * enemyKeys.length)];
        state.enemyPokemon = { ...LEGENDARY_ENEMIES[randomEnemyKey], key: randomEnemyKey };

        // 更新敵人預覽
        enemyPreviewImg.src = state.enemyPokemon.front_img;
        enemyPreviewName.innerText = state.enemyPokemon.name;
        
        // 填充 Pokémon 選擇列表
        pokemonSelectionGrid.innerHTML = '';
        Object.keys(POKEMON_DATA).forEach(key => {
            const pokemon = POKEMON_DATA[key];
            const card = document.createElement('div');
            card.className = 'pokemon-card';
            card.dataset.key = key;
            card.innerHTML = `
                <img src="${pokemon.front_img}" alt="${pokemon.name}">
                <p>${pokemon.name}</p>
            `;
            card.addEventListener('click', () => {
                const selected = document.querySelector('.pokemon-card.selected');
                if (selected) selected.classList.remove('selected');
                card.classList.add('selected');
                state.playerPokemon = { ...pokemon, key: key, currentStage: 0 };
                confirmSelectionButton.disabled = false;
            });
            pokemonSelectionGrid.appendChild(card);
        });

        switchScreen('selection');
    }
    
    function startBattle() {
        // audio.battleMusic.play().catch(e => console.log("Autoplay blocked"));
        
        state.playerHP = 100;
        state.enemyHP = 200; // 確保敵人血量每次都重置
        state.evolutionCounter = 0;
        updateBattleUI();
        
        playerName.textContent = state.playerPokemon.name;
        playerPokemonImg.src = state.playerPokemon.back_img;
        enemyName.textContent = state.enemyPokemon.name;
        enemyPokemonImg.src = state.enemyPokemon.front_img;
        
        logMessage(`戰鬥開始！你派出了 ${state.playerPokemon.name}！`);
        logMessage(`對手是傳說中的 ${state.enemyPokemon.name}！`);
        
        switchScreen('battle');
        nextQuestion();
    }
    
    function updateBattleUI() {
        playerHPBar.style.width = `${state.playerHP}%`;
        enemyHPBar.style.width = `${state.enemyHP}%`;
        evoCounterSpan.textContent = state.evolutionCounter;
        evoGoalSpan.textContent = state.evolutionGoal;

        // 根據血量改變顏色
        playerHPBar.style.backgroundColor = state.playerHP > 50 ? '#4CAF50' : (state.playerHP > 20 ? '#FFC107' : '#F44336');
        enemyHPBar.style.backgroundColor = state.enemyHP > 50 ? '#4CAF50' : (state.enemyHP > 20 ? '#FFC107' : '#F44336');
    }

    function logMessage(msg) {
        messageLog.innerHTML += `<p>${msg}</p>`;
        messageLog.scrollTop = messageLog.scrollHeight;
    }

    // --- 數學題目生成 ---
    function generateQuestion() {
        const types = ['fraction', 'multiply', 'divide', 'subtract', 'add'];
        const type = types[Math.floor(Math.random() * types.length)];
        let question, answer;

        switch (type) {
            case 'fraction': {
                const a = Math.ceil(Math.random() * 9);
                const b = Math.ceil(Math.random() * 9);
                const common = Math.ceil(Math.random() * 4) + 1;
                question = `約簡分數: ${a * common}/${b * common}`;
                const gcd = (x, y) => (!y ? x : gcd(y, x % y));
                const divisor = gcd(a, b);
                answer = `${a / divisor}/${b / divisor}`;
                break;
            }
            case 'multiply': {
                const a = Math.ceil(Math.random() * 9);
                const b = Math.ceil(Math.random() * 9);
                question = `${a} × ${b} = ?`;
                answer = a * b;
                break;
            }
            case 'divide': {
                const divisor = Math.ceil(Math.random() * 8) + 1;
                const result = Math.ceil(Math.random() * 8) + 1;
                const dividend = divisor * result;
                question = `${dividend} ÷ ${divisor} = ?`;
                answer = result;
                break;
            }
            case 'subtract': {
                const a = Math.floor(Math.random() * 90) + 10;
                const b = Math.floor(Math.random() * (a - 1)) + 1;
                question = `${a} - ${b} = ?`;
                answer = a - b;
                break;
            }
            case 'add': {
                const a = Math.floor(Math.random() * 90) + 10;
                const b = Math.floor(Math.random() * 90) + 10;
                question = `${a} + ${b} = ?`;
                answer = a + b;
                break;
            }
        }
        
        const options = generateOptions(answer);
        return { question, answer, options };
    }
    
    function generateOptions(correctAnswer) {
        const options = new Set([correctAnswer]);
        if (typeof correctAnswer === 'string') { // 分數
            while (options.size < 4) {
                 const a = Math.ceil(Math.random() * 9);
                 const b = Math.ceil(Math.random() * 9);
                 options.add(`${a}/${b}`);
            }
        } else { // 數字
            while (options.size < 4) {
                const offset = Math.floor(Math.random() * 20) - 10;
                const wrongAnswer = correctAnswer + offset;
                if (wrongAnswer > 0 && wrongAnswer !== correctAnswer) {
                    options.add(wrongAnswer);
                }
            }
        }
        return Array.from(options).sort(() => Math.random() - 0.5);
    }
    
    function nextQuestion() {
        state.currentQuestion = generateQuestion();
        questionText.textContent = state.currentQuestion.question;
        optionsContainer.innerHTML = '';
        state.currentQuestion.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.onclick = () => checkAnswer(option);
            optionsContainer.appendChild(button);
        });
    }

    function checkAnswer(selectedAnswer) {
        optionsContainer.innerHTML = '<p>處理中...</p>'; // 防止重複點擊
        
        if (selectedAnswer == state.currentQuestion.answer) {
            logMessage("答對了！");
            playerAttack();
        } else {
            logMessage(`答錯了！正確答案是 ${state.currentQuestion.answer}`);
            enemyAttack();
        }
    }
    
    function getDamageMultiplier(attackerTypes, defenderTypes) {
        let multiplier = 1;
        attackerTypes.forEach(attackType => {
            defenderTypes.forEach(defendType => {
                if (TYPE_CHART[attackType] && TYPE_CHART[attackType][defendType] !== undefined) {
                    multiplier *= TYPE_CHART[attackType][defendType];
                }
            });
        });
        return multiplier;
    }

    function playerAttack() {
        const baseDamage = Math.floor(Math.random() * 10) + 15;
        const multiplier = getDamageMultiplier(state.playerPokemon.type, state.enemyPokemon.type);
        const totalDamage = Math.round(baseDamage * multiplier);
        
        state.enemyHP = Math.max(0, state.enemyHP - totalDamage);
        
        enemyPokemonImg.classList.add('attack-animation');
        setTimeout(() => enemyPokemonImg.classList.remove('attack-animation'), 500);

        logMessage(`${state.playerPokemon.name} 造成了 ${totalDamage} 點傷害！`);
        if (multiplier > 1) logMessage("效果絕佳！");
        if (multiplier < 1 && multiplier > 0) logMessage("效果不太好...");
        if (multiplier === 0) logMessage("沒有效果！");
        
        updateBattleUI();
        
        state.evolutionCounter++;
        updateBattleUI();

        setTimeout(() => {
            if (state.enemyHP <= 0) {
                endGame(true);
            } else {
                checkForEvolution();
            }
        }, 1000);
    }
    
    function checkForEvolution() {
         let evolved = false;
         // 第一次進化
         if (state.evolutionCounter >= state.evolutionGoal && state.playerPokemon.evolution && !state.playerPokemon.currentStage) {
            evolvePokemon(state.playerPokemon.evolution, 1);
            evolved = true;
         } 
         // 第二次進化
         else if (state.evolutionCounter >= state.evolutionGoal * 2 && state.playerPokemon.evolution && state.playerPokemon.evolution.evolution && state.playerPokemon.currentStage === 1) {
            evolvePokemon(state.playerPokemon.evolution.evolution, 2);
            evolved = true;
         }
         // 超級進化 / 極巨化
         else if (state.evolutionCounter >= state.evolutionGoal * 3 && state.playerPokemon.currentStage > 1) {
             if(state.playerPokemon.mega) {
                evolvePokemon(state.playerPokemon.mega, 3, true);
                evolved = true;
             } else if (state.playerPokemon.gmax) {
                 evolvePokemon(state.playerPokemon.gmax, 3, true);
                 evolved = true;
             }
         }

        if (evolved) {
             setTimeout(enemyAttack, 3000); // 進化後，給予敵人攻擊時間
        } else {
             setTimeout(enemyAttack, 500);
        }
    }
    
    function evolvePokemon(evolutionData, stage, isMega = false) {
        logMessage(`什麼？ ${state.playerPokemon.name} 正在進化！`);
        playerPokemonImg.classList.add('evolution-animation');
        // audio.evolutionSound.play();
        
        setTimeout(() => {
            playerPokemonImg.classList.remove('evolution-animation');
            const oldName = state.playerPokemon.name;
            state.playerPokemon = { ...state.playerPokemon, ...evolutionData, currentStage: stage };
            
            if(isMega) {
                logMessage(`${oldName} 超級進化成了 ${state.playerPokemon.name}！`);
            } else {
                logMessage(`${oldName} 進化成了 ${state.playerPokemon.name}！`);
            }
            
            playerPokemonImg.src = state.playerPokemon.back_img;
            playerName.textContent = state.playerPokemon.name;
        }, 2500);
    }

    function enemyAttack() {
        const baseDamage = Math.floor(Math.random() * 10) + 10;
        const multiplier = getDamageMultiplier(state.enemyPokemon.type, state.playerPokemon.type);
        const totalDamage = Math.round(baseDamage * multiplier);

        state.playerHP = Math.max(0, state.playerHP - totalDamage);
        
        playerPokemonImg.classList.add('attack-animation');
        setTimeout(() => playerPokemonImg.classList.remove('attack-animation'), 500);
        
        logMessage(`${state.enemyPokemon.name} 造成了 ${totalDamage} 點傷害！`);
        updateBattleUI();
        
        setTimeout(() => {
            if (state.playerHP <= 0) {
                endGame(false);
            } else {
                nextQuestion();
            }
        }, 1000);
    }
    
    function endGame(playerWon) {
        switchScreen('end');
        captureResultImg.classList.add('hidden');
        captureText.textContent = '';
        
        if (playerWon) {
            endMessage.textContent = '你贏了！';
            logMessage("你擊敗了對手！");
            
            setTimeout(() => {
                const captureChance = Math.random();
                if (captureChance < 0.5) {
                    captureResultImg.src = `https://img.pokemondb.net/sprites/items/poke-ball.png`;
                    captureResultImg.classList.remove('hidden');
                    captureText.textContent = `成功捕捉 ${state.enemyPokemon.name}！`;
                } else {
                    captureResultImg.src = state.enemyPokemon.front_img;
                    captureResultImg.classList.remove('hidden');
                    captureText.textContent = `噢，不！ ${state.enemyPokemon.name} 逃走了！`;
                }
            }, 1000);

        } else {
            endMessage.textContent = '遊戲結束';
            logMessage("你的 Pokémon 失去了戰鬥能力！");
        }
    }
    
    function resetGame() {
        state = {
            playerPokemon: null,
            enemyPokemon: null,
            playerHP: 100,
            enemyHP: 200,
            evolutionCounter: 0,
            evolutionGoal: 5,
            currentQuestion: null,
        };
        confirmSelectionButton.disabled = true;
        messageLog.innerHTML = '';
        switchScreen('start');
    }

    // 事件監聽
    startButton.addEventListener('click', initGame);
    confirmSelectionButton.addEventListener('click', startBattle);
    playAgainButton.addEventListener('click', resetGame);

    // 初始顯示開始畫面
    switchScreen('start');
});
