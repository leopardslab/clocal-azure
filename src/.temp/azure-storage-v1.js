//Method 2
class AzureStorage extends CloudLocal {
    init() {
      this.port = 9569;
      this.app.use(busboy());
      this.app.use(express.static(__dirname + './../../assets'));
  
      this.app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname)+ '/azure-storage-home.html')
  
      });
      
      this.app.route('/upload')
      .post(function (req, res, next) {
  
          var fstream;
          req.pipe(req.busboy);
          req.busboy.on('file', function (fieldname, file, filename) {
              console.log("Uploading: " + filename);
  
              //Path where image will be uploaded
              fstream = fs.createWriteStream('./src/example/azure-storage/'+filename);
              file.pipe(fstream);
              fstream.on('close', function () {    
                  console.log("Upload Finished of " + filename);              
                  res.redirect('back'); 
              });
          });
      });
  
    }
  }
  
  module.exports = AzureStorage