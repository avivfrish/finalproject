<?php

echo "obi";
$csv= file_get_contents("csv/res.csv");
$array = array_map("str_getcsv", explode("\n", $csv));
$json = json_encode($array);
echo $json;
return($json);
?>
