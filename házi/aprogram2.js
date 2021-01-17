let stats = {
    "life": 100,
    "sing": 10,
    "dance": 10,
    "talent": 10,
    "reputation": 0 
}

let available_points = 0;

let lvl = 0;

let lvl_description = [
    ["Még csak egy trainee vagy!", "profil_predebut2.jpg"],
    ["Sikeresen túljutottál a válogatón, lassan debutálhatsz!","profil_chosen2.gif"],
    ["Végre sikerült debutálnod!","profil_debut2.jpg"],
    ["Szörnyen híres lettél!...nade milyen áron..", "profil_concert2.gif"]
];

let profil_stats = {
    "pics": document.getElementById("profil_pics"),
    "description": document.getElementById("description"),
    "life": document.getElementById("profil_life"),
    "sing": document.getElementById("profil_sing"),
    "dance": document.getElementById("profil_dance"),
    "talent": document.getElementById("profil_talent"),
    "reputation": document.getElementById("profil_reputation"),
    "next_level": document.getElementById("next_lvl")
}

function refreshprofilStats(){
    profil_stats.pics.src = "pics/"+lvl_description[lvl][1]
    profil_stats.life.innerHTML = stats.life;
    profil_stats.sing.innerHTML = stats.sing;
    profil_stats.dance.innerHTML = stats.dance;
    profil_stats.talent.innerHTML = stats.talent;
    profil_stats.reputation.innerHTML = stats.reputation;
    profil_stats.description.innerHTML = lvl_description[lvl][0];
    profil_stats.next_level.innerHTML = 10;
    display_addBtns();
}

refreshprofilStats();

function fejlesztés_sing(){
    if(available_points > 0){
        available_points--;
        stats.sing += 5;
        refreshprofilStats();
    }
}
function fejlesztés_dance(){
    if(available_points > 0){
        available_points--;
        stats.dance += 5;
        refreshprofilStats();
    }
}
function fejlesztés_talent(){
    if(available_points > 0){
        available_points--;
        stats.talent += 5;
        refreshprofilStats();
    }
}

function display_addBtns(){
    let btns = document.getElementsByClassName("addButtons");
    if(available_points > 0){
        for (let i = 0; i < btns.length; i++) {
            const element = btns[i];
            element.style.display="inline";
        }
    } else{
        for (let i = 0; i < btns.length; i++) {
            const element = btns[i];
            element.style.display="none";
        }
    }
}

function lvl_up(){
    if(lvl < lvl_description.length - 1){
        available_points += 5;
        lvl++;
        refreshprofilStats();
    }
}


let story = document.getElementById("story");

function rnd_szazalek(){
    return Math.floor(Math.random()*100);
}

function táncóra(){
    let szazalek = rnd_szazalek();
    let sebzes_eselye = 50 - stats.talent;

    if(sebzes_eselye <= 0) sebzes_eselye = 1;

    if(szazalek >= sebzes_eselye){
        story.innerHTML += "Elestél tánc közben (-5 tánctudás)<br>";
        stats.dance -= 5;
        refreshprofilStats();
    }else{
        story.innerHTML += "Sikerült az a nehéz mozdulat, amit évek óta gyakoroltál! (+10 tánctudás)<br>";
        stats.dance += 10;
        refreshprofilStats();
    }
}
function énekóra(){
    let szazalek = rnd_szazalek();
    let sebzes_eselye = 50 - stats.talent;

    if(sebzes_eselye <= 0) sebzes_eselye = 1;

    if(szazalek >= sebzes_eselye){
        story.innerHTML += "Megtört a hangod egy fontos óra alatt (-5 énektudás)<br>";
        stats.sing -= 5;
        refreshprofilStats();
    }else{
        story.innerHTML += "Gyönyörűen kiénekelted AZT a magas hangot!(+10 énektudás)<br>";
        stats.sing += 10;
        refreshprofilStats();
    }
}
function pihenés(){
    let szazalek = rnd_szazalek();
    let sebzes_eselye = 50 - stats.talent;

    if(sebzes_eselye <= 0) sebzes_eselye = 1;

    if(szazalek >= sebzes_eselye){
		story.innerHTML += "A dispatch lehozott egy cikket, ahol azt mondják randizol egy másik idollal (-15 reputáció)<br>";
        fight("Sasaeng", 5, 100);
        refreshprofilStats();
    }else{
        story.innerHTML += "Találkoztál egy eltévedt rajongóval és segítettél neki, majd képet készítettetek (+20 reputáció)<br>";
        stats.reputation += 20;
        refreshprofilStats();
    }
}

function fight(e_name, e_damage, e_life){
    story.innerHTML += "Emiatt megtámadott az utcán téged egy delusional" + e_name + "!<br>";

    let counter = 0;
    let enemy_attack = true;

    do {
        counter++;
        if(enemy_attack){
            let szazalek = rnd_szazalek();
            let sebzes_eselye = 40 - stats.talent;
            if(sebzes_eselye <= 0) sebzes_eselye = 1;

            if(szazalek >= sebzes_eselye){
                story.innerHTML += "A sasaeng szidni kezdi a képességeidet! (-"+e_damage+" mentális egészség)<br>";
                stats.life -= e_damage;
                refreshprofilStats();
            }else{
                story.innerHTML += "Sikerült lenyugtatnod egy pár pillanatra!<br>";
            }
            
        }else{
            let szazalek = rnd_szazalek();
            let sebzes_eselye = 40 + stats.dance;
            if(sebzes_eselye >= 100) sebzes_eselye = 99;
            if(szazalek >= sebzes_eselye){
                story.innerHTML += "Úgy tánik elmenkültél a sasaeng elől! ("+e_name+" -"+stats.sing+" harag)<br>";
                e_life -= stats.sing;
                story.innerHTML += e_name + "-nek maradt " + e_life + "-es haragja<br>";
                refreshprofilStats();
            }else{
                story.innerHTML += "Nem sikerült kikerülni a sasaeng ütését és bántó szavait!<br>";
            }
        }

        enemy_attack = !enemy_attack;
        
    } while (counter <=  10);
}