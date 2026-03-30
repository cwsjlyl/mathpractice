document.addEventListener('DOMContentLoaded', () => {
    // --- 遊戲資料 ---
    const POKEMON_DATA = {
        // 擴充至24隻可選Pokémon
        bulbasaur: { name: 'Bulbasaur', type: ['Grass', 'Poison'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/bulbasaur.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/bulbasaur.gif', evolution: { name: 'Ivysaur', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/ivysaur.gif', evolution: { name: 'Venusaur', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/venusaur.gif', mega: {name: 'Mega Venusaur', back_img: 'https://img.pokemondb.net/sprites/xy/anim/back-normal/venusaur-mega.gif'} } } },
        charmander: { name: 'Charmander', type: ['Fire'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/charmander.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/charmander.gif', evolution: { name: 'Charmeleon', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/charmeleon.gif', evolution: { name: 'Charizard', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/charizard.gif', mega: {name: 'Mega Charizard Y', back_img: 'https://img.pokemondb.net/sprites/xy/anim/back-normal/charizard-mega-y.gif'} } } },
        squirtle: { name: 'Squirtle', type: ['Water'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/squirtle.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/squirtle.gif', evolution: { name: 'Wartortle', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/wartortle.gif', evolution: { name: 'Blastoise', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/blastoise.gif', mega: {name: 'Mega Blastoise', back_img: 'https://img.pokemondb.net/sprites/xy/anim/back-normal/blastoise-mega.gif'} } } },
        pichu: { name: 'Pichu', type: ['Electric'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/pichu.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/pichu.gif', evolution: { name: 'Pikachu', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/pikachu.gif', evolution: { name: 'Raichu', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/raichu.gif' } } },
        machop: { name: 'Machop', type: ['Fighting'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/machop.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/machop.gif', evolution: { name: 'Machoke', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/machoke.gif', evolution: { name: 'Machamp', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/machamp.gif' } } },
        gastly: { name: 'Gastly', type: ['Ghost', 'Poison'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/gastly.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/gastly.gif', evolution: { name: 'Haunter', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/haunter.gif', evolution: { name: 'Gengar', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/gengar.gif', mega: { name: 'Mega Gengar', back_img: 'https://img.pokemondb.net/sprites/xy/anim/back-normal/gengar-mega.gif' }} } },
        dratini: { name: 'Dratini', type: ['Dragon'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/dratini.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/dratini.gif', evolution: { name: 'Dragonair', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/dragonair.gif', evolution: { name: 'Dragonite', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/dragonite.gif' } } },
        larvitar: { name: 'Larvitar', type: ['Rock', 'Ground'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/larvitar.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/larvitar.gif', evolution: { name: 'Pupitar', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/pupitar.gif', evolution: { name: 'Tyranitar', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/tyranitar.gif', mega: {name: 'Mega Tyranitar', back_img: 'https://img.pokemondb.net/sprites/xy/anim/back-normal/tyranitar-mega.gif'} } } },
        bagon: { name: 'Bagon', type: ['Dragon'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/bagon.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/bagon.gif', evolution: { name: 'Shelgon', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/shelgon.gif', evolution: { name: 'Salamence', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/salamence.gif', mega: {name: 'Mega Salamence', back_img: 'https://img.pokemondb.net/sprites/xy/anim/back-normal/salamence-mega.gif'} } } },
        gible: { name: 'Gible', type: ['Dragon', 'Ground'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/gible.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/gible.gif', evolution: { name: 'Gabite', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/gabite.gif', evolution: { name: 'Garchomp', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/garchomp.gif', mega: {name: 'Mega Garchomp', back_img: 'https://img.pokemondb.net/sprites/xy/anim/back-normal/garchomp-mega.gif' } } } },
        eevee: { name: 'Eevee', type: ['Normal'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/eevee.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/eevee.gif', evolution: { name: 'Vaporeon', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/vaporeon.gif' } }, 
        abra: { name: 'Abra', type: ['Psychic'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/abra.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/abra.gif', evolution: { name: 'Kadabra', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/kadabra.gif', evolution: { name: 'Alakazam', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/alakazam.gif', mega: {name: 'Mega Alakazam', back_img: 'https://img.pokemondb.net/sprites/xy/anim/back-normal/alakazam-mega.gif'} } } },
        geodude: { name: 'Geodude', type: ['Rock', 'Ground'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/geodude.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/geodude.gif', evolution: { name: 'Graveler', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/graveler.gif', evolution: { name: 'Golem', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/golem.gif' } } },
        swinub: { name: 'Swinub', type: ['Ice', 'Ground'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/swinub.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/swinub.gif', evolution: { name: 'Piloswine', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/piloswine.gif', evolution: { name: 'Mamoswine', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/mamoswine.gif' } } },
        ralts: { name: 'Ralts', type: ['Psychic', 'Fairy'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/ralts.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/ralts.gif', evolution: { name: 'Kirlia', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/kirlia.gif', evolution: { name: 'Gardevoir', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/gardevoir.gif', mega: { name: 'Mega Gardevoir', back_img: 'https://img.pokemondb.net/sprites/xy/anim/back-normal/gardevoir-mega.gif' }} } },
        beldum: { name: 'Beldum', type: ['Steel', 'Psychic'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/beldum.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/beldum.gif', evolution: { name: 'Metang', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/metang.gif', evolution: { name: 'Metagross', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/metagross.gif', mega: { name: 'Mega Metagross', back_img: 'https://img.pokemondb.net/sprites/xy/anim/back-normal/metagross-mega.gif' }} } },
        // 8 隻可選的傳說 Pokémon (原5隻+新增3隻)
        mew: { name: 'Mew', type: ['Psychic'], isLegendary: true, front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/mew.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/mew.gif' },
        celebi: { name: 'Celebi', type: ['Psychic', 'Grass'], isLegendary: true, front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/celebi.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/celebi.gif' },
        jirachi: { name: 'Jirachi', type: ['Steel', 'Psychic'], isLegendary: true, front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/jirachi.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/jirachi.gif' },
        victini: { name: 'Victini', type: ['Psychic', 'Fire'], isLegendary: true, front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/victini.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/victini.gif' },
        shaymin: { name: 'Shaymin', type: ['Grass'], isLegendary: true, front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/shaymin-land.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/shaymin-land.gif' },
        darkrai: { name: 'Darkrai', type: ['Dark'], isLegendary: true, front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/darkrai.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/darkrai.gif' },
        manaphy: { name: 'Manaphy', type: ['Water'], isLegendary: true, front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/manaphy.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/manaphy.gif' },
        deoxys: { name: 'Deoxys', type: ['Psychic'], isLegendary: true, front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/deoxys-normal.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/deoxys-normal.gif' },
    };

    const LEGENDARY_ENEMIES = {
        mewtwo: { name: 'Mewtwo', type: ['Psychic'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/mewtwo.gif' },
        lugia: { name: 'Lugia', type: ['Psychic', 'Flying'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/lugia.gif' },
        hooh: { name: 'Ho-Oh', type: ['Fire', 'Flying'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/ho-oh.gif' },
        rayquaza: { name: 'Rayquaza', type: ['Dragon', 'Flying'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/rayquaza.gif' },
        arceus: { name: 'Arceus', type: ['Normal'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/arceus.gif' },
        dialga: { name: 'Dialga', type: ['Steel', 'Dragon'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/dialga.gif'},
        palkia: { name: 'Palkia', type: ['Water', 'Dragon'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/palkia.gif'},
        giratina: { name: 'Giratina', type: ['Ghost', 'Dragon'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/giratina-altered.gif'}
    };
    
    // 屬性相剋表
    const TYPE_CHART = { 'Normal': {'Rock': 0.5, 'Ghost': 0, 'Steel': 0.5},'Fire': {'Fire': 0.5, 'Water': 0.5, 'Grass': 2, 'Ice': 2, 'Bug': 2, 'Rock': 0.5, 'Dragon': 0.5, 'Steel': 2},'Water': {'Fire': 2, 'Water': 0.5, 'Grass': 0.5, 'Ground': 2, 'Rock': 2, 'Dragon': 0.5},'Electric': {'Water': 2, 'Electric': 0.5, 'Grass': 0.5, 'Ground': 0, 'Flying': 2, 'Dragon': 0.5},'Grass': {'Fire': 0.5, 'Water': 2, 'Grass': 0.5, 'Poison': 0.5, 'Ground': 2, 'Flying': 0.5, 'Bug': 0.5, 'Rock': 2, 'Dragon': 0.5, 'Steel': 0.5},'Ice': {'Fire': 0.5, 'Water': 0.5, 'Grass': 2, 'Ice': 0.5, 'Ground': 2, 'Flying': 2, 'Dragon': 2, 'Steel': 0.5},'Fighting': {'Normal': 2, 'Ice': 2, 'Poison': 0.5, 'Flying': 0.5, 'Psychic': 0.5, 'Bug': 0.5, 'Rock': 2, 'Ghost': 0, 'Dark': 2, 'Steel': 2, 'Fairy': 0.5},'Poison': {'Grass': 2, 'Poison': 0.5, 'Ground': 0.5, 'Rock': 0.5, 'Ghost': 0.5, 'Steel': 0, 'Fairy': 2},'Ground': {'Fire': 2, 'Electric': 2, 'Grass': 0.5, 'Poison': 2, 'Flying': 0, 'Bug': 0.5, 'Rock': 2, 'Steel': 2},'Flying': {'Electric': 0.5, 'Grass': 2, 'Fighting': 2, 'Bug': 2, 'Rock': 0.5, 'Steel': 0.5},'Psychic': {'Fighting': 2, 'Poison': 2, 'Psychic': 0.5, 'Dark': 0, 'Steel': 0.5},'Bug': {'Fire': 0.5, 'Grass': 2, 'Fighting': 0.5, 'Poison': 0.5, 'Flying': 0.5, 'Psychic': 2, 'Ghost': 0.5, 'Dark': 2, 'Steel': 0.5, 'Fairy': 0.5},'Rock': {'Fire': 2, 'Ice': 2, 'Fighting': 0.5, 'Ground': 0.5, 'Flying': 2, 'Bug': 2, 'Steel': 0.5},'Ghost': {'Normal': 0, 'Psychic': 2, 'Ghost': 2, 'Dark': 0.5},'Dragon': {'Dragon': 2, 'Steel': 0.5, 'Fairy': 0},'Dark': {'Fighting': 0.5, 'Psychic': 2, 'Ghost': 2, 'Dark': 0.5, 'Fairy': 0.5},'Steel': {'Fire': 0.5, 'Water': 0.5, 'Electric': 0.5, 'Ice': 2, 'Rock': 2, 'Steel': 0.5, 'Fairy': 2},'Fairy': {'Fire': 0.5, 'Fighting': 2, 'Poison': 0.5, 'Dragon': 2, 'Dark': 2, 'Steel': 0.5}};

    // --- 遊戲狀態 ---
    let gameState = {
        playerPokemonData: null,
        enemyPokemonData: null,
        playerCurrentHP: 100,
        playerMaxHP: 100,
        enemyCurrentHP: 350,
        enemyMaxHP: 350, // 增加敵人血量
        evolutionCounter: 0,
        attackBonus: 0, // 進化後增加的攻擊力
        currentQuestion: null,
        timerId: null,
        timerIntervalId: null,
    };
    
    // --- DOM 元素 ---
    const screens = {start: document.getElementById('start-screen'),selection: document.getElementById('selection-screen'),battle: document.getElementById('battle-screen'),end: document.getElementById('end-screen'),};
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
    const timerBar = document.getElementById('timer-bar');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const evoCounterSpan = document.getElementById('evo-counter');
    const endMessage = document.getElementById('end-message');
    const captureResultImg = document.getElementById('capture-result-img');
    const captureText = document.getElementById('capture-text');
    const playAgainSamePokemonButton = document.getElementById('play-again-same-pokemon-button');
    const playAgainNewPokemonButton = document.getElementById('play-again-new-pokemon-button');

    // --- 函數 ---
    function switchScreen(screenName) {
        Object.values(screens).forEach(screen => screen.classList.add('hidden'));
        screens[screenName].classList.remove('hidden');
    }

    function chooseNewEnemy() {
        const enemyKeys = Object.keys(LEGENDARY_ENEMIES);
        const randomEnemyKey = enemyKeys[Math.floor(Math.random() * enemyKeys.length)];
        gameState.enemyPokemonData = { ...LEGENDARY_ENEMIES[randomEnemyKey], key: randomEnemyKey };
    }

    function initGame() {
        chooseNewEnemy();
        // 更新敵人預覽
        enemyPreviewImg.src = gameState.enemyPokemonData.front_img;
        enemyPreviewName.innerText = gameState.enemyPokemonData.name;
        
        // 填充 Pokémon 選擇列表
        pokemonSelectionGrid.innerHTML = '';
        Object.keys(POKEMON_DATA).forEach(key => {
            const pokemon = POKEMON_DATA[key];
            const card = document.createElement('div');
            card.className = 'pokemon-card';
            card.dataset.key = key;
            card.innerHTML = `<img src="${pokemon.front_img}" alt="${pokemon.name}"><p>${pokemon.name}</p>`;
            card.addEventListener('click', () => {
                const selected = document.querySelector('.pokemon-card.selected');
                if (selected) selected.classList.remove('selected');
                card.classList.add('selected');
                // 創建一個可變的副本
                gameState.playerPokemonData = JSON.parse(JSON.stringify({ ...pokemon, key: key, currentStage: 0 }));
                confirmSelectionButton.disabled = false;
            });
            pokemonSelectionGrid.appendChild(card);
        });
        switchScreen('selection');
    }
    
    function startBattle(isNewRound) {
        if(isNewRound) chooseNewEnemy();

        // 重置狀態
        gameState.playerCurrentHP = 100;
        gameState.playerMaxHP = 100;
        gameState.enemyCurrentHP = gameState.enemyMaxHP;
        gameState.evolutionCounter = 0;
        gameState.attackBonus = 0;

        // 如果不是新回合，重置 Pokémon 到初始形態
        if (!isNewRound) {
             const initialPokemon = POKEMON_DATA[gameState.playerPokemonData.key];
             gameState.playerPokemonData = JSON.parse(JSON.stringify({ ...initialPokemon, key: gameState.playerPokemonData.key, currentStage: 0 }));
        }

        updateBattleUI();
        
        playerName.textContent = gameState.playerPokemonData.name;
        playerPokemonImg.src = gameState.playerPokemonData.back_img;
        enemyName.textContent = gameState.enemyPokemonData.name;
        enemyPokemonImg.src = gameState.enemyPokemonData.front_img;
        
        messageLog.innerHTML = ''; // 清空日誌
        logMessage(`戰鬥開始！你派出了 ${gameState.playerPokemonData.name}！`);
        logMessage(`對手是傳說中的 ${gameState.enemyPokemonData.name}！`);
        
        switchScreen('battle');
        nextQuestion();
    }
    
    function updateBattleUI() {
        playerHPBar.style.width = `${(gameState.playerCurrentHP / gameState.playerMaxHP) * 100}%`;
        enemyHPBar.style.width = `${(gameState.enemyCurrentHP / gameState.enemyMaxHP) * 100}%`;
        evoCounterSpan.textContent = gameState.evolutionCounter;

        playerHPBar.style.backgroundColor = gameState.playerCurrentHP > 50 ? '#4CAF50' : (gameState.playerCurrentHP > 20 ? '#FFC107' : '#F44336');
        enemyHPBar.style.backgroundColor = gameState.enemyCurrentHP / gameState.enemyMaxHP > 0.5 ? '#4CAF50' : (gameState.enemyCurrentHP / gameState.enemyMaxHP > 0.2 ? '#FFC107' : '#F44336');
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
            case 'multiply': { const a = Math.ceil(Math.random() * 9); const b = Math.ceil(Math.random() * 9); question = `${a} × ${b} = ?`; answer = a * b; break; }
            case 'divide': { const divisor = Math.ceil(Math.random() * 8) + 1; const result = Math.ceil(Math.random() * 8) + 1; const dividend = divisor * result; question = `${dividend} ÷ ${divisor} = ?`; answer = result; break; }
            case 'subtract': { const a = Math.floor(Math.random() * 90) + 10; const b = Math.floor(Math.random() * (a - 1)) + 1; question = `${a} - ${b} = ?`; answer = a - b; break; }
            case 'add': { const a = Math.floor(Math.random() * 90) + 10; const b = Math.floor(Math.random() * 90) + 10; question = `${a} + ${b} = ?`; answer = a + b; break; }
        }
        
        const options = generateOptions(answer);
        return { question, answer, options };
    }
    
    function generateOptions(correctAnswer) {
        const options = new Set([correctAnswer]);
        if (typeof correctAnswer === 'string') {
            while (options.size < 4) { const a = Math.ceil(Math.random() * 9); const b = Math.ceil(Math.random() * 9); if(b !== 0) options.add(`${a}/${b}`); }
        } else {
            while (options.size < 4) { const offset = Math.floor(Math.random() * 20) - 10; const wrongAnswer = correctAnswer + offset; if (wrongAnswer >= 0 && wrongAnswer !== correctAnswer) { options.add(wrongAnswer); } }
        }
        return Array.from(options).sort(() => Math.random() - 0.5);
    }
    
    function nextQuestion() {
        clearTimeout(gameState.timerId);
        clearInterval(gameState.timerIntervalId);

        gameState.currentQuestion = generateQuestion();
        questionText.textContent = gameState.currentQuestion.question;
        optionsContainer.innerHTML = '';
        gameState.currentQuestion.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.onclick = () => checkAnswer(option);
            optionsContainer.appendChild(button);
        });

        // 重置並開始計時器
        let timeLeft = 10;
        timerBar.style.transition = 'none';
        timerBar.style.width = '100%';
        timerBar.style.backgroundColor = '#4CAF50';
        
        // 强制重绘
        void timerBar.offsetWidth; 

        timerBar.style.transition = 'width 10s linear';
        timerBar.style.width = '0%';

        gameState.timerIntervalId = setInterval(() => {
            timeLeft--;
             if(timeLeft <= 3) timerBar.style.backgroundColor = '#F44336';
        }, 1000);
        
        gameState.timerId = setTimeout(() => {
            clearInterval(gameState.timerIntervalId);
            logMessage("時間到！");
            enemyAttack();
        }, 10000);
    }

    function clearTimers() {
        clearTimeout(gameState.timerId);
        clearInterval(gameState.timerIntervalId);
    }

    function checkAnswer(selectedAnswer) {
        clearTimers();
        optionsContainer.innerHTML = '<p>處理中...</p>';
        
        if (selectedAnswer == gameState.currentQuestion.answer) {
            logMessage("答對了！");
            playerAttack();
        } else {
            logMessage(`答錯了！正確答案是 ${gameState.currentQuestion.answer}`);
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
        const baseDamage = Math.floor(Math.random() * 5) + 20 + gameState.attackBonus;
        const multiplier = getDamageMultiplier(gameState.playerPokemonData.type, gameState.enemyPokemonData.type);
        const totalDamage = Math.round(baseDamage * multiplier);
        
        gameState.enemyCurrentHP = Math.max(0, gameState.enemyCurrentHP - totalDamage);
        
        enemyPokemonImg.classList.add('attack-animation');
        setTimeout(() => enemyPokemonImg.classList.remove('attack-animation'), 500);

        logMessage(`${gameState.playerPokemonData.name} 造成了 ${totalDamage} 點傷害！`);
        if (multiplier > 1) logMessage("效果絕佳！");
        if (multiplier < 1 && multiplier > 0) logMessage("效果不太好...");
        if (multiplier === 0) logMessage("沒有效果！");
        
        updateBattleUI();
        
        gameState.evolutionCounter++;
        
        setTimeout(() => {
            if (gameState.enemyCurrentHP <= 0) {
                endGame(true);
            } else {
                checkForEvolution();
            }
        }, 1000);
    }
    
    function checkForEvolution() {
         let evolved = false;
         const { evolutionCounter, playerPokemonData } = gameState;
         // 第一次進化 (4題)
         if (evolutionCounter >= 4 && playerPokemonData.evolution && playerPokemonData.currentStage === 0) {
            evolvePokemon(playerPokemonData.evolution, 1);
            evolved = true;
         } 
         // 第二次進化 (8題)
         else if (evolutionCounter >= 8 && playerPokemonData.evolution && playerPokemonData.evolution.evolution && playerPokemonData.currentStage === 1) {
            evolvePokemon(playerPokemonData.evolution.evolution, 2);
            evolved = true;
         }
         // 超級進化 / 極巨化 (12題)
         else if (evolutionCounter >= 12 && playerPokemonData.currentStage === 2) {
             if(playerPokemonData.mega) { evolvePokemon(playerPokemonData.mega, 3, true); evolved = true; } 
         }

        if (evolved) {
             setTimeout(enemyAttack, 3000);
        } else {
             setTimeout(enemyAttack, 500);
        }
    }
    
    function evolvePokemon(evolutionData, stage, isMega = false) {
        logMessage(`什麼？ ${gameState.playerPokemonData.name} 正在進化！`);
        playerPokemonImg.classList.add('evolution-animation');
        
        setTimeout(() => {
            playerPokemonImg.classList.remove('evolution-animation');
            const oldName = gameState.playerPokemonData.name;
            
            // 更新 Pokémon 資料
            Object.assign(gameState.playerPokemonData, evolutionData);
            gameState.playerPokemonData.currentStage = stage;
            
            // 進化獎勵
            gameState.attackBonus += 5;
            gameState.playerCurrentHP = Math.min(gameState.playerMaxHP, gameState.playerCurrentHP + 20);

            logMessage(isMega ? `${oldName} 超級進化成了 ${gameState.playerPokemonData.name}！` : `${oldName} 進化成了 ${gameState.playerPokemonData.name}！`);
            logMessage(`${gameState.playerPokemonData.name} 的攻擊力提升了，並回復了少量生命值！`);

            playerPokemonImg.src = gameState.playerPokemonData.back_img;
            playerName.textContent = gameState.playerPokemonData.name;
            updateBattleUI();
        }, 2500);
    }

    function enemyAttack() {
        optionsContainer.innerHTML = '';
        const baseDamage = Math.floor(Math.random() * 10) + 15;
        const multiplier = getDamageMultiplier(gameState.enemyPokemonData.type, gameState.playerPokemonData.type);
        const totalDamage = Math.round(baseDamage * multiplier);

        gameState.playerCurrentHP = Math.max(0, gameState.playerCurrentHP - totalDamage);
        
        playerPokemonImg.classList.add('attack-animation');
        setTimeout(() => playerPokemonImg.classList.remove('attack-animation'), 500);
        
        logMessage(`${gameState.enemyPokemonData.name} 造成了 ${totalDamage} 點傷害！`);
        updateBattleUI();
        
        setTimeout(() => {
            if (gameState.playerCurrentHP <= 0) {
                endGame(false);
            } else {
                nextQuestion();
            }
        }, 1000);
    }
    
    function endGame(playerWon) {
        clearTimers();
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
                    captureText.textContent = `成功捕捉 ${gameState.enemyPokemonData.name}！`;
                } else {
                    captureResultImg.src = gameState.enemyPokemonData.front_img;
                    captureResultImg.classList.remove('hidden');
                    captureText.textContent = `噢，不！ ${gameState.enemyPokemonData.name} 逃走了！`;
                }
            }, 1000);

        } else {
            endMessage.textContent = '遊戲結束';
            logMessage("你的 Pokémon 失去了戰鬥能力！");
        }
    }
    
    // --- 事件監聽 ---
    startButton.addEventListener('click', initGame);
    confirmSelectionButton.addEventListener('click', () => startBattle(false));
    playAgainSamePokemonButton.addEventListener('click', () => startBattle(true));
    playAgainNewPokemonButton.addEventListener('click', () => {
        confirmSelectionButton.disabled = true;
        initGame();
    });

    // 初始顯示開始畫面
    switchScreen('start');
});
