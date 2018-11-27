  // Now we add the most important point of the plugin, the commands
  // This library is very flexible and now we will see why :
  // Every command is a literal object


  function startArtyom(){
    artyom.initialize({
      lang:"en-GB",// More languages are documented in the library
      continuous:false,//if you have https connection, you can activate continuous mode
      debug:true,//Show everything in the console
      listen:true // Start listening when this function is triggered
    });
  }

  function stopArtyom(){
    artyom.fatality();
  }

  window.onload = function(){
      var tab = document.getElementById("commands-list");
      artyom.addCommands([
        {
          description:"Artyom can talk too, lets say something if we say hello",
          indexes:["hello","hey"],
          action:function(i){
              // i = the index of the array of indexes option

              if(i == 0){
                //You say : "hello"
                document.getElementById('time').innerHTML = "Hello ! How are you? I don't want to talk today";
              }
          }
        },
        {
          description:"Say goodbye",
          indexes:["goodbye"],
          action:function(){
            alert("Now all is over.");
          }
        },
        {
          description:"Say what time is it",
          indexes:['what time is it'],
          action:function(){
           var currentdate = new Date();
           var datetime = "About the date : " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/"
                + currentdate.getFullYear() + " @ "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds();
            document.getElementById('time').innerHTML = datetime;
          }
        },
        {
          description: "Smart command, say how much x in what we say",
          indexes:["what's the number of *"],
          smart:true,
          action:function(i,wildcard){
            document.getElementById('time').innerHTML = "The number of " + wildcard + ' is '+ Math.floor(Math.random() * 4000) + 1;
          }
        }
      ]);
      // Redirect the recognized text
      artyom.redirectRecognizedTextOutput(function(text,isFinal){
        var span = document.getElementById('output');

        if(isFinal){
          span.innerHTML = '';
        }else {
          span.innerHTML = text;
        }
      });
      var commands =  artyom.getAvailableCommands();
      var html = '';

      for(var i = 0;i < commands.length;i++){
          var command = commands[i];
          html += command.description + " : <span style='color:blue;'>"+command.indexes.toString()+"</span><br>";
      }

      tab.innerHTML = html;

      artyom.initialize({lang:"es-ES"});


  };
