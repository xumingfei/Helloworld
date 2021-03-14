/*jQuery测试*/
$().ready(function(){
    console.log(123123)
    $("#button1").click(function(){
        $(this).hide();
    });

    $("#button2").click(function(){
        $("#button1").show();
    });
    //淡入
    $("#fadeinInput").click(function(){
        $("#div1").fadeIn();
        $("#div2").fadeIn("slow");
        $("#div3").fadeIn(3000);
    })
    //淡出
    $("#fadeoutInput").click(function(){
        $("#div1").fadeOut();
        $("#div2").fadeOut("slow");
        $("#div3").fadeOut(3000);
    })
    //淡入淡出
    $("#toggle").click(function () {
        $("#div1").toggle();
        $("#div2").toggle("slow");
        $("#div3").toggle(3000);
    })
    //淡出(前端js控制台报错)
    $("#fadetoInput").click(function () {
        $("#div1").fadeTo("slow",0.1);
        $("#div2").toggle("slow",0.5);
        $("#div3").toggle("slow",0.75);
    })
   /* $(".flip").click(function () {
        $(".panel").slideDown("slow");
    });
    $(".flip").click(function () {
        $(".panel").slideUp("slow");
    });*/
    $(".flip").click(function () {
        $(".panel").slideToggle("slow");
    });
    $("#p-content").click(function () {
        alert($("#test").text());
        console.log($("#test").html());
    })

});

/*测试*/
function showDetails(animal){
    var animalType = animal.getAttribute("data-animal-type");
    alert(animal.innerHTML + "是一种" + animalType + "。");
    console.log(animal.innerHTML + "是一种" + animalType + "。")
}

var test = {
    show1 : function(){
        alert("show1方法");
    }
}