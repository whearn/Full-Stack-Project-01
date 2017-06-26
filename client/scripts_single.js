var $chirpList = $('#chirp-list');

var chirpUrl = window.location.pathname;
var urlPieces = chirpUrl.split('/');

var id = urlPieces[2];

function getChirp(id) {
    $.ajax({
        method: 'GET',
        url: '/api/chirps/' + id
    }).then(function(chirp) {
        addChirpDiv(chirp);
    }, function(err) {
        console.log(err);
    });
}

function deleteChirp(id) {
    $.ajax({
        method: 'DELETE',
        url: '/api/chirps/' + id
    }).then(function() {
        window.location = '/chirps';
    }, function(err) {
        console.log(err);
    });
}

function addChirpDiv(chirp) {
    var $chirpDiv = $('<div class="chirp"></div>');
    var $message = $('<p></p>');
    var $user = $('<h4></h4>');
    var $timestamp = $('<h5></h5>');
    var $editbtn = $('<a href="/chirps/' + chirp.id + '/update"><button class="edit-button">Edit Chirp</button></a>');
    var $deletebtn = $('<button class="delete-button">Delete Chirp</button>');
    
    $deletebtn.click(function() {
        var chirpDel = confirm('Would you like to delete this Chirp?');
        if (chirpDel) {
            deleteChirp(chirp.id);
        }
    });

    $message.text(chirp.message);
    $user.text(chirp.userName);
    $timestamp.text(new Date(chirp.timestamp).toLocaleString());

    $message.appendTo($chirpDiv);
    $user.appendTo($chirpDiv);
    $timestamp.appendTo($chirpDiv);
    $editbtn.appendTo($chirpDiv);
    $deletebtn.appendTo($chirpDiv);

    $chirpDiv.appendTo($chirpList);
}

getChirp(id);