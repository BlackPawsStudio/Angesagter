<?php
  header('Access-Control-Allow-Origin: * ');  
  header('Content-Type: application/json');
  
  $cleardb_url = parse_url(getenv('CLEARDB_DATABASE_URL'));
  $cleardb_server = $cleardb_url['host'];
  $cleardb_username = $cleardb_url['user'];
  $cleardb_password = $cleardb_url['pass'];
  $cleardb_db = substr($cleardb_url['path'],1);
  $active_group = 'default';
  $query_builder = TRUE;

  $conn = mysqli_connect($cleardb_server, $cleardb_username, $cleardb_password, $cleardb_db);
  if ($conn -> connect_error) {
    echo json_encode('died from cringe  ');
    die('Connection failed: ' . $conn -> connect_error);
  }

  switch ($_GET['request']) {
    case 'user':
      $sql = 'SELECT * FROM users WHERE login=\'' . $_GET['login'] . '\'';
      $result = mysqli_query($conn, $sql);
      $user = mysqli_fetch_all($result);
      echo json_encode($user);
      break;
    case 'roads':
      $sql = 'SELECT * FROM roads WHERE author=\'' . $_GET['login'] . '\'';
      $result = mysqli_query($conn, $sql);
      $user = mysqli_fetch_all($result);
      echo json_encode($user);
      break;
  }

  $conn->close();
?>