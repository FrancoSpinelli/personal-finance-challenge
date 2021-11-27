let host = 'http://localhost:3003';

module.exports = {
    ajaxPost: function (path, body, json = true, callback200, callback204) {
        let url = host + path;
        const http = new XMLHttpRequest();
        http.open("post", url, true);
        if (json === true){
            http.setRequestHeader('Content-Type', 'application/json');
        }
        http.send(body);
        http.onreadystatechange = function () {
                if(this.status === 200 && this.readyState === 4){
                    let response = JSON.parse(this.responseText);
                    if (response.data !== null) {
                        callback200(response);
                    }
                    if(response.status === 204){
                        callback204(response);
                    }
                }
            }
        
    },
    ajaxGet: function (path, callback200) {
        let url = host + path;
        const http = new XMLHttpRequest();
        http.open('get', url, true);
        http.onreadystatechange = function () {
            if(this.status === 200 && this.readyState === 4){
                let response = JSON.parse(this.responseText);
                callback200(response);
            }
        }
        http.send();
    },
}