<?php

 // Allow from any origin
set_error_handler('exceptions_error_handler');
function exceptions_error_handler($severity, $message, $filename, $lineno) {
  if (error_reporting() == 0) {
    return;
  }
  if (error_reporting() & $severity) {
    throw new ErrorException($message, 0, $severity, $filename, $lineno);
  }
}

    if (isset($_SERVER['HTTP_ORIGIN'])) {
        // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
        // you want to allow, and if so:
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }

    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            // may also be using PUT, PATCH, HEAD etc
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

        exit(0);
    }
$conn=mysqli_connect("localhost","root","","projectkp");
//$conn=mysqli_connect("localhost","root","","projectkp");

//$conn=mysqli_connect("localhost","projectk_gpb","projectKP123","projectk_gpb");
if($conn->connect_errno){
	echo "Gagal";
}

$opsi=$_POST['opsi'];
switch($opsi)
{
	case "tampilModul1":
	$sql="SELECT id_soal_1_jawaban,soal FROM soal_1_jawaban where no_modul=1 and hapuskah=0";
	$hasil=$conn->query($sql);
	$tabel=array();
	while($row=$hasil->fetch_array())
	{
		array_push($tabel,array($row['id_soal_1_jawaban'],$row['soal']));
	}
	
	echo json_encode($tabel);
	break;

	case "tembakHehe":
	$username=$_POST['username'];
	$password=$_POST['password'];
	$sql="SELECT username FROM user where username='".$username."' and password='".$password."' and jabatan='admin'";
	$hasil=mysqli_query($conn, $sql);
	if(mysqli_num_rows($hasil)!=0){
	$otepe=substr(str_shuffle(str_repeat("0123456789abcdefghijklmnopqrstuvwxyz", 4)), 0, 4);
	 $sql="update user set otp='".$otepe."' where password='".$password."' and username='".$username."'";
	 mysqli_query($conn, $sql);
	 echo $otepe;
	}
	break;

	case "deleteOTP":
	$username=$_POST['username'];
	$password=$_POST['password'];
	$sql="update user set otp='' where password='".$password."' and username='".$username."'";
	mysqli_query($conn, $sql);
	break;


	case "loginMhs":
	$nrp=$_POST['nrp'];
	$password=$_POST['password'];
	$sql="SELECT id_mahasiswa FROM mahasiswa where id_mahasiswa='".$nrp."' and password='".$password."'";
	//$hasil=$conn->query($sql);
	$hasil=mysqli_query($conn, $sql);
	if(mysqli_num_rows($hasil)!=0)
	 echo "berhasil";
	break;

	case "loginFasilitator":
	$username=$_POST['username'];
	$password=$_POST['password'];
	$sql="SELECT username FROM user where username='".$username."' and password='".$password."' and jabatan='fasilitator'";
	$hasil=mysqli_query($conn, $sql);
	if(mysqli_num_rows($hasil)==0){
		$sql1="SELECT username FROM user where username='".$username."' and password='".$password."' and jabatan='admin'";
		$hasil1=mysqli_query($conn, $sql1);
		if(mysqli_num_rows($hasil1)!=0){
		 echo "hehehe";
		}
	}
	else
	{
		echo "berhasil";
	}
	break;

	case "getBisTenda":
	$nrp=$_POST['nrp'];
	$sql="SELECT m.tenda,m.bus,m.nama,k.nama_kelompok FROM mahasiswa m, kelompok k WHERE m.id_kelompok=k.id_kelompok and m.id_mahasiswa='".$nrp."'";
	$hasil=mysqli_query($conn, $sql);
	echo json_encode(mysqli_fetch_object($hasil));
	break;

	case "getGelombangPadaPeriodeAktif":
	$sql="SELECT id_gelombang,nama_gelombang FROM master_gelombang g, master_periode p where g.id_periode=p.id_periode and p.status=1";
	$hasil=mysqli_query($conn, $sql);
	$untukDikirim = array();
	while($row=$hasil->fetch_array())
	{
		array_push($untukDikirim,array($row['id_gelombang'],$row['nama_gelombang']));
	}
	echo json_encode($untukDikirim);
	break;

	case "getKelompokDariGelombang":
	$idGelombang=$_POST['idGelombang'];
	$sql="select k.id_kelompok, k.nama_kelompok from kelompok k, master_gelombang g where k.id_gelombang=g.id_gelombang and g.id_gelombang=".$idGelombang;
	$hasil=mysqli_query($conn, $sql);
	$untukDikirim = array();
	while($row=$hasil->fetch_array())
	{
		array_push($untukDikirim,array($row['id_kelompok'],$row['nama_kelompok']));
	}
	echo json_encode($untukDikirim);
	break;

	case "cekPasswordKelompok":
	$passKelompok=$_POST['passKelompok'];
	$idKelompok=$_POST['idKelompok'];
	$sql="SELECT nama_kelompok from kelompok where password='".$passKelompok."' and id_kelompok='".$idKelompok."'";
	$hasil=mysqli_query($conn, $sql);
	if(mysqli_num_rows($hasil)!=0)
	 echo "berhasil";
	break;

	case "getMhsDalamKelompok":
	$indexKelompok=$_POST['indexKelompok'];
	$sql="SELECT id_mahasiswa,nama FROM mahasiswa WHERE id_kelompok=".$indexKelompok;
	$hasil=mysqli_query($conn, $sql);
	$untukDikirim = array();
	while($row=$hasil->fetch_array())
	{
		array_push($untukDikirim,array($row['id_mahasiswa'],$row['nama']));
	}
	echo json_encode($untukDikirim);
	break;

	case "insertCommentMhs":
	$indexMhs=$_POST['indexMhs'];
	$komen=$_POST['komen'];
	$sql="update mahasiswa set comment='".$komen."' where id_mahasiswa='".$indexMhs."'";
	$hasil=mysqli_query($conn, $sql);
	if($hasil==1)
	 echo "berhasil";
	break;

	case "uploadJawaban":
	$koleksiJawaban=json_decode($_POST['datae']);
	$datapribadi=$koleksiJawaban[0];
	$nrpMahasiswa=$datapribadi[0];
	$passwordMahasiswa=$datapribadi[1];
	try{$modul1=$koleksiJawaban[1];} catch(Exception $e){} // jawabanMyBigDream
	$idSoalModul2=$koleksiJawaban[2][0];
	$modul2=$koleksiJawaban[2][1]; //jawabanLifeList
	$modul3=$koleksiJawaban[3]; // jawabanOutdoor
	$idSoalModul4=$koleksiJawaban[4][0];
	$modul4=$koleksiJawaban[4][1]; // jawabanManajemenEmosiForm
	$idSoalModul5=$koleksiJawaban[5][0];
	$modul5=$koleksiJawaban[5][1]; // jawabanManajemenEmosiForm2
	$modul6=$koleksiJawaban[6]; //jawabanActionPlanForm
	$modul7=$koleksiJawaban[7]; //jawabanFishboneBaru
	$modul8=$koleksiJawaban[8]; //jawabanEntong
	$idSoalModul9=$koleksiJawaban[9][0];
	$modul9=$koleksiJawaban[9][1]; //jawabanLessonLearned
	$modul10=$koleksiJawaban[10];//jawabanRefleksiMini


    date_default_timezone_set('Asia/Jakarta');
	$sql123="INSERT INTO histori(nrp,tanggal_upload) VALUES ('".$nrpMahasiswa."', '".date('Y-m-d H:i:s')."')";
    mysqli_query($conn, $sql123);
	/*for($i=0;$i<count($modul4);$i++){
		uploadJawabanTabel4($nrpMahasiswa,$idSoalModul4,$modul4[$i],$conn); cadangan jawaban lama
	}*/

 
	try{for($i=0;$i<count($modul1);$i++){
		uploadJawabanCuma1($nrpMahasiswa,$modul1[$i][0],$modul1[$i][1],$conn);
	}}
	catch(Exception $e) {}
	

	try{$sqlSelect="SELECT id_jawaban FROM jawaban_lebih_dari_1 WHERE id_mahasiswa='".$nrpMahasiswa."' and id_soal_byk_jawaban='".$idSoalModul2."'";
	$hasilSelect=mysqli_query($conn, $sqlSelect);
	if(mysqli_num_rows($hasilSelect)==0)
	{
		for($i=0;$i<count($modul2);$i++){
		$sql="INSERT INTO jawaban_lebih_dari_1 (id_mahasiswa,id_soal_byk_jawaban,jawaban) VALUES ('".$nrpMahasiswa."','".
			$idSoalModul2."','".$modul2[$i]."')";
	    mysqli_query($conn, $sql);
	    $fkJawaban = $conn->insert_id;
	    if($modul6[$i][0]!=""){ //ada isi e
	    	$sql2="INSERT INTO action_plan (id_mahasiswa,id_jawaban,obstacle,evidence,evaluation,target,status) VALUES ('".
	    	$nrpMahasiswa."','".$fkJawaban."','".$modul6[$i][0]."','".$modul6[$i][1]."','".$modul6[$i][2]."','".$modul6[$i][3].
		    	"','".$modul6[$i][4]."')"; 
			mysqli_query($conn, $sql2);
			$fkJawabanAP = $conn->insert_id;
			try{
				for($j=0;$j<count($modul6[$i][5]);$j++){
				$sql3="INSERT INTO action_plan_tabel(id_action_plan,task,resource,timeline,evidence_table,evaluation_table) VALUES 
				('".$fkJawabanAP."','".$modul6[$i][5][$j][0]."','".$modul6[$i][5][$j][1]."','".$modul6[$i][5][$j][2]."','".
					$modul6[$i][5][$j][3]."','".$modul6[$i][5][$j][4]."')"; 
				mysqli_query($conn, $sql3);
				}
			}
		    catch(Exception $e) {
			}
	    }
	    }
	}
	else
	{
		$bantuanPliss=array();


		while($row= mysqli_fetch_array($hasilSelect))
        {
        	array_push($bantuanPliss,$row['id_jawaban']);
        }

        if(mysqli_num_rows($hasilSelect)==count($modul2))
        {
        	for($i=0;$i<mysqli_num_rows($hasilSelect);$i++){
				$sql="UPDATE jawaban_lebih_dari_1 SET jawaban ='".$modul2[$i]."' WHERE id_jawaban='".$bantuanPliss[$i]."'";
				mysqli_query($conn, $sql);
				$sql1="SELECT id_action_plan FROM action_plan where id_jawaban=".$bantuanPliss[$i];
				$hasilSelectActionplan=mysqli_query($conn, $sql1);
				$bantuanPlissActionplan=array(); // untuk nampung hasile
				while($row= mysqli_fetch_array($hasilSelectActionplan))
		        {
		        	array_push($bantuanPlissActionplan,$row['id_action_plan']);
		        }
	        

	        	if(count($bantuanPlissActionplan)>0){
		    		for($j=0;$j<count($bantuanPlissActionplan);$j++){
		    		$sqldelete="delete FROM action_plan where id_action_plan=".$bantuanPlissActionplan[$j];
					mysqli_query($conn, $sqldelete);
					$sqldelete1="delete FROM action_plan_tabel where id_action_plan=".$bantuanPlissActionplan[$j];
					mysqli_query($conn, $sqldelete1);
		    		}
		    	}
				if($modul6[$i][0]!=""){ //ada isi e
			    	$sql2="INSERT INTO action_plan (id_mahasiswa,id_jawaban,obstacle,evidence,evaluation,target,status) VALUES ('".
			    	$nrpMahasiswa."','".$bantuanPliss[$i]."','".$modul6[$i][0]."','".$modul6[$i][1]."','".$modul6[$i][2]."','".$modul6[$i][3].
				    	"','".$modul6[$i][4]."')"; 
					mysqli_query($conn, $sql2);
					$fkJawabanAP = $conn->insert_id;
					try{
						for($j=0;$j<count($modul6[$i][5]);$j++){
						$sql3="INSERT INTO action_plan_tabel(id_action_plan,task,resource,timeline,evidence_table,evaluation_table) VALUES 
						('".$fkJawabanAP."','".$modul6[$i][5][$j][0]."','".$modul6[$i][5][$j][1]."','".$modul6[$i][5][$j][2]."','".
							$modul6[$i][5][$j][3]."','".$modul6[$i][5][$j][4]."')"; 
						mysqli_query($conn, $sql3);
						}
					}
				    catch(Exception $e) {
					}
			    } //tutupe if actionplan	
		    }//tutupe for
        }//tutupe if besar
        else if(mysqli_num_rows($hasilSelect)<count($modul2))
        {
        	$indexUntukMembantuSaja=0;
        	//yang isinya lebih dikit yang dibuat looping
        	for($i=0;$i<mysqli_num_rows($hasilSelect);$i++){
				$sql="UPDATE jawaban_lebih_dari_1 SET jawaban ='".$modul2[$i]."' WHERE id_jawaban='".$bantuanPliss[$i]."'";
				mysqli_query($conn, $sql);
				$sql1="SELECT id_action_plan FROM action_plan where id_jawaban=".$bantuanPliss[$i];
				$hasilSelectActionplan=mysqli_query($conn, $sql1);
				$bantuanPlissActionplan=array(); // untuk nampung hasile
				while($row= mysqli_fetch_array($hasilSelectActionplan))
		        {
		        	array_push($bantuanPlissActionplan,$row['id_action_plan']);
		        }
	        

	        	if(count($bantuanPlissActionplan)>0){
		    		for($j=0;$j<count($bantuanPlissActionplan);$j++){
		    		$sqldelete="delete FROM action_plan where id_action_plan=".$bantuanPlissActionplan[$j];
					mysqli_query($conn, $sqldelete);
					$sqldelete1="delete FROM action_plan_tabel where id_action_plan=".$bantuanPlissActionplan[$j];
					mysqli_query($conn, $sqldelete1);
		    		}
		    	}
				if($modul6[$i][0]!=""){ //ada isi e
			    	$sql2="INSERT INTO action_plan (id_mahasiswa,id_jawaban,obstacle,evidence,evaluation,target,status) VALUES ('".
			    	$nrpMahasiswa."','".$bantuanPliss[$i]."','".$modul6[$i][0]."','".$modul6[$i][1]."','".$modul6[$i][2]."','".$modul6[$i][3].
				    	"','".$modul6[$i][4]."')"; 
					mysqli_query($conn, $sql2);
					$fkJawabanAP = $conn->insert_id;
					try{
						for($j=0;$j<count($modul6[$i][5]);$j++){
						$sql3="INSERT INTO action_plan_tabel(id_action_plan,task,resource,timeline,evidence_table,evaluation_table) VALUES 
						('".$fkJawabanAP."','".$modul6[$i][5][$j][0]."','".$modul6[$i][5][$j][1]."','".$modul6[$i][5][$j][2]."','".
							$modul6[$i][5][$j][3]."','".$modul6[$i][5][$j][4]."')"; 
						mysqli_query($conn, $sql3);
						}
					}
				    catch(Exception $e) {
					}
			    } //tutupe if actionplan	
			    $indexUntukMembantuSaja++;
		    }//tutupe for update
			for($i=$indexUntukMembantuSaja;$i<count($modul2);$i++){
			$sql="INSERT INTO jawaban_lebih_dari_1 (id_mahasiswa,id_soal_byk_jawaban,jawaban) VALUES ('".$nrpMahasiswa."','".
				$idSoalModul2."','".$modul2[$i]."')";
		    mysqli_query($conn, $sql);
		    $fkJawaban = $conn->insert_id;
		    if($modul6[$i][0]!=""){ //ada isi e
		    	$sql2="INSERT INTO action_plan (id_mahasiswa,id_jawaban,obstacle,evidence,evaluation,target,status) VALUES ('".
		    	$nrpMahasiswa."','".$fkJawaban."','".$modul6[$i][0]."','".$modul6[$i][1]."','".$modul6[$i][2]."','".$modul6[$i][3].
			    	"','".$modul6[$i][4]."')"; 
				mysqli_query($conn, $sql2);
				$fkJawabanAP = $conn->insert_id;
				try{
					for($j=0;$j<count($modul6[$i][5]);$j++){
					$sql3="INSERT INTO action_plan_tabel(id_action_plan,task,resource,timeline,evidence_table,evaluation_table) VALUES 
					('".$fkJawabanAP."','".$modul6[$i][5][$j][0]."','".$modul6[$i][5][$j][1]."','".$modul6[$i][5][$j][2]."','".
						$modul6[$i][5][$j][3]."','".$modul6[$i][5][$j][4]."')"; 
					mysqli_query($conn, $sql3);
					}
				}
			    catch(Exception $e) {
				}
		    }//tutupe if actionplan
		    }//tutupe for insert
        }// tutupe else if
        else if(mysqli_num_rows($hasilSelect)>count($modul2))
        {
        	$indexUntukMembantuSaja=0;
        	//yang isinya lebih dikit yang dibuat looping
        	for($i=0;$i<count($modul2);$i++){
				$sql="UPDATE jawaban_lebih_dari_1 SET jawaban ='".$modul2[$i]."' WHERE id_jawaban='".$bantuanPliss[$i]."'";
				mysqli_query($conn, $sql);
				$sql1="SELECT id_action_plan FROM action_plan where id_jawaban=".$bantuanPliss[$i];
				$hasilSelectActionplan=mysqli_query($conn, $sql1);
				$bantuanPlissActionplan=array(); // untuk nampung hasile
				while($row= mysqli_fetch_array($hasilSelectActionplan))
		        {
		        	array_push($bantuanPlissActionplan,$row['id_action_plan']);
		        }
	        

	        	if(count($bantuanPlissActionplan)>0){
		    		for($j=0;$j<count($bantuanPlissActionplan);$j++){
		    		$sqldelete="delete FROM action_plan where id_action_plan=".$bantuanPlissActionplan[$j];
					mysqli_query($conn, $sqldelete);
					$sqldelete1="delete FROM action_plan_tabel where id_action_plan=".$bantuanPlissActionplan[$j];
					mysqli_query($conn, $sqldelete1);
		    		}
		    	}
				if($modul6[$i][0]!=""){ //ada isi e
			    	$sql2="INSERT INTO action_plan (id_mahasiswa,id_jawaban,obstacle,evidence,evaluation,target,status) VALUES ('".
			    	$nrpMahasiswa."','".$bantuanPliss[$i]."','".$modul6[$i][0]."','".$modul6[$i][1]."','".$modul6[$i][2]."','".$modul6[$i][3].
				    	"','".$modul6[$i][4]."')"; 
					mysqli_query($conn, $sql2);
					$fkJawabanAP = $conn->insert_id;
					try{
						for($j=0;$j<count($modul6[$i][5]);$j++){
						$sql3="INSERT INTO action_plan_tabel(id_action_plan,task,resource,timeline,evidence_table,evaluation_table) VALUES 
						('".$fkJawabanAP."','".$modul6[$i][5][$j][0]."','".$modul6[$i][5][$j][1]."','".$modul6[$i][5][$j][2]."','".
							$modul6[$i][5][$j][3]."','".$modul6[$i][5][$j][4]."')"; 
						mysqli_query($conn, $sql3);
						}
					}
				    catch(Exception $e) {
					}
			    } //tutupe if actionplan	
			    $indexUntukMembantuSaja++;
		    }//tutupe for-update
			for($i=$indexUntukMembantuSaja;$i<mysqli_num_rows($hasilSelect);$i++){
			$sql="delete from jawaban_lebih_dari_1 WHERE id_jawaban='".$bantuanPliss[$i]."'"; //delete lifelist
		    mysqli_query($conn, $sql);
		    $sql1="SELECT id_action_plan FROM action_plan where id_jawaban=".$bantuanPliss[$i]; //select where lifelist
				$hasilSelectActionplan=mysqli_query($conn, $sql1);
				$bantuanPlissActionplan=array(); // untuk nampung hasile
				while($row= mysqli_fetch_array($hasilSelectActionplan))
		        {
		        	array_push($bantuanPlissActionplan,$row['id_action_plan']);
		        }
	        

	        	if(count($bantuanPlissActionplan)>0){
		    		for($j=0;$j<count($bantuanPlissActionplan);$j++){
		    		$sqldelete="delete FROM action_plan where id_action_plan=".$bantuanPlissActionplan[$j];
					mysqli_query($conn, $sqldelete);
					$sqldelete1="delete FROM action_plan_tabel where id_action_plan=".$bantuanPlissActionplan[$j];
					mysqli_query($conn, $sqldelete1);
		    		}
		    	}
		    }//tutupe for delete
        }
	}}//tutupe try
	catch(Exception $e) {}
	
	
    
    try{for($i=0;$i<count($modul3);$i++){
		uploadJawabanCuma1($nrpMahasiswa,$modul3[$i][0],$modul3[$i][1],$conn);
	}}
	catch(Exception $e) {}

		try{uploadJawabanTabel4($nrpMahasiswa,$idSoalModul4,$modul4,$conn);}
		catch(Exception $e) {}

	
		try{uploadJawabanTabel3($nrpMahasiswa,$idSoalModul5,$modul5,$conn);}
		catch(Exception $e){}


	try{$sqlSelect="SELECT id_kepala FROM fishbone_kepala WHERE id_mahasiswa='".$nrpMahasiswa."'";
	$hasil=mysqli_query($conn, $sqlSelect);

	$bantuanPliss=array();
		while($row= mysqli_fetch_array($hasil))
        {
        	array_push($bantuanPliss,$row['id_kepala']);
        }

	if(mysqli_num_rows($hasil)==0)
	{
		for($i=0;$i<count($modul7);$i++){
			$sql1="INSERT INTO fishbone_kepala(nama_kepala,id_mahasiswa) VALUES ('".$modul7[$i][0]."','".$nrpMahasiswa."')";
	        mysqli_query($conn, $sql1);
	        $fkKepala = $conn->insert_id;
	        try{
	        for($j=0;$j<count($modul7[$i][1]);$j++)
	        {
	        	$arraySupport=$modul7[$i][1];
	        	$sql2="INSERT INTO fishbone_support(nama_support,id_kepala) VALUES ('".$arraySupport[$j][0]."','".$fkKepala."')";
		        mysqli_query($conn, $sql2);
		        $fkSupport = $conn->insert_id;
		        try{
			        for($k=0;$k<count($arraySupport[$j][1]);$k++)
			        {
			        	$arrayDetailSupport=$arraySupport[$j][1];
			        	$sql3="INSERT INTO fishbone_detail_support(nama_detail_support,id_support) VALUES ('".$arrayDetailSupport[$k]."','".$fkSupport."')";
				        mysqli_query($conn, $sql3);
			        }
		    	}
			    catch(Exception $e) {
				}
	        }
	    	}
	    	catch(Exception $e) {
			}
		}
	}
	else if(mysqli_num_rows($hasil)<count($modul7))
	{
		$pembantuIndex=0;
		for($i=0;$i<mysqli_num_rows($hasil);$i++){
			$sql1="UPDATE fishbone_kepala SET nama_kepala='".$modul7[$i][0]."' WHERE id_kepala='".$bantuanPliss[$i]."'";
	        mysqli_query($conn, $sql1);
	        $sql123="select id_support from fishbone_support WHERE id_kepala='".$bantuanPliss[$i]."'";
	        $hasilUntukDelete=mysqli_query($conn, $sql123);
	        $bantuanPlissDalem=array();
			while($row= mysqli_fetch_array($hasilUntukDelete))
	        {
	        	array_push($bantuanPlissDalem,$row['id_support']);
	        }
	        for($l=0;$l<count($bantuanPlissDalem);$l++){
	        	echo $bantuanPlissDalem[$l];
	        	$sqlhapus1="DELETE from fishbone_support WHERE id_support='".$bantuanPlissDalem[$l]."'";
		        mysqli_query($conn, $sqlhapus1);
		        $sqlhapus2="DELETE from fishbone_detail_support WHERE id_support='".$bantuanPlissDalem[$l]."'";
		        mysqli_query($conn, $sqlhapus2);
	        }
	        try{
	        	for($j=0;$j<count($modul7[$i][1]);$j++)
	        	{
		        	$arraySupport=$modul7[$i][1];
		        	$sql2="INSERT INTO fishbone_support(nama_support,id_kepala) VALUES ('".$arraySupport[$j][0]."','".$bantuanPliss[$i]."')";
			        mysqli_query($conn, $sql2);
			        $fkSupport = $conn->insert_id;
			        for($k=0;$k<count($arraySupport[$j][1]);$k++)
			        {
			        	$arrayDetailSupport=$arraySupport[$j][1];
			        	$sql3="INSERT INTO fishbone_detail_support(nama_detail_support,id_support) VALUES ('".$arrayDetailSupport[$k]."','".$fkSupport."')";
				        mysqli_query($conn, $sql3);
			        }
	        	}
	        }
		    catch(Exception $e) {
			}
	        
	        $pembantuIndex++;
		}
		for($i=$pembantuIndex;$i<count($modul7);$i++){
			$sql1="INSERT INTO fishbone_kepala(nama_kepala,id_mahasiswa) VALUES ('".$modul7[$i][0]."','".$nrpMahasiswa."')";
	        mysqli_query($conn, $sql1);
	        $fkKepala = $conn->insert_id;
	        try{
		        for($j=0;$j<count($modul7[$i][1]);$j++)
		        {
		        	$arraySupport=$modul7[$i][1];
		        	$sql2="INSERT INTO fishbone_support(nama_support,id_kepala) VALUES ('".$arraySupport[$j][0]."','".$fkKepala."')";
			        mysqli_query($conn, $sql2);
			        $fkSupport = $conn->insert_id;
			        for($k=0;$k<count($arraySupport[$j][1]);$k++)
			        {
			        	$arrayDetailSupport=$arraySupport[$j][1];
			        	$sql3="INSERT INTO fishbone_detail_support(nama_detail_support,id_support) VALUES ('".$arrayDetailSupport[$k]."','".$fkSupport."')";
				        mysqli_query($conn, $sql3);
			        }
		        }
		    }
		    catch(Exception $e) {
			}
		}
	}
	else if(mysqli_num_rows($hasil)==count($modul7))
	{
		for($i=0;$i<mysqli_num_rows($hasil);$i++){
			$sql1="UPDATE fishbone_kepala SET nama_kepala='".$modul7[$i][0]."' WHERE id_kepala='".$bantuanPliss[$i]."'";
	        mysqli_query($conn, $sql1);
	        $sql123="select id_support from fishbone_support WHERE id_kepala='".$bantuanPliss[$i]."'";
	        $hasilUntukDelete=mysqli_query($conn, $sql123);
	        $bantuanPlissDalem=array();
			while($row= mysqli_fetch_array($hasilUntukDelete))
	        {
	        	array_push($bantuanPlissDalem,$row['id_support']);
	        }
	        for($l=0;$l<count($bantuanPlissDalem);$l++){
	        	$sqlhapus1="DELETE from fishbone_support WHERE id_support='".$bantuanPlissDalem[$l]."'";
		        mysqli_query($conn, $sqlhapus1);
		        $sqlhapus2="DELETE from fishbone_detail_support WHERE id_support='".$bantuanPlissDalem[$l]."'";
		        mysqli_query($conn, $sqlhapus2);
	        }
	        try{
		        for($j=0;$j<count($modul7[$i][1]);$j++)
		        {
		        	$arraySupport=$modul7[$i][1];
		        	$sql2="INSERT INTO fishbone_support(nama_support,id_kepala) VALUES ('".$arraySupport[$j][0]."','".$bantuanPliss[$i]."')";
			        mysqli_query($conn, $sql2);
			        $fkSupport = $conn->insert_id;
			        for($k=0;$k<count($arraySupport[$j][1]);$k++)
			        {
			        	$arrayDetailSupport=$arraySupport[$j][1];
			        	$sql3="INSERT INTO fishbone_detail_support(nama_detail_support,id_support) VALUES ('".$arrayDetailSupport[$k]."','".$fkSupport."')";
				        mysqli_query($conn, $sql3);
			        }
		        }
		    }
		    catch(Exception $e) {
			}
		}
	}
	else if(mysqli_num_rows($hasil)>count($modul7))
	{
		$pembantuIndex=0;
		for($i=0;$i<count($modul7);$i++){
			$sql1="UPDATE fishbone_kepala SET nama_kepala='".$modul7[$i][0]."' WHERE id_kepala='".$bantuanPliss[$i]."'";
	        mysqli_query($conn, $sql1);
	        $sql123="select id_support from fishbone_support WHERE id_kepala='".$bantuanPliss[$i]."'";
	        $hasilUntukDelete=mysqli_query($conn, $sql123);
	        $bantuanPlissDalem=array();
			while($row= mysqli_fetch_array($hasilUntukDelete))
	        {
	        	array_push($bantuanPlissDalem,$row['id_support']);
	        }
	        for($k=0;$k<count($bantuanPlissDalem);$k++){
	        	echo $bantuanPlissDalem[$k];
	        	$sqlhapus1="DELETE from fishbone_support WHERE id_support='".$bantuanPlissDalem[$k]."'";
		        mysqli_query($conn, $sqlhapus1);
		        $sqlhapus2="DELETE from fishbone_detail_support WHERE id_support='".$bantuanPlissDalem[$k]."'";
		        mysqli_query($conn, $sqlhapus2);
	        }
	        try{
		        for($j=0;$j<count($modul7[$i][1]);$j++)
		        {
		        	$arraySupport=$modul7[$i][1];
		        	$sql2="INSERT INTO fishbone_support(nama_support,id_kepala) VALUES ('".$arraySupport[$j][0]."','".$row['id_kepala']."')";
			        mysqli_query($conn, $sql2);
			        $fkSupport = $conn->insert_id;
			        for($k=0;$k<count($arraySupport[$j][1]);$k++)
			        {
			        	$arrayDetailSupport=$arraySupport[$j][1];
			        	$sql3="INSERT INTO fishbone_detail_support(nama_detail_support,id_support) VALUES ('".$arrayDetailSupport[$k]."','".$fkSupport."')";
				        mysqli_query($conn, $sql3);
			        }
		        }
	        }
		    catch(Exception $e) {
			}
	        $pembantuIndex++;
		}
		for($i=$pembantuIndex;$i<mysqli_num_rows($hasil);$i++){
			$sql1="delete from fishbone_kepala WHERE id_kepala='".$bantuanPliss[$i]."'";
	        mysqli_query($conn, $sql1);
	        $sql123="select id_support from fishbone_support WHERE id_kepala='".$bantuanPliss[$i]."'";
	        $hasilUntukDelete=mysqli_query($conn, $sql123);
	        $bantuanPlissDalem=array();
			while($row= mysqli_fetch_array($hasilUntukDelete))
	        {
	        	array_push($bantuanPlissDalem,$row['id_support']);
	        }
	        for($k=0;$k<count($bantuanPlissDalem);$k++){
	        	echo $bantuanPlissDalem[$k];
	        	$sqlhapus1="DELETE from fishbone_support WHERE id_support='".$bantuanPlissDalem[$k]."'";
		        mysqli_query($conn, $sqlhapus1);
		        $sqlhapus2="DELETE from fishbone_detail_support WHERE id_support='".$bantuanPlissDalem[$k]."'";
		        mysqli_query($conn, $sqlhapus2);
	        }
	        
		}
	}}//tutupe try
	catch(Exception $e) {}

	try{for($i=0;$i<count($modul8);$i++){
		uploadJawabanCuma1($nrpMahasiswa,$modul8[$i][0],$modul8[$i][1],$conn);
	}}
	catch(Exception $e) {}	

	try{uploadJawabanLebihDari1($nrpMahasiswa,$idSoalModul9,$modul9,$conn);}
	catch(Exception $e) {}
	

	try{for($i=0;$i<count($modul10);$i++){
		uploadJawabanCuma1($nrpMahasiswa,$modul10[$i][0],$modul10[$i][1],$conn);
	}}
	catch(Exception $e) {}
	
	//echo json_encode($jawabanBigdream);
	//echo json_encode($modul1);
	//echo $modul9[0];
	break;
}
$sql="";
function uploadJawabanLebihDari1($idMhs,$idSoal,$jwban,$conn){

    $sqlSelect="SELECT id_jawaban FROM jawaban_lebih_dari_1 WHERE id_mahasiswa='".$idMhs."' and id_soal_byk_jawaban='".$idSoal."'";
	$hasil=mysqli_query($conn, $sqlSelect);

	if(mysqli_num_rows($hasil)==0)
	{
		for($i=0;$i<count($jwban);$i++){
		$sql="INSERT INTO jawaban_lebih_dari_1 (id_mahasiswa,id_soal_byk_jawaban,jawaban) VALUES ('".$idMhs."','".$idSoal."','".$jwban[$i]."')";
		mysqli_query($conn, $sql);
		}
	}
	else
	{
		$bantuanPliss=array();

		while($row= mysqli_fetch_array($hasil))
        {
        	array_push($bantuanPliss,$row['id_jawaban']);
        }
        if(mysqli_num_rows($hasil)==count($jwban))
        {
        	for($i=0;$i<count($jwban);$i++){
			$sql="UPDATE jawaban_lebih_dari_1 SET jawaban ='".$jwban[$i]."' WHERE id_jawaban='".$bantuanPliss[$i]."'";
			mysqli_query($conn, $sql);
			}
        }
        else if(mysqli_num_rows($hasil)<count($jwban))
        {
        	$indexUntukMembantuSaja=0;
        	//yang isinya lebih dikit yang dibuat looping
        	for($i=0;$i<mysqli_num_rows($hasil);$i++){
			$sql="UPDATE jawaban_lebih_dari_1 SET jawaban ='".$jwban[$i]."' WHERE id_jawaban='".$bantuanPliss[$i]."'";
			mysqli_query($conn, $sql);
			$indexUntukMembantuSaja++;
			}
			for($i=$indexUntukMembantuSaja;$i<count($jwban);$i++){
			$sql="INSERT INTO jawaban_lebih_dari_1 (id_mahasiswa,id_soal_byk_jawaban,jawaban) VALUES ('".$idMhs."','".$idSoal."','".$jwban[$i]."')";
			mysqli_query($conn, $sql);
			}
        	//echo "updated then inserted";
        }
        else if(mysqli_num_rows($hasil)>count($jwban))
        {
        	$indexUntukMembantuSaja=0;
        	//yang isinya lebih dikit yang dibuat looping
        	for($i=0;$i<count($jwban);$i++){
			$sql="UPDATE jawaban_lebih_dari_1 SET jawaban ='".$jwban[$i]."' WHERE id_jawaban='".$bantuanPliss[$i]."'";
			mysqli_query($conn, $sql);
			$indexUntukMembantuSaja++;
			}
			for($i=$indexUntukMembantuSaja;$i<mysqli_num_rows($hasil);$i++){
			$sql="delete from jawaban_lebih_dari_1 where id_jawaban=".$bantuanPliss[$i];
			mysqli_query($conn, $sql);
			}
        	//echo "deleted";
        }
       
	}
}

function uploadJawabanCuma1($idMhs,$idSoal,$jwban,$conn){
	$sqlSelect="SELECT jawaban FROM relasi_mahasiswa_soal_1_jawaban WHERE id_mahasiswa='".$idMhs."' and id_soal='".$idSoal."'";
	$hasil=mysqli_query($conn, $sqlSelect);
	$jawabanMhsDariServer=mysqli_fetch_object($hasil)['jawaban'];
	if(mysqli_num_rows($hasil)!=0)
	{
		$sql="UPDATE relasi_mahasiswa_soal_1_jawaban SET jawaban ='".$jwban."' WHERE id_mahasiswa='".$idMhs."' and id_soal='".$idSoal."' and jawaban='".$jawabanMhsDariServer."'";
	}
	else
		$sql="INSERT INTO relasi_mahasiswa_soal_1_jawaban (id_mahasiswa,id_soal,jawaban) VALUES ('".$idMhs."','".$idSoal."','".$jwban."')";
    mysqli_query($conn, $sql);
}

 //function uploadJawabanCuma1($idMhs,$idSoal,$jwban,$conn){ ini yang lama lohhh
 //	$sql="INSERT INTO relasi_mahasiswa_soal_1_jawaban (id_mahasiswa,id_soal,jawaban) VALUES (".$idMhs.",".$idSoal.",'".$jwban."');";
   //  mysqli_query($conn, $sql);
 //}

function uploadJawabanTabel4($idMhs,$idSoal,$jwban,$conn){
	$sqlSelect="SELECT id_jawaban_tabel FROM jawaban_tabel WHERE id_mahasiswa='".$idMhs."' and id_soal_tabel='".$idSoal."'";
	$hasil=mysqli_query($conn, $sqlSelect);

	if(mysqli_num_rows($hasil)==0)
	{
		for($i=0;$i<count($jwban);$i++){
		$sql="INSERT INTO jawaban_tabel (id_mahasiswa,id_soal_tabel,jawaban_1,jawaban_2,jawaban_3,jawaban_4) VALUES ('".$idMhs."','".$idSoal."','".$jwban[$i][0]."','".$jwban[$i][1]."','".$jwban[$i][2]."','".$jwban[$i][3]."')";
		mysqli_query($conn, $sql);
		}
	}
	else
	{
		$bantuanPliss=array();

		while($row= mysqli_fetch_array($hasil))
        {
        	array_push($bantuanPliss,$row['id_jawaban_tabel']);
        }
        if(mysqli_num_rows($hasil)==count($jwban))
        {
        	for($i=0;$i<count($jwban);$i++){
			$sql="UPDATE jawaban_tabel SET jawaban_1 ='".$jwban[$i][0]."', jawaban_2 ='".$jwban[$i][1]."', jawaban_3 ='".$jwban[$i][2]."', jawaban_4 ='".$jwban[$i][3]."' WHERE id_jawaban_tabel='".$bantuanPliss[$i]."'";
			mysqli_query($conn, $sql);
			}
        }
        else if(mysqli_num_rows($hasil)<count($jwban))
        {
        	$indexUntukMembantuSaja=0;
        	//yang isinya lebih dikit yang dibuat looping
        	for($i=0;$i<mysqli_num_rows($hasil);$i++){
			$sql="UPDATE jawaban_tabel SET jawaban_1 ='".$jwban[$i][0]."', jawaban_2 ='".$jwban[$i][1]."', jawaban_3 ='".$jwban[$i][2]."', jawaban_4 ='".$jwban[$i][3]."' WHERE id_jawaban_tabel='".$bantuanPliss[$i]."'";
			mysqli_query($conn, $sql);
			$indexUntukMembantuSaja++;
			}
			for($i=$indexUntukMembantuSaja;$i<count($jwban);$i++){
			$sql="INSERT INTO jawaban_tabel (id_mahasiswa,id_soal_tabel,jawaban_1,jawaban_2,jawaban_3,jawaban_4) VALUES ('".$idMhs."','".$idSoal."','".$jwban[$i][0]."','".$jwban[$i][1]."','".$jwban[$i][2]."','".$jwban[$i][3]."')";
			mysqli_query($conn, $sql);
			}
        	//echo "updated then inserted";
        }
        else if(mysqli_num_rows($hasil)>count($jwban))
        {
        	$indexUntukMembantuSaja=0;
        	//yang isinya lebih dikit yang dibuat looping
        	for($i=0;$i<count($jwban);$i++){
			$sql="UPDATE jawaban_tabel SET jawaban_1 ='".$jwban[$i][0]."', jawaban_2 ='".$jwban[$i][1]."', jawaban_3 ='".$jwban[$i][2]."', jawaban_4 ='".$jwban[$i][3]."' WHERE id_jawaban_tabel='".$bantuanPliss[$i]."'";
			mysqli_query($conn, $sql);
			$indexUntukMembantuSaja++;
			}
			for($i=$indexUntukMembantuSaja;$i<mysqli_num_rows($hasil);$i++){
			$sql="delete from jawaban_tabel where id_jawaban_tabel=".$bantuanPliss[$i];
			mysqli_query($conn, $sql);
			}
        	//echo "deleted";
        }
       
	}
}

function uploadJawabanTabel3($idMhs,$idSoal,$jwban,$conn){
	$sqlSelect="SELECT id_jawaban_tabel FROM jawaban_tabel WHERE id_mahasiswa='".$idMhs."' and id_soal_tabel='".$idSoal."'";
	$hasil=mysqli_query($conn, $sqlSelect);

	if(mysqli_num_rows($hasil)==0)
	{
		for($i=0;$i<count($jwban);$i++){
		$sql="INSERT INTO jawaban_tabel (id_mahasiswa,id_soal_tabel,jawaban_1,jawaban_2,jawaban_3) VALUES ('".$idMhs."','".$idSoal."','".$jwban[$i][0]."','".$jwban[$i][1]."','".$jwban[$i][2]."')";
		mysqli_query($conn, $sql);
		}
	}
	else
	{
		$bantuanPliss=array();

		while($row= mysqli_fetch_array($hasil))
        {
        	array_push($bantuanPliss,$row['id_jawaban_tabel']);
        }
        if(mysqli_num_rows($hasil)==count($jwban))
        {
        	for($i=0;$i<count($jwban);$i++){
			$sql="UPDATE jawaban_tabel SET jawaban_1 ='".$jwban[$i][0]."', jawaban_2 ='".$jwban[$i][1]."', jawaban_3 ='".$jwban[$i][2]."' WHERE id_jawaban_tabel='".$bantuanPliss[$i]."'";
			mysqli_query($conn, $sql);
			}
        }
        else if(mysqli_num_rows($hasil)<count($jwban))
        {
        	$indexUntukMembantuSaja=0;
        	//yang isinya lebih dikit yang dibuat looping
        	for($i=0;$i<mysqli_num_rows($hasil);$i++){
			$sql="UPDATE jawaban_tabel SET jawaban_1 ='".$jwban[$i][0]."', jawaban_2 ='".$jwban[$i][1]."', jawaban_3 ='".$jwban[$i][2]."' WHERE id_jawaban_tabel='".$bantuanPliss[$i]."'";
			mysqli_query($conn, $sql);
			$indexUntukMembantuSaja++;
			}
			for($i=$indexUntukMembantuSaja;$i<count($jwban);$i++){
			$sql="INSERT INTO jawaban_tabel (id_mahasiswa,id_soal_tabel,jawaban_1,jawaban_2,jawaban_3) VALUES ('".$idMhs."','".$idSoal."','".$jwban[$i][0]."','".$jwban[$i][1]."','".$jwban[$i][2]."')";
			mysqli_query($conn, $sql);
			}
        	//echo "updated then inserted";
        }
        else if(mysqli_num_rows($hasil)>count($jwban))
        {
        	$indexUntukMembantuSaja=0;
        	//yang isinya lebih dikit yang dibuat looping
        	for($i=0;$i<count($jwban);$i++){
			$sql="UPDATE jawaban_tabel SET jawaban_1 ='".$jwban[$i][0]."', jawaban_2 ='".$jwban[$i][1]."', jawaban_3 ='".$jwban[$i][2]."' WHERE id_jawaban_tabel='".$bantuanPliss[$i]."'";
			mysqli_query($conn, $sql);
			$indexUntukMembantuSaja++;
			}
			for($i=$indexUntukMembantuSaja;$i<mysqli_num_rows($hasil);$i++){
			$sql="delete from jawaban_tabel where id_jawaban_tabel=".$bantuanPliss[$i];
			mysqli_query($conn, $sql);
			}
        	//echo "deleted";
        }
       
	}
}

?>