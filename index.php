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
      $songs = mysqli_fetch_all($result);
      echo json_encode($songs);
      break;
    case 'road':
      $sql = 'SELECT * FROM roads WHERE author=\'' . $_GET['login'] . '\' and name=\''. $_GET['name'] .'\'';
      $result = mysqli_query($conn, $sql);
      $song = mysqli_fetch_all($result);
      echo json_encode($song);
      break;
    case 'allRoads':
      $sql = 'SELECT * FROM roads';
      $result = mysqli_query($conn, $sql);
      $song = mysqli_fetch_all($result);
      echo json_encode($song);
      break;
    case 'objects':
      $sql = 'SELECT * FROM object WHERE author=\'' . $_GET['login'] . '\'';
      $result = mysqli_query($conn, $sql);
      $songs = mysqli_fetch_all($result);
      echo json_encode($songs);
      break;
    case 'allObjects':
      $sql = 'SELECT * FROM object';
      $result = mysqli_query($conn, $sql);
      $object = mysqli_fetch_all($result);
      echo json_encode($object);
      break;
    case 'descr':
      $sql = 'SELECT * FROM descr WHERE author=\'' . $_GET['login'] . '\' and name=\''. $_GET['name'] .'\'';
      $result = mysqli_query($conn, $sql);
      $song = mysqli_fetch_all($result);
      echo json_encode($song);
      break;
  }

  switch ($_GET['create']) {
    case 'user':
      $sql = 'SELECT * FROM users';
      $result = mysqli_query($conn, $sql);
      $users = mysqli_fetch_all($result);
      if (in_array([$_GET['login'], $_GET['password']], $users)) {
        echo json_encode('Already taken!');
      } else {
        $sql = 'INSERT INTO users (login, password) VALUES (\''.$_GET['login'].'\', \''.$_GET['password'].'\')';
        if ($conn->query($sql) === TRUE) {
          echo json_encode('New record created successfully');
        } else {
          echo json_encode('Error: ' . $sql . '\n' . $conn->error);
        }
      }
      break;
    case 'road':
      $sql = 'SELECT * FROM roads WHERE author=\'' . $_GET['login'] . '\'';
      $result = mysqli_query($conn, $sql);
      $roads = array_map(function($el) {
        return $el['name'];
      }, mysqli_fetch_all($result));

      if (in_array($_GET['name'], $roads)) {
        echo json_encode('Already taken!');
      } else {
        $sql = 'INSERT INTO roads (name, dots, color, author) VALUES (\'' . $_GET['name'] . '\', \''.$_GET['dots'].'\', \''.$_GET['color'].'\', \''.$_GET['login'].'\')';
        if ($conn->query($sql) === TRUE) {
          echo json_encode('New record created successfully');
        } else {
          echo json_encode('Error: ' . $sql . '\n' . $conn->error);
        }
      }     
      break;
    case 'object':
      $sql = 'SELECT * FROM object WHERE author=\'' . $_GET['login'] . '\'';
      $result = mysqli_query($conn, $sql);
      $objects = array_map(function($el) {
        return $el['name'];
      }, mysqli_fetch_all($result));

      if (in_array($_GET['name'], $objects)) {
        echo json_encode('Already taken!');
      } else {
        $sql = 'INSERT INTO object (name, coords, color, type, size, author) VALUES (\'' . $_GET['name'] . '\', \''.$_GET['coords'].'\', \''.$_GET['color'].'\', \''.$_GET['type'].'\', '.$_GET['size'].', \''.$_GET['login'].'\')';
        if ($conn->query($sql) === TRUE) {
          echo json_encode('New record created successfully, size' . $_GET['size']);
        } else {
          echo json_encode('Error: ' . $sql . '\n' . $conn->error);
        }
      }     
      break;
    case 'descr':
      $sql = 'INSERT INTO descr (name, author, text) VALUES (\''.$_GET['name'].'\', \''.$_GET['login'].'\', \'\')';
      if ($conn->query($sql) === TRUE) {
        echo json_encode('New record created successfully');
      } else {
        echo json_encode('Error: ' . $sql . '\n' . $conn->error);
      }
      break;
  }

  switch ($_GET['update']) {
    case 'road':
      $sql = 'UPDATE roads SET dots=\'' .$_GET['dots']. '\', color=\'' .$_GET['color']. '\' WHERE author=\'' . $_GET['login'] . '\' and name=\''. $_GET['name'] .'\'';
      if ($conn->query($sql) === TRUE) {
        echo json_encode('Updated successfully');
      } else {
        echo json_encode('Error: ' . $sql . '\n' . $conn->error);
      }
      break;
    case 'descr':
      $sql = 'UPDATE descr SET text=\'' .$_GET['text']. '\' WHERE author=\'' . $_GET['login'] . '\' and name=\''. $_GET['name'] .'\'';
      if ($conn->query($sql) === TRUE) {
        echo json_encode('Updated successfully');
      } else {
        echo json_encode('Error: ' . $sql . '\n' . $conn->error);
      }
      break;
  }

  switch ($_GET['delete']) {
    case 'road':
      $sql = 'DELETE FROM roads WHERE author=\'' . $_GET['login'] . '\' and name=\'' . $_GET['name'] . '\'';
      if ($conn->query($sql) === TRUE) {
        echo json_encode('Deleted successfully');
      } else {
        echo json_encode('Error: ' . $sql . '\n' . $conn->error);
      }
      break;
    case 'descr':
      $sql = 'DELETE FROM descr WHERE author=\'' . $_GET['login'] . '\' and name=\'' . $_GET['name'] . '\'';
      if ($conn->query($sql) === TRUE) {
        echo json_encode('Deleted successfully');
      } else {
        echo json_encode('Error: ' . $sql . '\n' . $conn->error);
      }
      break;
    case 'user':
      $sql = 'DELETE FROM users WHERE login=\'' . $_GET['login'] . '\'';
      $sqlRoads = 'DELETE FROM roads WHERE author=\'' . $_GET['login'] . '\'';
      $sqlDescrs = 'DELETE FROM descr WHERE author=\'' . $_GET['login'] . '\'';
      if ($conn->query($sql) === TRUE && $conn->query($sqlRoads) === TRUE && $conn->query($sqlDescrs) === TRUE) {
        echo json_encode('Deleted successfully');
      } else {
        echo json_encode('Error: ' . $sql . '\n' . $conn->error);
      }
      break;
    case 'object':
      $sql = 'DELETE FROM object WHERE author=\'' . $_GET['login'] . '\' and name=\'' . $_GET['name'] . '\'';
      if ($conn->query($sql) === TRUE) {
        echo json_encode('Deleted successfully');
      } else {
        echo json_encode('Error: ' . $sql . '\n' . $conn->error);
      }
      break;
  }

  $conn->close();
?>