// Initialize app
var myApp = new Framework7({
    pushState: true,
    panel: {swipe:'left'}
});

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;
var directory= 'http://localhost/kp/server/projectkp.php';
//var directory='http://192.168.100.7/goblok.php';
//var directory='http://192.168.100.7/projectkp.php';
//var directory='http://projectkpgpb.jux.in/projectkpbuatServer.php'; //tmpat php e

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});


function hapusLocalAll() {
    localStorage.removeItem('username');
    localStorage.removeItem('jabatan');
    localStorage.removeItem('jawabanMyBigDream');
    localStorage.removeItem('jawabanLifelist');
    localStorage.removeItem('jawabanOutdoor');
    localStorage.removeItem('jawabanEntong');
    localStorage.removeItem('jawabanLessonLearned');
    localStorage.removeItem('jawabanRefleksiMini');
    localStorage.removeItem('jawabanManajemenEmosiForm');
    localStorage.removeItem('jawabanManajemenEmosiForm2');
    localStorage.removeItem('jawabanActionPlanForm');
    localStorage.removeItem('jawabanActionPlanFormTabel');
    localStorage.removeItem('jawabanEntong');
    localStorage.removeItem('jawabanFishboneBaru');
    localStorage.removeItem('tenda');
    localStorage.removeItem('bus');
    localStorage.removeItem('nama_kelompok');
	localStorage.removeItem('nama_mhs');
    // localStorage.removeItem('jawabanFishboneBaru');
    // localStorage.removeItem('jawabanFishboneSupport');
    // localStorage.removeItem('jawabanFishboneDetailSupport');

} //buat hapus smua local storage

var jawabanMyBigDream=[];
var jawabanLifelist=[];
var jawabanOutdoor=[];
var jawabanManajemenEmosiForm=[];
var jawabanManajemenEmosiForm2=[];
var jawabanActionPlanForm=[];
var jawabanFishbone=[];
var jawabanEntong=[];
var jawabanLessonLearned=[];
var jawabanRefleksiMini=[];
var tenda=0;
var bus=0;
var nama_kelompok="";
var nama_mhs="";


var gelombangFasilitator=["cek","koneksi","internet","keluar","dan","login","kembali","thanks"];
var KelompokFasilitator=["cek","koneksi","internet","keluar","dan","login","kembali","thanks"];
var mhsFasilitator=["cek","koneksi","internet","keluar","dan","login","kembali","thanks"];

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
var soalOutdoor=[["C1","Group Walk"],
["C2","Fishing / Maze-Maze"],
["C3","Catch the Flag/Jembatan Selamat Bersama"],
["C4","Spider Web"]
];
var soalMyBigDream=[["A1","My Big Dream"]
];
var soalMyLifeList=["B1","Tuliskan Life List yang ada"];
var soalEntong=[["H1","Yang kupikirkan tentang impian masa depan dan kondisi nenek yang dicintai si Entong"],
["H2","Emosi yang kurasakan seandainya aku menghadapi dilema si Entong"],
["H3","Potensi positif atau kekuatan yang kumiliki yang dapat kugunakan untuk menyelesaikan kondisi dilematis si Entong"],
["H4","Potensi negatif atau keterbatasan yang kumiliki yang dapat menghalangi proses penyelesaian kondisi dilematis si Entong"],
["H5","Tiga Hal positif yang dapat kutemukan dari kisah di entong"]
];
var soalRefleksiMini=[["J1","Yang kulakukan untuk menjalankan peranku dalam kelompok"],
["J2","Yang kurasakan terkait pembagian peran dalam kelompokku"],
["J3","Pandanganku terkait strategi yang dipakai dalam kelompok untuk menyelesaikan projek"],
["J4","Kontribusiku dalam penyelesaian projek kelompokku"],
["J5","Yang kupelajari tentang diriku dari proses membuat projek"],
["J6","Yang kupelajari tentang kelompokku dari proses membuat projek"]
];

var soalManajemenEmosi=["D1","Situasi","Pemikiran","Emosi","Perilaku"];

var soalManajemenEmosi2=["E1","Emosi","Situasi","Strategi"];

var soalFormTabel=["Tasks / Action","Resources","Timeline","Evidence of Success","Evaluation Process"];

var soalLessonLearned=["I1","Dari Kisah si Entong dan proses diskusi yang telah dilakukan, pelajaran yang dapat saya ambil adalah"];
var nrp="";
var password="";


function disableEnableBtn(ids) {
  // traverses the array with IDs
  var nrids = ids.length;
  var pencet = 0;
  for(var i=0; i<nrids; i++) {
    // registers onclick event to each button
    if(document.getElementById(ids[i])) {
      document.getElementById(ids[i]).onclick = function() {
        this.setAttribute('disabled', 'disabled');     // disables the button by adding the 'disabled' attribute
        this.innerHTML = 'Disabled';        // changes the button text
        var idbtn = this.id;       // stores the button ID
        pencet++;
        // calls a function after 2 sec. (2000 milliseconds)
        setTimeout( function() {
          document.getElementById(idbtn).removeAttribute('disabled');         // removes the "disabled" attribute
          document.getElementById(idbtn).innerHTML = 'UPLOAD JAWABAN';        // changes tne button text
        }, 86400000 );
        if(pencet >=3){
            this.setAttribute('disabled', 'disabled');     // disables the button by adding the 'disabled' attribute
            this.innerHTML = 'Disabled'; 
        }
      }
    }
  }
}

myApp.onPageInit('index', function (page) {

    $$('#myBigDreamSide').html(judulModul[0]);
    $$('#myLifeListSide').html(judulModul[1]);
    $$('#outdoorSide').html(judulModul[2]);
    $$('#manajemenEmosiSide').html(judulModul[3]);
    $$('#manajemenEmosi2Side').html(judulModul[4]);
    $$('#actionPlanSide').html(judulModul[5]);
    $$('#fishboneSide').html(judulModul[6]);
    $$('#kisahEntongSide').html(judulModul[7]);
    $$('#lessonLearnedSide').html(judulModul[8]);
    $$('#refleksiMiniSide').html(judulModul[9]);

    $$('#menuAwal').on('click',function(){
    mainView.router.loadPage("menu.html");
    myApp.closePanel();
    });

    $$('#myBigDreamSide').on('click',function(){
    mainView.router.loadPage("mybigdream.html");
    myApp.closePanel();
    });

    $$('#myLifeListSide').on('click',function(){
    if(JSON.parse(localStorage.getItem("jawabanMyBigDream"))){
        mainView.router.loadPage("mylifelist.html");
        myApp.closePanel();
    }
    else
        myApp.alert("Isi My Big Dream Terlebih Dahulu","Error");
        
    });

    $$('#outdoorSide').on('click',function(){
    mainView.router.loadPage("outdoor.html");
    myApp.closePanel();
    });

    // $$('#akuDanKelompokku').on('click',function(){
    // mainView.router.loadPage("akuDanKelompokku.html");
    // });

    $$('#manajemenEmosiSide').on('click',function(){
    mainView.router.loadPage("manajemenEmosi.html");
    myApp.closePanel();
    });

    $$('#manajemenEmosi2Side').on('click',function(){
    mainView.router.loadPage("manajemenEmosi2.html");
    myApp.closePanel();
    });

    $$('#actionPlanSide').on('click',function(){

    if(JSON.parse(localStorage.getItem("jawabanLifelist"))){
        mainView.router.loadPage("formActionPlan.html");
        myApp.closePanel();
    }
    else
        myApp.alert("Isi My Life List Terlebih Dahulu","Error");
    
    });

    $$('#fishboneSide').on('click',function(){
        //myApp.alert("Untuk Sementara Fitur Ini Belum Tersedia", "Coming Soon");
    mainView.router.loadPage("fishbone.html");
    myApp.closePanel();
    });

    $$('#kisahEntongSide').on('click',function(){
    mainView.router.loadPage("kisahEntong.html");
    myApp.closePanel();
    });

    $$('#lessonLearnedSide').on('click',function(){
    mainView.router.loadPage("lessonLearned.html");
    myApp.closePanel();
    });

    $$('#refleksiMiniSide').on('click',function(){
    mainView.router.loadPage("refleksiMini.html");
    myApp.closePanel();
    });

    $$('#teeest').on('click',function(){
        myApp.show
    });

    if(page='index'){
        if(JSON.parse(localStorage.getItem("username"))&&JSON.parse(localStorage.getItem("jabatan")))
        {
            if(JSON.parse(localStorage.getItem("jabatan"))=='fasilitator')
                mainView.router.loadPage('pilihGelombangFasilitator.html');
            else if(JSON.parse(localStorage.getItem("jabatan"))=='mahasiswa')
                mainView.router.loadPage('menu.html');
            
        }
    }
    $$('#uploadJawaban').on('click',function(){
        var dataPribadi=[nrp,password];
        var dataLifeListUntukPhp=[soalMyLifeList[0],jawabanLifelist];
        var paketManajemenEmosiPhp=[soalManajemenEmosi[0],jawabanManajemenEmosiForm];
        var paketManajemenEmosiPhp2=[soalManajemenEmosi2[0],jawabanManajemenEmosiForm2];
        var paketLessonLearnedPhp=[soalLessonLearned[0],jawabanLessonLearned];
    	var koleksiJawaban=[dataPribadi,jawabanMyBigDream,dataLifeListUntukPhp,jawabanOutdoor,paketManajemenEmosiPhp,paketManajemenEmosiPhp2,
        jawabanActionPlanForm,jawabanFishboneBaru,jawabanEntong,paketLessonLearnedPhp,jawabanRefleksiMini];
        	
    	$$.post(directory,{opsi:"uploadJawaban", datae:JSON.stringify(koleksiJawaban)
    	},function(data){
            myApp.alert(data,"Hasil Upload");
    	});
        	
    });

    $$('#logout').on('click',function(){
            myApp.confirm('Logout Menyebabkan Seluruh Hasil Pekerjaan Pada HP Hilang', 'Sudah Upload Belum?', function () {
                myApp.confirm('Logout = Menghapus Seluruh Hasil Pekerjaan Pada Memory Internal dan Keluar Aplikasi', 'Sudah Sangat Yakin?', function () {
                hapusLocalAll();
                myApp.closePanel();
                mainView.router.back({url: 'index.html',force: true,ignoreCache: true});
            });
            });
    });

    $$('#btnMasuk').on('click',function(){
    	var pilihan = document.getElementById("jabatan");
    	password = document.getElementById("password").value;
    	var username = document.getElementById("username");
		var jabatan = pilihan.options[pilihan.selectedIndex].value;
    	if(jabatan=='mahasiswa')
        {
            $$.post(directory,{opsi:"loginMhs", nrp:username.value,password:password
            },function(data){
                if(data=="berhasil") //cek ada atau tdk id server
                {
                    $$.post(directory,{opsi:"getBisTenda", nrp:username.value
                    },function(data){
                        var tendaBisTemp=JSON.parse(data);
                        mainView.router.loadPage('menu.html');
                        localStorage.setItem("tenda",JSON.stringify(tendaBisTemp['tenda']));
                        localStorage.setItem("bus",JSON.stringify(tendaBisTemp['bus']));
                        localStorage.setItem("nama_kelompok",JSON.stringify(tendaBisTemp['nama_kelompok']));
                        localStorage.setItem("nama_mhs",JSON.stringify(tendaBisTemp['nama']));
                        localStorage.setItem("password",JSON.stringify(password));
                        localStorage.setItem("username",JSON.stringify(username.value));
                        localStorage.setItem("jabatan",JSON.stringify('mahasiswa')); 
                    });
                }
                else
                {
                    myApp.alert("Data login tidak ditemukan","Error");
                }
                
            });
            
        }
    	else if(jabatan=='fasilitator')
        {
            $$.post(directory,{opsi:"loginFasilitator", username:username.value,password:password
            },function(data){
                if(data=="berhasil")
                {
                    mainView.router.loadPage('pilihGelombangFasilitator.html');
                    localStorage.setItem("password",JSON.stringify(password));
                    localStorage.setItem("username",JSON.stringify(username.value));
                    localStorage.setItem("jabatan",JSON.stringify('fasilitator'));
                }
                else if(data=="hehehe")
                {
                    mainView.router.loadPage('hehePage.html');
                    localStorage.setItem("password",JSON.stringify(password));
                    localStorage.setItem("username",JSON.stringify(username.value));
                    localStorage.setItem("jabatan",JSON.stringify('hehe'));
                }
                else
                {
                    myApp.alert("fail fas","Error");
                }
                
            });
            
        }
        else if(jabatan=='eval')
        {
            $$.post(directory,{opsi:"loginEval", username:username.value,password:password
            },function(data){
                if(data=="berhasil")
                {
                    mainView.router.loadPage('pilihGelombangEval.html');
                    localStorage.setItem("password",JSON.stringify(password));
                    localStorage.setItem("username",JSON.stringify(username.value));
                    localStorage.setItem("jabatan",JSON.stringify('eval'));
                }
                else
                {
                    myApp.alert("Dfail eval","Error");
                }
                
            });
            
        }
    });// --------------------INSERT ADMIN--------------------------

}).trigger();

