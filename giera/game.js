onload = load;

function load()
{
    
    $(".cube").draggable(
        {
            helper: "clone",
            revert: "invalid",
            start: function(ev, ui) 
            { 
                $(ui.helper).removeClass("shop");
            },
            
        }
    );
    $(".hex").droppable(
        {
            drop: function(ev,ui)
            {
                console.log(ui)
                console.log($(ev.target).offset().left)
                $("<div class='cube'><div class='top sciezka'></div><div class='side one'></div><div class='side two'></div><div class='side three'></div><div class='side four'></div><div class='side five'></div><div class='side six'></div></div>")
                .appendTo($("body")).css({left: $(ev.target).offset().left, top: $(ev.target).offset().top});
            }
        }
    );
}