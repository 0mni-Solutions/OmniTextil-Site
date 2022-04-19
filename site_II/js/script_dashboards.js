// GRÁFICOS UMIDADE

// GRÁFICO DE LINHA
UMI_line_graph()
function UMI_line_graph() {
    const horario = [
        '00h',
        '01h',
        '02h',
        '03h',
        '04h',
        '05h',
        '06h',
        '07h',
        '08h',
        '09h',
        '10h',
        '11h',
        '12h',
        '13h',
        '14h',
        '15h',
        '16h',
        '17h',
        '18h',
        '19h',
        '20h',
        '21h',
        '22h',
        '23h'
    ];

    var dataPoints = [40, 46, 35, 48, 54, 62, 49, 38, 43, 39, 34, 29, 35, 31, 24, 15, 17, 20, 24, 33, 33, 39, 45, 50];

    const dataLINE = {
        labels: horario,
        datasets: [
            {
                // LIMITE MÁXIMO
                data: [60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60],
                label: 'PERIGO',
                backgroundColor: 'rgb(230, 0, 0)',
                borderColor: 'rgb(230, 0, 0)',
                pointRadius: 0,
                pointHitRadius: 0,
            },
            {
                // MEDIDAS DO SENSOR
                data: dataPoints,
                label: 'DHT11',
                backgroundColor: '#8008FF',
                borderColor: '#8008FF',
                tension: 0.5,
                pointRadius: 5,
            }]
    };

    let delayed;
    const settingsLINE = {
        maintainAspectRatio: false,
        responsive: true,

        // ANIMAÇÃO (RETIRAR)
        animation: {
            onComplete: () => {
                delayed = true;
            },
            delay: (context) => {
                let delay = 0;
                if (context.type === "data" && context.mode === "default" && !delayed) {
                    delay = context.dataIndex * 20 + context.datasetIndex * 100;
                }
                return delay;
            },
        },
        // PARTE SUPERIOR
        plugins: {
            // TÍTULO NO GRÁFICO
            title: {
                display: true,
                padding: 0,
                text: "TEMPO REAL",
                color: '#5E2D92',
                font: {
                    size: 30,
                    family: 'Quicksand_Bold',
                },
            },
            // SUBTÍTULO NO GRÁFICO
            subtitle: {
                display: true,
                padding: 20,
                text: '| HOJE |',
                color: '#5E2D92',
                font: {
                    size: 15,
                    family: 'Quicksand_Bold',
                },
            },
            // LEGENDA DOS DATASETS
            legend: {
                display: true,
                labels: {
                    boxHeight: 1,
                    boxWidth: 22,
                    color: '#5E2D92',
                    font: {
                        size: 15,
                        family: 'Quicksand_Bold',
                    },
                },
            },
            // TOOLTIP
            tooltip: {
                enabled: true,
                displayColors: false,
                backgroundColor: 'rgba(67, 27, 109, 0.9)',
                caretSize: 12,
                caretPadding: 15,
                padding: 20,
                cornerRadius: 20,
                titleAlign: 'center',
                titleColor: '#e2c6ff',
                titleFont: {
                    size: 15,
                    family: 'Quicksand_Book',
                    style: 'italic',
                },
                titleMarginBottom: 10,
                bodyAlign: 'center',
                bodyColor: 'white',
                bodyFont: {
                    size: 15,
                    family: 'Quicksand_Bold',
                },
            },
        },
        // LEGENDAS 
        scales: {
            // DIMENSÕES (X-AXIS)
            x: {
                // TITLE DO EIXO X
                title: {
                    display: true,
                    text: 'Horário',
                    color: '#1e0935',
                    font: {
                        size: 20,
                        family: 'Quicksand_Bold',
                        style: 'italic',
                    },
                },
                // ESTILO DAS DIMENSÕES
                ticks: {
                    maxRotation: 90,
                    minRotation: 40,
                    color: '#1e0935',
                    font: {
                        size: 15,
                        family: 'Quicksand_Bold',
                    },
                },
            },
            // MÉTRICAS (Y-AXIS)
            y: {
                // TITLE DO EIXO Y
                title: {
                    display: true,
                    text: 'Umidade',
                    color: '#1e0935',
                    font: {
                        size: 20,
                        family: 'Quicksand_Bold',
                        style: 'italic',
                    },
                },
                // ESTILO DAS DIMENSÕES
                ticks: {
                    color: '#1e0935',
                    font: {
                        size: 15,
                        family: 'Quicksand_Bold',
                        style: 'italic',
                    },
                    callback: function (value) {
                        return + value + "%";
                    },
                },
            },
        },
    };

    configLINE = {
        type: 'line',
        data: dataLINE,
        options: settingsLINE,
    };

    var ChartLINE = new Chart(
        document.getElementById('UMI_ChartLINE'),
        configLINE
    );

}
// GRÁFICO DE BARRA
UMI_bar_graph()
function UMI_bar_graph() {
    // GRÁFICO DE BARRA
    const dia = [
        'domingo',
        'segunda',
        'terça',
        'quarta',
        'quinta',
        'sexta',
        'sábado',
    ];

    var dataBars = [40, 46, 35, 48, 54, 62, 49];

    const dataBAR = {
        labels: dia,
        datasets: [
            {
                // MEDIDAS DO SENSOR
                data: dataBars,
                label: 'MÉDIA',
                backgroundColor: '#8008FF',
                borderColor: '#8008FF',
                barThickness: 30,
                borderRadius: 100,
            }]
    };

    let delayed;
    const settingsBAR = {
        maintainAspectRatio: false,
        responsive: true,

        // ANIMAÇÃO (RETIRAR)
        animation: {
            onComplete: () => {
                delayed = true;
            },
            delay: (context) => {
                let delay = 0;
                if (context.type === "data" && context.mode === "default" && !delayed) {
                    delay = context.dataIndex * 200 + context.datasetIndex * 100;
                }
                return delay;
            },
        },
        // PARTE SUPERIOR
        plugins: {
            // TÍTULO NO GRÁFICO
            title: {
                display: true,
                padding: 10,
                text: "| SEMANAL |",
                color: '#5E2D92',
                font: {
                    size: 15,
                    family: 'Quicksand_Bold',
                },
            },
            // LEGENDA DOS DATASETS
            legend: {
                display: true,
                labels: {
                    boxHeight: 4,
                    boxWidth: 25,
                    color: '#5E2D92',
                    font: {
                        size: 15,
                        family: 'Quicksand_Bold',
                    },
                },
            },
            // TOOLTIP
            tooltip: {
                enabled: true,
                displayColors: false,
                backgroundColor: 'rgba(67, 27, 109, 0.9)',
                caretSize: 12,
                caretPadding: 15,
                padding: 20,
                cornerRadius: 20,
                titleAlign: 'center',
                titleColor: '#e2c6ff',
                titleFont: {
                    size: 15,
                    family: 'Quicksand_Book',
                    style: 'italic',
                },
                titleMarginBottom: 10,
                bodyAlign: 'center',
                bodyColor: 'white',
                bodyFont: {
                    size: 15,
                    family: 'Quicksand_Bold',
                },
            },
        },
        // LEGENDAS 
        scales: {
            // DIMENSÕES (X-AXIS)
            x: {
                // ESTILO DAS DIMENSÕES
                ticks: {
                    color: '#1e0935',
                    font: {
                        size: 13,
                        family: 'Quicksand_Bold',
                    },
                },
            },
            // MÉTRICAS (Y-AXIS)
            y: {
                // TITLE DO EIXO Y
                title: {
                    display: true,
                    text: 'Umidade',
                    color: '#1e0935',
                    font: {
                        size: 15,
                        family: 'Quicksand_Bold',
                        style: 'italic',
                    },
                },
                // ESTILO DAS DIMENSÕES
                ticks: {
                    padding: 10,
                    color: '#1e0935',
                    font: {
                        size: 13,
                        family: 'Quicksand_Bold',
                        style: 'italic',
                    },
                    callback: function (value) {
                        return + value + "%";
                    },
                },
            },
        },
    };

    const configBAR = {
        type: 'bar',
        data: dataBAR,
        options: settingsBAR,
    };

    var ChartBAR = new Chart(
        document.getElementById('UMI_ChartBAR'),
        configBAR
    );
}
// GRÁFICO DE PIZZA
UMI_doughnut_graph()
function UMI_doughnut_graph() {
    // GRÁFICO DE BARRA
    const capacidade = [
        'Operando',
        'Livre',
    ];

    var dataUse = [60, 40];

    const dataDOUG = {
        labels: capacidade,
        datasets: [
            {
                data: dataUse,
                backgroundColor: [
                    'rgba(128, 8, 255, 1)',
                    'rgba(128, 8, 255, 0.4)',
                ],
                circumference: 180,
                rotation: 270,
                cutout: '35%',
                borderWidth: 1,
                borderColor: '#e2c6ff',
                // borderColor: '#8008FF',
            }]
    };

    const settingsDOUG = {
        maintainAspectRatio: false,
        responsive: true,
        
        plugins: {
            // tooltip: {
            //     enabled: true,
            // },
            tooltip: {
                enabled: true,
                // displayColors: false,
                backgroundColor: 'rgba(67, 27, 109, 0.9)',
                caretSize: 12,
                caretPadding: 15,
                padding: 20,
                cornerRadius: 20,
                bodyAlign: 'center',
                bodyColor: 'white',
                bodyFont: {
                    size: 15,
                    family: 'Quicksand_Bold',
                },
            },
            // TÍTULO NO GRÁFICO
            title: {
                display: true,
                padding: 10,
                text: "SENSOR DHT11",
                color: '#5E2D92',
                font: {
                    size: 25,
                    family: 'Quicksand_Bold',
                },
            },
            // SUBTÍTULO NO GRÁFICO
            subtitle: {
                display: true,
                padding: 0,
                text: '| UMIDADE |',
                color: '#bf6bff',
                font: {
                    size: 15,
                    family: 'Quicksand_Bold',
                },
            },
            // LEGENDA DOS DATASETS
            legend: {
                display: true,
                labels: {
                    boxHeight: 4,
                    boxWidth: 25,
                    color: '#5E2D92',
                    font: {
                        size: 15,
                        family: 'Quicksand_Bold',
                    },
                },
            },
        },
    };

    const configDOUG = {
        type: 'doughnut',
        data: dataDOUG,
        options: settingsDOUG,
    };

    var ChartDOUG = new Chart(
        document.getElementById('UMI_ChartDOUG'),
        configDOUG
    );
}

