// Fast focus
$(function() {
    $("#conf_1").focus();
});

// Default values
if (typeof localStorage == 'undefined' || localStorage.length == 0) {

    // Facebook
    localStorage['name_1'] = 'Facebook';
    localStorage['link_direct_1'] = 'https://www.facebook.com';
    localStorage['link_lmid_1'] = 'https://www.facebook.com/';
    localStorage['icon_1'] = 'fa-facebook';

    // Twitter
    localStorage['name_2'] = 'Twitter';
    localStorage['link_direct_2'] = 'https://www.twitter.com';
    localStorage['link_lmid_2'] = 'https://www.twitter.com/';
    localStorage['icon_2'] = 'fa-twitter';

    // Linkedin
    localStorage['name_3'] = 'Linkedin';
    localStorage['link_direct_3'] = 'https://www.linkedin.com';
    localStorage['link_lmid_3'] = 'https://www.linkedin.com/in/';
    localStorage['icon_3'] = 'fa-linkedin';

    // Bitbucket
    localStorage['name_4'] = 'Bitbucket';
    localStorage['link_direct_4'] = 'http://www.bitbucket.org';
    localStorage['link_lmid_4'] = 'http://www.bitbucket.org/';
    localStorage['icon_4'] = 'fa-bitbucket';

    // Flickr
    localStorage['name_5'] = 'Flickr';
    localStorage['link_direct_5'] = 'https://www.flickr.com';
    localStorage['link_lmid_5'] = 'https://www.flickr.com/photos/';
    localStorage['icon_5'] = 'fa-flickr';

    // Github
    localStorage['name_6'] = 'Github';
    localStorage['link_direct_6'] = 'https://github.com';
    localStorage['link_lmid_6'] = 'http://github.com/';
    localStorage['icon_6'] = 'fa-github';

    // Dribbble
    localStorage['name_7'] = 'Dribbble';
    localStorage['link_direct_7'] = 'https://dribbble.com';
    localStorage['link_lmid_7'] = 'https://dribbble.com/';
    localStorage['icon_7'] = 'fa-dribbble';

    // Reddit
    localStorage['name_8'] = 'Reddit';
    localStorage['link_direct_8'] = 'https://www.reddit.com';
    localStorage['link_lmid_8'] = 'https://www.reddit.com/user/';
    localStorage['icon_8'] = 'fa-reddit';

    // Twitch
    localStorage['name_9'] = 'Twitch';
    localStorage['link_direct_9'] = 'https://www.twitch.tv';
    localStorage['link_lmid_9'] = 'https://www.twitch.tv/';
    localStorage['icon_9'] = 'fa-twitch';
}

// Launch My ID
$(function() {

    var pas;
    var current_id;
    var id;

    init();

    $( "#active-launch" ).click(function() {
        init();
    });

    function init(){
        for (pas = 1; pas <= 9; pas++) {

            if(localStorage['name_'+pas]) {
                document.getElementById('name_'+pas).value = localStorage['name_'+pas];
                $('#field_'+pas+' i').removeClass().addClass("fa fa-2x "+localStorage['icon_'+pas]);
                $('#field_'+pas+' label').text(localStorage['name_'+pas]);
            }
            if(localStorage['link_direct_'+pas]) document.getElementById('link_direct_'+pas).value = localStorage['link_direct_'+pas];
            if(localStorage['link_lmid_'+pas]) document.getElementById('link_lmid_'+pas).value = localStorage['link_lmid_'+pas];
            if(localStorage['icon_'+pas]) $('#icon_'+pas).val(localStorage['icon_'+pas]);
        }
    }

    $( "#launch form" ).submit(function( event ) {

        current_id = $(this).data("id");

        if($('#conf_'+current_id).val() != ''){
            chrome.tabs.create({
                url:localStorage['link_lmid_'+current_id]+$('#conf_'+current_id).val()
            });
        } else {
            chrome.tabs.create({
                url:localStorage['link_direct_'+current_id]
            });
        }
        event.preventDefault();
    });

    $("#configuration :input, #configuration select").change(function() {
        id = $(this).attr('id');
        localStorage[id] = document.getElementById(id).value;
        console.log(localStorage[id]+" : "+document.getElementById(id).value);
    });


    $('select').material_select();

    $( ".footer a" ).click(function() {
        chrome.tabs.create({
            url:"http://www.tomjamon.com"
        });
    });

});