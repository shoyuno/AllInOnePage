onload=addClick;
let list;
let s1added=false, s2added=false, s3added=false, s4added=false;
function addClick()
{
    scale();
    window.addEventListener("resize", scale);
    list = document.querySelectorAll('li');
    for(let i=1; i<list.length; i++)
    {
        list[i].addEventListener('click', active);
    }
}

function active()
{
    switch(this)
    {
        case $("li")[1]: 
            $("#controls").load("s1.html")
            $("#extStyle").attr("href", "s1Style.css")
            if(!s1added)
            {
                let script = document.createElement("script");
                script.setAttribute("src", "s1Script.js");
                $("head").append(script)
                once();
                s1added=true;
            }
            scale1();
            window.addEventListener("resize", scale1); 
        break;      
        // case $("li")[2]: 
        //     $("#controls").html("");
        //     $("#extStyle").attr("href", "");
        // break;
        // case $("li")[3]: 
        //     $("#style").attr("href", "s3Style.css");
        // break;
        // case $("li")[4]: 
        //     $("#style").attr("href", "s4Style.css");
        // break;
        default:
            $("#controls").html("");
            $("#extStyle").attr("href", "");
            window.removeEventListener("resize", scale1); 
        break;
    }
    
    list.forEach(item => 
    {
        item.classList.remove('active');
    });
    this.classList.add("active");
}

function scale()
{
    if(window.innerHeight >= window.innerWidth + 100)   
    {
        $(":root").css('--var', '17.5vmin')
        $("li").addClass("portrait")
        $("li").removeClass("landscape")
        $("a").addClass("portrait")
        $("a").removeClass("landscape")

        $("#main").addClass("portrait")
        $("#main").removeClass("landscape")
        $("canvas").addClass("portrait")
        $("canvas").removeClass("landscape")
        $("#controls").addClass("portrait")
        $("#controls").removeClass("landscape")
    }
    else
    {
        $(":root").css('--var', '20vmin')
        $("li").removeClass("portrait")
        $("li").addClass("landscape")
        $("a").removeClass("portrait")
        $("a").addClass("landscape")
        
        $("#main").removeClass("portrait")
        $("#main").addClass("landscape")
        $("canvas").removeClass("portrait")
        $("canvas").addClass("landscape")
        $("#controls").removeClass("portrait")
        $("#controls").addClass("landscape")
    }
}




