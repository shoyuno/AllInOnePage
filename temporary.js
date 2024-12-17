let tab;
let img;
let max;
let card;
function load()
{
    document.body.addEventListener('click', click, true); 
    img = document.getElementsByTagName("img")[0];
    max=204;
    tab = new Array();
    for(let i=0; i<=204; i++)
    {
        tab[i]="karty/b"+i+".png";
    }
}

function click()
{
    card = Math.floor(Math.random() * max);
    img.src=tab.splice(card, 1);
    max--;
}