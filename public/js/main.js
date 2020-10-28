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
    console.log(part);
    $.post('api/auth/send_pin_' + part, { [part]: $('#reg_' + part).val() }).then(res => {

        if (res.err) {
            $(`#${part}_error`).text(res.err);
            $(`#${part}_error`).css('display', 'block')
        } else {
            $(`#${part}_error`).text(res.err);
            if (res) {
                $(`#${part}_error`).text('');
                $('#send_pin_' + part).prop('disabled', true);
                $(`#${part}_pin`).removeAttr('disabled');
            }
        }
    })
})



function verify(field, stepContentNext) {
    $.post('api/auth/verify_pin_' + field, {
        [field]: $('#reg_' + field).val(),
        pin: $('#' + field + '_pin').val()
    }).then(res => {
        if (res.err) {
            console.log(res.err);
            $(`#${field}_pin_error`).text(res.err.msg);
            $(`#${field}_pin_error`).css('display', 'block');
        } else if (!res.valid) {
            $(`#${field}_pin_error`).text('Incorrect verification code.');
            $(`#${field}_pin_error`).css('display', 'block');
        } else {
            valid[field] = true;
            $(`#${field}_pin`).val('');
            $('.form-step-content').hide();
            $('.form-step-content').eq(stepContentNext).fadeIn(500);
            $('.step-item').eq(stepContentNext).addClass('step-item-active');
        }
    })
}

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
        phone_number: "",
        phone_pin: ""
    };

    let last_field = '#username_error';
    let reg = false;

    $(document).on('click', '#signin', e => {
        $.post('api/auth/sign_in', {
            email: $('#log_email').val(),
            password: $('#log_password').val()
        }).then(res => {
            if (res.err) $('#signin_error').text(res.err);
        })
    })


    $(document).on('click', '#next, #reg_btn', function (e) {

        $(last_field).text('');

        let _this = $(this);
        let stepContent = _this.closest('.form-step-content').index();
        let stepContentNext = _this.closest('.form-step-content').index() + 1;



        // $('.form-step-content').hide();
        // $('.form-step-content').eq(stepContentNext).fadeIn(500);
        // $('.step-item').eq(stepContentNext).addClass('step-item-active');

        $(".form-step-content").eq(stepContent).find('input, select').each(function () {
            if ($(this).attr('name')) data[this.name] = $(this).val();
        });





        if ($('#email_pin').val() !== '' && !valid.email) verify('email', stepContentNext); else
            if ($('#phone_pin').val() !== '' && !valid.phone) verify('phone', stepContentNext); else {
                $.ajax({
                    method: 'POST',
                    data: data,
                    url: '/api/auth/sign_up',
                    success: function (res) {
                        if (res.err) {

                            last_field = `#${res.err.param}_error`;
                            $(`#${res.err.param}_error`).text(res.err.msg);
                            $(`#${res.err.param}_error`).css('display', 'block');

                        } else {
                            $('.form-step-content').hide();
                            $('.form-step-content').eq(stepContentNext).fadeIn(500);
                        }
                    }
                })
            }




    });


    // Step bar
    $(document).on('click', '.step-item-active', function () {
        var _this = $(this);
        var index = _this.index();
        var hideNext = index + 1;


        $(_this).nextAll().removeClass('step-item-active');

    });

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

