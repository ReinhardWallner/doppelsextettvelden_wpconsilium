<?php
function getInputField($file_id, $cf_id, $name, $value, &$inputArray, $hidden = false, $autocomplete = "")
{
	$obj = new stdClass();
	$obj->file_id = $file_id;
	if ($cf_id != null)
		$obj->cf_id = $cf_id;
	$obj->value = $value;
	array_push($inputArray, [$name => $obj]);

	if ($hidden) {
		if ($value)
			return '<input type="hidden" name="' . $name . '" id="' . $name . '" value="' . $value . '" title="' . $value . '"/>';
		else
			return '<input type="hidden" name="' . $name . '" id="' . $name . '"/>';
	} else {
		if ($value)
			return '<input type="text" name="' . $name . '" id="' . $name . '"' . $autocomplete . ' value="' . $value . '" title="' . $value . '" onchange="inputOnChange(this.name, this.value)" />';
		else
			return '<input type="text" name="' . $name . '" id="' . $name . '"' . $autocomplete . ' onchange="inputOnChange(this.name, this.value)" />';
	}
}

function getCheckboxField($file_id, $cat_name, $name, $value, &$checkboxArray, $isReadonlyUser, $hidden = false)
{
	$obj = new stdClass();
	$obj->file_id = $file_id;
	$obj->cat_name = $cat_name;
	$obj->value = $value;
	if($value)
		$obj->checked = true;
	else
		$obj->checked = false;
	
	array_push($checkboxArray, [$name => $obj]);

	if ($hidden) {
		if ($value)
			return '<input type="hidden" name="' . $name . '" id="' . $name . '" checked value="' . $value . '" />';
		else
			return '<input type="hidden" name="' . $name . '" id="' . $name . '" value="' . $value . '" />';
	} else {
		if($isReadonlyUser){
			if ($value)
				return '<input type="checkbox" name="' . $name . '" id="' . $name . '" disabled checked value="' . $value . '" onchange="checkboxOnChange(this.name, this.checked)"/>';
			else
				return '<input type="checkbox" name="' . $name . '" id="' . $name . '" disabled value="' . $value . '" onchange="checkboxOnChange(this.name, this.checked)"/>';
		}
		else{
			if ($value)
				return '<input type="checkbox" name="' . $name . '" id="' . $name . '" checked value="' . $value . '" onchange="checkboxOnChange(this.name, this.checked)"/>';
			else
				return '<input type="checkbox" name="' . $name . '" id="' . $name . '" value="' . $value . '" onchange="checkboxOnChange(this.name, this.checked)"/>';
		}
	}

}

function addInfoColumn(&$table, $headRow, $dataArray){
	// Info button
  	error_log("AAAAAA addInfoColumn START ");
	$tonartString = null;

	$info = "Titel: " . $dataArray["title"] . "\n";
	$headrowIndexOffset = 2;
	for ($n = 1; $n < $dataArray["custom_fields_cntint"]; $n++) {
		$index = $n + $headrowIndexOffset;
		if($dataArray["custom_field"][$n] != null){
			$info .= $headRow[$index] . ": " . $dataArray["custom_field"][$n] . "\n";

			if($headRow[$index] == "Tonart/-angabe (SATB)"){
				$tonartString = $dataArray["custom_field"][$n];
			}
		}
	}

	if($dataArray["description"] != null){
		$info .= $headRow["2"] . ": " . $dataArray["description"];
	}

	$table .= '<div class="cell_text cell-info-icon">';
	$table .= '<button
    type="button"
    class="info-icon"
    aria-label="Informationen anzeigen"
  >
	<svg viewBox="0 0 18 18" aria-hidden="true">
        <circle cx="9" cy="9" r="8" stroke-width="1"></circle>
		<line x1="9" y1="8" x2="9" y2="14"></line>
		<circle cx="9" cy="5" r="0.5"></circle>
	</svg>
  </button>

  <div class="info-tooltip">' . $info . '</div>';

  error_log("AAAAAA addInfoColumn BEFORE ADD openTonesModal button " . print_r($tonartString, true));

	// Tonangabe
	$file_id = $dataArray['file_id'];
	$tonartStringSafe = str_replace(
    ["'"],           // zu ersetzende Zeichen
    ["__"],    // Ersatz
    $tonartString
);

	// Button mit single quotes außen, json_encode für JS String
	$table .= "<button onclick='openTonesModal($file_id, " . json_encode($tonartStringSafe, JSON_UNESCAPED_SLASHES) . ")'>Tonangabe</button>";

	// Link button
  	$linkUrl = get_site_url() . "/shared-files/" . $dataArray["file_id"] . "/"; 
	$table .= '<a data-file-type="" href="' . $linkUrl . '" data-file-url="' . $linkUrl . '" target="_blank" rel="ugc nofollow" data-external-url="" data-image-url="" class="btn-title" title="Datei öffnen">
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14 3h7v7" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M10 14L21 3" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M21 14v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6"
            fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
</a>';

	$table .= '</div>'; 
}

