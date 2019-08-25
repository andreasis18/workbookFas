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
    localStorage.removeItem('userAdmin');
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
            else if(data=="admin")
            {
                localStorage.setItem("userAdmin",JSON.stringify("admin"));
                mainView.router.loadPage('pilihGelombangAdmin.html');
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
        navigator.app.exitApp();   
    });
});

myApp.onPageInit('pilihGelombangAdmin', function (page) {

    $$.post(directory,{opsi:"getGelombang"},function(data){
        $$('#pilihKelompok').html(data);
        $$('.overlay, .overlay-message').hide();
    });
    $$('#btnSearchAdmin').on('click', function () 
    {
        myApp.prompt('', 'Search NRP', function (value) {
            if(value!='')
            {
                $$.post(directory,{opsi:'searchNRP',nrp:value}, function(data){
                    console.log(data);
                    if(data!="gagal"){
                        mainView.router.loadPage('halamanMahasiswaFasilitator.html?idNrp='+value);
                    }
                    else{
                        myApp.alert("NRP tidak ditemukan, Maaf");
                    }
                });   
            }
        });
    });
    $$('#btnLogoutFasilitator').on('click', function () 
    {
        hapusLocalAll();
        mainView.router.back({url: 'index.html',force: true,ignoreCache: true});
    });
})

myApp.onPageInit('pilihKelompokFasilitator', function (page) {
    if(localStorage.getItem("userAdmin")){
        $$(".admin").hide();
        var idGel = page.query.idGelombang;
        $$.post(directory,{opsi:"getKelompokDariGelombang", id:idGel},function(data){
            $$('#pilihKelompok').html(data);
        $$('.overlay, .overlay-message').hide();
        });       
    }
    else{
        $$(".adminShow").hide();
        $$.post(directory,{opsi:"getKelompok", id:localStorage.getItem("userfas")},function(data){
            $$('#pilihKelompok').html(data);
        $$('.overlay, .overlay-message').hide();
        });    
    }
    
    $$('#btnSearchAdmin').on('click', function () 
    {
        myApp.prompt('', 'Search NRP', function (value) {
            if(value!='')
            {
                $$.post(directory,{opsi:'searchNRP',nrp:value}, function(data){
                    console.log(data);
                    if(data!="gagal"){
                        mainView.router.loadPage('halamanMahasiswaFasilitator.html?idNrp='+value);
                    }
                    else{
                        myApp.alert("NRP tidak ditemukan, Maaf");
                    }
                });   
            }
        });
    });
    $$('#btnPasswordFasilitator').on('click', function () 
    {
        myApp.prompt('', 'Change Password', function (value) {
            if(value!='')
            {
                $$.post(directory,{opsi:'changePasswordFas',id:localStorage.getItem("userfas"),pass:value}, function(data){
                    console.log(data);
                    mainView.router.refreshPage();
                });   
            }
        });
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
        $$('.overlay, .overlay-message').hide();
    });
    // console.log(localStorage.getItem("userfas"));
    //  $$.post(directory,{opsi:"getMahasiswaDariKelompok",id:localStorage.getItem("userfas")},function(data){
    //     $$('#pilihMahasiswa').html(data);
    // });
    if(localStorage.getItem("userAdmin")){
        $$(".admin").hide();
    }
    $$('#btnLogoutFasilitator').on('click', function () 
    {
        hapusLocalAll();
        mainView.router.back({url: 'index.html',force: true,ignoreCache: true});
    });
})

myApp.onPageInit('halamanMahasiswaFasilitator', function (page) {
    var nrp = page.query.idNrp;
    if(localStorage.getItem("userAdmin")){
        $$(".admin").hide();
        document.getElementById("comments").disabled=true;

        $$.post(directory,{opsi:"getDetailMhsAdmin", id:nrp},function(data){
            $$('#statusMahasiswa').html(data);

            $$('.overlay, .overlay-message').hide();
        });
    }
    else{
        $$.post(directory,{opsi:"getDetailMhs", id:nrp},function(data){
            $$('#statusMahasiswa').html(data);

            $$('.overlay, .overlay-message').hide();
        });   
    }
    $$.post(directory,{opsi:'getCommentKhusus', id:nrp}, function(data){
        $$('#comments').html(data); 
    });

    $$('#insertComment').on('click', function () {
        myApp.confirm('Beri mahasiswa komentar?', 'Verifikasi Catatan', function () {
            var komen=document.getElementById("comments"); 
            $$.post(directory,{opsi:'insertCommentKhusus', idNrp:nrp, komens: komen.value}, function(data){
                console.log(data);
                myApp.alert("Comment berhasil disimpan.");
            });
        }, function () {

        });
    });    
})

myApp.onPageInit('detailJawabMahasiswaFasilitator', function (page) {
    var nrp = page.query.idNrp;
    var submodul = page.query.id_Submodul;
    
    
    if(localStorage.getItem("userAdmin")){
        $$(".admin").hide();
    }
    $$.post(directory,{opsi:"getDetailJawabanMhs", ids:nrp, modul:submodul},function(data){
        $$('#blockAnswer').html(data);
    });

    $$.post(directory,{opsi:'getComment', id:nrp, modul:submodul}, function(data){
        $$('#comment').html(data); 
        $$('.overlay, .overlay-message').hide();
    });

    $$('.insertComment').on('click', function () {
        var komen=document.getElementById("comments"); 
        var komentar = komen.value;
        if(komentar!=""){
            $$('.overlay, .overlay-message').show();
            $$.post(directory,{opsi:'insertCommentMhs', idNrp:nrp, modul:submodul, komens:komentar}, function(data){
                myApp.alert("Comment berhasil disimpan.");
                mainView.router.back({url: 'halamanMahasiswaFasilitator.html?idNrp='+nrp,force: true,ignoreCache: true});
            });   
            // $$.post(directory,{opsi:'verifikasiJawaban', idNrp:nrp, modul:submodul}, function(data){
            //     myApp.alert("Jawaban berhasil diverifikasi");
            //     mainView.router.back({url: 'halamanMahasiswaFasilitator.html?idNrp='+nrp,force: true,ignoreCache: true});
            // });   
        }
        else{
            alert("Tolong isi Komentar");
        }
    });    

    $$('#verification').on('click', function () {
        myApp.confirm('Apakah jawaban mahasiswa sudah benar?', 'Verifikasi Jawaban', function () {
            $$.post(directory,{opsi:'verifikasiJawaban', idNrp:nrp, modul:submodul}, function(data){
                myApp.alert("Jawaban berhasil diverifikasi");
                mainView.router.back({url: 'halamanMahasiswaFasilitator.html?idNrp='+nrp,force: true,ignoreCache: true});
            });   
        }, function () {

        });
    });    


})
