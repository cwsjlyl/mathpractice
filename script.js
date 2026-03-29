document.addEventListener('DOMContentLoaded', () => {
    // --- DOM 元素 (與上一版相同) ---
    const screens = { /* ... */ };
    const gameContainer = document.getElementById('game-container');
    const floatingTextContainer = document.getElementById('floating-text-container');
    const chargeAttackButton = document.getElementById('charge-attack-button');
    const playerPokemonImg = document.getElementById('player-pokemon');
    const opponentPokemonImg = document.getElementById('opponent-pokemon');
    const startButton = document.getElementById('start-button');
    const restartButton = document.getElementById('restart-button');
    // ... (其他 DOM 元素)

    // --- 音效 (與上一版相同) ---
    const sounds = { /* ... */ };

    // --- 屬性相剋表 ---
    // 根據網上資料建立。 2: 超級效果, 0.5: 效果不好, 0: 沒有效果
    const typeChart = {
        normal: { rock: 0.5, ghost: 0, steel: 0.5 },
        fire: { fire: 0.5, water: 0.5, grass: 2, ice: 2, bug: 2, rock: 0.5, dragon: 0.5, steel: 2 },
        water: { fire: 2, water: 0.5, grass: 0.5, ground: 2, rock: 2, dragon: 0.5 },
        electric: { water: 2, electric: 0.5, grass: 0.5, ground: 0, flying: 2, dragon: 0.5 },
        grass: { fire: 0.5, water: 2, grass: 0.5, poison: 0.5, ground: 2, flying: 0.5, bug: 0.5, rock: 2, dragon: 0.5, steel: 0.5 },
        ice: { fire: 0.5, water: 0.5, grass: 2, ice: 0.5, ground: 2, flying: 2, dragon: 2, steel: 0.5 },
        fighting: { normal: 2, ice: 2, poison: 0.5, flying: 0.5, psychic: 0.5, bug: 0.5, rock: 2, ghost: 0, dark: 2, steel: 2, fairy: 0.5 },
        poison: { grass: 2, poison: 0.5, ground: 0.5, rock: 0.5, ghost: 0.5, steel: 0, fairy: 2 },
        ground: { fire: 2, electric: 2, grass: 0.5, poison: 2, flying: 0, bug: 0.5, rock: 2, steel: 2 },
        flying: { electric: 0.5, grass: 2, fighting: 2, bug: 2, rock: 0.5, steel: 0.5 },
        psychic: { fighting: 2, poison: 2, psychic: 0.5, dark: 0, steel: 0.5 },
        bug: { fire: 0.5, grass: 2, fighting: 0.5, poison: 0.5, flying: 0.5, psychic: 2, ghost: 0.5, dark: 2, steel: 0.5, fairy: 0.5 },
        rock: { fire: 2, ice: 2, fighting: 0.5, ground: 0.5, flying: 2, bug: 2, steel: 0.5 },
        ghost: { normal: 0, psychic: 2, ghost: 2, dark: 0.5 },
        dragon: { dragon: 2, steel: 0.5, fairy: 0 },
        dark: { fighting: 0.5, psychic: 2, ghost: 2, dark: 0.5, fairy: 0.5 },
        steel: { fire: 0.5, water: 0.5, electric: 0.5, ice: 2, rock: 2, steel: 0.5, fairy: 2 },
        fairy: { fire: 0.5, fighting: 2, poison: 0.5, dragon: 2, dark: 2, steel: 0.5 }
    };

    // --- 寶可夢資料庫 (重大更新) ---
    const pokemonDB = {
        // Kanto
        1: { name: "妙蛙種子", type: ["grass", "poison"], evolvesTo: 2, evolutionLevel: 4 },
        2: { name: "妙蛙草", type: ["grass", "poison"], evolvesTo: 3, evolutionLevel: 8 },
        3: { name: "妙蛙花", type: ["grass", "poison"], megaEvolvesTo: 10033, megaEvolutionLevel: 12 },
        4: { name: "小火龍", type: ["fire"], evolvesTo: 5, evolutionLevel: 4 },
        5: { name: "火恐龍", type: ["fire"], evolvesTo: 6, evolutionLevel: 8 },
        6: { name: "噴火龍", type: ["fire", "flying"], megaEvolvesTo: 10034, megaEvolutionLevel: 12 },
        7: { name: "傑尼龜", type: ["water"], evolvesTo: 8, evolutionLevel: 4 },
        8: { name: "卡咪龜", type: ["water"], evolvesTo: 9, evolutionLevel: 8 },
        9: { name: "水箭龜", type: ["water"], megaEvolvesTo: 10036, megaEvolutionLevel: 12 },
        // Johto
        152: { name: "菊草葉", type: ["grass"], evolvesTo: 153, evolutionLevel: 4 },
        153: { name: "月桂葉", type: ["grass"], evolvesTo: 154, evolutionLevel: 8 },
        154: { name: "大竺葵", type: ["grass"] },
        155: { name: "火球鼠", type: ["fire"], evolvesTo: 156, evolutionLevel: 4 },
        156: { name: "火岩鼠", type: ["fire"], evolvesTo: 157, evolutionLevel: 8 },
        157: { name: "火爆獸", type: ["fire"] },
        158: { name: "小鋸鱷", type: ["water"], evolvesTo: 159, evolutionLevel: 4 },
        159: { name: "藍鱷", type: ["water"], evolvesTo: 160, evolutionLevel: 8 },
        160: { name: "大力鱷", type: ["water"] },
        // Hoenn
        252: { name: "木守宮", type: ["grass"], evolvesTo: 253, evolutionLevel: 4 },
        253: { name: "森林蜥蜴", type: ["grass"], evolvesTo: 254, evolutionLevel: 8 },
        254: { name: "蜥蜴王", type: ["grass"] },
        255: { name: "火稚雞", type: ["fire"], evolvesTo: 256, evolutionLevel: 4 },
        256: { name: "力壯雞", type: ["fire", "fighting"], evolvesTo: 257, evolutionLevel: 8 },
        257: { name: "火焰雞", type: ["fire", "fighting"] },
        258: { name: "水躍魚", type: ["water"], evolvesTo: 259, evolutionLevel: 4 },
        259: { name: "沼躍魚", type: ["water", "ground"], evolvesTo: 260, evolutionLevel: 8 },
        260: { name: "巨沼怪", type: ["water", "ground"] },
        // Mega
        10033: { name: "超級妙蛙花", type: ["grass", "poison"] },
        10034: { name: "超級噴火龍X", type: ["fire", "dragon"] },
        10036: { name: "超級水箭龜", type: ["water"] },
        // Opponents
        144: { name: "急凍鳥", type: ["ice", "flying"] },
        145: { name: "閃電鳥", type: ["electric", "flying"] },
        146: { name: "火焰鳥", type: ["fire", "flying"] },
        150: { name: "超夢", type: ["psychic"] },
        249: { name: "洛奇亞", type: ["psychic", "flying"] },
    };

    // 自動填補圖片 URL
    Object.keys(pokemonDB).forEach(id => {
        const p = pokemonDB[id];
        p.img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
        p.backImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`;
        // Mega 的背面圖可能不存在，提供備用
        if (id > 10000) {
           p.backImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/mega/${id}.png` // 猜測路徑
        }
    });

    const selectablePokemonIds = [1, 4, 7, 152, 155, 158, 252, 255, 258]; // 9隻初始
    const legendaryOpponentIds = [144, 145, 146, 150, 249];

    let player, opponent, currentQuestion;

    function switchScreen(screenName) { /* ... */ }
    async function init() { /* ... */ }
    async function preloadAssets() { /* ... */ }
    function setupPokemonSelection() {
        // 調整Grid佈局以容納更多寶可夢
        const grid = document.getElementById('pokemon-selection');
        grid.style.gridTemplateColumns = 'repeat(3, 1fr)';
        grid.innerHTML = '';
        selectablePokemonIds.forEach(id => {
            const p = pokemonDB[id];
            const card = document.createElement('div');
            card.className = 'pokemon-card';
            card.dataset.id = id;
            card.innerHTML = `<img src="${p.img}" alt="${p.name}"><p>${p.name}</p>`;
            card.addEventListener('click', () => selectPokemon(id));
            grid.appendChild(card);
        });
    }
    
    function selectPokemon(id) {
        const base = pokemonDB[id];
        player = {
            id: id,
            baseId: id,
            name: base.name,
            type: base.type,
            hp: 100,
            maxHp: 100,
            xp: 0,
            chargeMeter: 0,
            // ... 複製其他進化相關屬性
        };
        Object.assign(player, (({ evolvesTo, evolutionLevel, megaEvolvesTo, megaEvolutionLevel }) => ({ evolvesTo, evolutionLevel, megaEvolvesTo, megaEvolutionLevel }))(base));
        startBattle();
    }
    
    function startBattle() {
        const opponentId = legendaryOpponentIds[Math.floor(Math.random() * legendaryOpponentIds.length)];
        const base = pokemonDB[opponentId];
        opponent = {
            id: opponentId,
            name: base.name,
            type: base.type,
            hp: 100,
            maxHp: 100,
            img: base.img
        };
        // ... (其他邏輯)
        switchScreen('battle');
        nextQuestion();
    }

    function updateBattleUI() { /* ... */ }

    // --- 特效函式 ---
    function showFloatingText(text, element, type) {
        // ... (與上一版相同)
    }

    // --- 核心戰鬥邏輯 (重大更新) ---
    function checkAnswer(selectedAnswer) {
        optionsContainer.style.pointerEvents = 'none'; // 防止重複點擊

        let isCorrect = String(selectedAnswer) === String(currentQuestion.answer);

        if (isCorrect) {
            // 玩家攻擊
            let damage = Math.floor(Math.random() * 8) + 10; // 基礎傷害 10-17
            let multiplier = 1;
            
            // 計算屬性加成
            player.type.forEach(attackType => {
                opponent.type.forEach(defendType => {
                    multiplier *= typeChart[attackType]?.[defendType] ?? 1;
                });
            });

            // 顯示屬性效果提示
            if (multiplier > 1) {
                showFloatingText('效果絕佳！', opponentPokemonImg, 'super-effective');
            } else if (multiplier < 1 && multiplier > 0) {
                showFloatingText('效果不太好...', opponentPokemonImg, 'not-very-effective');
            }

            damage = Math.round(damage * multiplier);
            opponent.hp -= damage;
            showFloatingText(`-${damage}`, opponentPokemonImg, 'damage');
            
            player.xp++;
            player.chargeMeter = Math.min(3, player.chargeMeter + 1);

            opponentPokemonImg.classList.add('attack-animation');
            gameContainer.classList.add('screen-shake');

        } else {
            // 玩家受傷
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

        let damage = Math.floor(Math.random() * 20) + 30; // 蓄力攻擊基礎傷害
        let multiplier = 1;

        // 計算屬性加成
        player.type.forEach(attackType => {
            opponent.type.forEach(defendType => {
                multiplier *= typeChart[attackType]?.[defendType] ?? 1;
            });
        });
        
        if (multiplier > 1) showFloatingText('效果絕佳！', opponentPokemonImg, 'super-effective');
        if (multiplier < 1 && multiplier > 0) showFloatingText('效果不太好...', opponentPokemonImg, 'not-very-effective');
        
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
    
    function nextQuestion() {
        // ... (生成題目邏輯)
        optionsContainer.style.pointerEvents = 'auto'; // 恢復按鈕點擊
    }

    async function evolvePlayer(evolutionId, isMega) {
        // ... (進化邏輯) ...
        const evolutionData = pokemonDB[evolutionId];
        // 更新屬性
        player.type = evolutionData.type;
        // ... (其他更新)
    }

    // ... (其他函式: checkEvolution, endGame, generateQuestion, init, etc. 保持不變)
    
    // --- 事件監聽 ---
    startButton.addEventListener('click', () => { /* ... */ });
    restartButton.addEventListener('click', () => {
        // 完整的重置邏輯
        location.reload(); 
    });
    chargeAttackButton.addEventListener('click', handleChargeAttack);

    init();
});
