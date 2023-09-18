$(document).ready(function () {
    $('#country').attr('disabled', true);
    $('#state').attr('disabled', true);
    $('#city').attr('disabled', true);
    LoadCountries();

    $('#country').change(function () {
        var countryId = $(this).val();
        if (countryId > 0) {
            LoadStates(countryId);
        }
        else {
            alert("Select Country");
            $('#state').attr('disabled', true);
            $('#city').attr('disabled', true);
            $('#state').append('<option>--Select State--</option>');
            $('#city').append('<option>--Select City--</option>');

        }
    });

    $('#state').change(function () {
        var stateId = $(this).val();
        if (stateId > 0) {
            LoadStates(stateId);
        }
        else {
            alert("Select State");
            $('#city').attr('disabled', true);
            $('#city').append('<option>--Select City--</option>');

        }
    });
});

function LoadCountries() {
    $('#country').empty();

    $.ajax({
        url: '/CascadingDDL/GetCountries',
        success: function (response) {
            if (response != null && response != undefined && response.length > 0) {
                $('#country').attr('disabled', false);
                $('#country').append('<option>--Select Country--</option>');
                $('#state').append('<option>--Select State--</option>');
                $('#city').append('<option>--Select City--</option>');
                $.each(response, function (i, data) {
                    $('#country').append('<option value=' + data.id + '>' + data.name + '</option');
                });
            }
            else {
                $('#country').attr('disabled', true);
                $('#state').attr('disabled', true);
                $('#city').attr('disabled', true);
                $('#country').append('<option>--Countries not avaiable--</option>');
                $('#state').append('<option>--States not avaiable--</option>');
                $('#city').append('<option>--Cities not avaiable--</option>');

            }
        },
        error: function (error) {
            alert(error);
        }
    });
}

function LoadStates(countryId) {
    $('#state').empty();
    $('#city').empty();
    $('#state').attr('disabled', true);

    $.ajax({
        url: '/CascadingDDL/GetStates?Id=', + countryId,
        success: function (response) {
            if (response != null && response != undefined && response.length > 0) {
                $('#state').attr('disabled', false);
                $('#state').append('<option>--Select State--</option>');
                $('#city').append('<option>--Select City--</option>');
                $.each(response, function (i, data) {
                    $('#state').append('<option value=' + data.id + '>' + data.name + '</option');
                });
            }
            else {
                $('#state').attr('disabled', true);
                $('#city').attr('disabled', true);
                $('#state').append('<option>--States not avaiable--</option>');
                $('#city').append('<option>--Cities not avaiable--</option>');

            }
        },
        error: function (error) {
            alert(error);
        }
    });
}

function LoadStates(stateId) {

    $('#city').empty();
  

    $.ajax({
        url: '/CascadingDDL/GetCities?Id=', + stateId,
        success: function (response) {
            if (response != null && response != undefined && response.length > 0) {
                $('#city').attr('disabled', false);
                $('#city').append('<option>--Select City--</option>');
                $.each(response, function (i, data) {
                    $('#city').append('<option value=' + data.id + '>' + data.name + '</option');
                });
            }
            else {
            
                $('#city').attr('disabled', true);
                $('#city').append('<option>--Cities not avaiable--</option>');

            }
        },
        error: function (error) {
            alert(error);
        }
    });
}