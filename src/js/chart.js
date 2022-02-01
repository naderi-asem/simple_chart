// import files ***************************************
import "../css/chart.css";

const labelsPlace = document.querySelectorAll(".chart>div");
const chart = document.querySelector('.chart');
let allItems = {};
let allLabels = {}




// data.json url ***************
const data_url = "../../data.json";

// initial DOM load ********************************
document.addEventListener('DOMContentLoaded', () => {
    // get data from json file *******************
    fetch(data_url, { method: "GET" })
        .then(response => response.json())
        .then(data => {
            allLabels = data.labels;
            allItems = data.items;
            for (let key in allLabels) {
                (key === "x")
                    ? labelsPlace[0].innerText = allLabels[key]
                    : labelsPlace[1].innerText = allLabels[key];
            }

            allItems = allItems.sort((a, b) => {
                return b.value - a.value;
            });
            setDataToDOM(allItems);
            anyChartItemHover(allItems);

        })
        .catch(error => console.log(error));
});

// function declaration *****************************
function setDataToDOM(items) {
    const MAX_VALUE = items[0].value;
    items.forEach(item => {
        const anyChartHeight = (item.value * 90 / MAX_VALUE).toFixed(2);
        const chartTag = document.createElement('div');
        chartTag.style.backgroundColor = `${item.color}`;
        chartTag.classList.add("chart-item");
        chartTag.style.height = `${anyChartHeight}%`;
        if (item.value === MAX_VALUE)
            chartTag.classList.add('selected');
        chart.appendChild(chartTag)
    });
    updateChartInfo(0, items);
}

function anyChartItemHover(allItems) {
    const chartItems = [...document.querySelectorAll(".chart-item")];
    chartItems.forEach((item, index) => {
        item.addEventListener('mouseover', (e) => {
            if (!item.classList.contains('selected'))
                chartItems.forEach(item => {
                    item.classList.remove('selected');
                });
            item.classList.add('selected');
            updateChartInfo(index, allItems);
        });
    });
    arrowKeyEventListener(chartItems, allItems);
}

function updateChartInfo(index, items) {
    const infoPlace = [...document.querySelector(".info").children];
    infoPlace[0].innerText = items[index].title;
    infoPlace[1].innerText = items[index].description;
    infoPlace[2].innerText = items[index].value.toLocaleString();
}

function arrowKeyEventListener(charts, items) {
    document.addEventListener('keydown', (e) => {
        let activeItem = charts.find(item => item.classList.contains('selected'));
        let activeItemIndex = charts.indexOf(activeItem);
        const chartLength = charts.length;
        if (e.key.toLowerCase() === "arrowleft"){
            activeItem.classList.remove('selected');
            if (activeItem !== charts[0]){
                activeItem.previousSibling.classList.add('selected');
                activeItemIndex--;
            }else {
                charts[chartLength-1].classList.add('selected');
                activeItemIndex = chartLength-1; 
            }
        }
        if (e.key.toLowerCase() === "arrowright"){
            activeItem.classList.remove('selected');
            if (activeItem !== charts[chartLength-1]){
                activeItem.nextSibling.classList.add('selected');
                activeItemIndex++;
            }else {
                charts[0].classList.add('selected');
                activeItemIndex = 0; 
            }
        }
        updateChartInfo(activeItemIndex, items);
    });
}