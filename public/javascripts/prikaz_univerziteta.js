
function redirect(button){
    let id = button.value;
    let location_string = "/admin/promeni_univerzitet?id="+id;
    location.href = location_string;
}