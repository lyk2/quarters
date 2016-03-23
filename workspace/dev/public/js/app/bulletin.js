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
        success: function() {
            console.log(data);
        },
        error: function(data) {
            console.log("FUCKYOU")
        }
    });
}

function addNewPostLayout(data){
    var date = data.date_time;
    date = date.toDateString() +" "+ date.toLocaleTimeString();
    var comment = data.comment;
    var user = active_user_name;
    var html = '<div class="row"><div class="col-lg-1"></div><div class="col-lg-10 col-xs-12"></div><div class="col-lg-10 col-xs-12"><div class="panel panel-primary"><div class="panel-heading"><img src="../img/boy.png" width="20px" class="img"><h3 style=" display: inline-block; " class="panel-title">'+user+'</h3><h3 style="float:right" class="panel-title">'+date+'</h3></div><div class="panel-body">'+comment+'</div><ul class="list-group"></ul><div class="panel-body"><div class="input-group"><input type="text" placeholder="Message..." class="form-control"><span class="input-group-btn"><button type="button" class="btn btn-default">Reply</button></span></div></div></div></div></div>';
}

// init Stuff
$("#newPostBtn").click(function(){
    var content = $('#newPostContent').val();
    console.log(content);
    newPost(content);
});
