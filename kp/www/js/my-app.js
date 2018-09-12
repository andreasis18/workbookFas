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
var directory= 'http://localhost/kp/server/projectkp.php';
//var directory='http://admingpb.000webhostapp.com/projectkp.php'; //tmpat php aplikasi

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});


function hapusLocalAll(){
    localStorage.removeItem('username');
    localStorage.removeItem('jabatan');
    localStorage.removeItem('tenda');
    localStorage.removeItem('bus');
    localStorage.removeItem('nama_kelompok');
    localStorage.removeItem('nama_mhs');
	localStorage.removeItem('nrp_mhs');
} //buat hapus smua local storage

var tenda=0;
var bus=0;
var nama_kelompok="";
var nama_mhs="";
var nrp_mhs="";



var judulModul=[["MY BIG DREAM"],
["MY LIFE LIST"],
["OUTDOOR ACTIVITY"],
["STUDI KASUS"],
["PENGALAMAN PRIBADI"],
["PERSONAL DEVELOPMENT PLAN"],
["FISHBONE"],
["KISAH ENTONG"],
["LESSON LEARNED"],
["REFLEKSI MINI PROJECT"]
];

var nrp="";
var password="";


myApp.onPageInit('index', function (page) {

    if(page='index'){
        if(JSON.parse(localStorage.getItem("username"))&&JSON.parse(localStorage.getItem("jabatan")))
        {
            if(JSON.parse(localStorage.getItem("jabatan"))=='fasilitator')
                mainView.router.loadPage('pilihGelombangFasilitator.html');
            else if(JSON.parse(localStorage.getItem("jabatan"))=='mahasiswa')
                mainView.router.loadPage('menu.html');            
        }
        else{
            myApp.hideNavbar($$('.navbar'));
        }
    }

    $$('#btnMasuk').on('click',function(){
    	var pilihan = document.getElementById("jabatan");
    	password = document.getElementById("password").value;
    	var username = document.getElementById("username");

        $$.post(directory,{opsi:"loginFasilitator", username:username.value,password:password},function(data){
            if(data=="berhasil")
            {
                mainView.router.loadPage('pilihGelombangFasilitator.html');
                localStorage.setItem("password",JSON.stringify(password));
                localStorage.setItem("username",JSON.stringify(username.value));
                localStorage.setItem("jabatan",JSON.stringify('fasilitator'));
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
        if(JSON.parse(localStorage.getItem("username"))&&JSON.parse(localStorage.getItem("jabatan"))){
            console.log("heahahwe");
            navigator.app.exitApp();   
        }
    });
});

myApp.onPageInit('pilihGelombangFasilitator', function (page) {
    var gelombang = document.getElementById('gelombang');
    var uname = localStorage.getItem("username");
    $$.post(directory,{opsi:"getGelombangPadaPeriodeAktif", username:uname},function(data){
        if(data!="gagal"){
            $$('#pilihGelombang').html(data);   
        }
        else{
            myApp.alert("Maaf status fasilitator anda sudah di non-aktifkan");
            localStorage.removeItem('username');
            localStorage.removeItem('jabatan');
            mainView.router.back({url: 'index.html',force: true,ignoreCache: true});       
        }
    });

    
    $$('#btnLogoutFasilitator').on('click', function () 
    {
        localStorage.removeItem('username');
        localStorage.removeItem('jabatan');
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
    $$.post(directory,{opsi:"getDetailMhs", id:nrp},function(data){
        $$('#statusMahasiswa').html(data);
    });

    $$('#insertComment').on('click', function () {
        var komen=document.getElementById("comments"); 
        $$.post(directory,{opsi:'insertCommentMhs', idNrp:nrp, komens: komen.value}, function(data){
            console.log(data);
            myApp.alert("Comment berhasil disimpan.");
        });
    });    
})

myApp.onPageInit('detailJawabMahasiswaFasilitator', function (page) {
    var nrp = page.query.idNrp;
    var submodul = page.query.id_Submodul;
    
    $$.post(directory,{opsi:"getDetailJawabanMhs", ids:nrp, modul:submodul},function(data){
        $$('#blockAnswer').html(data);
    });
})
