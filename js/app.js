/******************************Variables***********************************/
var flags = {
    curr_details: ''
};

var options = {
    curr_details:
    {
        person: 1,
        order: 2,
        submit: 3,
    }
};

var person_data = {
    name: '',
    section: '',
    purpose: '',
    date_needed: ''
};
/**************************************************************************/

$(function () {
    // Ready function
    init_modal();
    add_event_listeners();
});

/******************************Functions***********************************/
function init_modal() {
    $('#bootstrap_modal').modal({
        show: false,
        backdrop: false
    });
}

function modal_text(cmd) {
    if (cmd === 'clr_personal') {
        $('#bootstrap_modal .modal-content').css({
            'background-color': '#ffd6ba'
        });
        $('#bootstrap_modal .modal-title').removeClass().addClass('text-danger modal-title').html('Warning');
        $('#bootstrap_modal .modal-body p').removeClass().addClass('text-danger')
        .html('Do you really want to clear personal Details?');


    }
    else if (cmd === 'clr_order') {
        $('#bootstrap_modal .modal-content').css({
            'background-color': '#ffd6ba'
        });
        $('#bootstrap_modal .modal-title').removeClass().addClass('text-danger modal-title').html('Warning');
        $('#bootstrap_modal .modal-body p').removeClass().addClass('text-danger')
        .html('Do you really want to clear order Details?');
    }

    else if (cmd === 'submit') {
        $('#bootstrap_modal .modal-content').css({
            'background-color': 'rgb(227 247 217)'
        });
        $('#bootstrap_modal .modal-title').removeClass().addClass('text-info modal-title').html('Confirmation');
        $('#bootstrap_modal .modal-body p').removeClass().addClass('text-info')
        .html(`Click 'Yes' to submit. Click 'No' to review or change details.`);
    }
}

function clear_details (type) {
    if (type === 'personal')
    {
        $('#person_details input[type=text]').val('');
        $('#person_details input[type=radio]').prop('checked', false);
    }
    else if (type === 'order')
    {
        $('.order_details input[type=text]').val('');
        $('.order_details input[type=number]').val('');
        $('.order_details input[type=checkbox]').prop('checked', false);
    }
}

function send_mail () {
    person_data.name = $('#person_details #name').val();
    var section_elem = $('#person_details input[name=section_items]');
    $.each(section_elem, function () { 
        if (this.checked)
        {
            person_data.section = $(this).val();
            console.log(person_data.section);
        }
    });
    person_data.purpose = $('#person_details #purpose').val();
    person_data.date_needed = $('#person_details #date_needed').val();

    $.ajax({
        type: "POST",
        url: "php/send_mail.php",
        data: person_data,
        dataType: "json",
        success: function (response) {
            console.log(response);
        },
        error: function (object, error_desc) {
            console.log(error_desc);
        }
    });
}

function add_event_listeners() {
    $('#btn-clr-personal').on('click', function () {
        flags.curr_details = options.curr_details.person;
        modal_text('clr_personal');
        $('#bootstrap_modal').modal('show');
    });
    
    $('#btn-clr-order').on('click', function () {
        flags.curr_details = options.curr_details.order;
        modal_text('clr_order');
        $('#bootstrap_modal').modal('show');
    });
    
    $('#btn-submit').on('click', function () {
        flags.curr_details = options.curr_details.submit;
        modal_text('submit');
        $('#bootstrap_modal').modal('show');
    });

    $('#bootstrap_modal .modal-footer button.modal-yes').on('click', function () {
        if (flags.curr_details == options.curr_details.person)
        {
            clear_details('personal');
        }
        else if (flags.curr_details == options.curr_details.order)
        {
            clear_details('order');
        }
        else if (flags.curr_details == options.curr_details.submit)
        {
            send_mail();
        }
    });
    
    $('#bootstrap_modal').on('shown.bs.modal', function() {

    });
};
/**************************************************************************/