myApp.onPageBack('menu',function(asd){
    
    navigator.app.exitApp();
})

myApp.onPageBack('hehePage',function(asd){
    
    deleteOtepe();
    //hapusLocalAll();
})
var c=60;
myApp.onPageInit('hehePage', function (page) {
    
    $$('#btnGenerate').on('click', function () {
       if(JSON.parse(localStorage.getItem("jabatan"))=="hehe")
        {
            $$.post(directory,{opsi:"tembakHehe", username:JSON.parse(localStorage.getItem("username")),password:JSON.parse(localStorage.getItem("password"))
            },function(data){
                $$('#tempatOTP').html("OTP:"+data+"<br/>OTP hanya berlaku untuk");
            });
            c=60;
            timerDelete();
            //setTimeout( function() {deleteOtepe()}, 60000 );
        }
    });

})
function deleteOtepe()
{
   $$.post(directory,{opsi:"deleteOTP", username:JSON.parse(localStorage.getItem("username")),password:JSON.parse(localStorage.getItem("password"))
            },function(data){
            });
}
function timerDelete() {
                c = c - 1;
                $$('#tempatTimer').html(c + " Detik");
                if(c>0)
                    t = setTimeout(function(){ timerDelete() }, 1000);
                else
                {
                    $$('#tempatOTP').html("Waktu Habis, Generate OTP baru");
                    $$('#tempatTimer').html("");
                    deleteOtepe();
                }
}


myApp.onPageInit('menu', function (page) {

    var mySwiper1 = myApp.swiper('.swiper-container', {
              pagination:'.swiper-pagination',
              paginationHide: false,
              autoplay:4000,
              spaceBetween: 50
               });
    /*var mySwiperVertical = myApp.swiper('.swiper-vertical', {
                          pagination:'.swiper-pagination',
                          direction: 'vertical'
                        });*/
    $$.post(directory,{opsi:"ambilPengumuman2"},function(data){
            //var gambar=JSON.parse(data);
            var gambar="";
            
            if(gambar==""){
                $$('.swiper-wrapper').html("<div style=text-align:center;><b><font size=5>Tidak Ada Pengumuman Terbaru:</font></b></div><br/><div style=text-align:center;>-</div><br/>")
            }
            for(var i=0;i<gambar.length;i++)
            {
                var gambarku="<img src="+gambar[i]+" style=width:100%; height:50%;>";
                /*if(gambar!=""){
                    $$('.swiper-wrapper').append("<div class=swiper-slide>"+gambarku+"</div>")
                }*/
                var testSlide="<div class=swiper-slide>"+gambarku+"</div>";
                mySwiper1.appendSlide(testSlide);
                // myApp.alert(mySwiper1.previousIndex);
                
            }
        });
    
    if(JSON.parse(localStorage.getItem("username")))
    {
    	nrp=JSON.parse(localStorage.getItem("username"));
    }
    if(JSON.parse(localStorage.getItem("tenda")))
    {
        tenda=JSON.parse(localStorage.getItem("tenda"));
        bus=JSON.parse(localStorage.getItem("bus"));
        nama_kelompok=JSON.parse(localStorage.getItem("nama_kelompok"));
        nama_mhs=JSON.parse(localStorage.getItem("nama_mhs"));
    }

    if(JSON.parse(localStorage.getItem("password")))
    {
    	password=JSON.parse(localStorage.getItem("password"));
    }

    if(JSON.parse(localStorage.getItem("jawabanMyBigDream")))
    {
    	jawabanMyBigDream=JSON.parse(localStorage.getItem("jawabanMyBigDream"));
    }

    if(JSON.parse(localStorage.getItem("jawabanLifelist")))
    {
    	jawabanLifelist=JSON.parse(localStorage.getItem("jawabanLifelist"));
    }

    if(JSON.parse(localStorage.getItem("jawabanFishboneBaru")))
    {
        jawabanFishboneBaru=JSON.parse(localStorage.getItem("jawabanFishboneBaru"));
    }

    if(JSON.parse(localStorage.getItem("jawabanOutdoor")))
    {
    	jawabanOutdoor=JSON.parse(localStorage.getItem("jawabanOutdoor"));
    }

    if(JSON.parse(localStorage.getItem("jawabanManajemenEmosiForm")))
    {
    	jawabanManajemenEmosiForm=JSON.parse(localStorage.getItem("jawabanManajemenEmosiForm"));
    }

    if(JSON.parse(localStorage.getItem("jawabanManajemenEmosiForm2")))
    {
    	jawabanManajemenEmosiForm2=JSON.parse(localStorage.getItem("jawabanManajemenEmosiForm2"));
    }

    if(JSON.parse(localStorage.getItem("jawabanEntong")))
    {
    	jawabanEntong=JSON.parse(localStorage.getItem("jawabanEntong"));
    }

    if(JSON.parse(localStorage.getItem("jawabanLessonLearned")))
    {
    	jawabanLessonLearned=JSON.parse(localStorage.getItem("jawabanLessonLearned"));
    }

    if(JSON.parse(localStorage.getItem("jawabanRefleksiMini")))
    {
    	jawabanRefleksiMini=JSON.parse(localStorage.getItem("jawabanRefleksiMini"));
    }

    if(JSON.parse(localStorage.getItem("jawabanActionPlanForm")))
    {
        jawabanActionPlanForm=JSON.parse(localStorage.getItem("jawabanActionPlanForm"));
    }
    else{
        for(var i=0;i<jawabanLifelist.length;i++){
            jawabanActionPlanForm.push(["","",""]);
        }
    }

    $$('#myBigDreamPilih').on('click',function(){
    mainView.router.loadPage("pilihBigDream.html");
    });

    /*$$('#myLifeList').on('click',function(){
    mainView.router.loadPage("mylifelist.html");
    });*/

     $$('#kisahEntongPilih').on('click',function(){
    mainView.router.loadPage("pilihEntong.html");
    });

       $$('#manajemenEmosiPilih').on('click',function(){
    mainView.router.loadPage("pilihManajemenEmosi.html");
    });


         $$('#refleksiMini').on('click',function(){
    mainView.router.loadPage("refleksiMini.html");
    });

          /*$$('#actionPlan').on('click',function(){
    mainView.router.loadPage("formActionPlan.html");
    });*/

    $$('#fishbone').on('click',function(){
        /*myApp.alert("Untuk Sementara Fitur Ini Belum Tersedia", "Coming Soon");
        mainView.router.back({url: 'menu.html',force: true,ignoreCache: true});*/
    mainView.router.loadPage("fishbone.html");
    });

   $$('#outdoor').on('click',function(){
    mainView.router.loadPage("outdoor.html");
    });

   $$('#tempatTendaBis').html(nama_mhs+"<br/>Tenda: "+tenda+"<br/>Bus: "+bus+"<br/>Nama Kelompok: "+nama_kelompok);
   $$('#fotoMahasiswa').html('<img src=https://my.ubaya.ac.id/img/mhs/160415093_m.jpg>');
   // $$('#fotoMahasiswa').html('<img src=https://my.ubaya.ac.id/img/mhs/'+nrp+'_m.jpg>');

    if(jawabanActionPlanForm!=""){
    for(var i=0;i<jawabanActionPlanForm.length;i++)
    {
        if(jawabanActionPlanForm[i][5]){
            for(var j=0;j<jawabanActionPlanForm[i][5].length;j++)
            {
                if(jawabanActionPlanForm[i][5][j][2])
                {
                    var date1= new Date().setHours(0,0,0,0);
                    var date2= new Date(jawabanActionPlanForm[i][5][j][2]).setHours(0,0,0,0);

                    if(date1.valueOf()== date2.valueOf() && (jawabanActionPlanForm[i][5][j][5]==0||jawabanActionPlanForm[i][5][j][5]==4)){

                        myApp.alert("Saatnya Evaluasi Tabel pada Action Plan "+jawabanLifelist[i],"Evaluasi");
                        myApp.alert("Task : "+jawabanActionPlanForm[i][5][j][0]+"<br/>Resource : "+jawabanActionPlanForm[i][5][j][1]+
                            "<br/>Timeline : "+jawabanActionPlanForm[i][5][j][2]+"<br/>Evidence of success : "+jawabanActionPlanForm[i][5][j][3]+"<br/>Evaluation process : "+jawabanActionPlanForm[i][5][j][4],"Detail");
                    
                        if(jawabanActionPlanForm[i][5][j][5]==0) // kalo statusnya masih 0, diubah jdi harus eval
                        {
                            jawabanActionPlanForm[i][5].splice(j,1,[jawabanActionPlanForm[i][5][j][0],jawabanActionPlanForm[i][5][j][1]
                            ,jawabanActionPlanForm[i][5][j][2],jawabanActionPlanForm[i][5][j][3],jawabanActionPlanForm[i][5][j][4]
                            ,4]); //ubah status di index 4 menjadi 4 = harus eval
                        }
                    
                    }//tutupe if date=date
        
                }//tutupe if kalo ada tanggal nd tabel
            
            }// tutupe for tabel

        }// tutupe if ada tabel atau gak

        if(jawabanActionPlanForm[i][3]){
        var date1= new Date().setHours(0,0,0,0);

        var date2= new Date(jawabanActionPlanForm[i][3]).setHours(0,0,0,0);

            if(date1.valueOf()== date2.valueOf()&& (jawabanActionPlanForm[i][4]==0||jawabanActionPlanForm[i][4]==4)){
                myApp.alert("Saatnya Evaluasi Action Plan "+jawabanLifelist[i],"Evaluasi");
                if(jawabanActionPlanForm[i][4]==0) // kalo statusnya masih 0, diubah jdi harus eval
                    {
                        jawabanActionPlanForm.splice(i,1,[jawabanActionPlanForm[i][0],jawabanActionPlanForm[i][1]
                        ,jawabanActionPlanForm[i][2],jawabanActionPlanForm[i][3],4
                        ,jawabanActionPlanForm[i][5]]); //ubah status di index 4 menjadi 4 = harus eval
                        
                    }
            }
        }//tutupe if tanggal actionplan
    }//tutupe for actionplan

    } // tutupe if (actionplan ada gak)



})

$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});


myApp.onPageInit('pilihBigDream', function (page) {
    
    $$('#masukMyBigDream').on('click', function () {
       mainView.router.loadPage("mybigdream.html");
    });
    $$('#masukMyLifelist').on('click', function () {
       if(JSON.parse(localStorage.getItem("jawabanMyBigDream")))
        mainView.router.loadPage("mylifelist.html");
        else
        {
        	myApp.alert("Isi My Big Dream Terlebih Dahulu","Error");
        	mainView.router.back({url: 'pilihBigDream.html',force: true,ignoreCache: true});
        }
        
    });
    $$('#masukActionPlan').on('click', function () {
        if(JSON.parse(localStorage.getItem("jawabanLifelist")))
                mainView.router.loadPage("formActionPlan.html");
        else
        {
        	myApp.alert("Isi My Life List Terlebih Dahulu","Error");
        	mainView.router.back({url: 'pilihBigDream.html',force: true,ignoreCache: true});
        }
        
    });
    
})


myApp.onPageInit('pilihManajemenEmosi', function (page) {
    
    $$('#studikasus').on('click', function () {
       mainView.router.loadPage("manajemenEmosi.html");
    });
    $$('#masukManajemenEmosi2').on('click', function () {
       mainView.router.loadPage("manajemenEmosi2.html");
    });
    
})

myApp.onPageInit('pilihEntong', function (page) {
    
    $$('#masukKisahEntong').on('click', function () {
       mainView.router.loadPage("kisahEntong.html");
    });
    $$('#masukLessonLearned').on('click', function () {
       mainView.router.loadPage("lessonLearned.html");
    });
    
})


