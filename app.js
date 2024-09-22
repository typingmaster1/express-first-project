// // const express = require('express');
// // const path  = require('path');
// // const fs = require('fs');
// // const app = express();

// // app.use(express.json());
// // app.use(express.urlencoded({ extended: true }));

// // app.set("view engine", "ejs");
// // app.set('views', path.join(__dirname, 'views'));
// // app.use(express.static(path.join(__dirname, "public")));

// // const port = 3000;

// // app.get('/', (req, res) => {
// //   fs.readdir('./files', function(err, files) {
// //     if (err) {
// //       return res.status(500).send("Error reading files");
// //     }
// //     res.render("index", { files: files });
// //   });
// // });

// // // Moved this outside of app.get()
// // app.post('/create', (req, res) => {
// //   fs.writeFile(`./files/${req.body.title.split('').join('')}.txt`,req.body.details,function(err){
// //         res.render("/")
// // });
// // })
// // app.listen(port, () => {
// //   console.log(`Example app listening on port ${port}`);
// // })


// const express = require('express');
// const path = require('path');
// const fs = require('fs');
// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.set('view engine', 'ejs');

// // Set the directory for views
// // app.set('views', path.join(__dirname, 'views'));

// app.use(express.static(path.join(__dirname, 'public')));

// const port = 3000;

// app.get('/', (req, res) => {
//   fs.readdir('./files', function(err, files) {
//     if (err) {
//       return res.status(500).send("Error reading files");
//     }
//     res.render("index", { files: files }); // Render the index.ejs file
//   })
// })

// // Post route to handle task creation
// app.post('/create', (req, res) => {
//   const fileName = req.body.title.replace(/\s+/g, '') + '.txt'; // Remove spaces in title
//   const filePath = `./files/${fileName}`;

//   fs.writeFile(filePath, req.body.details, function(err) {
//     if (err) {
//       return res.status(500).send("Error writing file");
//     }
//     res.redirect('/'); // Redirect to the main page after task creation
//   });
// });

// app.get('/file/:filename',function(req,res){
//   fs.readFile(`./files/${req.params.filename}`,"utf-8", function(err,filedata){
//     res.render('show',{filename:req.params.filename,filedata:filedata}  );
//   })
  
//   })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });




const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Set the directory for views
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

const port = 3000;

// Route to show tasks
app.get('/', (req, res) => {
  fs.readdir('./files', function(err, files) {
    if (err) {
      return res.status(500).send("Error reading files");
    }
    res.render("index", { files: files }); // Render the index.ejs file
  });
});

// Route to create task
app.post('/create', (req, res) => {
  const fileName = req.body.title.replace(/\s+/g, '') + '.txt'; // Remove spaces in title
  const filePath = `./files/${fileName}`;

  fs.writeFile(filePath, req.body.details, function(err) {
    if (err) {
      return res.status(500).send("Error writing file");
    }
    res.redirect('/'); // Redirect to the main page after task creation
  });
});

// Route to view task
app.get('/file/:filename', function(req, res) {
  fs.readFile(`./files/${req.params.filename}`, "utf-8", function(err, filedata) {
    if (err) {
      return res.status(500).send("Error reading file");
    }
    res.render('show', { filename: req.params.filename, filedata: filedata });
  });
});

// Route to delete task
app.post('/delete/:filename', (req, res) => {
  const filePath = `./files/${req.params.filename}`;
  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(500).send("Error deleting file");
    }
    res.redirect('/'); // Redirect to the main page after deletion
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
