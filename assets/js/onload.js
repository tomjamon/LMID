$(function() {
    $("#conf_1").focus();
    chrome.storage.sync.get('name_1', function(obj){
        if(!obj['name_1']) {
            // Facebook
            chrome.storage.sync.set({"name_1": "Facebook"}, null);
            chrome.storage.sync.set({"link_direct_1": "https://www.facebook.com"}, null);
            chrome.storage.sync.set({'link_lmid_1': 'https://www.facebook.com/'}, null);
            chrome.storage.sync.set({'icon_1': 'fa-facebook'}, null);
            // Twitter
            chrome.storage.sync.set({'name_2': 'Twitter'}, null);
            chrome.storage.sync.set({'link_direct_2': 'https://www.twitter.com'}, null);
            chrome.storage.sync.set({'link_lmid_2': 'https://www.twitter.com/'}, null);
            chrome.storage.sync.set({'icon_2': 'fa-twitter'}, null);
            // Linkedin
            chrome.storage.sync.set({'name_3': 'Linkedin'}, null);
            chrome.storage.sync.set({'link_direct_3': 'https://www.linkedin.com'}, null);
            chrome.storage.sync.set({'link_lmid_3': 'https://www.linkedin.com/in/'}, null);
            chrome.storage.sync.set({'icon_3': 'fa-linkedin'}, null);
            // Bitbucket
            chrome.storage.sync.set({'name_4': 'Bitbucket'}, null);
            chrome.storage.sync.set({'link_direct_4': 'http://www.bitbucket.org'}, null);
            chrome.storage.sync.set({'link_lmid_4': 'http://www.bitbucket.org/'}, null);
            chrome.storage.sync.set({'icon_4': 'fa-bitbucket'}, null);
            // Flickr
            chrome.storage.sync.set({'name_5': 'Flickr'}, null);
            chrome.storage.sync.set({'link_direct_5': 'https://www.flickr.com'}, null);
            chrome.storage.sync.set({'link_lmid_5': 'https://www.flickr.com/photos/'}, null);
            chrome.storage.sync.set({'icon_5': 'fa-flickr'}, null);
            // Github
            chrome.storage.sync.set({'name_6': 'Github'}, null);
            chrome.storage.sync.set({'link_direct_6': 'https://github.com'}, null);
            chrome.storage.sync.set({'link_lmid_6': 'http://github.com/'}, null);
            chrome.storage.sync.set({'icon_6': 'fa-github'}, null);
            // Dribbble
            chrome.storage.sync.set({'name_7': 'Dribbble'}, null);
            chrome.storage.sync.set({'link_direct_7': 'https://dribbble.com'}, null);
            chrome.storage.sync.set({'link_lmid_7': 'https://dribbble.com/'}, null);
            chrome.storage.sync.set({'icon_7': 'fa-dribbble'}, null);
            // Reddit
            chrome.storage.sync.set({'name_8': 'Reddit'}, null);
            chrome.storage.sync.set({'link_direct_8': 'https://www.reddit.com'}, null);
            chrome.storage.sync.set({'link_lmid_8': 'https://www.reddit.com/user/'}, null);
            chrome.storage.sync.set({'icon_8': 'fa-reddit'}, null);
            // Twitch
            chrome.storage.sync.set({'name_9': 'Twitch'}, null);
            chrome.storage.sync.set({'link_direct_9': 'https://www.twitch.tv'}, null);
            chrome.storage.sync.set({'link_lmid_9': 'https://www.twitch.tv/'}, null);
            chrome.storage.sync.set({'icon_9': 'fa-twitch'}, null);
        }
    });

    var pas;
    var current_id;
    var id;
    init();

    $( "#active-launch" ).click(function() {
        init();
    });

    function init() {
        for (pas = 1; pas <= 9; pas++) {
            (function (pas) {
                chrome.storage.sync.get('name_'+pas, function(name){
                    if(name[Object.keys(name)[0]]) {

                        document.getElementById( Object.keys(name)[0]).value = name[Object.keys(name)[0]];

                        $('#field_'+pas+' i').removeClass().addClass("fa fa-2x");

                        chrome.storage.sync.get('icon_'+pas, function(icon) {
                            if(icon[Object.keys(icon)[0]]){
                                $('#field_'+pas+' i').addClass( icon[Object.keys(icon)[0]] );
                            }
                        });

                        chrome.storage.sync.get('name_'+pas, function(nameText) {
                            if(nameText[Object.keys(nameText)[0]]){
                                $('#field_'+pas+' label').text( nameText[Object.keys(nameText)[0]] );
                            }
                        });
                    }
                });
                chrome.storage.sync.get('link_direct_'+pas, function(ld){
                    if(ld[Object.keys(ld)[0]]) {
                        document.getElementById( Object.keys(ld)[0] ).value = ld[Object.keys(ld)[0]];
                    }
                });
                chrome.storage.sync.get('link_lmid_'+pas, function(ll){
                    if(ll[Object.keys(ll)[0]]) {
                        document.getElementById( Object.keys(ll)[0] ).value = ll[Object.keys(ll)[0]];
                    }
                });
                chrome.storage.sync.get('icon_'+pas, function(ip){
                    if(ip[Object.keys(ip)[0]]) {
                        document.getElementById(Object.keys(ip)[0]).value = ip[Object.keys(ip)[0]];
                    }
                });
            }) (pas);
        }
    }

    $( "#launch form" ).submit(function( event ) {

        current_id = $(this).data("id");

        if($('#conf_'+current_id).val() != ''){
            chrome.storage.sync.get('link_lmid_'+current_id, function(linklmid){
                if(linklmid[Object.keys(linklmid)[0]]) {
                    chrome.tabs.create({
                        url:linklmid[Object.keys(linklmid)[0]]+$('#conf_'+current_id).val()
                    });
                }
            });
        } else {
            chrome.storage.sync.get('link_direct_'+current_id, function(linkdirect){
                if(linkdirect[Object.keys(linkdirect)[0]]) {
                    chrome.tabs.create({
                        url:linkdirect[Object.keys(linkdirect)[0]]
                    });
                }
            });
        }
        event.preventDefault();
    });

    $("#configuration :input, #configuration select").change(function() {
        var updateConfId = $(this).attr('id');
        var updateConfValue = document.getElementById(updateConfId).value;
        var updateConfJsonValue = '{"'+updateConfId+'": "'+updateConfValue+'"}';
        var updateConfJson = JSON.parse(updateConfJsonValue);
        chrome.storage.sync.set(updateConfJson , null );
    });

    $('select').material_select();

    $( ".footer a" ).click(function() {
        chrome.tabs.create({
            url:"https://www.tomjamon.com"
        });
    });
});
