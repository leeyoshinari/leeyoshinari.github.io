jQuery(document).ready(function ($) {
    $(".mumu").mouseover(function () {
        $(".mumu").fadeTo("300", 0.3);
        msgs = ["我隐身了，你看不到我", "我会隐身哦！嘿嘿！", "别动手动脚的！", "把手拿开我才出来！", "快把你的咸猪手拿开！"];
        let i = Math.floor(Math.random() * msgs.length);
        showMessage(msgs[i]);
    });
    $(".mumu").mouseout(function () {
        $(".mumu").fadeTo("300", 1)
    });
});

jQuery(document).ready(function ($) {
    let now = (new Date()).getHours();
    if (now > 0 && now <= 6) {
        showMessage('你是夜猫子呀？还不睡觉！', 6000);
    } else if (now > 6 && now <= 9) {
        showMessage('早上好呀，记得吃早饭哦！', 6000);
    } else if (now > 11 && now <= 13) {
        showMessage('中午了，吃饭了么？', 6000);
    } else if (now > 14 && now <= 17) {
        showMessage('下午的时光真难熬！', 6000);
    } else if (now > 22 && now <= 23) {
        showMessage('夜深了，不要熬夜！', 6000);
    } else {
        showMessage('哇！是不是吓了你一跳！', 6000);
    }
    let spig_top = window.innerHeight - 100
    $(".spig").animate({
        top: spig_top,
        left: document.body.offsetWidth - 205
    },{
        queue: false,
        duration: 1000
    });
    $(window).scroll(function () {
        $(".spig").animate({
            top: $(window).scrollTop() + spig_top
        },{
            queue: false,
            duration: 1000
        });
    });
});

jQuery(document).ready(function ($) {
    window.setInterval(function () {
        msgs = ["好无聊哦，你都不陪我玩！", "我可爱吧！嘻嘻~^_^~", "喂！你是不是把我忘了？", "你在偷懒，都不陪我玩了！", "你都不爱我了，嘤嘤嘤~", "人家想和你玩嘛~", "你是不是睡着啦？快醒醒！"];
        let i = Math.floor(Math.random() * msgs.length);
        showMessage(msgs[i], 8000);
    }, 15000);
});

//鼠标点击时
jQuery(document).ready(function ($) {
    let stat_click = 0;
    let i = 0;
    $(".mumu").click(function () {
        stat_click++;
        if (stat_click > 4) {
            msgs = ["你有完没完呀？", "你已经摸我" + stat_click + "次了", "非礼呀！救命！", "你摸疼我了~", "哼！不理你了！", "略略略，抓不到我~", "求求你了，放过我吧！", "哼，我可不是好惹的！"];
            i = Math.floor(Math.random() * msgs.length);
        } else {
            msgs = ["我跑呀跑呀跑！~~", "惹不起你，我还躲不起么？", "烦死了，别碰我啦！", "走开走开！"];
            i = Math.floor(Math.random() * msgs.length);
        }
        let leftx = Math.min(Math.floor(Math.random() * (document.body.offsetWidth - 115)), document.body.offsetWidth - 115);
        $(".spig").animate({
            left: leftx
        },{
            duration: 500,
            complete: showMessage(msgs[i])
        });
    });
});

function showMessage(a, b) {
    if (b == null) b = 10000;
    jQuery("#message").hide().stop();
    jQuery("#message").html(a);
    jQuery("#message").fadeIn();
    jQuery("#message").fadeTo("1", 1);
    jQuery("#message").fadeOut(b);
};

let _move = false;
let _x, _y; //鼠标离控件左上角的相对位置
jQuery(document).ready(function ($) {
    $("#spig").mousedown(function (e) {
        _move = true;
        _x = e.pageX - parseInt($("#spig").css("left"));
        _y = e.pageY - parseInt($("#spig").css("top"));
     });
    $(document).mousemove(function (e) {
        if (_move) {
            let x = e.pageX - _x; 
            let y = e.pageY - _y;
            let wx = $(window).width() - $('#spig').width();
            let dy = $(document).height() - $('#spig').height();
            if(x >= 0 && x <= wx && y > 0 && y <= dy) {
                $("#spig").css({top: y, left: x});
            }
        }
    }).mouseup(function () { _move = false;});
});