import { useState } from 'react'

import Button from './Button'
import Door from './Door'
import './Game.css'

function GenerateDoors() {
	const carsDoor = Math.floor(Math.random() * 3)
	const doors = []
	for (let i = 0; i < 3; i++) {
		doors.push({
			doorNo: i+1,
			objectName: 'goat',
			objectSrc: '/goat.png',
			selected: false,
			show: false,
		})
		if (i == carsDoor) {
			doors[doors.length - 1].objectName = 'car'
			doors[doors.length - 1].objectSrc = '/car.jpeg'
		} 
	}
	return doors
}

function montyPicks(doors) {
	let goatDoors = doors.filter(door => door.objectName == 'goat' && !door.selected ).map(door => door.doorNo)
	let choice = Math.floor(Math.random() * 2)
	return goatDoors[choice % goatDoors.length]
}

function Game({updateStats}) {
	const [doors, setDoors] = useState(GenerateDoors())
	const [gameState, setGameState] = useState(0)
	const [promptText, setPromptText] = useState('Pick a door')
	const [initSelect, setInitSelect] = useState(undefined)

	function selectDoor(doorNo) {
		if (gameState == 1) {
			transition()
		}

		if (doors[doorNo-1].show || gameState == 3 ) {
			return
		}

		setDoors(doors.map(door => {
			if (door.doorNo == doorNo) {
				door.selected = true
			} else {
				door.selected = false
			}
			return door
		}))
	}

	function showDoor(doorNo) {
		setDoors(doors.map(door => {
			if (door.doorNo == doorNo) {
				door.show = true
			}
			return door
		}))
	}

	function finishGame() {
		const seletedDoor = doors.find(door => door.selected)
		const initSelectedDoor = doors.find(door => door.doorNo == initSelect)

		let updateList = [1, 0, 0]
		if (initSelectedDoor.objectName != 'car') {
			updateList[1] = 1
		} else {
			updateList[2] = 1
		}

		setPromptText(`You won a ${seletedDoor.objectName}`)
		showDoor(seletedDoor.doorNo)
		updateStats(updateList)
	}

	function transition() {
		switch (gameState) {
			case 0:
				setInitSelect(doors.find(door => door.selected).doorNo)
				let door = montyPicks(doors)
				showDoor(door)
				setPromptText(`Monty picks ${door}`)
				setGameState(1)
			break;

			case 1:
				setPromptText('Pick a door')
				setGameState(2)
			break;

			case 2:
				finishGame()
				setGameState(3)
			break

			case 3:
				setPromptText('Pick a door')
				setDoors(GenerateDoors())
				setGameState(0)

			default:
			break;
		}
	}

	return (
		<main className='game'>
			<div className='doors-grid'>
				{ doors.map(door => <Door key={door.doorNo} handleClick={_ => selectDoor(door.doorNo)} {...door} 	/>) }
			</div>
			<div className='prompt'>
				<b>{promptText}</b>
				<Button onClick={transition}/>
			</div>
		</main>
	)
}

export default Game
