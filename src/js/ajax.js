// Ugyanez még rövidebben.
$.getJSON('json/user.json', function(users){
    fillTable(users);
});

// Felhasználók listája.
function fillTable(users) {
    
    var btnTemplate = '<button class="btn btn-success mod-btn" data-userid="?">módosítás</button>';
    var keys = ['name', 'age', 'address', 'job'];
    
    var tBody = $('.ajax-table tbody');
    for( var k in users) {
        var id = 'user_'+(k+1);
        var tr = $('<tr />');
        tr.append( $('<td />').html(id) );
        for( var kk in keys ) {
            tr.append(
                $('<td data-name="'+keys[kk]+'" />')
                .html(users[k][keys[kk]])
            );            
        }
        tr.append( 
                $('<td />')
                    .append(btnTemplate.replace('?', id)) 
            )
            .appendTo(tBody)
            .data('userData', users[k]);
    }
    
    // Modális ablak megnyitása a felhasználók szerkesztéséhez.
    tBody.find('.mod-btn').modBtn('ajaxModal');
}

// Tábla frissítése.
function updateTable(tr, userData) {
    console.log( 'userData', userData );
    tr.find('td').each(function(key, td){
        var k = $(td).data('name');
        $(td).html(userData[k]); 
    });
}

// A módosítás gomb jQuery pluginja.
$.fn.modBtn = function(modalId) {
    this.on('click', function() {
        
        var modalWindow = $('#'+modalId);
        var tr = $(this).parents('tr');
        var userData = tr.data('userData');
        
        modalWindow
            .find('input')
            .each(function(key, input){
                $(input)
                    .val(userData[input.name])
                    .off('change')
                    .on('change', function(){
                        userData[this.name] = this.value;
                    });                
            });        
        // modalWindow.data('userData', userData);
        
        modalWindow
            .find('.mod-save-btn')
            .off('click')
            .on('click', function(){
                updateTable(tr, userData);
                modalWindow.modal('hide');
            });
        
        modalWindow.modal('show');
        
    });   
    return this;
};

// Repülő animálása.
$('.glyphicon-plane')
    .css({
        'font-size': '24px',
        'transform': 'rotate(90deg)',
        'opacity': '0.5',
        'right': '1000px',
        'position': 'absolute'
    })
    .animate({
        'opacity': '1',
        'right': ['50%'],
        'font-size': '72px'
    }, 1000);






/* // Példányosítunk egy új XMLHttpRequest-et.
var xhr = new XMLHttpRequest;

// Megadjuk a kérés típusát és a végpontot.
xhr.open('get', 'json/user.json');

// Lekeljük a választ.
xhr.onload = function(ev) {
    var users = JSON.parse(ev.target.response);
    console.log( users );
}

// Kérés küldése.
xhr.send();

// Ugyanez jquery segítségével.
$.ajax({
    url: 'json/user.json',
    dataType: 'json',
    success: function(response) {
        console.log(response);
    }
}); */