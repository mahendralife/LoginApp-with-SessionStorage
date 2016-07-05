<?php
	$file =file_get_contents("php://input");
	$data =json_decode($file,true);

	$username=$data['username'];
	$password=$data['password'];

	if($username=="test" && $password=="test")
	{

	$arr = array('valid' => true, 'key' => '124568789', 'username' => "mahendra.life", 'fullname' => 'Mahendra Singh', 'createDate' => '2016/06/01 6:2:00', 'remember' => false);

	echo json_encode($arr);

	}
	else
	{
		$arr = array('valid' => false);
		echo json_encode($arr);

	}


?>
