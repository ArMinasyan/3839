//import list from './list';

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

        <div class="swal-container--sub">
        <div class="swal-container--sub_1">Email</div>
        <div class="swal-container--sub_2">
        <input type="text" value='${$('#email_set').text()}' name='Si_email'/>
        </div>
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
                        $('#country_set').text(updated_data['country']);
                        $('#email_set').text(updated_data['contact'].email);
                        $('#phone_set').text(updated_data['contact'].phone);
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

const listComplaint = [
    'Depression',
    'Stress',
    'Anxiety',
    'Self-esteem',
    'Relationships',
    'Anger',
    'Grief'
]
const listServices = ['feet',
    'hands',
    ' Medical pedicure',
    ' chiropody ',
    'podiatry',
    ' Manicure',
    ' Pedicure',
    ' Nail art',
    ' Shellac',
    ' Acrylics',
    ' Natural products',
    ' Wax treatments',
    ' Nail conditioning treatments',
    'Make up',
    'Hair',
    'Cut',
    'lowlights',
    'Tints',
    'high',
    ' Perming',
    ' Chemical hair straightening',
    ' Wash and blow dry',
    ' Hair up/ dressing hair for events',
    ' Barbering',
    'Spinal/ joint/ cranial manipulation',
    ' Consultation',
    ' Face to Face booking',
    ' Video booking',
    ' Councelling',
    ' Anxiety',
    ' Trauma',
    ' Relationships',
    ' Depression',
    ' Low moods',
    ' CBT',
    ' Psychotherapy',
    ' Face to Face booking',
    ' Online booking',
    ' Happy thinking',
    ' Relaxing',
    ' Invigorating',
    ' Destressing',
    ' Face to face',
    ' Online',
    ' Life coaching',
    ' Help client to find self inspiration',
    ' Face to face',
    ' Online booking',
    ' Business coaching',
    ' Help with mindset',
    ' Creative thinking',
    ' Strategy',
    ' Marketing',
    ' Sales',
    ' Networking',
    ' Face to Face',
    ' Online',
];

const addService = (id) => {
    let new_child = document.createElement('div');
    new_child.setAttribute('contenteditable', true);
    new_child.setAttribute('class', id + '_child');
    new_child_index++;
    $('#' + id).append(new_child)
}




$(document).on('click', '.temp_child', e => {
    const name = $(e.target).attr('name');
    const last_child = $('#' + name).children('.' + name + '_child').last();


    last_child.css('width', (e.target.innerText.length + 2) * 8);
    last_child.text(e.target.innerText);

    $('.temp_child').remove();
    addService(name);
    $('.' + name + '_child').next().focus();

})

function showTempChild(e) {
    const splited_className = $(e.target).attr('class').split('_');
    const id = splited_className[0] + '_' + splited_className[1] + '_' + splited_className[2];
    const listName = id === 'complaint_list_push' ? listComplaint : listServices;
    if (e.target.innerText != '') {
        const firstL = e.target.innerText[0].toUpperCase();
        const new_list = listName.filter(elem => elem.includes(firstL + e.target.innerText.substr(1), 0));
        if ($('#' + id).children.length > 0) $('.temp_child').remove();
        new_list.map(elem => $('#' + id).append(`<span class="temp_child" name=${id}>${elem}</span>`));
    } else $('.temp_child').remove();
}

$(document).on('keyup', '.service_list_push_child, .complaint_list_push_child', e => {
    if ((e.which >= 65 && e.which <= 90) || (e.which >= 97 && e.which <= 122) || e.which == 8) showTempChild(e);
    if (e.which == 46) $(e.target).remove();
})

function list_click(id, class_name) {
    if ($('#' + id).children().length == 0 || $('#' + id + ' .' + class_name).last().text().trim() != '') {
        addService(id);
        $('.' + class_name).focus();
    }
};


$(document).on('click', '#service_list_push, #complaint_list_push', e => list_click(e.target.id, e.target.id + '_child'));
$(document).on('keypress', '#service_list_push, #complaint_list_push', e => {
    const splited_className = $(e.target).attr('class').split('_');
    const id = splited_className[0] + '_' + splited_className[1] + '_' + splited_className[2];
    if (e.which == 13) {
        list_click(id, id + '_child')
        $('.' + id + '_child').next().focus();
        return false;
    }
})

$('.nav-btn').on('click', function () {
    $('.nav_bar').toggleClass('sbar_collapsed');
    $('.nav-menu2 ul').toggleClass('open_menu');
});

$(".navbar-btn").click(function () {
    $(".nav-menu").toggleClass("open");
});



$(document).on('change', 'input[name=twitter],input[name=linkedin],input[name=instagram],input[name=facebook]', e => {
    updated_links[e.target.name] = e.target.value.trim();
})

$(document).on('change', 'input[name=Si_firstName],input[name=Si_lastName],input[name=Si_country],input[name=Si_phone],input[name=Si_email]', e => {
    let key = e.target.name.split('_')[1];
    if (key === 'email' || key === 'phone') updated_data.contact[key] = e.target.value.trim();
    else updated_data[key] = e.target.value.trim();

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


$(document).on('click', '#filter', e => {
    let filter_value = [];
    const childs = $('#complaint_list_push').children();
    for (let i = 0; i < childs.length; i++) {
        if (childs[i].innerText.trim() !== '') filter_value.push(childs[i].innerText);
    }

    $.post('api/User/Filter', {
        data: filter_value
    }).then(response => {
        response.data.forEach(elem => {
            $('#filtered').append(`<div class='filtered_value'>
            ${elem.firstName} ${elem.lastName} / ${elem.contact.email}
            </div>`)
        })
    })
})

$(document).on('click', '#update_services', function () {
    const childs = $('#service_list_push').children('.service_list_push_child');

    let services_set = new Set();
    childs.each(function () {
        if ($(this).text().trim() !== '') services_set.add($(this).text());
    })

    const arr = Array.from(services_set.values());
    $.post('api/User/Services', {
        data: arr.length > 0 ? arr : ''
    }).then(response => {
        if (response.updated) Swal.fire({
            title: 'Information Successfully saved'
        });
    })
})

$(document).ready(function () {
    //$('#calendar').datapicker();
    $.get('/csrf').then(response => {
        $.ajaxSetup({
            headers: {
                'CSRF-Token': response.csrf
            }
        });
    })

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


        if (response.data.services !== '') response.data.services.split(',').forEach(service => {
            $('#service_list_push').append(`<div 
            class="service_list_push_child" 
            contenteditable 
            style="width:${(service.length+2)*8}px">${service}</div>`)
        });

        $('#name_set').text(response.data.firstName + ' ' + response.data.lastName);
        $('#country_set').text(response.data.country);
        $('#phone_set').text(response.data.contact.phone);
        $('#email_set').text(response.data.contact.email);
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