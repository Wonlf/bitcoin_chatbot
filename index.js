var express = require('express');
var request = require('request');
var bodyParser = require('body-parser')

var app = express();

app.use(bodyParser.json());

var server = app.listen(3000, function(){
    console.log("Express server has started on port 3000")
})


// ?currency_pair=btc_krw




app.post('/coin', function(req, res){
    var coin_name = req.body.action.params.coin

    console.log('in')




    request(`https://api.korbit.co.kr/v1/ticker/detailed?currency_pair=${coin_name}`, function (error, response, body) {

        obj = JSON.parse(body);
        var data = new Date(obj.timestamp);




        dataSend2 = {
            "version": "2.0",
            "data": {
                "last" : "현재가 : " + obj.last.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,') + "원",
                "high" : "최근 24시간 최고가 : " + obj.high.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,') + "원",
                "low" : "최근 24시간 최저가 : " + obj.low.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,') + "원",
                "bid" : "매수 호가 : " + obj.bid.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,') + "원",
                "ask" : "매도 호가 : " + obj.ask.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,') + "원",
                "timestamp" : "최종 체결 시각 : " + data
            }
        }


        res.send(dataSend2)


    });




});





