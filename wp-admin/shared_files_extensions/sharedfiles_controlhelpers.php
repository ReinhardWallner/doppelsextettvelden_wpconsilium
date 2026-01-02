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

function addInfoIcon(&$table, $headRow, $dataArray){
	$info = "Titel: " . $dataArray["title"] . "\n";
	$headrowIndexOffset = 2;
	for ($n = 1; $n < $dataArray["custom_fields_cntint"]; $n++) {
		$index = $n + $headrowIndexOffset;
		if($dataArray["custom_field"][$n] != null){
			$info .= $headRow[$index] . ": " . $dataArray["custom_field"][$n] . "\n";
		}
	}

	if($dataArray["description"] != null){
		$info .= $headRow["2"] . ": " . $dataArray["description"];
	}

	$table .= '<div class="cell_text cell-info-icon">';
	$table .= '<span
    class="info-icon"
    title="' . $info . '">
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="12" x2="12" y2="17"></line>
      <circle cx="12" cy="8" r="0.5"></circle>
    </svg>
  </span>';

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