myApp.onPageInit('mybigdream', function (page) {
    if(JSON.parse(localStorage.getItem("jawabanMyBigDream")))
    {
	    for(var i=0;i<soalMyBigDream.length;i++)
	        {
	            $$('#formBigDream').append('<div class="item-input">'+
                    '<textarea class="resizable" id="'+soalMyBigDream[i][0]+'" style="width:100%;height:100vw;font-size:20px;"  placeholder="'+soalMyBigDream[i][1]+', Big Dream haruslah Bold, Spesific, Concise dan Consistent">'+jawabanMyBigDream[i][1]+'</textarea></div>');
	        }
	        
    }
    else
    {
    	for(var i=0;i<soalMyBigDream.length;i++)
	        {
	            $$('#formBigDream').append('<div class="item-input">'+
                    '<textarea class="resizable" id="'+soalMyBigDream[i][0]+'" style="width:100%;height:100vw;font-size:20px;"  placeholder="'+soalMyBigDream[i][1]+', Big Dream haruslah Bold, Spesific, Concise dan Consistent"></textarea></div>');
	        }    }



    $$('#btnSubmitBigDream').on('click', function () {
    	jawabanMyBigDream=[];
        
    	for(var i=0;i<soalMyBigDream.length;i++)
        {
        	var id=document.getElementsByTagName("textarea").item(i).id;
            var jawaban=document.getElementsByTagName("textarea").item(i).value;
            jawabanMyBigDream.push([id,jawaban]);
        }

        localStorage.setItem("jawabanMyBigDream",JSON.stringify(jawabanMyBigDream));
    	mainView.router.back();
    });
    
})

myApp.onPageInit('myLifeList', function (page) {
	 if(jawabanMyBigDream!="")
	 	$$('#judulBerupaMyBigDream').append("My Big Dream: "+jawabanMyBigDream[0][1]);

		refreshLifeList();

	    $$('.floating-button').on('click', function () {
	    myApp.prompt('Nomor '+(jawabanLifelist.length+1), 'My Life List', function (value) {
	        jawabanLifelist.push(value);
            jawabanActionPlanForm.push(["","","",""]); //biar bisa di splice 
	        refreshLifeList();
	    	localStorage.setItem("jawabanLifelist",JSON.stringify(jawabanLifelist));
            localStorage.setItem("jawabanActionPlanForm",JSON.stringify(jawabanActionPlanForm));
	    });
	    });
})

function refreshLifeList()
{
    $$('.listJawaban').html("");
            for(var i=0;i<jawabanLifelist.length;i++)
            {
                $$('.listJawaban').append(createChipLifeList(jawabanLifelist[i],i));
                $$('.listJawaban').append("<br/>");
            }
}

function createChipLifeList(jawabane, aidine)
    {
        //chip
        var chip=document.createElement('div');
        chip.className='chip';

        //chip label
        var chipLabel=document.createElement('div');
        chipLabel.className='chip-label';
        chipLabel.appendChild(document.createTextNode(jawabane));

        //chip media
        var chipMedia=document.createElement('div');
        chipMedia.className='chip-media bg-teal';
        chipMedia.appendChild(document.createTextNode(aidine+1));

        //chip delete btn
        var deleteBtn=document.createElement('a');
        deleteBtn.setAttribute('href','#');
        deleteBtn.className='chip-delete';


        chip.appendChild(chipMedia);
        chip.appendChild(chipLabel);
        chip.appendChild(deleteBtn);

        //delete chip
        deleteBtn.onclick=function (e) {
            e.preventDefault();
            myApp.confirm('Hapus '+jawabane+"?","Yakin Hapus?", function () {
                jawabanLifelist.splice(aidine,1);
                jawabanActionPlanForm.splice(aidine,1);
                localStorage.setItem("jawabanLifelist",JSON.stringify(jawabanLifelist));
                localStorage.setItem("jawabanActionPlanForm",JSON.stringify(jawabanActionPlanForm));
                chip.remove();

            });
        };

        chipMedia.onclick=function (e) {
            e.preventDefault();
            myApp.modal({
            title: 'Ubah Prioritas Nomor'+(aidine+1),
            text: 'Ubah Menjadi Prioritas nomor',
            afterText: '<input type="text" id="txtPrioritasLifeList" class="modal-text-input" style="text-align: center;">',
            buttons: [{
            text: 'Cancel'
            }, {
            text: 'OK',
            onClick: function() {
                var idDitukarKe=$$('#txtPrioritasLifeList').val()-1;
                if(jawabanLifelist[idDitukarKe])
                {
                    var tempYangDitukar=jawabanLifelist[idDitukarKe];
                    jawabanLifelist.splice(idDitukarKe,1,jawabanLifelist[aidine]);
                    jawabanLifelist.splice(aidine,1,tempYangDitukar);
                    localStorage.setItem("jawabanLifelist",JSON.stringify(jawabanLifelist));
                    refreshLifeList();
                }
                
            }
            }, ]
            });
        };

        chipLabel.onclick=function (e) {
            e.preventDefault();

            myApp.modal({
            title: 'Edit Nomor '+(aidine+1),
            text: 'Edit Jawaban',
            afterText: '<input type="text" id="txtEditLifeList" class="modal-text-input" style="text-align: center;" value="'+jawabanLifelist[aidine]+'"">',
            buttons: [{
            text: 'Cancel'
            }, {
            text: 'OK',
            onClick: function() {
                jawabanLifelist.splice(aidine,1,$$('#txtEditLifeList').val());
                localStorage.setItem("jawabanLifelist",JSON.stringify(jawabanLifelist));
                refreshLifeList();
            }
            }, ]
            });
        };

        return chip;
    }

myApp.onPageInit('outdoor', function (page) {
    if(JSON.parse(localStorage.getItem("jawabanOutdoor")))
    {
	    for(var i=0;i<soalOutdoor.length;i++)
	        {
	            $$('#outdoorActivity').append('<div class="card">'+
                '<div class="card-header" align="center">'+soalOutdoor[i][1]+'</div>'+
                '<div class="card-content">'+
                '<div class="card-content-inner"><textarea style="text-align:center;" rows="4" cols="36" id="'+soalOutdoor[i][0]+'">'+jawabanOutdoor[i][1]+'</textarea></div>'+
                '</div>'+
                '</div>');
	        }
	        
    }
    else
    {
    	for(var i=0;i<soalOutdoor.length;i++)
	        {
	             $$('#outdoorActivity').append('<div class="card">'+
                '<div class="card-header" align="center">'+soalOutdoor[i][1]+'</div>'+
                '<div class="card-content">'+
                '<div class="card-content-inner"><textarea style="text-align:center;" rows="4" cols="36" id="'+soalOutdoor[i][0]+'"></textarea></div>'+
                '</div>'+
                '</div>');
	        }    }



    $$('#btnSubmitOutdoor').on('click', function () {
    	jawabanOutdoor=[];
        
    	for(var i=0;i<soalOutdoor.length;i++)
        {
        	var id=document.getElementsByTagName("textarea").item(i).id;
            var jawaban=document.getElementsByTagName("textarea").item(i).value;
            jawabanOutdoor.push([id,jawaban]);
        }

        localStorage.setItem("jawabanOutdoor",JSON.stringify(jawabanOutdoor));
    	mainView.router.back();
    });
    
})


/*var jawabanAkuDanKelompokkuForm=[];
myApp.onPageInit('akuDanKelompokkuForm', function (page) {
	var situasi=document.getElementById("situasi");
	var pemikiran=document.getElementById("pemikiran");
	var emosi=document.getElementById("emosi");
	var perilaku=document.getElementById("perilaku");
	

    $$('#btnSubmit').on('click', function () {
    	jawabanAkuDanKelompokkuForm.push([situasi.value,pemikiran.value,emosi.value,perilaku.value]);
    	
    	mainView.router.loadPage("akuDanKelompokku.html");
        mainView.router.refreshPreviousPage();
    	//mainView.router.back({url: 'akuDanKelompokku.html',force: true,ignoreCache: true});
    });
})

myApp.onPageInit('akuDanKelompokku', function (page) {
	$$('#formInput').on('click', function () {
        mainView.router.loadPage("akuDanKelompokkuForm.html");
    });

    myApp.alert(jawabanAkuDanKelompokkuForm.length);
	for(var i=0;i<jawabanAkuDanKelompokkuForm.length;i++)
        {
        	myApp.alert(jawabanAkuDanKelompokkuForm[i][0]);

            //$$('#listJawaban').html((i+1)+". "+jawabanAkuDanKelompokkuForm[i][0]+"<br/>");

            $$('#listJawaban').append((i+1)+" Situasi : "+jawabanAkuDanKelompokkuForm[i][0]+"<br/>" 
                                    +"Pemikiran :" +jawabanAkuDanKelompokkuForm[i][1]+"<br/>" + "Emosi :" +jawabanAkuDanKelompokkuForm[i][2]+"<br/>"
                                    +"Perilaku :" + jawabanAkuDanKelompokkuForm[i][3]+"<br/>");
        }
})*/

myApp.onPageInit('manajemenEmosiForm', function (page) {
    var situasi=document.getElementById("situasi");
    var pemikiran=document.getElementById("pemikiran");
    var emosi=document.getElementById("emosi");
    var perilaku=document.getElementById("perilaku");

    if(page.query.idManajemenEmosi)
    {
        var indexBuatManajemenEmosi=page.query.idManajemenEmosi;
        
        situasi.value=jawabanManajemenEmosiForm[indexBuatManajemenEmosi][0];
        pemikiran.value=jawabanManajemenEmosiForm[indexBuatManajemenEmosi][1];
        emosi.value=jawabanManajemenEmosiForm[indexBuatManajemenEmosi][2];
        perilaku.value=jawabanManajemenEmosiForm[indexBuatManajemenEmosi][3];
        document.getElementById("btnDeleteManajemenEmosi").style.visibility = "visible";

        $$('#btnDeleteManajemenEmosi').on('click', function () {
        jawabanManajemenEmosiForm.splice(indexBuatManajemenEmosi,1);
        localStorage.removeItem('jawabanManajemenEmosiForm');
        mainView.router.back({url: 'manajemenEmosi.html',force: true,ignoreCache: true});

        });

        $$('#btnSubmitManajemenEmosi').on('click', function () {
        jawabanManajemenEmosiForm.splice(indexBuatManajemenEmosi,1,[situasi.value,pemikiran.value,emosi.value,perilaku.value]);
        localStorage.setItem("jawabanManajemenEmosiForm",JSON.stringify(jawabanManajemenEmosiForm));
        mainView.router.back({url: 'manajemenEmosi.html',force: true,ignoreCache: true});
        });
    }
    else
    {
        $$('#btnSubmitManajemenEmosi').on('click', function () {
        jawabanManajemenEmosiForm.push([situasi.value,pemikiran.value,emosi.value,perilaku.value]);
        localStorage.setItem("jawabanManajemenEmosiForm",JSON.stringify(jawabanManajemenEmosiForm));
        mainView.router.back({url: 'manajemenEmosi.html',force: true,ignoreCache: true});
        });
    }

    
})

myApp.onPageInit('manajemenEmosi', function (page) {
    $$('#formInput').on('click', function () {
        mainView.router.loadPage("manajemenEmosiForm.html");
    });

    // myApp.alert(jawabanManajemenEmosiForm.length);
    for(var i=0;i<jawabanManajemenEmosiForm.length;i++)
        {
            $$('#listJawaban').append('<a href="manajemenEmosiForm.html?idManajemenEmosi='+i+'" ><div class="card" id="'+i+'">'+
                '<div class="card-header" style="text-align:center;" >'+(i+1)+'</div>'+
                '<div class="card-content">'+
                '<div class="card-content-inner">'+
                '<div>'+soalManajemenEmosi[1]+' : '+jawabanManajemenEmosiForm[i][0]+'</div>'+ 
                '<div>'+soalManajemenEmosi[2]+' : '+jawabanManajemenEmosiForm[i][1]+'</div>'+ 
                '<div>'+soalManajemenEmosi[3]+' : '+jawabanManajemenEmosiForm[i][2]+'</div>'+ 
                '<div>'+soalManajemenEmosi[4]+' : '+jawabanManajemenEmosiForm[i][3]+'</div>'+ 
                '</div>'+
                '</div></a>');
        }

})

