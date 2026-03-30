document.addEventListener('DOMContentLoaded', () => {
    // --- 遊戲資料 ---
    // 修正了重複的鍵值，並擴充到40隻
    const POKEMON_DATA = {
        // 經典御三家
        bulbasaur: { name: 'Bulbasaur', type: ['Grass', 'Poison'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/bulbasaur.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/bulbasaur.gif', evolution: { name: 'Ivysaur', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/ivysaur.gif', evolution: { name: 'Venusaur', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/venusaur.gif', mega: {name: 'Mega Venusaur', back_img: 'https://img.pokemondb.net/sprites/xy/anim/back-normal/venusaur-mega.gif'} } } },
        charmander: { name: 'Charmander', type: ['Fire'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/charmander.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/charmander.gif', evolution: { name: 'Charmeleon', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/charmeleon.gif', evolution: { name: 'Charizard', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/charizard.gif', mega: {name: 'Mega Charizard Y', back_img: 'https://img.pokemondb.net/sprites/xy/anim/back-normal/charizard-mega-y.gif'} } } },
        squirtle: { name: 'Squirtle', type: ['Water'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/squirtle.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/squirtle.gif', evolution: { name: 'Wartortle', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/wartortle.gif', evolution: { name: 'Blastoise', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/blastoise.gif', mega: {name: 'Mega Blastoise', back_img: 'https://img.pokemondb.net/sprites/xy/anim/back-normal/blastoise-mega.gif'} } } },
        // 經典進化鏈
        caterpie: { name: 'Caterpie', type: ['Bug'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/caterpie.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/caterpie.gif', evolution: { name: 'Metapod', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/metapod.gif', evolution: { name: 'Butterfree', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/butterfree.gif' }}},
        weedle: { name: 'Weedle', type: ['Bug', 'Poison'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/weedle.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/weedle.gif', evolution: { name: 'Kakuna', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/kakuna.gif', evolution: { name: 'Beedrill', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/beedrill.gif' }}},
        pidgey: { name: 'Pidgey', type: ['Normal', 'Flying'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/pidgey.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/pidgey.gif', evolution: { name: 'Pidgeotto', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/pidgeotto.gif', evolution: { name: 'Pidgeot', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/pidgeot.gif' }}},
        nidoran_m: { name: 'Nidoran♂', type: ['Poison'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/nidoran-m.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/nidoran-m.gif', evolution: { name: 'Nidorino', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/nidorino.gif', evolution: { name: 'Nidoking', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/nidoking.gif' }}},
        poliwag: { name: 'Poliwag', type: ['Water'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/poliwag.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/poliwag.gif', evolution: { name: 'Poliwhirl', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/poliwhirl.gif', evolution: { name: 'Poliwrath', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/poliwrath.gif' }}},
        abra: { name: 'Abra', type: ['Psychic'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/abra.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/abra.gif', evolution: { name: 'Kadabra', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/kadabra.gif', evolution: { name: 'Alakazam', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/alakazam.gif', mega: {name: 'Mega Alakazam', back_img: 'https://img.pokemondb.net/sprites/xy/anim/back-normal/alakazam-mega.gif'} } } },
        machop: { name: 'Machop', type: ['Fighting'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/machop.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/machop.gif', evolution: { name: 'Machoke', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/machoke.gif', evolution: { name: 'Machamp', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/machamp.gif', gmax: { name: 'Gigantamax Machamp', back_img: 'https://img.pokemondb.net/sprites/sword-shield/anim/back-normal/machamp-gigantamax.gif' } } } },
        bellsprout: { name: 'Bellsprout', type: ['Grass', 'Poison'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/bellsprout.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/bellsprout.gif', evolution: { name: 'Weepinbell', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/weepinbell.gif', evolution: { name: 'Victreebel', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/victreebel.gif' }}},
        geodude: { name: 'Geodude', type: ['Rock', 'Ground'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/geodude.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/geodude.gif', evolution: { name: 'Graveler', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/graveler.gif', evolution: { name: 'Golem', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/golem.gif' }}},
        magnemite: { name: 'Magnemite', type: ['Electric', 'Steel'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/magnemite.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/magnemite.gif', evolution: { name: 'Magneton', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/magneton.gif', evolution: { name: 'Magnezone', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/magnezone.gif' }}},
        gastly: { name: 'Gastly', type: ['Ghost', 'Poison'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/gastly.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/gastly.gif', evolution: { name: 'Haunter', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/haunter.gif', evolution: { name: 'Gengar', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/gengar.gif', gmax: { name: 'Gigantamax Gengar', back_img: 'https://img.pokemondb.net/sprites/sword-shield/anim/back-normal/gengar-gigantamax.gif' }} } },
        horsea: { name: 'Horsea', type: ['Water'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/horsea.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/horsea.gif', evolution: { name: 'Seadra', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/seadra.gif', evolution: { name: 'Kingdra', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/kingdra.gif' }}},
        magikarp: { name: 'Magikarp', type: ['Water'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/magikarp.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/magikarp.gif', evolution: { name: 'Gyarados', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/gyarados.gif', mega: { name: 'Mega Gyarados', back_img: 'https://img.pokemondb.net/sprites/xy/anim/back-normal/gyarados-mega.gif' }}},
        eevee: { name: 'Eevee', type: ['Normal'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/eevee.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/eevee.gif', evolution: { name: 'Vaporeon', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/vaporeon.gif' }},
        pichu: { name: 'Pichu', type: ['Electric'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/pichu.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/pichu.gif', evolution: { name: 'Pikachu', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/pikachu.gif', evolution: { name: 'Raichu', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/raichu.gif' } } },
        dratini: { name: 'Dratini', type: ['Dragon'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/dratini.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/dratini.gif', evolution: { name: 'Dragonair', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/dragonair.gif', evolution: { name: 'Dragonite', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/dragonite.gif' } } },
        // 豐緣御三家
        treecko: { name: 'Treecko', type: ['Grass'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/treecko.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/treecko.gif', evolution: { name: 'Grovyle', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/grovyle.gif', evolution: { name: 'Sceptile', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/sceptile.gif', mega: { name: 'Mega Sceptile', back_img: 'https://img.pokemondb.net/sprites/xy/anim/back-normal/sceptile-mega.gif' } }}},
        torchic: { name: 'Torchic', type: ['Fire'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/torchic.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/torchic.gif', evolution: { name: 'Combusken', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/combusken.gif', evolution: { name: 'Blaziken', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/blaziken.gif', mega: { name: 'Mega Blaziken', back_img: 'https://img.pokemondb.net/sprites/xy/anim/back-normal/blaziken-mega.gif' } }}},
        mudkip: { name: 'Mudkip', type: ['Water'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/mudkip.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/mudkip.gif', evolution: { name: 'Marshtomp', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/marshtomp.gif', evolution: { name: 'Swampert', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/swampert.gif', mega: { name: 'Mega Swampert', back_img: 'https://img.pokemondb.net/sprites/xy/anim/back-normal/swampert-mega.gif' } }}},
        // 準神
        larvitar: { name: 'Larvitar', type: ['Rock', 'Ground'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/larvitar.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/larvitar.gif', evolution: { name: 'Pupitar', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/pupitar.gif', evolution: { name: 'Tyranitar', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/tyranitar.gif', mega: {name: 'Mega Tyranitar', back_img: 'https://img.pokemondb.net/sprites/xy/anim/back-normal/tyranitar-mega.gif'} } } },
        ralts: { name: 'Ralts', type: ['Psychic', 'Fairy'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/ralts.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/ralts.gif', evolution: { name: 'Kirlia', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/kirlia.gif', evolution: { name: 'Gardevoir', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/gardevoir.gif', mega: { name: 'Mega Gardevoir', back_img: 'https://img.pokemondb.net/sprites/xy/anim/back-normal/gardevoir-mega.gif' }} } },
        bagon: { name: 'Bagon', type: ['Dragon'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/bagon.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/bagon.gif', evolution: { name: 'Shelgon', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/shelgon.gif', evolution: { name: 'Salamence', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/salamence.gif', mega: {name: 'Mega Salamence', back_img: 'https://img.pokemondb.net/sprites/xy/anim/back-normal/salamence-mega.gif'} } } },
        beldum: { name: 'Beldum', type: ['Steel', 'Psychic'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/beldum.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/beldum.gif', evolution: { name: 'Metang', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/metang.gif', evolution: { name: 'Metagross', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/metagross.gif', mega: { name: 'Mega Metagross', back_img: 'https://img.pokemondb.net/sprites/xy/anim/back-normal/metagross-mega.gif' }} } },
        gible: { name: 'Gible', type: ['Dragon', 'Ground'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/gible.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/gible.gif', evolution: { name: 'Gabite', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/gabite.gif', evolution: { name: 'Garchomp', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/garchomp.gif', mega: {name: 'Mega Garchomp', back_img: 'https://img.pokemondb.net/sprites/xy/anim/back-normal/garchomp-mega.gif' } } } },
        deino: { name: 'Deino', type: ['Dark', 'Dragon'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/deino.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/deino.gif', evolution: { name: 'Zweilous', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/zweilous.gif', evolution: { name: 'Hydreigon', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/hydreigon.gif' }}},
        goomy: { name: 'Goomy', type: ['Dragon'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/goomy.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/goomy.gif', evolution: { name: 'Sliggoo', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/sliggoo.gif', evolution: { name: 'Goodra', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/goodra.gif' }}},
        // 其他人氣Pokémon
        swinub: { name: 'Swinub', type: ['Ice', 'Ground'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/swinub.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/swinub.gif', evolution: { name: 'Piloswine', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/piloswine.gif', evolution: { name: 'Mamoswine', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/mamoswine.gif' }}},
        riolu: { name: 'Riolu', type: ['Fighting'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/riolu.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/riolu.gif', evolution: { name: 'Lucario', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/lucario.gif', mega: { name: 'Mega Lucario', back_img: 'https://img.pokemondb.net/sprites/xy/anim/back-normal/lucario-mega.gif' } } },
        shinx: { name: 'Shinx', type: ['Electric'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/shinx.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/shinx.gif', evolution: { name: 'Luxio', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/luxio.gif', evolution: { name: 'Luxray', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/luxray.gif' }}},
        litwick: { name: 'Litwick', type: ['Ghost', 'Fire'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/litwick.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/litwick.gif', evolution: { name: 'Lampent', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/lampent.gif', evolution: { name: 'Chandelure', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/chandelure.gif' }}},
        axew: { name: 'Axew', type: ['Dragon'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/axew.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/axew.gif', evolution: { name: 'Fraxure', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/fraxure.gif', evolution: { name: 'Haxorus', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/haxorus.gif' }}},
        honedge: { name: 'Honedge', type: ['Steel', 'Ghost'], front_img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/honedge.gif', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/honedge.gif', evolution: { name: 'Doublade', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/doublade.gif', evolution: { name: 'Aegislash', back_img: 'https://img.pokemondb.net/sprites/black-white/anim/back-normal/aegislash-shield.gif' }}},
        // 阿羅拉御三家
        rowlet: { name: 'Rowlet', type: ['Grass', 'Flying'], front_img: 'https://img.pokemondb.net/sprites/sun-moon/anim/normal/rowlet.gif', back_img: 'https://img.pokemondb.net/sprites/sun-moon/anim/back-normal/rowlet.gif', evolution: { name: 'Dartrix', back_img: 'https://img.pokemondb.net/sprites/sun-moon/anim/back-normal/dartrix.gif', evolution: { name: 'Decidueye', back_img: 'https://img.pokemondb.net/sprites/sun-moon/anim/back-normal/decidueye.gif' }}},
        litten: { name: 'Litten', type: ['Fire'], front_img: 'https://img.pokemondb.net/sprites/sun-moon/anim/normal/litten.gif', back_img: 'https://img.pokemondb.net/sprites/sun-moon/anim/back-normal/litten.gif', evolution: { name: 'Torracat', back_img: 'https://img.pokemondb.net/sprites/sun-moon/anim/back-normal/torracat.gif', evolution: { name: 'Incineroar', back_img: 'https://img.pokemondb.net/sprites/sun-moon/anim/back-normal/incineroar.gif' }}},
        popplio: { name: 'Popplio', type: ['Water'], front_img: 'https://img.pokemondb.net/sprites/sun-moon/anim/normal/popplio.gif', back_img: 'https://img.pokemondb.net/sprites/sun-moon/anim/back-normal/popplio.gif', evolution: { name: 'Brionne', back_img: 'https://img.pokemondb.net/sprites/sun-moon/anim/back-normal/brionne.gif', evolution: { name: 'Primarina', back_img: 'https://img.pokemondb.net/sprites/sun-moon/anim/back-normal/primarina.gif' }}},

        // 8隻可選傳說
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
        enemyMaxHP: 350,
        evolutionCounter: 0,
        attackBonus: 0,
        isLegendaryMode: false,
        currentQuestion: null,
        timerId: null,
    };
    
    // --- DOM 元素 ---
    const screens = {start: document.getElementById('start-screen'),selection: document.getElementById('selection-screen'),battle: document.getElementById('battle-screen'),end: document.getElementById('end-screen'),};
    const startButton = document.getElementById('start-button');
    const selectionTitle = document.getElementById('selection-title');
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
    const playAgainNewPokemonButton = document.getElementById('play-again-new-pokemon-button');
    const playAgainLegendaryButton = document.getElementById('play-again-legendary-button');

    // --- 函數 ---
    function switchScreen(screenName) {
        Object.values(screens).forEach(screen => screen.classList.add('hidden'));
        screens[screenName].classList.remove('hidden');
    }

    function chooseNewEnemy() {
        const enemyKeys = Object.keys(LEGENDARY_ENEMIES);
        let randomEnemyKey = enemyKeys[Math.floor(Math.random() * enemyKeys.length)];
        if (gameState.enemyPokemonData && randomEnemyKey === gameState.enemyPokemonData.key) {
            randomEnemyKey = enemyKeys[(enemyKeys.indexOf(randomEnemyKey) + 1) % enemyKeys.length];
        }
        gameState.enemyPokemonData = { ...LEGENDARY_ENEMIES[randomEnemyKey], key: randomEnemyKey };
    }

    function populateSelectionGrid(isLegendary) {
        gameState.isLegendaryMode = isLegendary;
        chooseNewEnemy();
        
        selectionTitle.textContent = isLegendary ? "選擇傳說 Pokémon" : "選擇你的 Pokémon";
        enemyPreviewImg.src = gameState.enemyPokemonData.front_img;
        enemyPreviewName.innerText = gameState.enemyPokemonData.name;
        
        pokemonSelectionGrid.innerHTML = '';
        const pokemonToDisplay = Object.keys(POKEMON_DATA).filter(key => !!POKEMON_DATA[key].isLegendary === isLegendary);

        pokemonToDisplay.forEach(key => {
            const pokemon = POKEMON_DATA[key];
            const card = document.createElement('div');
            card.className = 'pokemon-card';
            card.dataset.key = key;
            card.innerHTML = `<img src="${pokemon.front_img}" alt="${pokemon.name}"><p>${pokemon.name}</p>`;
            card.addEventListener('click', () => {
                const selected = document.querySelector('.pokemon-card.selected');
                if (selected) selected.classList.remove('selected');
                card.classList.add('selected');
                gameState.playerPokemonData = JSON.parse(JSON.stringify({ ...pokemon, key: key, currentStage: 0 }));
                confirmSelectionButton.disabled = false;
            });
            pokemonSelectionGrid.appendChild(card);
        });
        switchScreen('selection');
    }
    
    function startBattle() {
        if (!gameState.isLegendaryMode) {
             const initialPokemon = POKEMON_DATA[gameState.playerPokemonData.key];
             gameState.playerPokemonData = JSON.parse(JSON.stringify({ ...initialPokemon, key: gameState.playerPokemonData.key, currentStage: 0 }));
        }

        gameState.playerCurrentHP = 100;
        gameState.playerMaxHP = 100;
        gameState.enemyCurrentHP = gameState.enemyMaxHP;
        gameState.evolutionCounter = 0;
        gameState.attackBonus = 0;
        
        if(gameState.isLegendaryMode) gameState.attackBonus = 40;
        
        updateBattleUI();
        
        playerName.textContent = gameState.playerPokemonData.name;
        playerPokemonImg.src = gameState.playerPokemonData.back_img;
        enemyName.textContent = gameState.enemyPokemonData.name;
        enemyPokemonImg.src = gameState.enemyPokemonData.front_img;
        
        messageLog.innerHTML = '';
        logMessage(`戰鬥開始！你派出了 ${gameState.playerPokemonData.name}！`);
        logMessage(`對手是傳說中的 ${gameState.enemyPokemonData.name}！`);
        
        switchScreen('battle');
        nextQuestion();
    }
    
    function updateBattleUI() {
        playerHPBar.style.width = `${(gameState.playerCurrentHP / gameState.playerMaxHP) * 100}%`;
        enemyHPBar.style.width = `${(gameState.enemyCurrentHP / gameState.enemyMaxHP) * 100}%`;
        evoCounterSpan.textContent = gameState.evolutionCounter;

        playerHPBar.style.backgroundColor = gameState.playerCurrentHP / gameState.playerMaxHP > 0.5 ? '#4CAF50' : (gameState.playerCurrentHP / gameState.playerMaxHP > 0.2 ? '#FFC107' : '#F44336');
        enemyHPBar.style.backgroundColor = gameState.enemyCurrentHP / gameState.enemyMaxHP > 0.5 ? '#4CAF50' : (gameState.enemyCurrentHP / gameState.enemyMaxHP > 0.2 ? '#FFC107' : '#F44336');
    }

    function logMessage(msg) {
        messageLog.innerHTML += `<p>${msg}</p>`;
        messageLog.scrollTop = messageLog.scrollHeight;
    }

    function generateQuestion() {
        const types = ['fraction', 'multiply', 'divide', 'subtract', 'add'];
        const type = types[Math.floor(Math.random() * types.length)];
        let question, answer;
        switch (type) {
            case 'fraction': { const a = Math.ceil(Math.random() * 9); const b = Math.ceil(Math.random() * 9); const common = Math.ceil(Math.random() * 4) + 1; question = `約簡分數: ${a * common}/${b * common}`; const gcd = (x, y) => (!y ? x : gcd(y, x % y)); const divisor = gcd(a, b); answer = `${a / divisor}/${b / divisor}`; break; }
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
        if (typeof correctAnswer === 'string') { while (options.size < 4) { const a = Math.ceil(Math.random() * 9); const b = Math.ceil(Math.random() * 9); if(b !== 0) options.add(`${a}/${b}`); } } else { while (options.size < 4) { const offset = Math.floor(Math.random() * 20) - 10; const wrongAnswer = correctAnswer + offset; if (wrongAnswer >= 0 && wrongAnswer !== correctAnswer) { options.add(wrongAnswer); } } }
        return Array.from(options).sort(() => Math.random() - 0.5);
    }
    
    function nextQuestion() {
        clearTimeout(gameState.timerId);
        gameState.currentQuestion = generateQuestion();
        questionText.textContent = gameState.currentQuestion.question;
        optionsContainer.innerHTML = '';
        gameState.currentQuestion.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.onclick = () => checkAnswer(option);
            optionsContainer.appendChild(button);
        });

        timerBar.style.transition = 'none';
        timerBar.style.width = '100%';
        void timerBar.offsetWidth; 
        timerBar.style.transition = 'width 10s linear';
        timerBar.style.width = '0%';
        gameState.timerId = setTimeout(() => handleIncorrectAnswer("時間到！"), 10000);
    }

    function checkAnswer(selectedAnswer) {
        clearTimeout(gameState.timerId);
        optionsContainer.innerHTML = '<p>處理中...</p>';
        if (String(selectedAnswer) === String(gameState.currentQuestion.answer)) {
            handleCorrectAnswer();
        } else {
            handleIncorrectAnswer(`答錯了！正確答案是 ${gameState.currentQuestion.answer}`);
        }
    }

    function handleCorrectAnswer() {
        logMessage("答對了！");
        gameState.evolutionCounter++;
        playerAttack();
    }

    function handleIncorrectAnswer(reason) {
        logMessage(reason);
        enemyAttack();
    }
    
    function getDamageMultiplier(attackerTypes, defenderTypes) {
        let multiplier = 1;
        if (!attackerTypes || !defenderTypes) return 1;
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
        
        updateBattleUI();
        
        setTimeout(() => {
            if (gameState.enemyCurrentHP <= 0) {
                endGame(true);
            } else {
                checkForEvolution();
            }
        }, 1000);
    }

    function checkForEvolution() {
        if (gameState.isLegendaryMode) {
             nextQuestion(); // 傳說寶可夢不進化
             return;
        }

        const { evolutionCounter, playerPokemonData } = gameState;
        let didEvolve = false;

        // 根據目前階段決定下一個進化目標
        let nextEvolutionData = null;
        let evolutionStage = 0;
        let evolutionType = "進化";

        if (playerPokemonData.currentStage === 0 && evolutionCounter >= 4 && playerPokemonData.evolution) {
            nextEvolutionData = playerPokemonData.evolution;
            evolutionStage = 1;
        } else if (playerPokemonData.currentStage === 1 && evolutionCounter >= 8 && playerPokemonData.evolution.evolution) {
            nextEvolutionData = playerPokemonData.evolution.evolution;
            evolutionStage = 2;
        } else if (playerPokemonData.currentStage === 2 && evolutionCounter >= 12) {
            if (playerPokemonData.mega) {
                nextEvolutionData = playerPokemonData.mega;
                evolutionType = "超級進化";
                evolutionStage = 3;
            } else if (playerPokemonData.gmax) {
                nextEvolutionData = playerPokemonData.gmax;
                evolutionType = "極巨化";
                evolutionStage = 3;
            }
        }
        
        if (nextEvolutionData) {
            evolvePokemon(nextEvolutionData, evolutionStage, evolutionType);
            didEvolve = true;
        }

        if (!didEvolve) {
            nextQuestion();
        }
    }
    
    function evolvePokemon(evolutionData, stage, type) {
        logMessage(`什麼？ ${gameState.playerPokemonData.name} 正在${type}！`);
        playerPokemonImg.classList.add('evolution-animation');
        
        setTimeout(() => {
            playerPokemonImg.classList.remove('evolution-animation');
            const oldName = gameState.playerPokemonData.name;
            
            // 更新 Pokémon 資料
            const currentPokemon = gameState.playerPokemonData;
            const newPokemon = {
                ...currentPokemon, // 保留原有的進化鏈
                ...evolutionData,   // 用新形態的資料覆蓋
                currentStage: stage,
            };
            // 處理進化鏈嵌套問題
            if (stage === 1) { newPokemon.evolution = currentPokemon.evolution; }
            if (stage === 2) { newPokemon.evolution = { evolution: currentPokemon.evolution.evolution }; }
            
            gameState.playerPokemonData = newPokemon;
            
            gameState.attackBonus += (type === "超級進化" || type === "極巨化") ? 15 : 5;
            gameState.playerCurrentHP = Math.min(gameState.playerMaxHP, gameState.playerCurrentHP + 20);

            logMessage(`${oldName} ${type}成了 ${gameState.playerPokemonData.name}！`);
            logMessage(`${gameState.playerPokemonData.name} 的力量提升了，並回復了生命值！`);

            playerPokemonImg.src = gameState.playerPokemonData.back_img;
            playerName.textContent = gameState.playerPokemonData.name;
            updateBattleUI();

            setTimeout(nextQuestion, 2000);
        }, 2500);
    }

    function enemyAttack() {
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
        clearTimeout(gameState.timerId);
        switchScreen('end');
        captureResultImg.classList.add('hidden');
        captureText.textContent = '';
        
        if (playerWon) {
            endMessage.textContent = '你贏了！';
            setTimeout(() => {
                if (Math.random() < 0.5) {
                    captureResultImg.src = `https://img.pokemondb.net/sprites/items/poke-ball.png`;
                    captureText.textContent = `成功捕捉 ${gameState.enemyPokemonData.name}！`;
                } else {
                    captureResultImg.src = gameState.enemyPokemonData.front_img;
                    captureText.textContent = `噢，不！ ${gameState.enemyPokemonData.name} 逃走了！`;
                }
                captureResultImg.classList.remove('hidden');
            }, 1000);
        } else {
            endMessage.textContent = '遊戲結束';
        }
    }
    
    // --- 事件監聽 ---
    startButton.addEventListener('click', () => populateSelectionGrid(false));
    confirmSelectionButton.addEventListener('click', startBattle);
    playAgainNewPokemonButton.addEventListener('click', () => {
        confirmSelectionButton.disabled = true;
        populateSelectionGrid(false);
    });
    playAgainLegendaryButton.addEventListener('click', () => {
        confirmSelectionButton.disabled = true;
        populateSelectionGrid(true);
    });

    switchScreen('start');
});
