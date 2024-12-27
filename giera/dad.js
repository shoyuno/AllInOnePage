onload = load;

function load()
{
    $(".cube").draggable(
    {
        start: function(event, ui) 
        {
            $(ui.helper).removeClass("shop");
        },
        
        containment: "body",
        cursor: "drag",
        handle: ".top",
        // iframeFix: true, ?
        revert: function(dropped) 
        {
            var needToRevert = !dropped
            if(needToRevert)
            {
                $(this).addClass("shop");
            }
            else
            {
                cloneElement = $(this).clone();
            }
            return needToRevert;
        },
        revertDuration: "400",
        scope: "shop",
        //snap: true, //todo
        //snapMode: "both",
        //snapTolerance: "20",
        // stack: "true", ?
       }
    ); 
    
    $(".hex").droppable(
        {
            scope: "shop",
        }
    );
   
}