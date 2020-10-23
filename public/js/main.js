$(document).ready(function () {
    $('.nav-btn').on('click', function () {
        $('.nav_bar').toggleClass('sbar_collapsed');
        $('.nav-menu2 ul').toggleClass('open_menu');
    });

    $(".navbar-btn").click(function () {
        $(".nav-menu").toggleClass("open");
    });

});


$(document).ready(function () {
    let last_field = '#username_error';
    $(document).on('click', '.form-step-button', function (e) {
        $(last_field).text('');
        var valid = false;
        var alertMessage = $('.step-alert');
        var _this = $(this);
        var _thisClass = _this.hasClass('button-invalid');
        var stepContent = _this.closest('.form-step-content').index();
        var stepContentNext = _this.closest('.form-step-content').index() + 1;

        let data = {};
        $(".form-step-content").eq(stepContent).find('input, select').each(function () {
            if ($(this).attr('name')) data[this.name] = $(this).val();
        });



        $.ajax({
            method: 'POST',
            data: data,
            url: '/api/auth/sign_up',
            success: function (res) {
                if (res.err) {
                    last_field = `#${res.err.param}_error`;

                    $(`#${res.err.param}_error`).text(res.err.msg);
                    $(`#${res.err.param}_error`).css('display', 'block');
                }
            }
        })
        // Set boolean true if all not is empty
        // if (valid == true) {
        //     _this.addClass('button-invalid');
        //     _thisClass = true;
        // }
        // else {
        //     _this.removeClass('button-invalid');
        //     _thisClass = false;
        // }

        // // Alert message / Hide and show the content
        // if (_thisClass == true) {
        //     alertMessage.html('Please check all fields');
        //     _this.addClass('button-bouncing');
        // }
        // else {
        //     alertMessage.html('');

        //     $('.form-step-content').hide();
        //     $('.form-step-content').eq(stepContentNext).fadeIn(500);

        //     //stepBarNext
        //     $('.step-item').eq(stepContentNext).addClass('step-item-active');
        // }
    });

    // Step bar
    $(document).on('click', '.step-item-active', function () {
        var _this = $(this);
        var index = _this.index();
        var hideNext = index + 1;

        // Set content
        $('.form-step-content').hide();
        $('.form-step-content').eq(index).fadeIn(500);

        // Set sidebar
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



function next() {
    $('#step_1').submit(function (e) {
        console.log(e.target)
    })
}