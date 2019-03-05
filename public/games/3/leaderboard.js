var url = localStorage.getItem("getURL") + '/game/3/leader';
console.log("URL="+url);

window.onload = showResults();
function showResults () {
    console.log('hi');
    var xauth = localStorage.getItem('x-auth');
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', url, true);
    xhttp.onreadystatechange = function () {
        if(this.readyState === 4 && this.status === 200){
            var content = JSON.parse(this.responseText);
            console.log(content);
            if(content.status === 'success'){
                var index = '';
                   for(i = 0; i < content.data.length; i++){
                     index = content.data[i];
                     var table = document.getElementById('success');
                     var sn = i + 1;
                     var user = index.name;
                     var add_no = index.admission_no;
                     var score = index.gScore.score;
                     table.insertAdjacentHTML('beforeend', `<tr><td>${sn}</td><td>${user}</td><td>${add_no}</td><td>${score}</td></tr>`);
                }
            }else{
                console.log(content.status);
            }

        }
        else{
            console.log(this.status);
        }
    };
    xhttp.setRequestHeader('Content-type', 'application/json');
    // xhttp.setRequestHeader('x-auth', xAuth);
    xhttp.setRequestHeader("x-auth",xauth);
    xhttp.send();
}
