let fs=require('fs');
let path=require('path');
let types={
    media:['mp4','mkv'],
    archives:['zip','7z','rar','tar','gz','ar','iso','xz'],
    documents:['docx','doc','pdf','xlsx','xls','odt','ods','odp','odf','txt','js','tex'],
    app:['exe','dmg','pkg','deb']
}
function organizefn(dirPath)
{
   // 1.input-> directory path given
   let destPath;
   if(dirPath==undefined)
   {
    destPath=process.cwd();
    return;
   }
   else{
     let doesPathExist=fs.existsSync(dirPath);
     if(doesPathExist==false)
     {
        console.log("Kindly enter a valid path");
        return;
     }
   }
   // 2. create a new directory named organized_files
     destPath=path.join(dirPath,"organized_files");
     if(fs.existsSync(destPath)==false)
     fs.mkdirSync(destPath);
     // 3. identify categories of all the files present in that input directory
     organizehelper(dirPath,destPath);
}

function organizehelper(src,dest)
{
  let childnames=fs.readdirSync(src);
  for(let i=0;i<childnames.length;i++)
  {
    let childpath=path.join(src,childnames[i]);
    let isFile=fs.lstatSync(childpath).isFile();    
    if(isFile==true)
    {
        let ct=getCategory(childnames[i]);
        // 4. copy/cut files to that organized directory inside of any of category folder
        sendFiles(childpath,dest,ct);
    }
  }
}
function sendFiles(srcFilePath,dest,category)
{
    let categorypath=path.join(dest,category);
    if(fs.existsSync(categorypath)==false)
    fs.mkdirSync(categorypath);
    let filename=path.basename(srcFilePath);
    let destFilePath=path.join(categorypath,filename);
    fs.copyFileSync(srcFilePath,destFilePath);
    // for deleting the original files, use the following
    //fs.unlinkSync(srcFilePath);
    console.log(filename+" copied to "+category);
}
function getCategory(filename)
{
  let ext=path.extname(filename);
  ext=ext.slice(1);
  for(let type in types)
  {
    let carray=types[type];
    for(let i=0;i<carray.length;i++)
    {
        if(carray[i]==ext)
        return type;
    }
  }
  return "others";
}
module.exports={
    organizeKey:organizefn
}