myApp.onPageInit('manajemenEmosiForm2', function (page) {
    var emosi=document.getElementById("emosi2");
    var situasi=document.getElementById("situasi2");
    var strategi=document.getElementById("strategi");
    
    if(page.query.idManajemenEmosi2)
    {
        var indexBuatManajemenEmosi2=page.query.idManajemenEmosi2;
        
        emosi.value=jawabanManajemenEmosiForm2[indexBuatManajemenEmosi2][0];
        situasi.value=jawabanManajemenEmosiForm2[indexBuatManajemenEmosi2][1];
        strategi.value=jawabanManajemenEmosiForm2[indexBuatManajemenEmosi2][2];
        document.getElementById("btnDeleteManajemenEmosi2").style.visibility = "visible";
        $$('#btnDeleteManajemenEmosi2').on('click', function () {
        jawabanManajemenEmosiForm2.splice(indexBuatManajemenEmosi2,1);
        localStorage.removeItem('jawabanManajemenEmosiForm2');
        mainView.router.back({url: 'manajemenEmosi2.html',force: true,ignoreCache: true});

        });

        $$('#btnSubmitManajemenEmosi2').on('click', function () {
        jawabanManajemenEmosiForm2.splice(indexBuatManajemenEmosi2,1,[emosi.value,situasi.value,strategi.value]);
        localStorage.setItem("jawabanManajemenEmosiForm2",JSON.stringify(jawabanManajemenEmosiForm2));
        mainView.router.back({url: 'manajemenEmosi2.html',force: true,ignoreCache: true});
        });
    }
    else
    {
        $$('#btnSubmitManajemenEmosi2').on('click', function () {
        jawabanManajemenEmosiForm2.push([emosi.value,situasi.value,strategi.value]);
        localStorage.setItem("jawabanManajemenEmosiForm2",JSON.stringify(jawabanManajemenEmosiForm2));
        mainView.router.back({url: 'manajemenEmosi2.html',force: true,ignoreCache: true});
        });
    }
})

myApp.onPageInit('manajemenEmosi2', function (page) {
    $$('#formInput2').on('click', function () {
        mainView.router.loadPage("manajemenEmosiForm2.html");
    });

    // myApp.alert(jawabanManajemenEmosiForm.length);
    for(var i=0;i<jawabanManajemenEmosiForm2.length;i++)
        {
            $$('#listJawaban2').append('<a href="manajemenEmosiForm2.html?idManajemenEmosi2='+i+'" ><div class="card" id="'+i+'">'+
                '<div class="card-header" style="text-align:center;" >'+(i+1)+'</div>'+
                '<div class="card-content">'+
                '<div class="card-content-inner">'+
                '<div>'+soalManajemenEmosi2[1]+' : '+jawabanManajemenEmosiForm2[i][0]+'</div>'+ 
                '<div>'+soalManajemenEmosi2[2]+' : '+jawabanManajemenEmosiForm2[i][1]+'</div>'+ 
                '<div>'+soalManajemenEmosi2[3]+' : '+jawabanManajemenEmosiForm2[i][2]+'</div>'+ 
                '</div>'+
                '</div></a>');
        }
})
var statusActionFormTabel=0;
var idLife="";
var idTabel="";
myApp.onPageInit('formActionPlanFormTabel', function (page) {
    var bantuanPenyimpananTemp=[]; //buat mbantu nyimpen di tempat yang benar
    var taska=document.getElementById("taska");
    var resource=document.getElementById("resource");
    var evidenceTabel=document.getElementById("evidenceTabel");
    var evaluationTabel=document.getElementById("evaluationTabel");
    
    
    var timeline1 = myApp.calendar({
    input: '#calendar-events',
    dateFormat: 'M dd yyyy',
    monthPicker:true,
    yearPicker:true,
    closeOnSelect:true
    });
    

    var timeline=document.getElementById("calendar-events");
    if(jawabanActionPlanForm[idLife][5]) // kalo ada jawaban tabel
        bantuanPenyimpananTemp=jawabanActionPlanForm[idLife][5]; // masukno jawaban tabel lama ke bantuantemp

    if(page.query.idTabel) // misal ada idtabel brarti buat edit, tampilno smua value lama
    {
        idTabel=page.query.idTabel;
        document.getElementById("btnDeleteActionPlanTabel").style.visibility = "visible";
        taska.value=bantuanPenyimpananTemp[idTabel][0];
        resource.value=bantuanPenyimpananTemp[idTabel][1];
        timeline.value=bantuanPenyimpananTemp[idTabel][2];
        evidenceTabel.value=bantuanPenyimpananTemp[idTabel][3];
        evaluationTabel.value=bantuanPenyimpananTemp[idTabel][4];
        if(bantuanPenyimpananTemp[idTabel][5]==4) //4 = eval, 0 belom apa-apa, 1 berhasil, 2 gagal
        {
            document.getElementById("harusEval").style.visibility = "visible";
        }
        if(bantuanPenyimpananTemp[idTabel][5]==1) //4 = eval, 0 belom apa-apa, 1 berhasil, 2 gagal
        {
            document.getElementById("evaluasiBerhasilTabel").style.visibility = "visible";
        }
        if(bantuanPenyimpananTemp[idTabel][5]==2) //4 = eval, 0 belom apa-apa, 1 berhasil, 2 gagal
        {
            document.getElementById("evaluasiGagalTabel").style.visibility = "visible";
        }
    }
    $$('#btnSubmitTabel').on('click', function () {
        if(page.query.idTabel)
            bantuanPenyimpananTemp.splice(idTabel,1,[taska.value,resource.value,timeline.value,evidenceTabel.value,evaluationTabel.value,statusActionFormTabel]);//kalo ada diganti
        else
            bantuanPenyimpananTemp.push([taska.value,resource.value,timeline.value,evidenceTabel.value,evaluationTabel.value,statusActionFormTabel]);// seng baru dipush ke bantuantemp
        jawabanActionPlanForm.splice(idLife,1,[jawabanActionPlanForm[idLife][0],
            jawabanActionPlanForm[idLife][1],
            jawabanActionPlanForm[idLife][2],
            jawabanActionPlanForm[idLife][3],
            jawabanActionPlanForm[idLife][4],
            bantuanPenyimpananTemp]);// masukno bantuantemp ke index ke 5,sisane sama
        localStorage.setItem("jawabanActionPlanForm",JSON.stringify(jawabanActionPlanForm));
        mainView.router.back({url: page.view.history[page.view.history.length - 2],force: true,ignoreCache: true});
        //balikno ke halaman seng sbelume, karna halaman sbelume itu dynamic jadi harus pake magical code diatas
    });

    $$('#btnBerhasilTabel').on('click', function () {
        
        myApp.confirm('Sudah Berhasil?', 'Berhasil Tercapai?', function () {
            myApp.alert('Selamat Telah Berhasil Mengerjakannya (^.^)/',"SELAMAT!!");
            bantuanPenyimpananTemp.splice(idTabel,1,[bantuanPenyimpananTemp[idTabel][0],bantuanPenyimpananTemp[idTabel][1]
                ,bantuanPenyimpananTemp[idTabel][2],bantuanPenyimpananTemp[idTabel][3],bantuanPenyimpananTemp[idTabel][4]
                ,1]);
            jawabanActionPlanForm.splice(idLife,1,[jawabanActionPlanForm[idLife][0],
            jawabanActionPlanForm[idLife][1],
            jawabanActionPlanForm[idLife][2],
            jawabanActionPlanForm[idLife][3],
            jawabanActionPlanForm[idLife][4],
            bantuanPenyimpananTemp]);
            localStorage.setItem("jawabanActionPlanForm",JSON.stringify(jawabanActionPlanForm));
            mainView.router.back({url: page.view.history[page.view.history.length - 2],force: true,ignoreCache: true});
        });
        
    });
    $$('#btnGagalTabel').on('click', function () {
        myApp.confirm('Apakah tidak tercapai?', 'Gagal Tercapai?', function () {
            myApp.alert('Sayang sekali, tetap semangat yaa (^.^)/',"Coba Lagi Lain Kali");
            bantuanPenyimpananTemp.splice(idTabel,1,[bantuanPenyimpananTemp[idTabel][0],bantuanPenyimpananTemp[idTabel][1]
                ,bantuanPenyimpananTemp[idTabel][2],bantuanPenyimpananTemp[idTabel][3],bantuanPenyimpananTemp[idTabel][4]
                ,2]);
            jawabanActionPlanForm.splice(idLife,1,[jawabanActionPlanForm[idLife][0],
            jawabanActionPlanForm[idLife][1],
            jawabanActionPlanForm[idLife][2],
            jawabanActionPlanForm[idLife][3],
            jawabanActionPlanForm[idLife][4],
            bantuanPenyimpananTemp]);
            localStorage.setItem("jawabanActionPlanForm",JSON.stringify(jawabanActionPlanForm));
            mainView.router.back({url: page.view.history[page.view.history.length - 2],force: true,ignoreCache: true});
        });
    });

    $$('#btnDeleteActionPlanTabel').on('click', function () {
        bantuanPenyimpananTemp.splice(idTabel,1);//didelete
        jawabanActionPlanForm.splice(idLife,1,[jawabanActionPlanForm[idLife][0],jawabanActionPlanForm[idLife][1],
            jawabanActionPlanForm[idLife][2],jawabanActionPlanForm[idLife][3],bantuanPenyimpananTemp]);// masukno bantuantemp ke index ke 3,sisane sama
        localStorage.setItem("jawabanActionPlanForm",JSON.stringify(jawabanActionPlanForm));
        mainView.router.back({url: page.view.history[page.view.history.length - 2],force: true,ignoreCache: true});
        //balikno ke halaman seng sbelume, karna halaman sbelume itu dynamic jadi harus pake magical code diatas
    });
    
})
var statusActionForm=0;
myApp.onPageInit('formActionPlanForm', function (page) {
     
 
    var timeline2 = myApp.calendar({
    input: '#calendar-events-tercapai',
    dateFormat: 'M dd yyyy',
    monthPicker:true,
    yearPicker:true,
    closeOnSelect:true
    });


    var obstacle=document.getElementById("obstacle");
    var evidence=document.getElementById("evidence");
    var evaluation=document.getElementById("evaluation");
    var target=document.getElementById("calendar-events-tercapai");
    idLife=page.query.idLifeList;
    
    $$('#judulActionPlanForm').html(jawabanLifelist[idLife]);
        obstacle.value=jawabanActionPlanForm[idLife][0];
        evidence.value=jawabanActionPlanForm[idLife][1];
        evaluation.value=jawabanActionPlanForm[idLife][2];
        if(jawabanActionPlanForm[idLife][3]!="")
			target.value=jawabanActionPlanForm[idLife][3];
        if(jawabanActionPlanForm[idLife][4]==4) //4 = eval, 0 belom apa-apa, 1 berhasil, 2 gagal
        {
            document.getElementById("harusEvalForm").style.visibility = "visible";
        }
        if(jawabanActionPlanForm[idLife][4]==1) //4 = eval, 0 belom apa-apa, 1 berhasil, 2 gagal
        {
            document.getElementById("evaluasiBerhasilForm").style.visibility = "visible";
        }
        if(jawabanActionPlanForm[idLife][4]==2) //4 = eval, 0 belom apa-apa, 1 berhasil, 2 gagal
        {
            document.getElementById("evaluasiGagalForm").style.visibility = "visible";
        }
        
    $$('#btnBerhasilForm').on('click', function () {
        
        myApp.confirm('Sudah Berhasil?', 'Berhasil Tercapai?', function () {
            myApp.alert('Selamat Telah Berhasil Mengerjakannya (^.^)/',"SELAMAT!!");
            jawabanActionPlanForm.splice(idLife,1,[jawabanActionPlanForm[idLife][0],jawabanActionPlanForm[idLife][1]
                        ,jawabanActionPlanForm[idLife][2],jawabanActionPlanForm[idLife][3],1
                        ,jawabanActionPlanForm[idLife][5]]); //ubah status di index 4 menjadi 1 = berhasil
            localStorage.setItem("jawabanActionPlanForm",JSON.stringify(jawabanActionPlanForm));
            mainView.router.back({url: page.view.history[page.view.history.length - 2],force: true,ignoreCache: true});
        });
        
    });
    $$('#btnGagalForm').on('click', function () {
        myApp.confirm('Apakah tidak tercapai?', 'Gagal Tercapai?', function () {
            myApp.alert('Sayang sekali, tetap semangat yaa (^.^)/',"Coba Lagi Lain Kali");
            jawabanActionPlanForm.splice(idLife,1,[jawabanActionPlanForm[idLife][0],jawabanActionPlanForm[idLife][1]
                        ,jawabanActionPlanForm[idLife][2],jawabanActionPlanForm[idLife][3],2
                        ,jawabanActionPlanForm[idLife][5]]); //ubah status di index 4 menjadi 2 = gagal
            localStorage.setItem("jawabanActionPlanForm",JSON.stringify(jawabanActionPlanForm));
            mainView.router.back({url: page.view.history[page.view.history.length - 2],force: true,ignoreCache: true});
        });
    });


    /*$$('#btnSelesai').on('click', function () {
        var buttons = [
        {
            text: 'Selesai',
            bold: true,
            onClick: function () {
                myApp.alert('MARI BOS');
            }
        },
        {
            text: 'Belum',
            bold: true,
            onClick: function () {
                myApp.alert('Lah MARIKNO BOS');
            }
        },
        {
            text: 'Cancel',
            color: 'red'
        },
        ];
        myApp.actions(buttons);
    });*/

    $$('#btnDeleteActForm').on('click', function () {
        jawabanActionPlanForm.splice(idLife,1,["","","","",""]);
        localStorage.setItem("jawabanActionPlanForm",JSON.stringify(jawabanActionPlanForm));
        mainView.router.back();
    });

    $$('.floating-button').on('click', function () {
       mainView.router.loadPage("formActionPlanFormTabel.html");
    });

    $$('#btnSubmit').on('click', function () {
        if(jawabanActionPlanForm[idLife][5]) //kalo ada jawaban tabel di load , kalo ga yo ga di load
            jawabanActionPlanForm.splice(idLife,1,[obstacle.value,evidence.value,evaluation.value,target.value,statusActionForm,jawabanActionPlanForm[idLife][5]]);
        else
            jawabanActionPlanForm.splice(idLife,1,[obstacle.value,evidence.value,evaluation.value,target.value,statusActionForm]);
        localStorage.setItem("jawabanActionPlanForm",JSON.stringify(jawabanActionPlanForm));
        mainView.router.back();
    });
    
    if(jawabanActionPlanForm[idLife][5])
    {
        var bantuanDoang=jawabanActionPlanForm[idLife][5];//memudahkan mbaca koding

        for(var i=0;i<bantuanDoang.length;i++)
        {
            var cawangsilang="";
            if(bantuanDoang[i][5]==1)
              cawangsilang ='<i class="icon f7-icons">check</i>';
            else if(bantuanDoang[i][5]==2)
                cawangsilang ='<i class="icon f7-icons">close</i>';
           $$('#listTabelFormActionPlan').append('<a href="formActionPlanFormTabel.html?idTabel='+i+'">'+
                '<div class="card-header" style="text-align:center;" >'+(i+1)+cawangsilang+'</div>'+
                '<div class="card-content">'+
                '<div class="card-content-inner">'+
                '<div>'+soalFormTabel[0]+' : '+bantuanDoang[i][0]+'</div>'+ 
                '<div>'+soalFormTabel[1]+' : '+bantuanDoang[i][1]+'</div>'+ 
                '<div>'+soalFormTabel[2]+' : '+bantuanDoang[i][2]+'</div>'+ 
                '<div>'+soalFormTabel[3]+' : '+bantuanDoang[i][3]+'</div>'+
                '<div>'+soalFormTabel[4]+' : '+bantuanDoang[i][4]+'</div>'+
                '</div>'+
                '</div></a>');
        }
    }
})




