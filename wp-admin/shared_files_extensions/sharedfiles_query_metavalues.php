<?php

function queryMetaValues($parametersMeta)
{
	$settings = $parametersMeta["settings"];
    $search_meta_values = $parametersMeta['search_meta_values'] ?? [];
    $wpdb = $parametersMeta["wpdb"];

    $result = [];

    // Über alle Suchwerte iterieren
    foreach ($search_meta_values as $search_value) {
        $custom_field_index = null;

        // Settings durchsuchen
        foreach ($settings as $key => $value) {
            if (
                is_string($value)
                && stripos($value, $search_value) !== false
                && preg_match('/_(\d+)$/', $key, $matches)
            ) {
                $custom_field_index = (int) $matches[1];
                break;
            }
        }

        // Wenn ein Index gefunden wurde
        if ($custom_field_index !== null) {
            $custom_field_name = '_sf_file_upload_cf_' . $custom_field_index;

            // Meta-Werte aus der Datenbank abfragen
            $select = $wpdb->prepare(
                "SELECT DISTINCT meta_value FROM `wp_postmeta` WHERE meta_key = %s",
                $custom_field_name
            );
            $queryResult = $wpdb->get_results($select, ARRAY_A);

            // Nur die meta_value Spalte extrahieren
            $values = array_column($queryResult, 'meta_value');

            // Ins Result-Array schreiben
            $result[$custom_field_name] = $values;
        }
    }

    return $result;
}

?>