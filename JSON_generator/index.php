<!DOCTYPE html>
<html lang="es">
<head>
  <title>Bootstrap Example</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
</head>
<body>

<div class="container">
  <h1>Generador Json</h1>
  <?php
/*
  $dir          = "././.";
  $list = array();

  if(is_dir($dir)){

      if($dh = opendir($dir)){
          while(($file = readdir($dh)) != false){

              if($file == "." or $file == ".."){

              } else {
                $list3 = array( 'file' => $file, 'size' => filesize($file));
                array_push($list, $list3);
              }
          }
      }

      $return_array = array('files'=> $list);
      echo json_encode($return_array);
  }*/
  $return_array = dirToArray("../AULAS_SIN_FRONTERAS");
  $fp = fopen('../js/paths.js', 'w');
  fwrite($fp, "paths = ".json_encode($return_array, JSON_PRETTY_PRINT));   //here it will print the array pretty
  fclose($fp);

  echo json_encode($return_array, JSON_PRETTY_PRINT);

  function dirToArray($dir) {

     $result = array();

     $cdir = scandir($dir);
     foreach ($cdir as $key => $value)
     {
        if (!in_array($value,array(".","..")))
        {
           if (is_dir($dir . DIRECTORY_SEPARATOR . $value))
           {
              $result[$value] = dirToArray($dir . DIRECTORY_SEPARATOR . utf8_encode($value));
           }
           else
           {
              //echo "dirToArray {value} ".cleanString($value);
              $result[] = utf8_encode($value);
           }
        }
     }
     //echo json_encode($result, JSON_PRETTY_PRINT);
     return $result;
  }

  function cleanString($text) {
    $utf8 = array(
        '/[áàâãªä]/u'   =>   'a',
        '/[ÁÀÂÃÄ]/u'    =>   'A',
        '/[ÍÌÎÏ]/u'     =>   'I',
        '/[íìîï]/u'     =>   'i',
        '/[éèêë]/u'     =>   'e',
        '/[ÉÈÊË]/u'     =>   'E',
        '/[óòôõºö]/u'   =>   'o',
        '/[ÓÒÔÕÖ]/u'    =>   'O',
        '/[úùûü]/u'     =>   'u',
        '/[ÚÙÛÜ]/u'     =>   'U',
        '/ç/'           =>   'c',
        '/Ç/'           =>   'C',
        '/ñ/'           =>   'n',
        '/Ñ/'           =>   'N',
        '/–/'           =>   '-', // UTF-8 hyphen to "normal" hyphen
        '/[’‘‹›‚]/u'    =>   ' ', // Literally a single quote
        '/[“”«»„]/u'    =>   ' ', // Double quote
        '/ /'           =>   ' ', // nonbreaking space (equiv. to 0x160)
    );
    return preg_replace(array_keys($utf8), array_values($utf8), $text);
  }

  ?>
</div>
</body>
