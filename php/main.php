<?php

header('Content-Type:text/html; charset=utf-8');
require_once('CreateAjaxResponse.php');
$post_element = array(
    'form_name'=>'',
    'form_cost'=>'',
    'form_color'=>'',
    'form_company'=>'',
    'form_count'=>'');
$response = new CreateAjaxResponse();
switch ($_POST['form_action']) {
    case "insert":
        foreach ($post_element as $key => $value) {
            $post_element[$key] = $_POST[$key];
        }
        $post_element = $response->sanitize($post_element);
        $query = sprintf("INSERT INTO products (name, cost, color, company, count) VALUES (%s,%s,%s,%s,%s)",
            $post_element['form_name'],
            $post_element['form_cost'],
            $post_element['form_color'],
            $post_element['form_company'],
            $post_element['form_count']
        );
        echo($response->insertData($query));
        break;
    case "load":
        (int)$_POST['form_numbers_of_request'] ?
                    $limit = $_POST['form_numbers_of_request'] :
                    $limit = 10;
        $query = sprintf("SELECT * FROM products LIMIT %d",
            $limit);
        echo(json_encode($response->loadDate($query)));
        break;
}
?>
