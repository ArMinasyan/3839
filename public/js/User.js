


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
            if (response.err) swal({
                text: response.err,
                closeOnClickOutside: false
            }); else {
                $('#profileimg_set').attr('src', 'ProfileImages/' + response.profile_img);
                $('.logoAvatar').css('border', 'none');
            }
        }
    })
})

let updated_data = {
    firstName: '',
    lastName: '',
    country: '',
    phone: ''
};

let updated_links = {
    twitter: '',
    linkedin: '',
    facebook: '',
    instagram: ''



}

const allSocialIcons = document.getElementsByClassName('socialIcon');

let changed = false;
let old_desc = "";

$(document).on('click', '#edit_description', e => {
    old_desc = $('#description_set').text();
    $('#description_set').attr('contenteditable', true);
    $('#description_set').css({
        'border': '1px solid #B5B5B5',
        'color': '#AAAAAA',
        'border-radius': '5px',
        'padding-left': ' 10px',
        'padding-right': '10px'
    });
    $('#edit_description').css('display', 'none');
    $('.description_change_buttonGroup').css('display', 'block');

})

$(document).on('click', '#save_descriptionChange', e => {
    const descritpion = $('#description_set').text();
    $.post('/api/User/UpdateDescription', { desc: descritpion }).then(response => {
        if (response.updated) Swal.fire({ title: 'Information Successfully saved' }).then(() => {
            $('#description_set').removeAttr('contenteditable');
            $('#description_set').css({
                'border': 'none',
                'color': '#4D4D4D',
                'border-radius': 'none',
            });
            $('#edit_description').css('display', 'block');
            $('.description_change_buttonGroup').css('display', 'none');
        });
    })
})

$(document).on('click', '#cancel_descriptionChange', e => {
    $('#description_set').removeAttr('contenteditable');
    $('#description_set').css({
        'border': 'none',
        'color': '#4D4D4D',
        'border-radius': 'none',
    });
    $('#edit_description').css('display', 'block');
    $('.description_change_buttonGroup').css('display', 'none');
    $('#description_set').text(old_desc);
})

