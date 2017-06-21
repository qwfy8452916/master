$.ajax({
    url: '/list',
    type: 'GET',
    dataType: 'json',
    success: function(data) {
        // fetchUserList(data);
        console.log(data);
        $('.tt').html(data.text);
        yy.kk=data;
    }
});