myApp.onPageInit('formActionPlan', function (page) {

    for(var i=0;i<jawabanLifelist.length;i++)
        {
            var cawangsilang="";
            if(jawabanActionPlanForm[i][4]==1)
              cawangsilang ='<i class="icon f7-icons">check</i>';
            else if(jawabanActionPlanForm[i][4]==2)
                cawangsilang ='<i class="icon f7-icons">close</i>';

            $$('#listMyLifeList').append('<a href="formActionPlanForm.html?idLifeList='+i+'" class="item-link item-content no-ripple">'+
                '<div class="card">'+
                '<div class="card-header" align="center" >'+(i+1)+". "+jawabanLifelist[i]+cawangsilang+'</div>');
        }
})

var jawabanFishboneBaru=[];

var idKepala=0;
var idSirip=0;
var bantuanFishForm=[];
var bantuanFishTabel=[];



myApp.onPageInit('fishboneTabel', function (page) {
   bantuanFishTabel=[]
    var idSirip=page.query.idSirip;
    $$('#judulFishboneTabel').html(jawabanFishboneBaru[idKepala][1][idSirip][0]);
    
    if(jawabanFishboneBaru[idKepala][1][idSirip][1])
        bantuanFishTabel=jawabanFishboneBaru[idKepala][1][idSirip][1];

    refreshFishboneDetailSupport();

    $$('#fabTabel').on('click', function () {
    myApp.prompt('Nomor '+(bantuanFishTabel.length+1), 'Fishbone Detail Support', function (value) {
        bantuanFishTabel.push(value); 
        refreshFishboneDetailSupport();
        jawabanFishboneBaru[idKepala][1][idSirip].splice(1,1,bantuanFishTabel);
        localStorage.setItem("jawabanFishboneBaru",JSON.stringify(jawabanFishboneBaru));
    });
    });
})



function refreshFishboneDetailSupport()
{
    $$('#listSiripTabelFishbone').html("");
            for(var i=0;i<bantuanFishTabel.length;i++)
            {
                $$('#listSiripTabelFishbone').append(createChipFishboneDetailSupport(bantuanFishTabel[i],i));
                $$('#listSiripTabelFishbone').append("<br/>Tekan Pada Jawaban Untuk Edit<br/>");
                //$$('.listJawaban').append((i+1)+". "+jawabanLifelist[i]+"<br/>");
            }
}

function createChipFishboneDetailSupport(jawabane, aidine)
    {
        //chip
        var chip=document.createElement('div');
        chip.className='chip';

        //chip label
        var chipLabel=document.createElement('div');
        chipLabel.className='chip-label';
        chipLabel.appendChild(document.createTextNode(jawabane));

        //chip media
        var chipMedia=document.createElement('div');
        chipMedia.className='chip-media bg-teal';
        chipMedia.appendChild(document.createTextNode(aidine+1));

        //chip delete btn
        var deleteBtn=document.createElement('a');
        deleteBtn.setAttribute('href','#');
        deleteBtn.className='chip-delete';


        chip.appendChild(chipMedia);
        chip.appendChild(chipLabel);
        chip.appendChild(deleteBtn);

        //delete chip
        deleteBtn.onclick=function (e) {
            e.preventDefault();
            myApp.confirm('Hapus '+jawabane+"?","Yakin Hapus?", function () {
                jawabanFishboneBaru[idKepala][1][idSirip][1].splice(aidine,1);
                refreshFishboneDetailSupport();
                localStorage.setItem("jawabanFishboneBaru",JSON.stringify(jawabanFishboneBaru));
                chip.remove();

            });
        };

        chipLabel.onclick=function (e) {
            e.preventDefault();

            myApp.modal({
            title: 'Edit Nomor '+(aidine+1),
            text: 'Edit Jawaban :',
            afterText: '<input type="text" id="txtEditFishboneDetailSupport" class="modal-text-input" style="text-align: center;" value="'+jawabane+'"">',
            buttons: [{
            text: 'Cancel'
            }, {
            text: 'OK',
            onClick: function() {
                jawabanFishboneBaru[idKepala][1][idSirip][1].splice(aidine,1,$$('#txtEditFishboneDetailSupport').val());
                localStorage.setItem("jawabanFishboneBaru",JSON.stringify(jawabanFishboneBaru));
                refreshFishboneDetailSupport();
            }
            }]
            });
        };

        return chip;
    }






myApp.onPageInit('fishboneForm', function (page) {
    bantuanFishForm=[];
    idKepala=page.query.idKepala;
    if(jawabanFishboneBaru[idKepala][1])
        bantuanFishForm=jawabanFishboneBaru[idKepala][1];
    
    $$('#judulKepala').html(jawabanFishboneBaru[idKepala][0]);

    refreshFishboneSupport();

    $$('#fabForm').on('click', function () {
    myApp.prompt('Nomor '+(bantuanFishForm.length+1), 'Fishbone Support', function (value) {
        bantuanFishForm.push([value]);
        refreshFishboneSupport();
        jawabanFishboneBaru[idKepala].splice(1,1,bantuanFishForm);
        localStorage.setItem("jawabanFishboneBaru",JSON.stringify(jawabanFishboneBaru));
    });
    });


})

function refreshFishboneSupport()
{
    $$('#listSiripFishbone').html("");
            for(var i=0;i<bantuanFishForm.length;i++)
            {
                $$('#listSiripFishbone').append(createChipFishboneSupport(bantuanFishForm[i][0],i));
                $$('#listSiripFishbone').append("<br/>Tekan Pada Jawaban Untuk Edit<br/>");
                $$('#listSiripFishbone').append('<a href="fishboneTabel.html?idSirip='+i+'" class="item-link item-content no-ripple">Masuk Detail Support '+bantuanFishForm[i][0]+'</a><br/>');
                //$$('.listJawaban').append((i+1)+". "+jawabanLifelist[i]+"<br/>");
            }
}

function createChipFishboneSupport(jawabane, aidine)
    {
        //chip
        var chip=document.createElement('div');
        chip.className='chip';

        //chip label
        var chipLabel=document.createElement('div');
        chipLabel.className='chip-label';
        chipLabel.appendChild(document.createTextNode(jawabane));

        //chip media
        var chipMedia=document.createElement('div');
        chipMedia.className='chip-media bg-teal';
        chipMedia.appendChild(document.createTextNode(aidine+1));

        //chip delete btn
        var deleteBtn=document.createElement('a');
        deleteBtn.setAttribute('href','#');
        deleteBtn.className='chip-delete';


        chip.appendChild(chipMedia);
        chip.appendChild(chipLabel);
        chip.appendChild(deleteBtn);

        //delete chip
        deleteBtn.onclick=function (e) {
            e.preventDefault();
            myApp.confirm('Hapus '+jawabane+"?","Yakin Hapus?", function () {
                jawabanFishboneBaru[idKepala][1].splice(aidine,1);
                refreshFishboneSupport();
                localStorage.setItem("jawabanFishboneBaru",JSON.stringify(jawabanFishboneBaru));
                chip.remove();

            });
        };

        chipLabel.onclick=function (e) {
            e.preventDefault();

            myApp.modal({
            title: 'Edit Nomor '+(aidine+1),
            text: 'Edit Jawaban :',
            afterText: '<input type="text" id="txtEditFishboneSirip" class="modal-text-input" style="text-align: center;" value="'+bantuanFishForm[aidine][0]+'"">',
            buttons: [{
            text: 'Cancel'
            }, {
            text: 'OK',
            onClick: function() {
                jawabanFishboneBaru[idKepala][1][aidine].splice(0,1,$$('#txtEditFishboneSirip').val());
                localStorage.setItem("jawabanFishboneBaru",JSON.stringify(jawabanFishboneBaru));
                refreshFishboneSupport();
            }
            }]
            });
        };

        return chip;
    }


myApp.onPageInit('fishbone', function (page) {

    refreshFishboneKepala();

    $$('#fabKepala').on('click', function () {
    myApp.prompt('Nomor '+(jawabanFishboneBaru.length+1), 'Fishbone Kepala', function (value) {
        jawabanFishboneBaru.push([value]);
        refreshFishboneKepala();
        localStorage.setItem("jawabanFishboneBaru",JSON.stringify(jawabanFishboneBaru));
    });
    });
    
})


function refreshFishboneKepala()
{
    $$('#listKepalaFishbone').html("");
        for(var i=0;i<jawabanFishboneBaru.length;i++)
        {
            $$('#listKepalaFishbone').append(createChipFishboneKepala(jawabanFishboneBaru[i][0],i));
            $$('#listKepalaFishbone').append("<br/>Tekan Pada Jawaban Untuk Edit<br/>");
            $$('#listKepalaFishbone').append('<a href="fishboneForm.html?idKepala='+i+'" class="item-link item-content no-ripple">Masuk Support '+jawabanFishboneBaru[i][0]+'</a><br/>');
            
        }
}

