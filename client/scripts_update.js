var $chirpList = $('#chirp-list');

var chirpUrl = window.location.pathname;
var urlPieces = chirpUrl.split('/');

var id = urlPieces[2];

function getChirp(id) {
    $.ajax({
        method: 'GET',
        url: '/api/chirps/' + id
    }).then(function(chirp) {
        addUpdateDiv(chirp);
    }, function(err) {
        console.log(err);
    });
}

function updateChirp(newMessage, id) {
    var chirp = {
        message: newMessage
    };
    $.ajax({
        method: 'PUT',
        url: '/api/chirps/' + id,
        contentType: 'application/json',
        data: JSON.stringify(chirp)
    }).then(function() {
        window.location = '/chirps/' + id
    }, function(err) {
        console.log(err);
    });
}

function addUpdateDiv(chirp) {
    var $updateDiv
    $updateField.val(chirp.message);
}

function addUpdateDiv(chirp) {
    var $updateDiv = $('<div class="chirp-update"></div>');
    var $updateField = $('<input type="text" placeholder="Update your chirp here!" id="update-field">');
    var $updatebtn = $('<button id="update-btn">Update Chirp!</button>');
    
    $updatebtn.click(function() {
        var updatedMessage = $updateField.val();
        updateChirp(updatedMessage, chirp.id);
    });

    $updateField.val(chirp.message);

    $updateField.appendTo($updateDiv);
    $updatebtn.appendTo($updateDiv);

    $updateDiv.appendTo($chirpList);
}

getChirp(id);