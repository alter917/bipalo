<?php
    
header( "Content-Type: application/json;");
header("Access-Control-Allow-Origin: *");
try {
  $pdo = new PDO('mysql:host=localhost;dbname=bipalo;charset=utf8', 'root', '',
    array(PDO::ATTR_EMULATE_PREPARES => false));
  
    $sql = 'select id,name,lng,lat,address,picture1,picture2,picture3 from bicycle_parking';

  $page = 1;
  $per_page = 10;
  if (isset($_GET['page']) && $_GET['page'] != '') {
      if ($_GET['page'] == 1) {
          $page = $_GET['page'] - 1;
      } elseif($_GET['page'] >= 2) {
          $page = ($_GET['page'] - 1) * 10;
      }
  }
  if (isset($_GET['per_page']) && $_GET['per_page'] != '') {
      $per_page = $_GET['per_page'];
  }

  $sql .= ' limit ' .$page  . ', ' . $per_page;
  $stmt = $pdo->prepare($sql);
  $json_data = array();
  $result = $stmt->execute();
  if ($stmt->rowCount() == 0) {
      echo json_encode($json_data, JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT);
  } else {
      $rows = $stmt->fetchAll();
      foreach($rows as $id => $row){
          $json_data[$id]['id'] = $row['id'];
          $json_data[$id]['name'] = $row['name'];
          $json_data[$id]['lng'] = $row['lng'];
          $json_data[$id]['lat'] = $row['lat'];
          $json_data[$id]['address'] =$row['address'];
          $json_data[$id]['picture1'] = $row['picture1'];
          $json_data[$id]['picture2'] = $row['picture2'];
          $json_data[$id]['picture3'] =$row['picture3'];
      }
      echo json_encode($rows, JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT);
  }


  //echo "\r\n" . "---------------------------------------------------" . "\r\n";
  //$row = $stmt->fetch(PDO::FETCH_ASSOC);
  //var_dump($row);
  //echo "\r\n", "----------------------------------"."\r\n";
  //var_dump(json_encode($row));
  //echo json_encode($row);
} catch (PDOException $e) {
  echo "<pre>";
  var_dump($e->getMessage());
  echo"</pre>";
}