function createChipFishboneKepala(jawabane, aidine)
    {
        //chip
        var chip=document.createElement('div');
        chip.className='chip';

        //chip label
        var chipLabel=document.createElement('div');
        chipLabel.className='chip-label';
        chipLabel.appendChild(document.createTextNode(jawabane));

        //chip media
        var chipMedia=document.createElement('div');
        chipMedia.className='chip-media bg-teal';
        chipMedia.appendChild(document.createTextNode(aidine+1));

        //chip delete btn
        var deleteBtn=document.createElement('a');
        deleteBtn.setAttribute('href','#');
        deleteBtn.className='chip-delete';


        chip.appendChild(chipMedia);
        chip.appendChild(chipLabel);
        chip.appendChild(deleteBtn);

        //delete chip
        deleteBtn.onclick=function (e) {
            e.preventDefault();
            myApp.confirm('Hapus '+jawabane+"?","Yakin Hapus?", function () {
                jawabanFishboneBaru.splice(aidine,1);
                refreshFishboneKepala();
                localStorage.setItem("jawabanFishboneBaru",JSON.stringify(jawabanFishboneBaru));
                chip.remove();

            });
        };

        chipLabel.onclick=function (e) {
            e.preventDefault();

            myApp.modal({
            title: 'Edit Nomor '+(aidine+1),
            text: 'Edit Jawaban :',
            afterText: '<input type="text" id="txtEditFishboneBaru" class="modal-text-input" style="text-align: center;" value="'+jawabanFishboneBaru[aidine][0]+'"">',
            buttons: [{
            text: 'Cancel'
            }, {
            text: 'OK',
            onClick: function() {
                jawabanFishboneBaru.splice(aidine,1,[$$('#txtEditFishboneBaru').val(),jawabanFishboneBaru[aidine][1]]);
                localStorage.setItem("jawabanFishboneBaru",JSON.stringify(jawabanFishboneBaru));
                refreshFishboneKepala();
            }
            }]
            });
        };

        return chip;
    }


myApp.onPageInit('kisahEntong', function (page) {
    

    if(JSON.parse(localStorage.getItem("jawabanEntong")))
    {
    	for(var i=0;i<soalEntong.length;i++)
    	{
            $$('#formKisahEntong').append('<div class="card">'+
                '<div class="card-header"  align="center">'+soalEntong[i][1]+'</div>'+
                '<div class="card-content">'+
                '<div class="card-content-inner"><textarea rows="4" cols="36" id="'+soalEntong[i][0]+'">'+jawabanEntong[i][1]+'</textarea></div>'+
                '</div>'+
                '</div>');
    	}
    }
    else
    {
    	for(var i=0;i<soalEntong.length;i++)
    	{
            $$('#formKisahEntong').append('<div class="card">'+
                '<div class="card-header"  align="center">'+soalEntong[i][1]+'</div>'+
                '<div class="card-content">'+
                '<div class="card-content-inner"><textarea rows="4" cols="36" id="'+soalEntong[i][0]+'"></textarea></div>'+
                '</div>'+
                '</div>');
    	}
    }



    $$('#btnSubmitKisahEntong').on('click', function () {
    	jawabanEntong=[];
        
    	for(var i=0;i<soalEntong.length;i++)
        {
        	var id=document.getElementsByTagName("textarea").item(i).id;
            var jawaban=document.getElementsByTagName("textarea").item(i).value;
            jawabanEntong.push([id,jawaban]);
        }

        localStorage.setItem("jawabanEntong",JSON.stringify(jawabanEntong));
    	mainView.router.back();
    });
    
})

myApp.onPageInit('lessonLearned', function (page) {
	$$('#soalEntong').html(soalLessonLearned[1]+":");
	refreshLessonLearned();
        
    $$('.floating-button').on('click', function () {
    myApp.prompt('Nomor '+(jawabanLessonLearned.length+1), 'Jawaban', function (value) {
        jawabanLessonLearned.push(value);
        refreshLessonLearned();
    	localStorage.setItem("jawabanLessonLearned",JSON.stringify(jawabanLessonLearned));
    });
    
    });
})

function refreshLessonLearned()
{
    $$('.listJawabanLessonLearned').html("");
    for(var i=0;i<jawabanLessonLearned.length;i++)
        {
            $$('.listJawabanLessonLearned').append(createChipLessonLearned(jawabanLessonLearned[i],i));
            $$('.listJawabanLessonLearned').append("<br/>Tekan Pada Jawaban Untuk Edit<br/>");
        }
}

function createChipLessonLearned(jawabane, aidine)
    {
        //chip
        var chip=document.createElement('div');
        chip.className='chip';

        //chip label
        var chipLabel=document.createElement('div');
        chipLabel.className='chip-label';
        chipLabel.appendChild(document.createTextNode(jawabane));

        //chip media
        var chipMedia=document.createElement('div');
        chipMedia.className='chip-media bg-teal';
        chipMedia.appendChild(document.createTextNode(aidine+1));

        //chip delete btn
        var deleteBtn=document.createElement('a');
        deleteBtn.setAttribute('href','#');
        deleteBtn.className='chip-delete';


        chip.appendChild(chipMedia);
        chip.appendChild(chipLabel);
        chip.appendChild(deleteBtn);

        //delete chip
        deleteBtn.onclick=function (e) {
            e.preventDefault();
            myApp.confirm('Hapus '+jawabane+"?","Yakin Hapus?", function () {
                jawabanLessonLearned.splice(aidine,1);
                localStorage.setItem("jawabanLessonLearned",JSON.stringify(jawabanLessonLearned));
                chip.remove();

            });
        };

        chipLabel.onclick=function (e) {
            e.preventDefault();

            myApp.modal({
            title: 'Edit Nomor '+(aidine+1),
            text: 'Edit Jawaban',
            afterText: '<input type="text" id="txtEditLessonLearned" class="modal-text-input" style="text-align: center;" value="'+jawabanLessonLearned[aidine]+'"">',
            buttons: [{
            text: 'Cancel'
            }, {
            text: 'OK',
            onClick: function() {
                jawabanLessonLearned.splice(aidine,1,$$('#txtEditLessonLearned').val());
                localStorage.setItem("jawabanLessonLearned",JSON.stringify(jawabanLessonLearned));
                refreshLessonLearned();
            }
            }, ]
            });
        };

        return chip;
    }


myApp.onPageInit('refleksiMini', function (page) {
    if(JSON.parse(localStorage.getItem("jawabanRefleksiMini")))
    {
	    for(var i=0;i<soalRefleksiMini.length;i++)
	        {
                $$('#formRefleksiMini').append('<div class="card">'+
                '<div class="card-header"  align="center">'+soalRefleksiMini[i][1]+'</div>'+
                '<div class="card-content">'+
                '<div class="card-content-inner"><textarea rows="4" cols="36" id="'+soalRefleksiMini[i][0]+'">'+jawabanRefleksiMini[i][1]+'</textarea></div>'+
                '</div>'+
                '</div>');
	        }
	        
    }
    else
    {
    	for(var i=0;i<soalRefleksiMini.length;i++)
	        {
                $$('#formRefleksiMini').append('<div class="card">'+
                '<div class="card-header"  align="center">'+soalRefleksiMini[i][1]+'</div>'+
                '<div class="card-content">'+
                '<div class="card-content-inner"><textarea rows="4" cols="36" id="'+soalRefleksiMini[i][0]+'"></textarea></div>'+
                '</div>'+
                '</div>');
	        }   
	}



    $$('#btnSubmitRefleksiMini').on('click', function () {
    	jawabanRefleksiMini=[];
    	for(var i=0;i<soalRefleksiMini.length;i++)
        {
        	var id=document.getElementsByTagName("textarea").item(i).id;
            var jawaban=document.getElementsByTagName("textarea").item(i).value;
            jawabanRefleksiMini.push([id,jawaban]);
        }

        localStorage.setItem("jawabanRefleksiMini",JSON.stringify(jawabanRefleksiMini));
    	mainView.router.back();
    });
    
})


