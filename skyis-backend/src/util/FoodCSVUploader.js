const csv = require('csv-parser');
const fs = require('fs');
const request = require('request');


/**
 * CSV 파일의 음식 정보를 데이터베이스 올리는 모듈이다.
 * 현재는 /home/ubuntu/skyis/csvData/FoodIngredientTest.csv 이 위치에 있는 csv를 데이터베이스에 올리도록 만들어놓았는데
 * 후에는 웹에서 업로드 하는 방식으로 만들어야 될 것 같다
 */
let foodData = [], ingredientData = [];
fs.createReadStream('/home/ubuntu/skyis/csvData/FoodIngredientTest.csv')
    .pipe(csv())
    .on('data', (row) => {
        foodData.push({'name': row['음식명'], 'type': row['요리분류'], 'serving': row['인분'], 'source': row['출처']});
        let code = '코드', amount='용량';
        let ingredients = [];
        for(let i = 1; i <= 20; i++) {
            if(row[code + i] == '') break;
            ingredients.push({'code': row[code + i], 'amount': row[amount+i]});
        }
        ingredientData.push(ingredients);
        console.log(foodData);
        console.log(ingredientData);
    })
    .on('end', () => {
        let jsonDataObj = {foodData: foodData, ingredientData: ingredientData};
        request.post({
            headers: {'content-type': 'application/json'},
            url: 'http://localhost:8001/api/util/upload/food',
            body: jsonDataObj,
            json: true,
        }, function(error, response, body) {
            console.log(error);
        })
    });
