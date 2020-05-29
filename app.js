var $$ = Dom7;

var app = new Framework7({
    root: '#app', // App root element

    id: 'com.fxteam.list', // App bundle ID
    name: 'Virtual List', // App name
    theme: 'auto', // Automatic theme detection
    // App root data
    data: function() {
        return {
            user: {
                firstName: 'Jan',
                lastName: 'Kowalski',
            },
			

        };
    },
    // App root methods
    methods: {
        helloWorld: function() {
            app.dialog.alert('Hello World!');
        },
    },
    // App routes
    routes: routes,


    // Input settings
    input: {
        scrollIntoViewOnFocus: Framework7.device.cordova && !Framework7.device.electron,
        scrollIntoViewCentered: Framework7.device.cordova && !Framework7.device.electron,
    },
    // Cordova Statusbar settings
    statusbar: {
        iosOverlaysWebView: true,
        androidOverlaysWebView: false,
    },
    on: {
        init: function() {
            var f7 = this;
            if (f7.device.cordova) {
                // Init cordova APIs (see cordova-app.js)
                cordovaApp.init(f7);
            }
        },
    },
});

$$(document).on('page:init', '.page[data-name="nazwiska"]', function(e) { //zdarzenie otwarcia strony z wirtualną listą

    axios
        .get('http://localhost/cgi-bin/nana.cgi') //api url
        .then(response => {
            console.log(items, response.data);
            var virtualList = app.virtualList.create({
                // List Element
                el: '.virtual-list',
                // Pass array with items
                items: response.data, //JSON z api
                // Custom search function for searchbar
                searchAll: function(query, items) {
                    var found = [];
                    for (var i = 0; i < items.length; i++) {
                        if (items[i].title.toLowerCase().indexOf(query.toLowerCase()) >= 0 || query.trim() === '') found.push(i);
                    }
                    return found; //return array with mathced indexes
                },
                // List item Template7 template
                itemTemplate: '<li>' +
                    '<a href="#" class="item-link item-content">' +
                    '<div class="item-inner">' +
                    '<div class="item-title-row">' +
                    '<div class="item-title">{{title}}</div>' +
                    '</div>' +
                    '<div class="item-subtitle">{{subtitle}}</div>' +
                    '</div>' +
                    '</a>' +
                    '</li>',
                // Item height
                height: app.theme === 'ios' ? 63 : (app.theme === 'md' ? 73 : 46),
            });
        });
});