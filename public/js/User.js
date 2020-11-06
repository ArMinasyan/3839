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
            });
            else {
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
let new_child_index = 0;
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
    $.post('/api/User/UpdateDescription', {
        desc: descritpion
    }).then(response => {
        if (response.updated) Swal.fire({
            title: 'Information Successfully saved'
        }).then(() => {
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
        
        
        <ul id="services_list" hidden>
        <li>
            <div>Hair removal</div>
            <ul>
                <li>Waxing</li>
                <li>Sugaring</li>
                <li>Threading</li>
                <li>Laser</li>
            </ul>
        </li>
        <li>
            <div> Nails</div>
            <ul>
                <li>feet</li>
                <li>hands</li>
                <li>
                    <div>Medical pedicure</div>
                    <ul>
                        <li>chiropody </li>
                        <li>podiatry</li>
                    </ul>
                </li>
                <li> Manicure</li>
                <li> Pedicure</li>
                <li> Nail art</li>
                <li> Shellac</li>
                <li> Acrylics</li>
                <li> Natural products</li>
                <li> Wax treatments</li>
                <li> Nail conditioning treatments</li>
            </ul>
        </li>
        <li>Make up</li>
        <li>
            <div>Hair</div>
            <ul>
                <li>Cut</li>
                <li>
                    <div>Colour</div>
                    <ul>
                        <li>lowlights</li>
                        <li>Tints</li>
                        <li>high</li>
                    </ul>
                </li>
            </ul>
        </li>
        <li> Perming</li>
        <li> Chemical hair straightening</li>
        <li> Wash and blow dry</li>
        <li> Hair up/ dressing hair for events</li>
        <li> Barbering</li>
        <li>
            <div>Osteopathy</div>
            <ul>
                <li>Spinal/ joint/ cranial manipulation</li>
                <li> Consultation</li>
                <li> Face to Face booking</li>
                <li> Video booking</li>
            </ul>
        </li>
        <li> Councelling</li>
        <li> Anxiety</li>
        <li> Trauma</li>
        <li> Relationships</li>
        <li> Depression</li>
        <li> Low moods</li>
        <li> CBT</li>
        <li> Psychotherapy</li>
        <li> Face to Face booking</li>
        <li> Online booking</li>
        <li>
            <div>Mindfulness</div>
            <ul>
                <li> Happy thinking</li>
                <li> Relaxing</li>
                <li> Invigorating</li>
                <li> Destressing</li>
                <li> Face to face</li>
                <li> Online</li>
            </ul>
        </li>
        <li> Life coaching</li>
        <li> Help client to find self inspiration</li>
        <li> Face to face</li>
        <li> Online booking</li>
        <li> Business coaching</li>
        <li> Help with mindset</li>
        <li> Creative thinking</li>
        <li> Strategy</li>
        <li> Marketing</li>
        <li> Sales</li>
        <li> Networking</li>
        <li> Face to Face</li>
        <li> Online</li>
    </ul>
    
    </div>
        </div> `,
        showCancelButton: true,
        //  allowOutsideClick: false,
        confirmButtonText: 'Save',

    }).then(e => {
        if (e.isConfirmed)
            $.post('/api/User/UpdateMainInfo', {
                updated_data
            }).then(response => {
                if (response.updated) {
                    Swal.fire({
                        title: 'Information Successfully saved'
                    }).then(e => {
                        Object.keys(updated_data).forEach(key => {
                            if (key !== 'firstName' || key !== 'lastName') $('#' + key + '_set').text(updated_data[key]);

                        });
                        $('#name_set').text(updated_data['firstName'] + ' ' + updated_data['lastName'])
                    });
                }
            })
    });
    $('#services_list').menu({
        position: {
            my: "left top",
            at: "right+5 top-3"
        },

    });
});

const addService = (id) => {
    let new_child = document.createElement('div');
    new_child.setAttribute('contenteditable', true);
    new_child.setAttribute('class', 'services_list_push_child');
    new_child_index++;
    $(id).append(new_child)
}

$(document).on('click', '#service_list_push', e => {
    if ($('#service_list_push').children().length == 0) {
        addService('#service_list_push');
        $('.services_list_push_child').focus();
    } else
    if (e.target.id == 'service_list_push') addService('#service_list_push');
})

$(document).on('keypress', '#service_list_push', e => {
    if (e.which == 13) {
        addService('#service_list_push');
        $('.services_list_push_child').next().focus();
        return false;
    }
})

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
            });
            else {
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



    $('#services_list').on('click', function (e) {
        console.log(e.target.innerText);
    })

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