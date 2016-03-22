<?php

// still need to add server side valudation and error handling

$data = array();

if(isset($_GET['files']))
{
    $error = false;
    $files = array();

    $uploaddir = './uploads/'; // ~~~~ change this path ~~~~

    foreach($_FILES as $file)
    {
        if(move_uploaded_file($file['tmp_name'], $uploaddir .basename($file['name'])))
        {
            $files[] = @uploaddir .$file['name'];
        }
        else
        {
            $error = true;
        }
    }

    // if there is an error, return error message
    $data = ($error) ? array('error' => 'File upload error'): array('files' => $files);
}
else
{
    $data = array('success' => 'Form successfully submitted', 'formData' => $_POST);
}

echo json_encode($data);

?>
        
    