var indexKelompok=0;
myApp.onPageInit('pilihGelombangEval', function (page) {
    var gelombang = document.getElementById('gelombang');
    var kelompok = document.getElementById('kelompok');
    var mhs = document.getElementById('mhs');
    $$('#gelombang').html("");
    $$.post(directory,{opsi:"getGelombangPadaPeriodeAktif"},function(data){
        gelombangFasilitator=JSON.parse(data);
        for(var i=0;i<gelombangFasilitator.length;i++)
        {
            $$('#gelombang').append("<option value="+gelombangFasilitator[i][0]+"> Gelombang " 
                +gelombangFasilitator[i][1]+
                "</option>")
        }       
    });

    $$('#gelombang').on('change', function(){
        $$('#kelompok').html("");
        $$('#textKelompok').html("Belum Memilih Kelompok");
        document.getElementById("mhsHidden").style.visibility = "hidden";
        var indexGelombang = gelombang.options[gelombang.selectedIndex].value;
        $$.post(directory,{opsi:"getKelompokDariGelombang", idGelombang: indexGelombang},function(data){
            KelompokFasilitator=JSON.parse(data);
            for(var i=0;i<KelompokFasilitator.length;i++)
            {
                $$('#kelompok').append("<option value="+KelompokFasilitator[i][0]+"> Kelompok " 
                    +KelompokFasilitator[i][1]+
                    "</option>")
            }
            document.getElementById("kelompokHidden").style.visibility = "visible";     
        });
    });

    
    $$('#btnLogoutFasilitator').on('click', function () 
    {
        localStorage.removeItem('username');
        localStorage.removeItem('jabatan');
        mainView.router.back({url: 'index.html',force: true,ignoreCache: true});
    });


    $$('#kelompok').on('change', function(){
        

        var namaKelompok = kelompok.options[kelompok.selectedIndex].text;
        indexKelompok=kelompok.options[kelompok.selectedIndex].value;
        document.getElementById("mhsHidden").style.visibility = "visible";
        
        $$('#mhs').html("");
        $$.post(directory,{opsi:"getMhsDalamKelompok", indexKelompok: indexKelompok},function(data){
            mhsFasilitator=JSON.parse(data);
            for(var i=0;i<mhsFasilitator.length;i++)
            {
                $$('#mhs').append("<option value="+mhsFasilitator[i][0]+">"+mhsFasilitator[i][0]+
                    " - "+mhsFasilitator[i][1]+
                    "</option>")
            }   
        });
    });
    var bigDreamMhs="";
    var lifelistMhs="";
    var oMhs="";
    var me1Mhs="";
    var me2Mhs="";
    var eMhs="";
    var llMhs="";
    var rmMhs="";
    var apMhs="";
    var aptMhs="";
    var fishKMhs="";
    $$('#mhs').on('change', function(){
        document.getElementById("halo").style.display = "none";
        document.getElementById("gelombang").style.display = "none";
        document.getElementById("kelompokHidden").style.display = "none";
        document.getElementById("textKelompok").style.display = "none";
        document.getElementById("kelompok").style.display = "none";
        document.getElementById("ilangPilihM").style.display = "none";

        document.getElementById("fotoMhs").style.visibility = "visible";
        document.getElementById("bigDreamMhs").style.visibility = "visible";
        document.getElementById("lifelistMhs").style.visibility = "visible";
        document.getElementById("oMhs").style.visibility = "visible";
        document.getElementById("me1Mhs").style.visibility = "visible";
        document.getElementById("me2Mhs").style.visibility = "visible";
         document.getElementById("eMhs").style.visibility = "visible";
         document.getElementById("llMhs").style.visibility = "visible";
          document.getElementById("rmMhs").style.visibility = "visible";
          document.getElementById("apMhs").style.visibility = "visible";
           document.getElementById("aptMhs").style.visibility = "visible";
           document.getElementById("fishKMhs").style.visibility = "visible";
           document.getElementById("fishSMhs").style.visibility = "visible";
        var nrpMhs=mhs.options[mhs.selectedIndex].value;
        $$('#fotoMhs').html("");
         $$('#fotoMhs').html("<div style='text-align:center;'><img src=https://my.ubaya.ac.id/img/mhs/"+nrpMhs+"_m.jpg></div>");
        $$('#bigDreamMhs').html("");
        $$('#lifelistMhs').html("");
        $$('#oMhs').html("");
        $$('#me1Mhs').html("");
        $$('#me2Mhs').html("");
        $$('#eMhs').html("");
        $$('#llMhs').html("");
        $$('#rmMhs').html("");
        $$('#apMhs').html("");
        $$('#aptMhs').html("");
        $$('#fishKMhs').html("");
        $$('#fishSMhs').html("");

        $$.post(directory,{opsi:"getSoalJwbMhsBigDream", nrpMhs: nrpMhs },function(data){
            bigDreamMhs=JSON.parse(data);
            if(bigDreamMhs!=""){
                $$('#bigDreamMhs').append("<br/><div style='text-align:left;'>Modul Big Dream<span style='float:right;'><i class='icon f7-icons'>check_round_fill</i></span><hr></div>")
            }
            else{
                $$('#bigDreamMhs').append("<br/><div style='text-align:left;'>Modul Big Dream<span style='float:right;'><i class='icon f7-icons'>close_round_fill</i></span><hr></div>")
            }
        });
        $$.post(directory,{opsi:"getSoalJwbMhsLifelist", nrpMhs: nrpMhs },function(data){
            lifelistMhs=JSON.parse(data);
            if(lifelistMhs!=""){
                $$('#lifelistMhs').append("<div style='text-align:left;'>Modul Lifelist<span style='float:right;'><i class='icon f7-icons'>check_round_fill</i></span><hr></div>")
            }
            else{
                $$('#lifelistMhs').append("<div style='text-align:left;'>Modul Lifelist<span style='float:right;'><i class='icon f7-icons'>close_round_fill</i></span><hr></div>")
            }
        });
        $$.post(directory,{opsi:"getSoalJwbMhsOutdoor", nrpMhs: nrpMhs },function(data){
            oMhs=JSON.parse(data);
            if(oMhs!=""){
                $$('#oMhs').append("<div style='text-align:left;'>Modul Outdoor<span style='float:right;'><i class='icon f7-icons'>check_round_fill</i></span><hr></div>")
            }
            else{
                $$('#oMhs').append("<div style='text-align:left;'>Modul Outdoor<span style='float:right;'><i class='icon f7-icons'>close_round_fill</i></span><hr></div>")
            }

        });
        $$.post(directory,{opsi:"getSoalJwbMhsMe1", nrpMhs: nrpMhs },function(data){
            me1Mhs=JSON.parse(data);
            if(me1Mhs!=""){
                $$('#me1Mhs').append("<div style='text-align:left;'>Modul Manajemen Emosi 1<span style='float:right;'><i class='icon f7-icons'>check_round_fill</i></span><hr></div>")
            }
            else{
                $$('#me1Mhs').append("<div style='text-align:left;'>Modul Manajemen Emosi 2<span style='float:right;'><i class='icon f7-icons'>close_round_fill</i></span><hr></div>")
            }
        });
        $$.post(directory,{opsi:"getSoalJwbMhsMe2", nrpMhs: nrpMhs },function(data){
            me2Mhs=JSON.parse(data);
            if(me2Mhs!=""){
                $$('#me2Mhs').append("<div style='text-align:left;'>Modul Manajemen Emosi 2<span style='float:right;'><i class='icon f7-icons'>check_round_fill</i></span><hr></div>")
            }
            else{
                $$('#me2Mhs').append("<div style='text-align:left;'>Modul Manajemen Emosi 2<span style='float:right;'><i class='icon f7-icons'>close_round_fill</i></span><hr></div>")
            }
        });
        $$.post(directory,{opsi:"getSoalJwbMhsEntong", nrpMhs: nrpMhs },function(data){
            eMhs=JSON.parse(data);
            if(eMhs!=""){
                $$('#eMhs').append("<div style='text-align:left;'>Modul Entong<span style='float:right;'><i class='icon f7-icons'>check_round_fill</i></span><hr></div>")
            }
            else{
                $$('#eMhs').append("<div style='text-align:left;'>Modul Entong<span style='float:right;'><i class='icon f7-icons'>close_round_fill</i></span><hr></div>")
            }  

        });
        $$.post(directory,{opsi:"getSoalJwbMhsLessonLearned", nrpMhs: nrpMhs },function(data){
            llMhs=JSON.parse(data);
            if(llMhs!=""){
                $$('#llMhs').append("<div style='text-align:left;'>Modul Lesson learned<span style='float:right;'><i class='icon f7-icons'>check_round_fill</i></span><hr></div>")
            }
            else{
                $$('#llMhs').append("<div style='text-align:left;'>Modul Lesson Learned<span style='float:right;'><i class='icon f7-icons'>close_round_fill</i></span><hr></div>")
            }  
        });
        $$.post(directory,{opsi:"getSoalJwbMhsRm", nrpMhs: nrpMhs },function(data){
            rmMhs=JSON.parse(data);
            if(rmMhs!=""){
                $$('#rmMhs').append("<div style='text-align:left;'>Modul Refleksi Mini<span style='float:right;'><i class='icon f7-icons'>check_round_fill</i></span><hr></div>")
            } 
            else{
                $$('#rmMhs').append("<div style='text-align:left;'>Modul Refleksi Mini<span style='float:right;'><i class='icon f7-icons'>close_round_fill</i></span><hr></div>")
            }
        });
        $$.post(directory,{opsi:"getSoalJwbMhsFormAp", nrpMhs: nrpMhs },function(data){
            apMhs=JSON.parse(data);
            if(apMhs!=""){
                $$('#apMhs').append("<div style='text-align:left;'>Modul Action Plan<span style='float:right;'><i class='icon f7-icons'>check_round_fill</i></span><hr></div>")
            }
            else{
                $$('#apMhs').append("<div style='text-align:left;'>Modul Action Plan<span style='float:right;'><i class='icon f7-icons'>close_round_fill</i></span><hr></div>")
            }
        });
        $$.post(directory,{opsi:"getSoalJwbMhsFormTableAp", nrpMhs: nrpMhs },function(data){
            aptMhs=JSON.parse(data);
            if(aptMhs!=""){
                $$('#aptMhs').append("<div style='text-align:left;'>Detail Action Plan<span style='float:right;'><i class='icon f7-icons'>check_round_fill</i></span><hr></div>")
            }
            else{
                $$('#aptMhs').append("<div style='text-align:left;'>Detail Action Plan<span style='float:right;'><i class='icon f7-icons'>close_round_fill</i></span><hr></div>")
            }

        });
        
        $$.post(directory,{opsi:"getSoalJwbMhsAllFishbone", nrpMhs: nrpMhs },function(data){
            fishKMhs=JSON.parse(data);
            if(fishKMhs!=""){
                $$('#fishKMhs').append("<div style='text-align:left;'>Modul Fishbone<span style='float:right;'><i class='icon f7-icons'>check_round_fill</i></span><hr></div>")
            }
             else{
                $$('#fishKMhs').append("<div style='text-align:left;'>Modul Fishbone<span style='float:right;'><i class='icon f7-icons'>close_round_fill</i></span><hr></div>")
            } 
        });

    if(bigDreamMhs!="" && lifelistMhs!="" && oMhs!="" && me1Mhs!=""&&me2Mhs!=""&&eMhs!=""&&llMhs!=""&&rmMhs!=""&&apMhs!=""&&aptMhs!=""&&fishKMhs!=""){
        $$('#fishSMhs').append("<div style='text-align:center;'>Mahasiswa ini lulus GPB</div>");
    }
    else{
        $$('#fishSMhs').append("<div style='text-align:center;'>Mahasiswa ini belum lulus GPB</div>");

    }
        

    });
    
    /*var cawangsilang="";
            if(jawabanActionPlanForm[i][4]==1)
              cawangsilang ='<i class="icon f7-icons">check</i>';
            else if(jawabanActionPlanForm[i][4]==2)
                cawangsilang ='<i class="icon f7-icons">close</si>';

            $$('#listMyLifeList').append('<a href="formActionPlanForm.html?idLifeList='+i+'" class="item-link item-content no-ripple">'+
                '<div class="card">'+
                '<div class="card-header" align="center" >'+(i+1)+". "+jawabanLifelist[i]+cawangsilang+'</div>');*/
    
   
})
myApp.onPageInit('pilihGelombangFasilitator', function (page) {
    var gelombang = document.getElementById('gelombang');
    var kelompok = document.getElementById('kelompok');
    var mhs = document.getElementById('mhs');
    $$('#gelombang').html("");
    $$.post(directory,{opsi:"getGelombangPadaPeriodeAktif"},function(data){
        gelombangFasilitator=JSON.parse(data);
        for(var i=0;i<gelombangFasilitator.length;i++)
        {
            $$('#gelombang').append("<option value="+gelombangFasilitator[i][0]+"> Gelombang " 
                +gelombangFasilitator[i][1]+
                "</option>")
        }       
    });

    $$('#gelombang').on('change', function(){
        $$('#kelompok').html("");
        $$('#textKelompok').html("Belum Memilih Kelompok");
        document.getElementById("passwordKelompok").style.visibility = "hidden";
        document.getElementById("submitPasswordKelompok").style.visibility = "hidden";
        document.getElementById("mhsHidden").style.visibility = "hidden";
        document.getElementById("untukCommentMhs").style.visibility = "hidden";
        var indexGelombang = gelombang.options[gelombang.selectedIndex].value;
        $$.post(directory,{opsi:"getKelompokDariGelombang", idGelombang: indexGelombang},function(data){
            KelompokFasilitator=JSON.parse(data);
            for(var i=0;i<KelompokFasilitator.length;i++)
            {
                $$('#kelompok').append("<option value="+KelompokFasilitator[i][0]+"> Kelompok " 
                    +KelompokFasilitator[i][1]+
                    "</option>")
            }
            document.getElementById("kelompokHidden").style.visibility = "visible";     
        });
    });

    $$('#submitPasswordKelompok').on('click', function () 
    {
        var passKelompok=$$("#passwordKelompok").val();
        $$.post(directory,{opsi:"cekPasswordKelompok",idKelompok:indexKelompok, passKelompok: passKelompok},function(data){
            if(data=="berhasil")
            {
                document.getElementById("mhsHidden").style.visibility = "visible";
            }
            else
            {
                myApp.alert("Password Salah !!","Gagal")
            }
        });
    });

    $$('#btnLogoutFasilitator').on('click', function () 
    {
        localStorage.removeItem('username');
        localStorage.removeItem('jabatan');
        mainView.router.back({url: 'index.html',force: true,ignoreCache: true});
    });


    $$('#kelompok').on('change', function(){
        var namaKelompok = kelompok.options[kelompok.selectedIndex].text;
        indexKelompok=kelompok.options[kelompok.selectedIndex].value;
        $$("#passwordKelompok").attr("placeholder", "Ketik Password untuk " +namaKelompok );
        document.getElementById("passwordKelompok").style.visibility = "visible";
        document.getElementById("submitPasswordKelompok").style.visibility = "visible";
        document.getElementById("mhsHidden").style.visibility = "hidden";
        document.getElementById("untukCommentMhs").style.visibility = "hidden";
        
        $$('#mhs').html("");
        $$.post(directory,{opsi:"getMhsDalamKelompok", indexKelompok: indexKelompok},function(data){
            mhsFasilitator=JSON.parse(data);
            for(var i=0;i<mhsFasilitator.length;i++)
            {
                $$('#mhs').append("<option value="+mhsFasilitator[i][0]+">"+mhsFasilitator[i][0]+
                    " - "+mhsFasilitator[i][1]+
                    "</option>");
            }   
        });
    });

    $$('#mhs').on('change', function(){
        document.getElementById("fotoMhs").style.visibility = "visible";
        document.getElementById("bigDreamMhs").style.visibility = "visible";
        document.getElementById("lifelistMhs").style.visibility = "visible";
        document.getElementById("oMhs").style.visibility = "visible";
        document.getElementById("me1Mhs").style.visibility = "visible";
        document.getElementById("me2Mhs").style.visibility = "visible";
         document.getElementById("eMhs").style.visibility = "visible";
         document.getElementById("llMhs").style.visibility = "visible";
          document.getElementById("rmMhs").style.visibility = "visible";
          document.getElementById("apMhs").style.visibility = "visible";
           document.getElementById("aptMhs").style.visibility = "visible";
           document.getElementById("fishKMhs").style.visibility = "visible";
           document.getElementById("fishSMhs").style.visibility = "visible";
           document.getElementById("fishDSMhs").style.visibility = "visible";
        var nrpMhs=mhs.options[mhs.selectedIndex].value;
        $$('#fotoMhs').html("");
         $$('#fotoMhs').html("<img src=https://my.ubaya.ac.id/img/mhs/"+nrpMhs+"_m.jpg>");
        $$('#bigDreamMhs').html("");
        $$('#lifelistMhs').html("");
        $$('#oMhs').html("");
        $$('#me1Mhs').html("");
        $$('#me2Mhs').html("");
        $$('#eMhs').html("");
        $$('#llMhs').html("");
        $$('#rmMhs').html("");
        $$('#apMhs').html("");
        $$('#aptMhs').html("");
        $$('#fishKMhs').html("");
        $$('#fishSMhs').html("");
        $$('#fishDSMhs').html("");
       /* $$.post(directory,{opsi:"getJwbMhsBigDream", nrpMhs: nrpMhs },function(data){
            var bigDreamMhs=JSON.parse(data);
            for(var i=0;i<bigDreamMhs.length;i++)
            {
                $$('#bigDreamMhs').append(bigDreamMhs[i]+"<br/>")
            }   
        });*/
        $$.post(directory,{opsi:"getSoalJwbMhsBigDream", nrpMhs: nrpMhs },function(data){
            var bigDreamMhs=JSON.parse(data);
            if(bigDreamMhs==""){
                $$('#bigDreamMhs').append("<div style=text-align:center;><b><font size=5>My Big Dream :</font></b></div><br/><div style=text-align:center;>-</div><br/>")
            }
            for(var i=0;i<bigDreamMhs.length;i++)
            {
                if(bigDreamMhs!=""){
                    $$('#bigDreamMhs').append("<div style=text-align:center;><b><font size=5>My Big Dream :</font></b></div><br/>"+
                                              "<div style=text-align:center;>"+bigDreamMhs[i][0]+"</div><br/><div style=text-align:center;>"+bigDreamMhs[i][1]+"</div><br/>")
                }
            }   
        });
        $$.post(directory,{opsi:"getSoalJwbMhsLifelist", nrpMhs: nrpMhs },function(data){
            var lifelistMhs=JSON.parse(data);
            if(lifelistMhs==""){
                $$('#lifelistMhs').append("<div style=text-align:center;><b><font size=5>Lifelist :</font></b></div><br/><div style=text-align:center;>-</div><br/>")
            }
            for(var i=0;i<lifelistMhs.length;i++)
            {
                if(lifelistMhs!=""){
                    $$('#lifelistMhs').append("<div style=text-align:center;><b><font size=5>Lifelist :</font></b></div><br/>"+
                                              "<div style=text-align:center;>"+lifelistMhs[i][0]+"</div><br/><div style=text-align:center;>"+lifelistMhs[i][1]+"</div><br/>")
                }
            }   
        });
        $$.post(directory,{opsi:"getSoalJwbMhsOutdoor", nrpMhs: nrpMhs },function(data){
            var oMhs=JSON.parse(data);
            if(oMhs==""){
                $$('#oMhs').append("<div style=text-align:center;><b><font size=5>Outdoor :</font></b></div><br/><div style=text-align:center;>-</div><br/>")
            }
            for(var i=0;i<oMhs.length;i++)
            {
                if(oMhs!="" ){
                    $$('#oMhs').append("<div style=text-align:center;><b><font size=5>Outdoor :</font></b></div><br/>"+
                                       "<div style=text-align:center;>"+oMhs[i][0]+"</div><br/><div style=text-align:center;>"+oMhs[i][1]+"</div><br/>")
                }
            }
        });
        $$.post(directory,{opsi:"getSoalJwbMhsMe1", nrpMhs: nrpMhs },function(data){
            var me1Mhs=JSON.parse(data);
            if(me1Mhs==""){
                $$('#me1Mhs').append("<div style=text-align:center;><b><font size=5>Manajemen Emosi :</font></b></div><br/><div style=text-align:center;>-</div><br/>")
            }
            for(var i=0;i<me1Mhs.length;i++)
            {
                if(me1Mhs!="" ){
                    $$('#me1Mhs').append("<div style=text-align:center;><b><font size=5>Manajemen Emosi :</font></b></div><br/>"+
                                         "<div style=text-align:center;>"+me1Mhs[i][0]+"</div><br/><div style=text-align:center;>"+me1Mhs[i][4]+"</div><br/>"+
                                         "<div style=text-align:center;>"+me1Mhs[i][1]+"</div><br/><div style=text-align:center;>"+me1Mhs[i][5]+"</div><br/>"+
                                         "<div style=text-align:center;>"+me1Mhs[i][2]+"</div><br/><div style=text-align:center;>"+me1Mhs[i][6]+"</div><br/>"+
                                         "<div style=text-align:center;>"+me1Mhs[i][3]+"</div><br/><div style=text-align:center;>"+me1Mhs[i][7]+"</div><br/>")
                }
            }
        });
        $$.post(directory,{opsi:"getSoalJwbMhsMe2", nrpMhs: nrpMhs },function(data){
            var me2Mhs=JSON.parse(data);
            if(me2Mhs==""){
                $$('#me2Mhs').append("<div style=text-align:center;><b><font size=5>Manajemen Emosi 2:</font></b></div><br/><div style=text-align:center;>-</div><br/>")
            }
            for(var i=0;i<me2Mhs.length;i++)
            {
                if(me2Mhs!="" ){
                    $$('#me2Mhs').append("<div style=text-align:center;><b><font size=5>Manajemen Emosi 2 :</font></b></div><br/>"+
                                         "<div style=text-align:center;>"+me2Mhs[i][0]+"</div><br/><div style=text-align:center;>"+me2Mhs[i][3]+"</div><br/>"+
                                         "<div style=text-align:center;>"+me2Mhs[i][1]+"</div><br/><div style=text-align:center;>"+me2Mhs[i][4]+"</div><br/>"+
                                         "<div style=text-align:center;>"+me2Mhs[i][2]+"</div><br/><div style=text-align:center;>"+me2Mhs[i][5]+"</div><br/>")
                }
            }
        });
        $$.post(directory,{opsi:"getSoalJwbMhsEntong", nrpMhs: nrpMhs },function(data){
            var eMhs=JSON.parse(data);
            if(eMhs==""){
                $$('#eMhs').append("<div style=text-align:center;><b><font size=5>Soal Entong :</font></b></div><br/><div style=text-align:center;>-</div><br/>")
            }
            for(var i=0;i<eMhs.length;i++)
            {
                if(eMhs!=""){
                    $$('#eMhs').append("<div style=text-align:center;><b><font size=5>Soal Entong "+(i+1)+"</font></b></div><br/>"+
                                              "<div style=text-align:center;>"+eMhs[i][0]+"</div><br/><div style=text-align:center;>"+eMhs[i][1]+"</div><br/>")
                }
            }   
        });
        $$.post(directory,{opsi:"getSoalJwbMhsLessonLearned", nrpMhs: nrpMhs },function(data){
            var llMhs=JSON.parse(data);
            if(llMhs==""){
                $$('#llMhs').append("<div style=text-align:center;><b><font size=5>Lesson learned :</font></b></div><br/><div style=text-align:center;>-</div><br/>")
            }
            for(var i=0;i<llMhs.length;i++)
            {
                if(llMhs!=""){
                    $$('#llMhs').append("<div style=text-align:center;><b><font size=5>Lesson Learned :</font></b></div><br/>"+
                                              "<div style=text-align:center;>"+llMhs[i][0]+"</div><br/><div style=text-align:center;>"+llMhs[i][1]+"</div><br/>")
                }
            }   
        });
        $$.post(directory,{opsi:"getSoalJwbMhsRm", nrpMhs: nrpMhs },function(data){
            var rmMhs=JSON.parse(data);
            if(rmMhs==""){
                $$('#rmMhs').append("<div style=text-align:center;><b><font size=5>Refleksi Mini :</font></b></div><br/><div style=text-align:center;>-</div><br/>")
            }
            for(var i=0;i<rmMhs.length;i++)
            {
                if(rmMhs!=""){
                    $$('#rmMhs').append("<div style=text-align:center;><b><font size=5>Refleksi mini "+(i+1)+"</font></b></div><br/>"+
                                              "<div style=text-align:center;>"+rmMhs[i][0]+"</div><br/><div style=text-align:center;>"+rmMhs[i][1]+"</div><br/>")
                }
            }   
        });
        $$.post(directory,{opsi:"getSoalJwbMhsFormAp", nrpMhs: nrpMhs },function(data){
            var apMhs=JSON.parse(data);
            if(apMhs==""){
                $$('#apMhs').append("<div style=text-align:center;><b><font size=5>Jawaban Form Action Plan :</font></b></div><br/><div style=text-align:center;>-</div><br/>")
            }
            for(var i=0;i<apMhs.length;i++)
            {
                 if(apMhs!="" ){
                    $$('#apMhs').append("<div style=text-align:center;><b><font size=5>Jawaban Form Action Plan :</font></b></div><br/>"+
                                         "<div style=text-align:center;>Obstacle :</div><br/><div style=text-align:center;>"+apMhs[i][0]+"</div><br/>"+
                                         "<div style=text-align:center;>Evidence :</div><br/><div style=text-align:center;>"+apMhs[i][1]+"</div><br/>"+
                                         "<div style=text-align:center;>Evaluation :</div><br/><div style=text-align:center;>"+apMhs[i][2]+"</div><br/>"+
                                         "<div style=text-align:center;>Target :</div><br/><div style=text-align:center;>"+apMhs[i][3]+"</div><br/>"+
                                         "<div style=text-align:center;>Status :</div><br/><div style=text-align:center;>"+apMhs[i][4]+"</div><br/>")
                }
            }   
        });
        $$.post(directory,{opsi:"getSoalJwbMhsFormTableAp", nrpMhs: nrpMhs },function(data){
            var aptMhs=JSON.parse(data);
            if(aptMhs==""){
                $$('#aptMhs').append("<div style=text-align:center;><b><font size=5>Jawaban Detail Form Action Plan :</font></b></div><br/><div style=text-align:center;>-</div><br/>")
            }
            for(var i=0;i<aptMhs.length;i++)
            {
                 if(aptMhs!="" ){
                    $$('#aptMhs').append("<div style=text-align:center;><b><font size=5>Jawaban Detail Form Action Plan  :</font></b></div><br/>"+
                                         "<div style=text-align:center;>Task :</div><br/><div style=text-align:center;>"+aptMhs[i][0]+"</div><br/>"+
                                         "<div style=text-align:center;>Resource :</div><br/><div style=text-align:center;>"+aptMhs[i][1]+"</div><br/>"+
                                         "<div style=text-align:center;>Timeline :</div><br/><div style=text-align:center;>"+aptMhs[i][2]+"</div><br/>"+
                                         "<div style=text-align:center;>Evidence_Table :</div><br/><div style=text-align:center;>"+aptMhs[i][3]+"</div><br/>"+
                                         "<div style=text-align:center;>Evaluation_Table :</div><br/><div style=text-align:center;>"+aptMhs[i][4]+"</div><br/>")
                }
            }   
        });
        
        $$.post(directory,{opsi:"getSoalJwbMhsAllFishbone", nrpMhs: nrpMhs },function(data){
            var fishKMhs=JSON.parse(data);
            if(fishKMhs==""){
                $$('#fishKMhs').append("<div style=text-align:center;><b><font size=5>Jawaban Fishbone :</font></b></div><br/><div style=text-align:center;>-</div><br/>")
            }
            for(var i=0;i<fishKMhs.length;i++)
            {
                if(fishKMhs!=""){
                    $$('#fishKMhs').append("<div style=text-align:center;><b><font size=5>Jawaban Fishbone :</font></b></div><br/>"+
                                            "<div style=text-align:center;>Kepala Fishbone :</div><br/><div style=text-align:center;>"+fishKMhs[i][0]+"</div><br/>"+
                                             "<div style=text-align:center;>Sirip Fishbone :</div><br/><div style=text-align:center;>"+fishKMhs[i][1]+"</div><br/>"+
                                             "<div style=text-align:center;>Detail Sirip Fishbone :</div><br/><div style=text-align:center;>"+fishKMhs[i][2]+"</div><br/>")
                }
            }   
        });

        var namaMhs = mhs.options[mhs.selectedIndex].text;
        $$("#commentUntukDiinsert").attr("placeholder", "Ketik Comment untuk " +namaMhs );
        document.getElementById("untukCommentMhs").style.visibility = "visible";

    });

    
    $$('#submitInsertComment').on('click',function(){
        
        var komen=$$("#commentUntukDiinsert").val();
        var indexMhs=mhs.options[mhs.selectedIndex].value;
        $$.post(directory,{opsi:"insertCommentMhs", indexMhs: indexMhs,komen:komen },function(data){
            if(data=="berhasil")
            {
                myApp.alert("Comment Berhasil Disimpan","Berhasil");
            }
            else
            {
                myApp.alert("Comment Tidak Tersimpan","Gagal");
            }
        });
    });
})


// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

    if (page.name === 'about') {
        // Following code will be executed for page with data-page attribute equal to "about"
        myApp.alert('Here comes About page');
    }
})

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    myApp.alert('Here comes About page');
})