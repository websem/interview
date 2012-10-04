<?php

header('Content-Type:text/html; charset=utf-8');
require_once('CreateAjaxResponse.php');
$host = 'localhost';
$username = 'root';
$password = 'enter';
$db_name = 'shop';
$mysqli = new mysqli($host, $username, $password, $db_name);
$post_element = array('form_name',
    'form_cost',
    'form_color',
    'form_company',
    'form_count');
$response = new CreateAjaxResponse();
switch ($_POST['form_action']) {
    case "insert":
        foreach ($post_element as $key => $value) {
            $post_element[$key] = $_POST[$value];
        }
        $post_element = $response->sanitize($post_element);
        $query = sprintf("INSERT INTO products (name, cost, color, company, count) VALUES (%s,%s,%s,%s,%s)",
            $post_element[0],
            $post_element[1],
            $post_element[2],
            $post_element[3],
            $post_element[4]);
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
