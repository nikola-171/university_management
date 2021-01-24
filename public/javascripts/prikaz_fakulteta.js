function redirect(button){
    let id = button.value;
    let location_string = "/admin/izmeni_fakultet?id="+id;
    location.href = location_string;
}