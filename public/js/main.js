$(document).ready(function () {
    $('.nav-btn').on('click', function () {
        $('.nav_bar').toggleClass('sbar_collapsed');
        $('.nav-menu2 ul').toggleClass('open_menu');
    });

    $(".navbar-btn").click(function () {
        $(".nav-menu").toggleClass("open");
    });

});

let valid = {
    phone: false,
    email: false
}
$(document).on('click', '#send_pin_email, #send_pin_phone', function (e) {

    let part = e.target.id.split('_')[2];

    $.post('auth/send_pin_' + part, {
        [part]: $('#reg_' + part).val()
    }).then(res => {

        if (res.err) {
            $(`#${part}_error`).text(res.err.msg);
            $(`#${part}_error`).css('display', 'block')
        } else {
            if (res) {
                $(`#${part}_error`).text('');
                // $('#send_pin_' + part).prop('disabled', true);
                $(`#${part}_pin`).removeAttr('disabled');
                $(`#${part}_pin`).css('border', '1px solid #00ADB9');
            }
        }
    })
})

function emailVerify(stepContentNext) {
    $.post('auth/verify_pin_email', {
        email: $('#reg_email').val(),
        pin: $('#email_pin').val()
    }).then(res => {
        if (res.err) {
            $(`#email_pin_error`).text(res.err.msg);
            $(`#email_pin_error`).css('display', 'block');
        } else if (!res.valid) {
            $(`#email_pin_error`).text('Incorrect verification code.');
            $(`#email_pin_error`).css('display', 'block');
        } else {
            valid.email = true;
            $('#step_1').attr('hidden', true);
            $('#step_2').removeAttr('hidden');
            $('.step-item').eq(stepContentNext).addClass('step-item-active');
        }
    })
}

function phoneVerify(data) {

    $.post('/auth/verify_pin_phone', {
        phone: $('#reg_phone').val(),
        pin: $('#phone_pin').val()
    }).then(res => {
        if (res.err) {
            $(`#phone_pin_error`).text(res.err.msg);
            $(`#phone_pin_error`).css('display', 'block');
        } else if (!res.valid) {
            $(`#phone_pin_error`).text('Incorrect verification code.');
            $(`#phone_pin_error`).css('display', 'block');
        } else {
            console.log(data);

            $.ajax({
                method: 'POST',
                data: data,

                url: '/auth/sign_up',
                success: function (res) {
                    if (res.err) {
                        last_field = `#${res.err.param}_error`;
                        $(`#${res.err.param}_error`).text(res.err.msg);
                        $(`#${res.err.param}_error`).css('display', 'block');

                    } else {

                        console.log('Signup ' + data);
                        if (data.customer) window.location.assign('/customer');
                        else window.location.assign('/therapist');
                    }


                }
            })
        }
    })
}

$(document).on('click', '#show_signin', e => {
    $('#signup_form').attr('hidden', true);
    $('#signin_form').removeAttr('hidden');
})

$(document).on('click', '#show_signup', e => {
    $('#signin_form').attr('hidden', true);
    $('#signup_form').removeAttr('hidden');


})
$(document).ready(function () {

    let data = {
        username: "",
        email: "",
        password: "",
        confirm_password: "",
        email_pin: "",
        country: "",
        firstName: "",
        lastName: "",
        phone: "",
        phone_pin: "",
        customer: true
    };

    let last_field = '#username_error';
    let reg = false;

    $.get('/csrf').then(response => {
        $.ajaxSetup({
            headers: {
                'CSRF-Token': response.csrf
            }
        });
    })


    $(document).on('click', '#signin', e => {
        $.post('auth/sign_in', {
            email: $('#log_email').val(),
            password: $('#log_password').val()
        }).then(res => {
            if (res.login) {

                window.location.href = res.path
            };
            if (res.err) $('#signin_error').text(res.err);
        })
    })

    let _isCustomer = true;
    $(document).on('change', '.type_radio', e => {
        _isCustomer = e.target.value;
    })
    $(document).on('click', '#next, #reg_btn', function (e) {

        $(last_field).text('');

        let _this = $(this);
        let stepContent = _this.closest('.form-step-content').index();
        let stepContentNext = _this.closest('.form-step-content').index() + 1;


        Object.keys(data).forEach(key => {
            data[key] = $(`input[name=${key}]`).val();
        })

        data.customer = _isCustomer;



        if ($('#email_pin').val() !== '' && !valid.email) emailVerify(stepContentNext);
        else
            if ($('#phone_pin').val() !== '' && !valid.phone) phoneVerify(data);
            else {
                console.log('Sign up');
                $.ajax({
                    method: 'POST',
                    data: data,
                    url: '/auth/sign_up',
                    success: function (res) {
                        if (res.err) {
                            last_field = `#${res.err.param}_error`;
                            $(`#${res.err.param}_error`).text(res.err.msg);
                            $(`#${res.err.param}_error`).css('display', 'block');

                        } else {
                            $('#step_1').attr('hidden', true);
                            $('#step_2').removeAttr('hidden');
                        }
                    }
                })
            }
    });


    // Step bar
    // $(document).on('click', '.step-item-active', function () {
    //     var _this = $(this);
    //     var index = _this.index();
    //     var hideNext = index + 1;


    //     $(_this).nextAll().removeClass('step-item-active');

    // });

});

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
            $('#imagePreview').hide();
            $('#imagePreview').fadeIn(650);
        }
        reader.readAsDataURL(input.files[0]);
    }
}
$("#imageUpload").change(function () {
    readURL(this);
});

function readURL2(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#imagePreview2').css('background-image', 'url(' + e.target.result + ')');
            $('#imagePreview2').hide();
            $('#imagePreview2').fadeIn(650);
        }
        reader.readAsDataURL(input.files[0]);
    }
}
$("#imageUpload2").change(function () {
    readURL2(this);
});