//Users have to login using Firebase Github authentication.
//When not logged in, the UI will consist of just a login button.
//Once logged in, there will be a logout button, a text box,
//a submit button and a div with all the texts submitted so far.

// if current user logged in status === true
// change login button to logout button

// if current user clicks logout
// change logout button to login button

//connect to firebase
var fb = new Firebase('https://girldevchat.firebaseio.com/');
var d = {};
var item;

var display = function() {
     $('#postComment').on('click', function(event) {
        event.stopPropagation();
        var name = $('#nameInput').val();
        var comment = $('#commentInput').val();

        if (name === "" || comment === ""  ){
            return;
        }

        fb. push({
            name: name,
            comment: comment
        });

        d[name] = [comment];

        $('#nameInput').val('');
        $('#commentInput').val('');
        $('#nameInput').focus().val('');
    });
};

//display all comments on child_added
$(document).ready(function(){
    fb.on('child_added', function(item) {
        var name = item.val()['name'];
        var comment = item.val()['comment'];

        d[name] = [comment];

        var x = "";

        for (item in d){
            x = x + '<div class="commentList">' + item + ": ";

            for (var i = 0; i < d[item].length; i++) {
                x = x + d[item][i] + '</div>';
            }

        };
        $('#commentDiv').html(x);
    });
    display();
});

