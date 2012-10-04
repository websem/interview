<?php
class CreateAjaxResponse
{
    public $mysqli;

    function __construct()
    {
        $host = 'localhost';
        $username = 'root';
        $password = 'enter';
        $db_name = 'shop';
        $this->mysqli = new mysqli($host, $username, $password, $db_name);
    }

    function sanitize($array)
    {
        foreach ($array as $key => $value) {
            $array[$key] = "'" . trim($value) . "'";
        }
        return $array;
    }

    function insertData($query)
    {
        if ($this->mysqli->query($query)) {
            return true;
        } else {
            return false;
        }
    }

    public function loadDate($query)
    {
        $response = array();
        $result = $this->mysqli->query($query);
        for ($i = 0; $row = $result->fetch_array(MYSQLI_ASSOC); $i++) {
            $response["$i"] = $row;
        }
        return $response;
    }
}

?>