function addTitleField(&$table, $file_id, $title, &$inputArray, $isReadonlyUser)
{
	$table .= '<div class="cell_text">';
	if($isReadonlyUser == true) {
		$table .= $title;
	}
	else {
		$table .= getInputField($file_id, null, '_sf_file_title_' . $file_id, $title, $inputArray);
		$table .= getInputField($file_id, null, '_sf_file_title_origin_' . $file_id, $title, $inputArray, true);
	}

	$table .= '</div>';
}

function addDescriptionField(&$table, $file_id, $desc, &$inputArray, $isReadonlyUser)
{
	$table .= '<div class="cell_text">';
	if($isReadonlyUser == true) {
		$table .= $desc;
	}
	else {
		$table .= getInputField($file_id, null, '_sf_file_description_' . $file_id, $desc, $inputArray);
		$table .= getInputField($file_id, null, '_sf_file_description_origin_' . $file_id, $desc, $inputArray, true);
	}

	$table .= '</div>';
}

function addCustomFieldField(&$table, $file_id, $n, $val, &$inputArray, $isReadonlyUser): void
{
	$table .= '<div class="cell_text">';
	if($isReadonlyUser == true) {
		$table .= $val;
	}
	else {	
		$autocomplete = "";
		if($n == 7 ){ // this is a hack: CF Id 7 is Tonart
			$autocomplete = ' autocomplete="off" ';
		}

		$table .= getInputField($file_id, $n, '_sf_file_cf_' . $file_id . '_' . $n, $val, $inputArray, false, $autocomplete);
		$table .= getInputField($file_id, $n, '_sf_file_cf_origin_' . $file_id . '_' . $n, $val, $inputArray, true);
	}

	$table .= '</div>';
}

function addTagsField(&$table, $file_id, $tagValue, &$inputArray, $isReadonlyUser): void
{
	$table .= '<div class="cell_text">';
	if($isReadonlyUser == true) {
		$table .= $tagValue;
	}
	else {		
		$table .= getInputField($file_id, null, '_sf_file_tags_' . $file_id, $tagValue, $inputArray);
		$table .= getInputField($file_id, null, '_sf_file_tags_origin_' . $file_id, $tagValue, $inputArray, true);
	}

	$table .= '</div>';
}

function addCategoryField(&$table, $file_id, &$category, $catValue, &$checkboxArray, $isReadonlyUser): void
{
	// error_log("addCategoryField " . $file_id . ": " . print_r($category, true) . ", catvalue " . $catValue . ", inputArr " . print_r($inputArray, true));
	$table .= '<div class="cell_text cell_cat">';
	$table .= getCheckboxField($file_id, $category->name, '_sf_file_cat_' . $file_id . '_' . $category->term_id, $catValue, $checkboxArray, $isReadonlyUser);
	$table .= getCheckboxField($file_id, $category->name, '_sf_file_cat_origin_' . $file_id . '_' . $category->term_id, $catValue, $checkboxArray, $isReadonlyUser, true);

	$table .= '</div>';
}
?>