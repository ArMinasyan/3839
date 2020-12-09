/*  Upload User Avatar  */
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
            $('#imagePreview').hide();
            $('#imagePreview').fadeIn(650);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

$("#imageUpload").change(function () {
    readURL(this);
});

$(document).on('click', '.booking-switchItem', function () {
    var show = $(this).data('show');
    var c = $(this);
    $(show).removeClass("hide").siblings().addClass("hide");
    $(c).removeClass("hide").addClass("active").siblings().removeClass("active");
});

$(".book-new_btn").on("click", function () {
    $(this).hide();
    $(this).parent().find(".request-bar").addClass("op-1");
});

$(document).on("click", ".favorite-item-btn", function () {
    $(this).toggleClass("active");
});


////
let updated_data = {
    firstName: '',
    lastName: '',
    country: '',
    contact: {
        phone: '',
        email: ''
    }
};

let updated_links = {
    twitter: '',
    linkedin: '',
    facebook: '',
    instagram: ''
}

$(document).on('change', 'input[name=Si_firstName],input[name=Si_lastName],input[name=Si_country],input[name=Si_phone],input[name=Si_email]', e => {
    let key = e.target.name.split('_')[1];
    if (key === 'email' || key === 'phone') updated_data.contact[key] = e.target.value.trim();
    else updated_data[key] = e.target.value.trim();

})

////
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
    <input type="text" value='${$('#clientName_set').text().split(' ')[0]}' name='Si_firstName' />
    </div>
    </div>

    <div class="swal-container--sub">
    <div class="swal-container--sub_1">Last Name</div>
    <div class="swal-container--sub_2">
    <input type="text" value='${$('#clientName_set').text().split(' ')[1] || ''}' name='Si_lastName' />
    </div>
    </div>

    <div class="swal-container--sub">
    <div class="swal-container--sub_1">Country</div>
    <div class="swal-container--sub_2">
    <input type="text" value='${$('#clientCountry_set').text()}' name='Si_country'/>
    </div>
    </div>
       
    <div class="swal-container--sub">
    <div class="swal-container--sub_1">Phone Number</div>
    <div class="swal-container--sub_2"><input type="text" value='${$('#clientPhone_set').text()}' name='Si_phone'/></div>
    </div>

  </div>
    

    </div> `,
        showCancelButton: true,
        //  allowOutsideClick: false,
        confirmButtonText: 'Save',

    }).then(e => {
        if (e.isConfirmed)
            console.log(updated_data)
        $.post('/api/User/UpdateMainInfo', {
            updated_data
        }).then(response => {
            if (response.updated) {
                Swal.fire({
                    title: 'Information Successfully saved'
                }).then(e => {
                    $('#clientCountry_set').text(updated_data['country']);
                    //$('#email_set').text(updated_data['contact'].email);
                    $('#clientPhone_set').text(updated_data['contact'].phone);
                    $('#clientName_set').text(updated_data['firstName'] + ' ' + updated_data['lastName'])
                });
            }
        })
    });
})
const allSocialIcons = document.getElementsByClassName('socialIcon');

$(document).on('change', 'input[name=twitter],input[name=linkedin],input[name=instagram],input[name=facebook]', e => {
    updated_links[e.target.name] = e.target.value.trim();
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
        confirmButtonText: 'Save',
    }).then(e => {
        if (e.isConfirmed) {
            $.post('/api/User/UpdateSocialLinks', {
                updated_links
            }).then(response => {
                let first = '';
                if (response.updated) {
                    Swal.fire({
                        title: 'Information Successfully saved'
                    }).then(e => {

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

$(document).ready(function () {

    $("#calendar").datepicker({
        dateFormat: "dd/mm/yy",
        onSelect: function (date) {
            Swal.fire({
                showConfirmButton: false,
                customClass: {
                    container: 'search_master'
                },
                title: 'Complaints',
                html: `
                <div id="main">
                <div id="complaint_list_push" class="push_list"></div>
                <input type='button' id="filter" value='Search' />
                <div id="filtered"></div>
                </div>`
            })
        }
    })

    $.get('/api/User/MainData').then(response => {
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

        if (response.data.profileImgPath !== '') {
            $('#profileimg_set').attr('src', 'https://therapybubbleimages.fra1.digitaloceanspaces.com/ProfileImages/' + response.data.profileImgPath);
            $('.profileAvatar').css('border', 'none');
        }

        $('#linkedin_link_set').text(response.data.socialLinks.linkedin);
        $('#instagram_link_set').text(response.data.socialLinks.instagram);
        $('#facebook_link_set').text(response.data.socialLinks.facebook);
        $('#twitter_link_set').text(response.data.socialLinks.twitter);

        $('#clientName_set').text(response.data.firstName + ' ' + response.data.lastName);
        $('#clientCountry_set').text(response.data.country);
        $('#clientPhone_set').text(response.data.contact.phone);
        $('#clientEmail_set').text(response.data.contact.email);

    })
})


//Image UYpload
$(document).on('change', '#imageUpload', e => {
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
            });
            else {

                $('#profileimg_set').attr('src', 'https://therapybubbleimages.fra1.digitaloceanspaces.com/ProfileImages/' + response.profile_img);
                $('.profileAvatar').css('border', 'none');
            }

        }
    })
})