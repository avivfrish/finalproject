<?php


//Caspio Bridge WS API WSDL file

$wsdl = "http://b2.caspio.com/ws/api.asmx?wsdl";

//Caspio Bridge table with sample data

$tableName = "NIC_Financial_Entities";

//two columns from table1

$columnName = "RSSD_ID,NAME";

//Caspio Bridge account name

$name = "c1abp485";

//Web service profile

$profile = "NIC_Financial_Entities";

//Web service profile password

$password = "kV9sCbKtzT486N9";

//create PHP SOAP object

$client = new SOAPClient($wsdl);

// webservice profile

$arr = array();

$arr["AccountID"] = $name;

$arr["Profile"] = $profile;

$arr["Password"] = $password;

$arr["ObjectName"] = $tableName;

$arr["IsView"] = false;

$arr["FieldList"] = $columnName ;

$arr["Criteria"] = "";

$arr["OrderBy"] = "";

$arr["FieldDelimiter"] = "";

$arr["StringDelimiter"] = "";

//create general searh criteria

$resultRecords1 = $client->__call("SelectDataRaw", $arr);

function getData($records) {

	if (gettype($records) == "array") {

		foreach ($records as $record) {

			echo trim($record)."\n" ;

		}

	}

}

getData($resultRecords1) ;

?>





