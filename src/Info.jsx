import Button from './Button'
import './Info.css'

const infoText = `Suppose you're on a game show, and you're given the choice of three doors: Behind one door is a car; behind the others, goats. You pick a door, say No. 1, and the host, who knows what's behind the doors, opens another door, say No. 3, which has a goat. He then says to you, "Do you want to pick door No. 2?" Is it to your advantage to switch your choice?`

function Info({handleBack}) {
	return (
		<main className='info'>
			<p className='about'>{infoText}</p>

			<div className='credits'>
				Created by Praveen Perumal (<a href='https://github.com/solvedbiscuit71' target='_blank'>solvedbiscuit71</a>)
			</div>

			<div className='prompt'>
				<b>Back to game</b>
				<Button onClick={handleBack}/>
			</div>
		</main>
	)
}

export default Info
