<?PHP
$data = json_decode($_GET['body']);
$endpoint = 'https://us3.api.mailchimp.com/3.0/';
$listId = $data->listId;
$url = $endpoint . 'lists/' . $listId . '/members/' . $data->userHash;
unset($data->listId);
unset($data->userHash);
$body = json_encode($data);
$curl = curl_init();
curl_setopt_array($curl, array(
	CURLOPT_URL => $url,
	CURLOPT_RETURNTRANSFER => true,
	CURLOPT_ENCODING => "",
	CURLOPT_MAXREDIRS => 10,
	CURLOPT_TIMEOUT => 30,
	CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
	CURLOPT_CUSTOMREQUEST => 'PUT',
	CURLOPT_POSTFIELDS => ($body),
	CURLOPT_USERPWD => "user:74d9630644782f9cabfaaf433a0ebff7-us3",
	CURLOPT_HTTPAUTH => CURLAUTH_BASIC,
	CURLOPT_HTTPHEADER => array('Authorization' => 'Basic YXV0aDo3NGQ5NjMwNjQ0NzgyZjljYWJmYWFmNDMzYTBlYmZmNy11czM=','Content-Type' => 'application/x-www-form-urlencoded')
	));
print $url;
$response = curl_exec($curl);
$err = curl_error($curl);
curl_close($curl);
if ($err) {
	print_r($response);
} else {
	print_r( $response);
}
?>
