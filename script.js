document.addEventListener('DOMContentLoaded', () => {
    // --- DOM 元素 ---
    // (與 HTML 結構對應的所有 DOM 元素宣告)
    const attackFxLayer = document.getElementById('attack-fx-layer');
    
    // --- 音效庫 ---
    const sfx = { /* ... */ }; // (與 HTML 結構對應的音效宣告)

    // --- 攻擊特效資源 ---
    const attackEffects = {
        water: 'https://i.imgur.com/J4gqj8s.gif', // 水柱
        fire: 'https://i.imgur.com/Vp9pT2W.gif',  // 火焰
        electric: 'https://i.imgur.com/K7Mv3c2.gif', // 電擊
        grass: 'https://i.imgur.com/Y32t3a9.gif', // 飛葉
    };

    // --- 寶可夢資料庫 (NDS 像素風格) ---
    const pokemonDB = { /* ... */ }; // (與上版資料相同)
    Object.keys(pokemonDB).forEach(id => {
        const p = pokemonDB[id];
        // NDS 動態 Sprite (Gif)
        p.img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`;
        p.backImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/${id}.gif`;
        p.cry = `https://play.pokemonshowdown.com/audio/cries/${p.name.toLowerCase().replace('-','').replace('.','')}.mp3`;
    });

    let player, opponent, currentQuestion;

    // --- 遊戲主流程 ---
    function init() { /* ... */ }

    startButton.addEventListener('click', () => {
        // ... (與上版相同：選擇對手、更新預覽、切換畫面)
    });

    function selectPokemon(id) {
        // ... (與上版相同：設定玩家寶可夢)
        startBattle(); // 直接開始戰鬥
    }
    
    async function startBattle() {
        // 1. 重置 UI 狀態
        battleScreen.classList.remove('intro-start');
        playerPokemon.classList.remove('faint-animation');
        opponentPokemon.classList.remove('faint-animation');
        
        // 2. 載入寶可夢資料
        player.hp = 100; // 重置血量
        playerPokemon.src = pokemonDB[player.id].backImg;
        opponentPokemon.src = opponent.img;
        updateBattleUI();

        // 3. 播放 NDS 進場動畫
        switchScreen('battle');
        await new Promise(r => setTimeout(r, 50)); // 等待畫面切換
        battleScreen.classList.add('intro-start');

        // 4. 播放寶可夢吼聲
        await new Promise(r => setTimeout(r, 1000));
        new Audio(opponent.cry).play();
        await new Promise(r => setTimeout(r, 300));
        new Audio(pokemonDB[player.id].cry).play();
        
        // 5. 等待動畫結束後出題
        await new Promise(r => setTimeout(r, 500));
        nextQuestion();
    }

    // --- 核心戰鬥流程 (非同步動畫) ---
    async function checkAnswer(selectedAnswer) {
        optionsContainer.style.pointerEvents = 'none';
        
        const isCorrect = String(selectedAnswer) === String(currentQuestion.answer);

        if (isCorrect) {
            // 玩家攻擊回合
            const pData = pokemonDB[player.id];
            
            // 1. 攻擊動畫
            playerPokemon.classList.add('attack-charge');
            await new Promise(r => setTimeout(r, 500));
            playerPokemon.classList.remove('attack-charge');
            
            // 2. 播放屬性特效
            const attackType = pData.type[0]; // 取第一個屬性作為攻擊屬性
            if(attackEffects[attackType]){
                await playAttackFX(attackEffects[attackType], opponentPokemon);
            }
            
            // 3. 計算傷害與播放音效
            let multiplier = calculateMultiplier(pData.type, opponent.type);
            let damage = Math.round((Math.floor(Math.random() * 8) + 12) * multiplier);
            opponent.hp -= damage;
            opponentPokemon.classList.add('hit-reaction');
            playHitSound(multiplier);
            
        } else {
            // 對手攻擊回合 (簡化版)
            // ... (類似的動畫流程)
        }

        await new Promise(r => setTimeout(r, 500)); // 等待反應動畫結束
        opponentPokemon.classList.remove('hit-reaction');
        playerPokemon.classList.remove('hit-reaction');
        updateBattleUI();
        
        // 檢查勝負
        if (opponent.hp <= 0 || player.hp <= 0) {
            checkWinCondition();
        } else {
            nextQuestion();
        }
    }

    // --- 輔助函式 ---
    function calculateMultiplier(attackerTypes, defenderTypes) { /* ... */ return 1; }
    function playHitSound(multiplier) { /* ... */ }
    function updateBattleUI() { /* ... */ }
    
    // 播放攻擊特效
    async function playAttackFX(fxSrc, targetElement) {
        const fx = document.createElement('img');
        fx.src = fxSrc;
        fx.className = 'attack-fx';
        const rect = targetElement.getBoundingClientRect();
        const containerRect = attackFxLayer.getBoundingClientRect();
        fx.style.left = `${rect.left - containerRect.left + rect.width / 2}px`;
        fx.style.top = `${rect.top - containerRect.top + rect.height / 2}px`;
        attackFxLayer.appendChild(fx);
        await new Promise(r => setTimeout(r, 1000)); // 等待GIF播放
        fx.remove();
    }
    
    // ... (checkWinCondition, endGame, nextQuestion, generateQuestion 等函式，請沿用並稍作調整)

    init();
});
