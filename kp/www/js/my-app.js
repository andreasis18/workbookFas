    // Initialize app
var myApp = new Framework7({
    pushState: true,
    swipeBackPage: false,
    preloadPreviousPage: false,
    panel: {swipe:'left'},
    sortable: {
    moveElements: true
    }
});

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;
//var directory= 'http://localhost/kp/server/projectkp.php';
var directory='http://admingpb.000webhostapp.com/projectkp.php'; //tmpat php aplikasi

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});


function hapusLocalAll(){
    localStorage.removeItem('userfas');
} //buat hapus smua local storage


myApp.onPageInit('index', function (page) {
    if(page='index'){
        if(JSON.parse(localStorage.getItem("userfas")))
        {
            mainView.router.loadPage('pilihGelombangFasilitator.html');
        }
        else{
            myApp.hideNavbar($$('.navbar'));
        }
    }

    $$('#btnMasuk').on('click',function(){
    	password = document.getElementById("password").value;
    	var username = document.getElementById("username");

        $$.post(directory,{opsi:"loginFasilitator", username:username.value,password:password},function(data){
            if(data=="berhasil")
            {
                mainView.router.loadPage('pilihGelombangFasilitator.html');
                localStorage.setItem("userfas",JSON.stringify(username.value));
            }
            else if(data=="kadaluarsa")
            {
                myApp.alert("Login Gagal, Data fasilitator sudah nonaktif", "Error");
            }
            else
            {
                myApp.alert("Login Gagal, Username atau Password salah","Error");
            }    
        });
    	
    });
}).trigger();


$$(document).on('deviceready', function() {
    console.log("Device is ready!");
    myApp.onPageBack('menu',function(asd){
        if(JSON.parse(localStorage.getItem("userfas"))){
            console.log("heahahwe");
            navigator.app.exitApp();   
        }
    });
});

myApp.onPageInit('pilihGelombangFasilitator', function (page) {
    var gelombang = document.getElementById('gelombang');
    var uname = localStorage.getItem("userfas");
    $$.post(directory,{opsi:"getGelombangPadaPeriodeAktif", username:uname},function(data){
        if(data!="gagal"){
            $$('#pilihGelombang').html(data);   
        }
        else{
            myApp.alert("Maaf status fasilitator anda sudah di non-aktifkan");
            hapusLocalAll();
            mainView.router.back({url: 'index.html',force: true,ignoreCache: true});       
        }
    });

    
    $$('#btnLogoutFasilitator').on('click', function () 
    {
        hapusLocalAll();
        mainView.router.back({url: 'index.html',force: true,ignoreCache: true});
    });
    
})

myApp.onPageInit('pilihKelompokFasilitator', function (page) {
    var idGelombang = page.query.idGelombang;
    $$.post(directory,{opsi:"getKelompokDariGelombang", id:idGelombang},function(data){
        $$('#pilihKelompok').html(data);
    });
})

myApp.onPageInit('pilihMahasiswaFasilitator', function (page) {
    var idKelompok = page.query.idKelompok;
    $$.post(directory,{opsi:"getMahasiswaDariKelompok", id:idKelompok},function(data){
        $$('#pilihMahasiswa').html(data);
    });
})

myApp.onPageInit('halamanMahasiswaFasilitator', function (page) {
    var nrp = page.query.idNrp;
    $$.post(directory,{opsi:"getComment", id:nrp},function(data){
        $$('#comments').html(data);
    });
    $$.post(directory,{opsi:"getDetailMhs", id:nrp},function(data){
        $$('#statusMahasiswa').html(data);
    });

})

myApp.onPageInit('detailJawabMahasiswaFasilitator', function (page) {
    var nrp = page.query.idNrp;
    var submodul = page.query.id_Submodul;
    
    $$.post(directory,{opsi:"getDetailJawabanMhs", ids:nrp, modul:submodul},function(data){
        $$('#blockAnswer').html(data);
    });

    $$('#insertComment').on('click', function () {
        var komen=document.getElementById("comments"); 
        $$.post(directory,{opsi:'insertCommentMhs', idNrp:nrp, moduk:submodul, komens: komen.value}, function(data){
            console.log(data);
            myApp.alert("Comment berhasil disimpan.");
        });
    });    
})
