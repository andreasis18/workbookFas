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
var directory='http://administratorgpb.000webhostapp.com/projectkp.php'; //tmpat php aplikasi

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
            mainView.router.loadPage('pilihKelompokFasilitator.html');
            //mainView.router.loadPage('pilihMahasiswaFasilitator.html');
        }
        else{
            myApp.hideNavbar($$('.navbar'));
        }
    }

    $$('#btnMasuk').on('click',function(){
    	password = document.getElementById("password").value;
    	var username = document.getElementById("username");

        $$.post(directory,{opsi:"loginFasilitator", username:username.value,password:password},function(data){
            if(data=="gagal")
            {
                myApp.alert("Login Gagal, Username atau Password salah","Error");
            }
            else if(data=="kadaluarsa")
            {
                myApp.alert("Login Gagal, Data fasilitator sudah nonaktif", "Error");
            }
            else
            {
                localStorage.setItem("userfas",JSON.stringify(data));
                mainView.router.loadPage('pilihKelompokFasilitator.html');
                //mainView.router.loadPage('pilihMahasiswaFasilitator.html');
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

myApp.onPageInit('pilihKelompokFasilitator', function (page) {
    console.log(localStorage.getItem("userfas"));
    $$.post(directory,{opsi:"getKelompokDariGelombang", id:localStorage.getItem("userfas")},function(data){
        console.log(data);
        $$('#pilihKelompok').html(data);
    });
    $$('#btnLogoutFasilitator').on('click', function () 
    {
        hapusLocalAll();
        mainView.router.back({url: 'index.html',force: true,ignoreCache: true});
    });
})

myApp.onPageInit('pilihMahasiswaFasilitator', function (page) {
    var idKelompok = page.query.idKelompok;
    $$.post(directory,{opsi:"getMahasiswaDariKelompok",id:idKelompok},function(data){
        console.log(idKelompok);
        $$('#pilihMahasiswa').html(data);
    });
    // console.log(localStorage.getItem("userfas"));
    //  $$.post(directory,{opsi:"getMahasiswaDariKelompok",id:localStorage.getItem("userfas")},function(data){
    //     $$('#pilihMahasiswa').html(data);
    // });
    $$('#btnLogoutFasilitator').on('click', function () 
    {
        hapusLocalAll();
        mainView.router.back({url: 'index.html',force: true,ignoreCache: true});
    });
})

myApp.onPageInit('halamanMahasiswaFasilitator', function (page) {
    var nrp = page.query.idNrp;
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

    $$.post(directory,{opsi:'getComment', id:nrp, modul:submodul}, function(data){
        $$('#comments').html(data); 
    });

    $$('#insertComment').on('click', function () {
        var komen=document.getElementById("comments"); 
        $$.post(directory,{opsi:'insertCommentMhs', idNrp:nrp, modul:submodul, komens: komen.value}, function(data){
            console.log(data);
            myApp.alert("Comment berhasil disimpan.");
            mainView.router.back();
        });
    });    

    $$('#verification').on('click', function () {
        myApp.confirm('Apakah jawaban mahasiswa sudah benar?', 'Verifikasi Jawaban', function () {
            $$.post(directory,{opsi:'verifikasiJawaban', idNrp:nrp, modul:submodul}, function(data){
                myApp.alert("Jawaban berhasil diverifikasi");
                mainView.router.back({url: 'halamanMahasiswaFasilitator.html',force: true,ignoreCache: true});
            });   
        }, function () {

        });
    });    


})
