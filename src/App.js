import './App.css';

function App() {
    
    function llenar_jarra(j1,j2,obj)
    {
  
      var laguna = new Array(1000);
      for(var i=0;i<1000;i++){
        laguna[i]=new Array(1000);
        for(var j=0;j<1000;j++)
        {
          laguna[i][j]=-1;
        }
      }
  
      var tiene_solucion = false;
      let historial = [];
  
      var cola = [];
          var u = [];
      cola.push([0,0]);
  
      while (cola.length!=0) {
  
        var index = cola[0];
  
        cola.shift();
  
        if ((index[0] > j1 || index[1] > j2 ||
          index[0] < 0 || index[1] < 0))
          continue;
  
        if (laguna[index[0]][index[1]] > -1)
          continue;
  
  
        historial.push([index[0],index[1]]);
        
        laguna[index[0]][index[1]] = 1;
        
        if (index[0] == obj || index[1] == obj) {
          tiene_solucion = true;
          if (index[0] == obj) {
            if (index[1] != 0)
              historial.push([u[0],0]);
          }
          else {
            if (index[0] != 0)
  
              historial.push([0,index[1]]);
          }
  
  
          for (var i = 0; i < historial.length; i++)
            document.getElementById("result").innerHTML+="(" + historial[i][0]
              + ", " + historial[i][1] + ")<br>";
          break;
        }
  
        cola.push([index[0],j2]);
        cola.push([j1,index[1]]);
  
        for (var count = 0; count <= Math.max(j1, j2); count++) {
  
          let c = index[0] + count;
          let d = index[1] - count;
  
          if (c == j1 || (d == 0 && d >= 0))
            cola.push([c,d]);
  
          c = index[0] - count;
          d = index[1] + count;
  
          if ((c == 0 && c >= 0) || d == j2)
            cola.push([c,d]);
        }
  
        cola.push([j1,0]);
        cola.push([0,j2]); 
      }
  
      if (!tiene_solucion)
        document.getElementById("result").innerHTML="No Solution";
    }

    document.getElementById("btn").onclick=function(){
      var jarra1 = document.getElementById('j1').value;
      var jarra2 = document.getElementById('j2').value;
      var objetivo = document.getElementById('obj').value;
    
      llenar_jarra(jarra1, jarra2, objetivo);
    }

  return (
    <div className="App"> 
    <center>
        <br/>
        Water Jug Challenge
        <br/><br/>
        Input the X,Y values, and the Goal
        <br/><br/>
        <table>
          <tr>
            <td><input type="number" placeholder="X Jug Capacity" id="j1" name=""/></td>
            <td><input type="number" placeholder="Y Jug Capacity" id="j2" name=""/></td>
            <td><input type="number" placeholder="Goal" id="obj" name=""/></td>
          </tr>
        </table>
        <br/><br/>
        <button id='btn' type="button">Run</button>
        <br/><br/>
        <div id='result'></div>
      </center>
    </div>
  );
}

export default App;
