function disp() {
    title("Movies");
    createTable(movies);}

function title(title) {
    gap();
    $("#nav").append("<p style='font-size:30px;'align='left';>" + "<b>" + title + "</b>" + "</p>"+"<br>");}

function value(arr) {
    $.map(arr, function (value, index) {
        $("#nav").append("<p>" + "TITLE : " + value.title + "<br>" + "YEAR : " + value.year + "<br>" + "CAST :" + value.cast + "<br>" + "GENERES" + value.genres + "</p>");});}

function gap() {
    $("#nav").html("");}

function cast(arr, cast) {
    let result = arr.reduce((a, m) => { return a.add(...m.cast) }, new Set())
    let csort = Array.from(result);
    return csort;}

function disp2(movie, value) {
    movie.forEach(function (value) {
        $("#nav").append("<p>" + "CAST :" + value + "<br>" + "</p>");})}

function sortyr() {
    movies.sort(function (a, b) {
        var a1 = a.year;
        b1 = b.year;
        if (a1 == b1) return 0;
        return a1 > b1 ? 1 : -1;});
    title("Sorted List(year)");
    createTable(movies);}

function titlesort() {
    movies.sort(function (a, b) {
        var a1 = a.title.toUpperCase();
        var b1 = b.title.toUpperCase();
        if (a1 == b1) return 0;
        return a1 > b1 ? 1 : -1;});}

function name() {
    title("Sorted List(name)");
    titlesort();
    createTable(movies);}

function year1(d1, d2) {
    var d1 = document.getElementById("d1").value;
    var d2 = document.getElementById("d2").value;
    title("Movies found ");
    $.map(movies, function (value, index) {
        if ((value.year >= d1 && value.year <= d2) || (value.year <= d1 && value.year >= d2)) {
            $("#nav").append("<p>" + "TITLE : " + value.title + "<br>" + "YEAR : " + value.year + "<br>" + "CAST :" + value.cast + "<br>" + "GENERES" + value.genres + "</p>");} })}

function ascast() {
    title("CAST(Ascending)");
    var movie = cast(movies, cast);
    movie.sort();
    var t = makeTableHTML(movie);
    $("#nav").append(t);}

function descast() {
    title("CAST(descending)");
    var movie = cast(movies, cast);
    movie.sort().reverse();
    var t = makeTableHTML(movie);
    $("#nav").append(t);}

function filter(values) {
    title(values);
    movies.filter(function (value) {
        value.cast.forEach(function (casts) {
            if (casts === values) {
                $("#nav").append("<p>" + "TITLE : " + value.title + "<br>" + "YEAR : " + value.year + "<br>" + "CAST :" + value.cast + "<br>" + "GENERES" + value.genres + "</p>");
            }}) })}

function genre() {
    title("GENRES");
    titlesort();
   var g= $.map(movies, function (value, index) {
       // $("#nav").append("<p>" + "GENERES "+" : " + value.genres + "</p>");
    return value.genres;}); 
   var t= makeTableHTML(g);
   $("#nav").append(t)
        console.log(t)
    }

$(document).ready(function () {
    var opt = cast(movies, cast);
    opt.sort();
    var uni = cast(movies, genre);
    uni.sort();
    uni.forEach(function (value) {
        $("#example_select").append('<option value=' + value + '>' + value + '</options>') })})

function sortA() {
    var uniqueArray = cast(movies, cast);
    uniqueArray.sort();
    var uniqueArrayg = cast(movies, genre);
    uniqueArrayg.sort();
    title("cast with genre");
    var counts = 0;
    var genarr = [];
    for (var k in uniqueArray) {
        $("#nav").append("<br>" + "<b>" + "Cast: " + "</b>" + uniqueArray[k] + "<br>");
        var genarr = [];
        movies.filter(function (element) {
            element.cast.filter(casts => casts === uniqueArray[k]).forEach(function (casts) {
                genarr.push(...element.genres)})})
        var count = {}
        genarr.forEach(function (i) {
            count[i] = (count[i] || 0) + 1;
        });

        function obcreate(count) {
            var array1 = Object.entries(count);
            array1.sort(function (a, b) {
                return (a[1] < b[1] ? -1 : (a[1] > a[1] ? 1 : 0));});
            var ob = Object.setPrototypeOf(array1, Object.prototype);
            $.each(ob, function (key, value) {
                $("#nav").append("<b>" + "Genre: " + "</b>" + "  " + value + "<br>");})
            console.log(array1);}
        obcreate(count)}}

function makeTableHTML(myArray) {
    var result = "<table border=10>";
    for (var i = 0; i < myArray.length; i++) {
        result += "<tr>";
        result += "<td style='width:500px'>" + myArray[i] + "</td>";}
    result += "</table>";
    return result;}

function createTable(movies) {
    var col = [];
    for (var i = 0; i < movies.length; i++) {
        for (var key in movies[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key); }} }
    var table = document.createElement("table");
    var tr = table.insertRow(-1);                   // TABLE ROW.
    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);}
    for (var i = 0; i < movies.length; i++) {
        tr = table.insertRow(-1);
        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = movies[i][col[j]];}}
    var divContainer = document.getElementById("nav");
    divContainer.appendChild(table);}