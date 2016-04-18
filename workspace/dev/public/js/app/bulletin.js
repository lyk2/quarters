function hello() {
    console.log('fml');
}

function newPost(comment) {
    var url = "../db/bulletin/addPost";
    var data = {
        date_time: new Date(),
        comment: comment
    };

    $.ajax({
        url: url,
        type: 'post',
        data: data,
        dataType: 'json',
        success: function(da) {
            addNewPostLayout(da[0]);
        },
        error: function(data) {
            console.log("ddd")
        }
    });
}

function addNewPostLayout(postid){
    var date = new Date();
    date = date.toLocaleDateString() +" "+ date.toLocaleTimeString("en-US", {hour: '2-digit', minute:'2-digit'});
    var comment = $('#newPostContent').val();
    var user = active_user_name.trim();
    var html = '<div postid="'+postid["post_id"]+'"class="row"><div class="col-lg-1"></div><div class="col-lg-10 col-xs-12"></div><div class="col-lg-10 col-xs-12"><div class="panel panel-primary"><div class="panel-heading"><img src="../img/boy.png" width="20px" class="img"><h3 style=" display: inline-block; " class="panel-title">'+user+'</h3><span class="glyphicon glyphicon-remove remove-post"></span><h3 style="float:right" class="panel-title">'+date+'</h3></div><div class="panel-body">'+comment+'</div><ul class="list-group"></ul><div class="panel-body"><div class="input-group"><input type="text" placeholder="Message..." class="form-control"><span class="input-group-btn"><button type="button" class="btn btn-default reply-post">Reply</button></span></div></div></div></div></div>';

    $("#posts").before(html);

    $("#newPost").modal('hide');
    $('#newPostContent').val("");
    postremoval();

    $("#posts .reply-post").click(function(){

        var input = $(this).closest('.input-group').find('input');

        var postdata = {
            comment : input.val(),
            date_time: new Date(),
            post_id: $(this).closest('.row').attr('postid')
        }
        $.ajax({
            url: '../db/bulletin/newSubPost',
            type: 'post',
            data: postdata,
            dataType: 'json',
            success: function(dat) {
                displaySubReply(dat[0]);
                $("div[postid='"+dat[0]['post_id']+"'] input").val("");
            },
            error: function(dat) {
                console.log("nope")
            }
        });

    });
}

// init Stuff
$("#newPostBtn").click(function(){
    var content = $('#newPostContent').val();
    newPost(content);
});

function postremoval(){
    $(".remove-post").each(function(){
        $(this).click(function(){
            var post = $(this).closest(".row").attr('postid');
            $("#deletePostId").text(post);
            $("#deletePost").modal('show');
        });

    });
}

postremoval();


$('#deletepostbtn').click(function(){
    var url = "../db/bulletin/rmPost";
    var data = {
        postid:$("#deletePostId").text()
    };
    $.ajax({
        url: url,
        type: 'post',
        data: data,
        dataType: 'json',
        success: function(dat) {
            console.log("huh");
            var deletedpost = $("#deletePostId").text();
            $("div[postid="+deletedpost+"]").remove();
            $("#deletePost").modal('hide');
        },
        error: function(dat) {
            console.log("nope")
        }
    });
});


$("#posts > div").each(function(){
    var postid = $(this).attr('postid');
    //$(this).find('.subcomments').append('<li class="list-group-item expand-comment"><a>view all comments</a></li>');
    var data = {
        "postid" : postid
    }
    $.ajax({
        url: '../db/bulletin/getSubPost',
        type: 'post',
        data: data,
        dataType: 'json',
        success: function(dat) {
            if(dat.length == 0){
                return;
            }
            var postid = dat[0]['post_id'];
            var post = $("div[postid="+postid+"]");
            post.find('.subcomments').append('<li class="list-group-item expand-comment"><a>view all comments</a></li>');

            post.find('.subcomments a').click(function(){
                if ($(this).text() == "view all comments"){
                    $(this).text("hide comments");
                    var ul = $(this).closest('ul')[0];
                    $(ul).find('.comment-blob').show();

                }
                else {
                    $(this).text("view all comments");
                    var ul = $(this).closest('ul')[0];
                    $(ul).find('.comment-blob').hide();
                }

            });

            for (var i = 0; i < dat.length; i++) {

                var isowner = dat[i].user_id == active_user_id;
                post.find('.subcomments').append(subpostHTML(dat[i], isowner));
            }

            post.find('.comment-blob .remove-sub-post').click(function(){
                var subpostid = $(this).closest('li').attr('subpostid');
                $.ajax({
                    url: '../db/bulletin/rmSubPost',
                    type: 'post',
                    data: {postid : subpostid},
                    dataType: 'json',
                    success: function(dat) {
                        $('li[subpostid="'+dat.subpostid+'"]').remove();
                    },
                    error: function(dat) {
                        console.log("nope")
                    }
                });

            });
        },
        error: function(dat) {
            console.log("nope")
        }
    });
});

function subpostHTML(data, owner) {
    var html = "";
    html += '<li subpostid="'+data['subpost_id']+'"class="list-group-item comment-blob">';
    html += '<span> <img src="../img/boy.png" width="15px" class="img"><span>'+data['full_name']+
        ':</span><span class="comment">'+data['comment']+'</span>';

    if(owner)
        html += '<span class="glyphicon glyphicon-remove remove-sub-post"></span>';

    html += '</span></li>';

    return html;
}

$("#posts .reply-post").click(function(){

    var input = $(this).closest('.input-group').find('input');

    var postdata = {
        comment : input.val(),
        date_time: new Date(),
        post_id: $(this).closest('.row').attr('postid')
    }
    $.ajax({
        url: '../db/bulletin/newSubPost',
        type: 'post',
        data: postdata,
        dataType: 'json',
        success: function(dat) {
            displaySubReply(dat[0]);
            $("div[postid='"+dat[0]['post_id']+"'] input").val("");
        },
        error: function(dat) {
            console.log("nope")
        }
    });

});


function displaySubReply(dat){
    //var test = {"subpost_id":2,"post_id":18,"user_id":6,"house_id":26,"comment":"asdfasdfasdfasdf","date_time":"2016-03-25T21:42:15.000Z"};
    console.log(dat);
    var post = $("div[postid='"+dat['post_id']+"']");
    if (post.find('.expand-comment').length == 0)
        post.find('.subcomments').append('<li class="list-group-item expand-comment"><a>view all comments</a></li>');

    dat['full_name'] = active_user_name.trim()
    var html = subpostHTML(dat, true);

    post.find('.subcomments').append(html);
    post.find('.comment-blob').show();

    post.find('.comment-blob .remove-sub-post').click(function(){
        var subpostid = $(this).closest('li').attr('subpostid');
        $.ajax({
            url: '../db/bulletin/rmSubPost',
            type: 'post',
            data: {postid : subpostid},
            dataType: 'json',
            success: function(dat) {
                $('li[subpostid="'+dat.subpostid+'"]').remove();
            },
            error: function(dat) {
                console.log("nope")
            }
        });

    });
}
