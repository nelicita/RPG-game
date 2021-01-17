let profil = {
    "btn":document.getElementById("character_btn"),
    "oldal":document.getElementById("profil_oldal")
}

let feladat = {
    "btn": document.getElementById("feladat_btn"),
    "oldal": document.getElementById("feladat_oldal")
}

function init(){
    switch_to_profil();
}

function switch_to_feladat(){
    feladat.oldal.style.display = "block";
    feladat.btn.style.display = "none";
    profil.oldal.style.display = "none";
    profil.btn.style.display = "inline";
}
function switch_to_profil(){
    feladat.oldal.style.display = "none";
    feladat.btn.style.display = "inline";
    profil.oldal.style.display = "block";
    profil.btn.style.display = "none";
}

init();