//------------------------------------------------------------------------------//

// GRÁFICOS TEMPERATURA

// GRÁFICO DE LINHA
TEMP_line_graph()
function TEMP_line_graph() {
    const horario = [
        '00h',
        '01h',
        '02h',
        '03h',
        '04h',
        '05h',
        '06h',
        '07h',
        '08h',
        '09h',
        '10h',
        '11h',
        '12h',
        '13h',
        '14h',
        '15h',
        '16h',
        '17h',
        '18h',
        '19h',
        '20h',
        '21h',
        '22h',
        '23h'
    ];

    var dataPoints = [15, 10, 6, 8, 4, 11, 19, 30, 31, 27, 24, 25, 20, 19, 22, 17, 17, 23, 28, 29, 16, 20, 22, 15];

    const dataLINE = {
        labels: horario,
        datasets: [
            {
                // LIMITE MÁXIMO
                data: [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
                label: 'PERIGO',
                backgroundColor: 'rgb(230, 0, 0)',
                borderColor: 'rgb(230, 0, 0)',
                pointRadius: 0,
                pointHitRadius: 0,
            },
            {
                // MEDIDAS DO SENSOR
                data: dataPoints,
                label: 'DHT11',
                backgroundColor: '#D7B1FF',
                borderColor: '#D7B1FF',
                tension: 0.5,
                pointRadius: 5,
            }]
    };

    let delayed;
    const settingsLINE = {
        maintainAspectRatio: false,
        responsive: true,

        // ANIMAÇÃO (RETIRAR)
        animation: {
            onComplete: () => {
                delayed = true;
            },
            delay: (context) => {
                let delay = 0;
                if (context.type === "data" && context.mode === "default" && !delayed) {
                    delay = context.dataIndex * 20 + context.datasetIndex * 100;
                }
                return delay;
            },
        },
        // PARTE SUPERIOR
        plugins: {
            // TÍTULO NO GRÁFICO
            title: {
                display: true,
                padding: 0,
                text: "TEMPO REAL",
                color: '#bf6bff',
                font: {
                    size: 30,
                    family: 'Quicksand_Bold',
                },
            },
            // SUBTÍTULO NO GRÁFICO
            subtitle: {
                display: true,
                padding: 20,
                text: '| HOJE |',
                color: '#bf6bff',
                font: {
                    size: 15,
                    family: 'Quicksand_Bold',
                },
            },
            // LEGENDA DOS DATASETS
            legend: {
                display: true,
                labels: {
                    boxHeight: 1,
                    boxWidth: 22,
                    color: '#bf6bff',
                    font: {
                        size: 15,
                        family: 'Quicksand_Bold',
                    },
                },
            },
            // TOOLTIP
            tooltip: {
                enabled: true,
                displayColors: false,
                backgroundColor: 'rgba(226, 198, 255, 0.9)',
                caretSize: 12,
                caretPadding: 15,
                padding: 20,
                cornerRadius: 20,
                titleAlign: 'center',
                titleColor: '#8008FF',
                titleFont: {
                    size: 15,
                    family: 'Quicksand_Book',
                    style: 'italic',
                },
                titleMarginBottom: 10,
                bodyAlign: 'center',
                bodyColor: '#5E2D92',
                bodyFont: {
                    size: 15,
                    family: 'Quicksand_Bold',
                },
            },
        },
        // LEGENDAS 
        scales: {
            // DIMENSÕES (X-AXIS)
            x: {
                // TITLE DO EIXO X
                title: {
                    display: true,
                    text: 'Horário',
                    color: '#D7B1FF',
                    font: {
                        size: 20,
                        family: 'Quicksand_Bold',
                        style: 'italic',
                    },
                },
                // ESTILO DAS DIMENSÕES
                ticks: {
                    maxRotation: 90,
                    minRotation: 40,
                    color: '#D7B1FF',
                    font: {
                        size: 15,
                        family: 'Quicksand_Bold',
                    },
                },
            },
            // MÉTRICAS (Y-AXIS)
            y: {
                // TITLE DO EIXO Y
                title: {
                    display: true,
                    text: 'Temperatura',
                    color: '#D7B1FF',
                    font: {
                        size: 20,
                        family: 'Quicksand_Bold',
                        style: 'italic',
                    },
                },
                // ESTILO DAS DIMENSÕES
                ticks: {
                    color: '#D7B1FF',
                    font: {
                        size: 15,
                        family: 'Quicksand_Bold',
                        style: 'italic',
                    },
                    callback: function (value) {
                        return + value + "ºC";
                    },
                },
            },
        },
    };

    const configLINE = {
        type: 'line',
        data: dataLINE,
        options: settingsLINE,
    };

    var ChartLINE = new Chart(
        document.getElementById('TEMP_ChartLINE'),
        configLINE
    );
}
// GRÁFICO DE BARRA
TEMP_bar_graph()
function TEMP_bar_graph() {
    // GRÁFICO DE BARRA
    const dia = [
        'domingo',
        'segunda',
        'terça',
        'quarta',
        'quinta',
        'sexta',
        'sábado',
    ];

    var dataBars = [16, 19, 13, 22, 28, 17, 30];

    const dataBAR = {
        labels: dia,
        datasets: [
            {
                // MEDIDAS DO SENSOR
                data: dataBars,
                label: 'MÉDIA',
                backgroundColor: '#bf6bff',
                borderColor: '#bf6bff',
                barThickness: 30,
                borderRadius: 100,
            }]
    };

    let delayed;
    const settingsBAR = {
        maintainAspectRatio: false,
        responsive: true,

        // ANIMAÇÃO (RETIRAR)
        animation: {
            onComplete: () => {
                delayed = true;
            },
            delay: (context) => {
                let delay = 0;
                if (context.type === "data" && context.mode === "default" && !delayed) {
                    delay = context.dataIndex * 200 + context.datasetIndex * 100;
                }
                return delay;
            },
        },
        // PARTE SUPERIOR
        plugins: {
            // TÍTULO NO GRÁFICO
            title: {
                display: true,
                padding: 10,
                text: "| SEMANAL |",
                color: '#bf6bff',
                font: {
                    size: 15,
                    family: 'Quicksand_Bold',
                },
            },
            // LEGENDA DOS DATASETS
            legend: {
                display: true,
                labels: {
                    boxHeight: 4,
                    boxWidth: 25,
                    color: '#bf6bff',
                    font: {
                        size: 15,
                        family: 'Quicksand_Bold',
                    },
                },
            },
            // TOOLTIP
            tooltip: {
                enabled: true,
                displayColors: false,
                backgroundColor: 'rgba(226, 198, 255, 0.9)',
                caretSize: 12,
                caretPadding: 15,
                padding: 20,
                cornerRadius: 20,
                titleAlign: 'center',
                titleColor: '#8008FF',
                titleFont: {
                    size: 15,
                    family: 'Quicksand_Book',
                    style: 'italic',
                },
                titleMarginBottom: 10,
                bodyAlign: 'center',
                bodyColor: '#5E2D92',
                bodyFont: {
                    size: 15,
                    family: 'Quicksand_Bold',
                },
            },
        },
        // LEGENDAS 
        scales: {
            // DIMENSÕES (X-AXIS)
            x: {
                // ESTILO DAS DIMENSÕES
                ticks: {
                    color: '#D7B1FF',
                    font: {
                        size: 13,
                        family: 'Quicksand_Bold',
                    },
                },
            },
            // MÉTRICAS (Y-AXIS)
            y: {
                // TITLE DO EIXO Y
                title: {
                    display: true,
                    text: 'Temperatura',
                    color: '#D7B1FF',
                    font: {
                        size: 15,
                        family: 'Quicksand_Bold',
                        style: 'italic',
                    },
                },
                // ESTILO DAS DIMENSÕES
                ticks: {
                    padding: 10,
                    color: '#D7B1FF',
                    font: {
                        size: 13,
                        family: 'Quicksand_Bold',
                        style: 'italic',
                    },
                    callback: function (value) {
                        return + value + "ºC";
                    },
                },
            },
        },
    };

    const configBAR = {
        type: 'bar',
        data: dataBAR,
        options: settingsBAR,
    };

    var ChartBAR = new Chart(
        document.getElementById('TEMP_ChartBAR'),
        configBAR
    );
}
// GRÁFICO DE PIZZA
TEMP_doughnut_graph()
function TEMP_doughnut_graph() {
    // GRÁFICO DE BARRA
    const capacidade = [
        'Operando',
        'Livre',
    ];

    var dataUse = [35, 65];

    const dataDOUG = {
        labels: capacidade,
        datasets: [
            {
                data: dataUse,
                backgroundColor: [
                    'rgba(215, 177, 255, 1)',
                    'rgba(215, 177, 255, 0.1)',
                ],
                circumference: 180,
                rotation: 270,
                cutout: '35%',
                borderWidth: 1,
                borderColor: '#5E2D92',
            }]
    };

    const settingsDOUG = {
        maintainAspectRatio: false,
        responsive: true,

        plugins: {
            // tooltip: {
            //     enabled: true,
            // },
            tooltip: {
                enabled: true,
                // displayColors: false,
                backgroundColor: 'rgba(215, 177, 255, 0.9)',
                caretSize: 12,
                caretPadding: 15,
                padding: 20,
                cornerRadius: 20,
                bodyAlign: 'center',
                bodyColor: '#5E2D92',
                bodyFont: {
                    size: 15,
                    family: 'Quicksand_Bold',
                },
            },
            // TÍTULO NO GRÁFICO
            title: {
                display: true,
                padding: 10,
                text: "SENSOR DHT11",
                color: '#bf6bff',
                font: {
                    size: 25,
                    family: 'Quicksand_Bold',
                },
            },
            // SUBTÍTULO NO GRÁFICO
            subtitle: {
                display: true,
                padding: 0,
                text: '| TEMPERATURA |',
                color: '#bf6bff',
                font: {
                    size: 15,
                    family: 'Quicksand_Bold',
                },
            },
            // LEGENDA DOS DATASETS
            legend: {
                display: true,
                labels: {
                    boxHeight: 4,
                    boxWidth: 25,
                    color: '#bf6bff',
                    font: {
                        size: 15,
                        family: 'Quicksand_Bold',
                    },
                },
            },
        },
    };

    const configDOUG = {
        type: 'doughnut',
        data: dataDOUG,
        options: settingsDOUG,
    };

    var ChartDOUG = new Chart(
        document.getElementById('TEMP_ChartDOUG'),
        configDOUG
    );
}