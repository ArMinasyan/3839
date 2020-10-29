$(document).ready(function () {
    $.get('/api/User/MainData').then(response => {
        $('#name_set').text(response.data.firstName + ' ' + response.data.lastName);
        $('#country_set').text(response.data.country);
        $('#phone_set').text(response.data.phone);
    })
})