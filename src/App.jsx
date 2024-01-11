import { useEffect, useState } from 'react'
import Game from './Game'
import Info from './Info'
import './App.css'
import Stats from './Stats'

const GAME = 0
const INFO = 1
const STATS = 2

const titleDict = {
	[GAME]: "Monty Hall",
	[INFO]: "About",
	[STATS]: "Stats",
}

function App() {

	const [page, setPage] = useState(GAME)
	const [stats, setStats] = useState([])

	useEffect(_ => {
		const stats = JSON.parse(localStorage.getItem('stats'))
		if (stats) {
			setStats(stats)
		} else {
			setStats([
				{"title": "Number of Games Played", "value": 0, "displayValue": 0},
				{"title": "P (Winning the Game | We Switch)", "value": 0, "displayValue": 0},
				{"title": "P (Winning the Game | We Stay)", "value": 0, "displayValue": 0},
			])
		}
	}, [])

	function updateStats(updateList) {
		for (let i = 0; i < stats.length; i++) {
			stats[i].value += updateList[i]
		}
		stats[0].displayValue = stats[0].value
		if (stats[0] != 0) {
			for (let i = 1; i < stats.length; i++) {
				stats[i].displayValue = String(stats[i].value / stats[0].value).slice(0, 2+3)
			}
		}
		localStorage.setItem('stats', JSON.stringify(stats))
		setStats(stats)
	}

	function pageSelector(page) {
		switch (page) {
			case GAME:
				return <Game updateStats={updateStats}/>
			case INFO:
				return <Info handleBack={_ => setPage(GAME)}/>
			case STATS:
				return <Stats stats={stats} handleBack={_ => setPage(GAME)}/>
		}
	}

	return (
		<>
			<nav>
				<img src='/stats.svg' onClick={_ => setPage(STATS)} className='button' />
				<b>{titleDict[page]}</b>
				<img src='/info.svg' onClick={_ => setPage(INFO)} className='button'/>
			</nav>

			{ pageSelector(page) }
		</>
	)
}

export default App
