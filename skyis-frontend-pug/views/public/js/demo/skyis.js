function searchIngredientByName() {
    let name = $("#inputName").val();
    console.log("hello click");
    $.ajax({
        type: 'GET',
        url: "http://3.19.141.195:8001/api/ingredient/" + name,
        dataType: "json",
        success: function(data, status, xhr) {
            console.log(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText);
        }
    });
}