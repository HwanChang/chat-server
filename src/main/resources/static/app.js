let stompClient = null;

function setConnected(connected) {
    $('#connect').prop('disabled', connected);
    $('#name').prop('disabled', !connected);
    $('#content').prop('disabled', !connected);
    $('#send').prop('disabled', !connected);
    $('#disconnect').prop('disabled', !connected);
    if (connected) {
        $('#conversation').show();
    }
    else {
        $('#conversation').hide();
    }
    $('#chat').html('');
}

function connect() {
    const socket = new SockJS('/stomp');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function () {
        setConnected(true);
        stompClient.subscribe('/topic/send', function (greeting) {
            showChatting(JSON.parse(greeting.body));
        });
    });
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log('Disconnected');
}

function sendContent() {
    stompClient.send('/app/receive', {}, JSON.stringify({'userName': $('#name').val(), 'content': $('#content').val()}));
}

function showChatting(message) {
    $('#chat').append('<tr><td>' + message.userName + ' : ' + message.content + '</td></tr>');
}

$(function () {
    $('form').on('submit', function (e) {
        e.preventDefault();
    });
    $( '#connect' ).click(function() { connect(); });
    $( '#disconnect' ).click(function() { disconnect(); });
    $( '#send' ).click(function() {
        sendContent();
        $('#content').val('');
    });
});