$(document).on('change', '#imageUpload2', e => {
    $(this).val('');
    const form = new FormData();
    form.append('profileImage', e.target.files[0]);
    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: "api/User/InsertProfileImg",
        data: form,
        processData: false,
        contentType: false,
        success: function (response) {
            $('#profileimg_set').attr('src', 'ProfileImages/' + response.profile_img);
            $('.profileAvatar').css('border', 'none');
        }
    })
})

$(document).on('change', '#imageUpload', e => {
    $(this).val('');
    const form = new FormData();
    form.append('logoImage', e.target.files[0]);
    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: "api/User/InsertLogoImg",
        data: form,
        processData: false,
        contentType: false,
        success: function (response) {
            $('#logoimg_set').attr('src', 'LogoImages/' + response.logo_img);
            $('.logoAvatar').css('border', 'none');
        }
    })
})

$(document).ready(function () {
    $.get('/api/User/MainData').then(response => {
        $('#name_set').text(response.data.firstName + ' ' + response.data.lastName);
        $('#country_set').text(response.data.country);
        $('#phone_set').text(response.data.phone);

        if (response.data.profileImgPath !== '') {
            $('#profileimg_set').attr('src', 'ProfileImages/' + response.data.profileImgPath);
            $('.profileAvatar').css('border', 'none');
        }
        if (response.data.logoImgPath !== '') {
            $('#logoimg_set').attr('src', 'LogoImages/' + response.data.logoImgPath);
            $('.logoAvatar').css('border', 'none');
        }
    })
})