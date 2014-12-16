/**
 * Created by James on 15/12/2014.
 */
var videoUpload=(function(){
    var socket,
        FReader,
        Name,
        Content,
        NewFile,
        Place,srcvid,player,MBDone;
    function init()
    {
        socket= io.connect('http://localhost:3000');
        srcvid=document.getElementById('videosource');
        player=document.getElementById('videoplayer');
        if(window.File && window.FileReader){ //These are the relevant HTML5 objects that we are going to use
            document.getElementById('UploadButton').addEventListener('click', StartUpload);
            document.getElementById('FileBox').addEventListener('change', FileChosen);
        }
        else
        {
            document.getElementById('UploadArea').innerHTML = "Your Browser Doesn't Support The File API Please Update Your Browser";
        }

        socket.on('MoreData', function (data){
            UpdateBar(data['Percent']);
            Place = data['Place'] * 524288; //The Next Blocks Starting Position
            NewFile; //The Variable that will hold the new Block of Data
            if(SelectedFile.webkitSlice)
                NewFile = SelectedFile.slice(Place, Place + Math.min(524288, (SelectedFile.size-Place)));
            else
                NewFile = SelectedFile.slice(Place, Place + Math.min(524288, (SelectedFile.size-Place)));
            FReader.readAsArrayBuffer(NewFile,'utf-16');
        });

        socket.on('Done', function (data){
            Content = "Video Successfully Uploaded !!"
            document.getElementById('UploadArea').innerHTML = Content;
            Content="";

            player.pause();

            srcvid.setAttribute("src","video/"+data.Name);
            player.load();
            player.oncanplay=function(){
                player.play();
                canvasDrawer.init();
            }
        });
    }
    function FileChosen(evnt) {
        SelectedFile = evnt.target.files[0];
        document.getElementById('NameBox').value = SelectedFile.name;
    }


    function StartUpload(){
        if(document.getElementById('FileBox').value != "")
        {
            FReader = new FileReader();
            Name = document.getElementById('NameBox').value;
            Content = "<span id='NameArea'>Uploading " + SelectedFile.name + " as " + Name + "</span>";
            Content += '<div id="ProgressContainer"><div id="ProgressBar"></div></div><span id="percent">50%</span>';
            Content += "<span id='Uploaded'> - <span id='MB'>0</span>/" + Math.round(SelectedFile.size / 1048576) + "MB</span>";
            document.getElementById('UploadArea').innerHTML = Content;
            Content="";
            FReader.onload = function(evnt){
                socket.emit('Upload', { 'Name' : Name, Data : evnt.target.result });
            }
            socket.emit('Start', { 'Name' : Name, 'Size' : SelectedFile.size });
        }
        else
        {
            alert("Please Select A File");
        }
    }



    function UpdateBar(percent){
        document.getElementById('ProgressBar').style.width = percent + '%';
        document.getElementById('percent').innerHTML = (Math.round(percent*100)/100) + '%';
        MBDone = Math.round(((percent/100.0) * SelectedFile.size) / 1048576);
        document.getElementById('MB').innerHTML = MBDone;
    }


    return {
        init:init
    }
})();