$(document).on('click', '#edit_links', e => {
    Swal.fire({
        title: 'Edit soccial links',
        customClass: {
            container: 'social_links_swal'
        },
        html: `<div class="swal-container swal-social_links_conatiner">
        <div class="swal-container--sub">
        <div class="swal-container--sub_1">Twitter</div>
        <div class="swal-container--sub_2">
        <input type="text" value='${$('#twitter_link_set').text()}' name='twitter' />
        </div>
        <div class="swal-container--sub_1">Linkedin</div>
        <div class="swal-container--sub_2">
        <input type="text" value='${$('#linkedin_link_set').text()}' name='linkedin' />
        </div>
        <div class="swal-container--sub_1">Facebook</div>
        <div class="swal-container--sub_2">
        <input type="text" value='${$('#facebook_link_set').text()}' name='facebook' />
        </div>
        <div class="swal-container--sub_1">Instagram</div>
        <div class="swal-container--sub_2">
        <input type="text" value='${$('#instagram_link_set').text()}' name='instagram' />
        </div>
        </div>`,
        showCancelButton: true,
        // allowOutsideClick: false,
        confirmButtonText: 'Save',
    }).then(e => {
        if (e.isConfirmed) {
            $.post('/api/User/UpdateSocialLinks', { updated_links }).then(response => {
                let first = '';
                if (response.updated) {
                    Swal.fire({ title: 'Information Successfully saved' }).then(e => {

                        Object.keys(updated_links).forEach((key, index) => {
                            $('#' + key + '_link_set').text(updated_links[key]);
                            first = key.substr(0, 1);
                            if (updated_links[key] === '')
                                allSocialIcons[index].setAttribute('src', 'images/socialLinks_icon/' + first + '2.png');
                            else allSocialIcons[index].setAttribute('src', 'images/socialLinks_icon/' + first + '1.png');
                        });

                    });
                }
            })
        }
    })
})
$(document).on('click', '#edit_main', e => {
    Swal.fire({
        customClass: {
            container: 'main_info_swal'
        },
        title: 'Edit main information',
        text: 'Edit main data',
        html: `<div class= "swal-container" >
        <div class="swal-container--sub">
        <div class="swal-container--sub_1">First Name</div>
        <div class="swal-container--sub_2">
        <input type="text" value='${$('#name_set').text().split(' ')[0]}' name='Si_firstName' />
        </div>
        </div>

        <div class="swal-container--sub">
        <div class="swal-container--sub_1">Last Name</div>
        <div class="swal-container--sub_2">
        <input type="text" value='${$('#name_set').text().split(' ')[1]}' name='Si_lastName' />
        </div>
        </div>

        <div class="swal-container--sub">
        <div class="swal-container--sub_1">Country</div>
        <div class="swal-container--sub_2">
        <input type="text" value='${$('#country_set').text()}' name='Si_country'/>
        </div>
        </div>
           
        <div class="swal-container--sub">
        <div class="swal-container--sub_1">Phone Number</div>
        <div class="swal-container--sub_2"><input type="text" value='${$('#phone_set').text()}' name='Si_phone'/></div>
        </div>
        </div> `,
        showCancelButton: true,
        //  allowOutsideClick: false,
        confirmButtonText: 'Save',

    }).then(e => {
        if (e.isConfirmed)
            $.post('/api/User/UpdateMainInfo', { updated_data }).then(response => {
                if (response.updated) {
                    Swal.fire({ title: 'Information Successfully saved' }).then(e => {
                        Object.keys(updated_data).forEach(key => {
                            if (key !== 'firstName' || key !== 'lastName') $('#' + key + '_set').text(updated_data[key]);

                        });
                        $('#name_set').text(updated_data['firstName'] + ' ' + updated_data['lastName'])
                    });
                }
            })
    })
});

$(document).on('change', 'input[name=twitter],input[name=linkedin],input[name=instagram],input[name=facebook]', e => {
    updated_links[e.target.name] = e.target.value.trim();
})

$(document).on('change', 'input[name=Si_firstName],input[name=Si_lastName],input[name=Si_country],input[name=Si_phone]', e => {
    updated_data[e.target.name.split('_')[1]] = e.target.value.trim();
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
            if (response.err) swal({
                text: response.err,
                closeOnClickOutside: false
            }); else {
                $('#logoimg_set').attr('src', 'LogoImages/' + response.logo_img);
                $('.logoAvatar').css('border', 'none');
            }

        }
    })
})


$(document).ready(function () {
    //$('#calendar').datapicker();
    $("#calendar").datepicker({
        dateFormat: "dd/mm/yy",
        onSelect: function (date) {
            console.log(date)
        }
    });



    $.get('/api/User/MainData').then(response => {
        let first = '';
        Object.keys(updated_data).forEach(key => {
            updated_data[key] = response.data[key]
        });

        Object.keys(updated_links).forEach((key, index) => {
            updated_links[key] = response.data.socialLinks[key];
            first = key.substr(0, 1);

            if (response.data.socialLinks[key] === '')
                allSocialIcons[index].setAttribute('src', 'images/socialLinks_icon/' + first + '2.png');
            else allSocialIcons[index].setAttribute('src', 'images/socialLinks_icon/' + first + '1.png');
        });

        $('#name_set').text(response.data.firstName + ' ' + response.data.lastName);
        $('#country_set').text(response.data.country);
        $('#phone_set').text(response.data.phone);
        $('#description_set').text(response.data.description);

        $('#linkedin_link_set').text(response.data.socialLinks.linkedin);
        $('#instagram_link_set').text(response.data.socialLinks.instagram);
        $('#facebook_link_set').text(response.data.socialLinks.facebook);
        $('#twitter_link_set').text(response.data.socialLinks.twitter);

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