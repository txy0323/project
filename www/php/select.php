<?php
	header("Content-type: text/html; charset=utf-8");

	$db = mysql_connect("bdm264098114.my3w.com", "bdm264098114", "Bleach10fandui");
	
	// 设置读写 mysql 编码
	mysql_query("set character set 'utf8'");//读库 
	mysql_query("set names 'utf8'");//写库 

	if($db){
		mysql_select_db("bdm264098114_db",$db);

		$sql = "SELECT * FROM skill";
			$result = mysql_query($sql);	
			$row=mysql_fetch_row($result);
			$arr = array();

		while ($row = mysql_fetch_array($result,  MYSQL_ASSOC)) {
			$arr[] = $row;
		}
		// echo json_encode($arr);
		echo json_encode($arr);

		mysql_close($connection);
	}else{
		echo "yyyy";
	}
?>

