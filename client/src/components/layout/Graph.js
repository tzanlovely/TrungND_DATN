import ReactApexChart from 'react-apexcharts'
import {useState, useEffect} from 'react'

const Graph = props => {
    //Local state
    const [series, setSeries] = useState([{
        name: "Streak",
        data: []
    }])
    const [isBusy, setBusy] = useState(true)

    const [options, setOptions] = useState({
        chart: {
            height: 350,
            type: 'line',
            zoom: {
            enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        title: {
            text: 'Learning streak last 4 days',
            align: 'left'
        },
        grid: {
            row: {
            colors: ['#f3f3f3', 'red'], // takes an array which will be repeated on columns
            opacity: 0.5
            },
        },
        xaxis: {
            categories: ['4 days ago', '3 days ago', '2 days ago', 'Yesterday', 'Today'],
        }
    })

    useEffect(() => {
        setSeries({data : props})
        setBusy(false)
    }, [])
    console.log(series.data + " hello")
    if (!isBusy)
    return (
        <div className='col-8'>
            <ReactApexChart options={options} series={series} type="line" height={300} width={400}/>
        </div>
    )
}

export default Graph
