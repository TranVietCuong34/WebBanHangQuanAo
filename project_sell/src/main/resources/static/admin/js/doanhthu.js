var token = localStorage.getItem("token");
async function revenueYear(nam) {
    if (nam < 2000) {
        nam = new Date().getFullYear()
    }
    var url = 'http://localhost:8080/api/statistic/admin/revenue-year?year=' + nam;
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    var list = await response.json();
    console.log(list)
    var main = '';
    for (i = 0; i < list.length; i++) {
        if (list[i] == null) {
            list[i] = 0
        }
    }

	$("canvas#chart").remove();
	$("#dvChart").html('<canvas id="chart"></canvas>');
	
    var lb = 'doanh thu năm ' + nam;
    const ctx = document.getElementById("chart").getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["tháng 1", "tháng 2", "tháng 3", "tháng 4",
                "tháng 5", "tháng 6", "tháng 7", "tháng 8", "tháng 9", "tháng 10", "tháng 11", "tháng 12"
            ],
            datasets: [{
                label: lb,
                backgroundColor: 'rgba(161, 198, 247, 1)',
                borderColor: 'rgb(47, 128, 237)',
                data: list,
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        callback: function(value) {
                            return formatmoney(value);
                        }
                    }
                }]
            }
        },
    });
}
async function revenueDay(start,end) {
    var url = 'http://localhost:8080/api/statistic/admin/revenue-filter-day?startDate=' + start + '&endDate=' + end;
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    var list = await response.json();
 	console.log(list);

	var namNgay = [];
	var dataNgay = [];
	for (i = 0; i < list.length; i++) {
		 namNgay.push(list[i][0])
		 dataNgay.push(list[i][1])
	}


	$("canvas#chart").remove();
	$("#dvChart").html('<canvas id="chart"></canvas>');
	
    const ctx = document.getElementById("chart").getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: namNgay,
            datasets: [{
                label: "Thống kế theo ngày",
                backgroundColor: 'rgba(161, 198, 247, 1)',
                borderColor: 'rgb(47, 128, 237)',
                data: dataNgay,
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        callback: function(value) {
                            return formatmoney(value);
                        }
                    }
                }]
            } 
            
        },
    });
}

async function revenueTopProduct() {
    var url = 'http://localhost:8080/api/product/public/topProduct';
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    var list = await response.json();
 	console.log(list);

	var name = [];
	var soLuong = [];
	for (i = 0; i < list.length; i++) {
		 name.push(list[i][0].alias)
		 soLuong.push(list[i][0].quantitySold)
	}


	$("canvas#chart").remove();
	$("#dvChart").html('<canvas id="chart"></canvas>');
	
    const ctx = document.getElementById("chart").getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: name,
            datasets: [{
                label:"Top 3 Sản phẩm bán chạy nhất",
                backgroundColor: '#F20231',
                borderColor: '#150031B',
                data: soLuong,
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                       beginAtZero: true
                    }
                }]
            } 
            
        },
    });
}


function loadByTopProduct() {
    revenueTopProduct();
}
function loadByNgay() {
    var start = document.getElementById("startByDate").value;
    var end = document.getElementById("endByDate").value;
    revenueDay(start,end);
}
function loadByNam() {
    var nam = document.getElementById("nams").value;
    revenueYear(nam);
}
const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

function formatmoney(money) {
    return VND.format(money);
}


async function loadLichSuNap() {
    $('#example').DataTable().destroy();
    var start = document.getElementById("start").value
    var end = document.getElementById("end").value
    var url = 'http://localhost:8080/api/admin/all-history-pay';
    if (start != "" && end != "") {
        url = 'http://localhost:8080/api/admin/all-history-pay?start=' + start + '&end=' + end;
    }
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    var list = await response.json();
    var main = '';
    for (i = 0; i < list.length; i++) {
        main += `<tr>
                    <td>${list[i].createdTime}<br>${list[i].createdDate}</td>
                    <td>${list[i].orderId}</td>
                    <td>MOMO</td>
                    <td>${list[i].orderId}</td>
                    <td>${list[i].totalAmount}</td>
                    <td>Đã nhận</td>
                    <td>${list[i].user.username}</td>
                </tr>`
    }
    document.getElementById("listichsu").innerHTML = main
    $('#example').DataTable();
}