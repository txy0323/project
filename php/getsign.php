<?php
require_once "jssdk.php";
$jssdk = new JSSDK("wx6bc3522b63d40a8b", "ad9e821320b9538ed5c8b2640a27cac4");
$signPackage = $jssdk->GetSignPackage($_POST['url']);
echo json_encode($signPackage);
?>