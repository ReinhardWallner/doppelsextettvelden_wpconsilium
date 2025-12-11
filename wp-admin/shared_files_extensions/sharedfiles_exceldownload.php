<?php

function downloadExcelData($data, $fileName, $nurKategorienAnzeigen, $onlyModifySingleField)
{
	header("Content-Type: text/csv");
	header("Content-Disposition: attachment; filename=\"$fileName\"");
	
	if ($data["headrow"] && $data["keys"]) {
		$outerArrayKeys = array_keys(($data));
		$dataArrayKeys = $data["keys"];
		$headRow = $data["headrow"];
		$headRowKat = $data["headrowKat"];
		$headRowSingleFields = $data["headRowSingleFields"];

		if($nurKategorienAnzeigen == true) {
			addHeadRow($headRowKat);
		} else if($onlyModifySingleField != null && $onlyModifySingleField != "notselected") {
			addHeadRow($headRowSingleFields);
		} else {
			addHeadRow($headRow);
		}

		asort($outerArrayKeys);
		$skipKeys = ['keys','headrow','headrowKat','headRowSingleFields','args','total'];
		foreach ($outerArrayKeys as $outerKey1) {
			error_log("EEEEEEE downloadExcelData: \nouterKey1: " . print_r($outerKey1, true));
			$outerKey = (string)$outerKey1;
			error_log("EEEEEEE downloadExcelData: \nouterKey: " . print_r($outerKey, true));
			if ($outerKey != "keys" && $outerKey != "headrow" && 
				$outerKey != "headrowKat"  && $outerKey != "headRowSingleFields" && 
				$outerKey != "args" && $outerKey != "total") {
				$dataRowArray = $data[$outerKey];
			error_log("EEEEEEE downloadExcelData ADD ROW: \nouterKey: " . print_r($dataRowArray, true) . ", \ndataArrayKeys: " . print_r($dataArrayKeys, true));
				addDataRow($dataRowArray, $dataArrayKeys, $nurKategorienAnzeigen, $onlyModifySingleField);
			}

			// if (!in_array(strtolower((string)$outerKey), $skipKeys, true)) {
        	// 	error_log("ADD ROW outerKey: " . print_r($outerKey, true));
			// 	$dataRowArray = $data[$outerKey];
        	// 	addDataRow($dataRowArray, $dataArrayKeys, $nurKategorienAnzeigen, $onlyModifySingleField);
    		// }
		}

	
	}
}

function addHeadRow($headRow)
{
	foreach ($headRow as $element) {
		echo mb_convert_encoding($element, "Windows-1252") . ";";
	}

	echo "\n";
}

function addDataRow($dataRowArray, $dataArrayKeys, $nurKategorienAnzeigen, $onlyModifySingleField)
{
	foreach ($dataArrayKeys as $dataKey) {
		$element = null;
		if (is_array($dataKey)) {
			$firstKey = array_key_first($dataKey);
			$secondKey = $dataKey[$firstKey];
			
			if ($firstKey == "custom_field" && $nurKategorienAnzeigen == true) {
					continue;
			}

			if(($onlyModifySingleField == null || $onlyModifySingleField == "notselected") ||
				($onlyModifySingleField != null && $firstKey != "category" &&
				str_starts_with($onlyModifySingleField, "file_upload_custom_field_") &&
				str_ends_with($onlyModifySingleField, $secondKey))) {
				$element = $dataRowArray[$firstKey][$secondKey];
			} else {
				continue;
			}
		} else {
			$dataKeyStr = (string)$dataKey;

			if ($nurKategorienAnzeigen == true && ($dataKeyStr == "description" || $dataKeyStr == "tags")) {
				continue;
			}

			if($dataKeyStr != "file_id" && 
				(($onlyModifySingleField == null || $onlyModifySingleField == "notselected") || 
				$dataKeyStr == "title" ||
				($onlyModifySingleField != null && $dataKeyStr == "description" &&
				str_starts_with($onlyModifySingleField, "description") ||
				($onlyModifySingleField != null && $dataKeyStr == "tags" &&
				str_starts_with($onlyModifySingleField, "tags"))))) {	
				$element = $dataRowArray[$dataKeyStr];

				error_log("EEEEEEE downloadExcelData ELEMENT: \ndataKeyStr: " . print_r($dataKeyStr, true));
				error_log("EEEEEEE downloadExcelData ELEMENT: \nelement: " . print_r($element, true));

				if(($onlyModifySingleField == null || $onlyModifySingleField == "notselected")) {	
					error_log("EEEEEEE downloadExcelData MAPS1");
				}
				if($dataKeyStr == "title") {	
					error_log("EEEEEEE downloadExcelData MAPS 2");
				}
				if(($onlyModifySingleField != null && $dataKeyStr == "description" &&
				str_starts_with($onlyModifySingleField, "description") ||
				($onlyModifySingleField != null && $dataKeyStr == "tags" &&
				str_starts_with($onlyModifySingleField, "tags")))) {	
					error_log("EEEEEEE downloadExcelData MAPS 3");
				}
			} else {
				continue;
			}
		}

		$element = str_replace(";", ",", $element);

		// encoding ensures german "Umlaute"
		echo mb_convert_encoding($element, "Windows-1252") . ";";
	}

	echo "\n";
}

?>