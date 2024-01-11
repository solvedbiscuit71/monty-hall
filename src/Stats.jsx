import Button from './Button'
import './Stats.css'

function Stats({stats, handleBack}) {
	return (
		<main className='stats'>
			<div className='table'>
				{
					stats.map(stat => 
						<div className='record' key={stat.title}>
							<div>{stat.title}</div>
							<div>{stat.displayValue}</div>
						</div>
					)
				}
			</div>

			<div className='prompt'>
				<b>Back to game</b>
				<Button onClick={handleBack}/>
			</div>
		</main>
	)
}

export default Stats
